const postMod = require('../models/postModel');
const userMod = require('../models/userModel');
var mongoose = require('mongoose');


const getPublicPosts = async(req,res) => {


    try {

    const publicPosts = await postMod.find({iscommunitypost:false}).populate("createdby").sort({uploadtime: -1})

    if(publicPosts.length > 0){

    res.status(200);

    res.json(publicPosts)

    }else{

        res.send('No posts available')
    }
    
    } catch (error) {


        res.status(500);

        throw new Error('Something went wrong')
        
    }


}

const createPost  = async(req,res) => {

    //RETREIVING THE POST TYPE
    const {iscommunitypost} = req.body;

    //IF THERE'S NO POST TYPE THEN THROW AN ERROR
    if(iscommunitypost == undefined) {
    
        res.status(404);
        throw new Error('Inavalid Post type');

    }


    if(iscommunitypost == true) {

        try {

        const {posttitle,post,posttype,communityId,uploadtime,createdby,votes} = req.body

        const newPost = await postMod.create({posttitle:posttitle,post:post,posttype:posttype,iscommunitypost:iscommunitypost,communityId:communityId,uploadtime:uploadtime,createdby:createdby,votes:votes,comments:[]});

        res.status(200);

        res.json(newPost)
            
        } catch (error) {

            res.status(400);

            throw new Error('Failed to create post')
            
        }

    }else{

        try {

        const {posttitle,post,posttype,uploadtime,createdby,votes} = req.body

        const newPost = await postMod.create({posttitle:posttitle,post:post,posttype:posttype,iscommunitypost:iscommunitypost,uploadtime:uploadtime,createdby:createdby,votes:votes,comments:[]});

        res.status(200);

        res.json(newPost)
            
        } catch (error) {

        res.status(500);

        throw new Error('Failed to create post')
            
        }

    }

}

const DeletePost = async(req,res) => {

    const id = req.params.id

    if(!id){

        res.status(400);

        throw new Error ('No id provided')

    }else{

        const deletedPost = await postMod.findByIdAndDelete(id);

        res.status(200);

        res.send('post removed');
    }

 

}

const voteup = async (req,res) => {

  const id = req.params.id

    if(!id){

        res.status(404);

        throw new Error('No id')
        
    }else{

   const updateVote = await postMod.findByIdAndUpdate(id,{$inc : {'votes' : 1}})

   const updateUser = await userMod.findByIdAndUpdate(req.body.userid, {$push:{likedposts:id}},{new:true})

    res.status(200);

    res.json(updateVote)

    }
 
}

const votedown = async (req,res) => {

    const id = req.params.id

    if(!id){

        res.status(404);

        throw new Error('No id')
        
    }else{

    const updateVote = await postMod.findByIdAndUpdate(id,{$inc : {'votes' : -1}})

     const updateUser = await userMod.findByIdAndUpdate(req.body.userid, {

           $pull:{likedposts:id}
           
        },{new:true})

    res.status(200);

    res.json(updateVote)

    }
 
}

const createComment = async(req,res) => {

    const {commentObj} = req.body

    const commentid = new mongoose.Types.ObjectId();

    const newObj  = {...commentObj,_id:commentid}

    const id = req.params.id

    if(!commentObj || !id){

        res.status(404)

        throw new Error('Invalid Data')

    }else{

   try {

    const newComment =  await postMod.findByIdAndUpdate(id,{$push:{comments:newObj}},{new:true,upsert:true}).exec()

    const updatedpost = await postMod.findOne({_id:id})

    res.status(200);

    res.json(updatedpost);

    }catch (error) {

        res.status(401)

        throw new Error('Failed to add comment')
            
        }
    }
   
}

const likeComment = async (req,res) => {

    const {comid,type} = req.body

    const id = req.params.id

    if(!comid || !id){

        res.status(404)

        throw new Error('Cannot find id')

    }else{

    if(type == 'add'){

    const updateUser  = await userMod.findByIdAndUpdate(id,{$push:{likedcomments:comid}});

    const user = await userMod.findOne({_id:id});
    
    res.status(200);

    res.json(user)

    }else {

    const updateUser  = await userMod.findByIdAndUpdate(id,{$pull:{likedcomments:comid}});

    const user = await userMod.findOne({_id:id});
    
    res.status(200);

    res.json(user)

    }

  }
 
}

const getCommunityPost = async(req,res) => {


    const id = req.params.id

    const posts = await postMod.find({communityId:id}).populate("createdby")

    if(posts.length > 0){

        res.status(200)

        res.json(posts)

    }else{

        res.status(200)

        res.send('No posts available')

    }

}


module.exports = {getCommunityPost,createPost,getPublicPosts,DeletePost,voteup,votedown,createComment,likeComment}