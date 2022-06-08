const userMod = require('../models/userModel');
const Token = require('../config/Token');

const authUser = async(req,res) => {

    const {username,password} = req.body;

    if(!username || !password){

        res.status(404);

        throw new Error('Invalid Data');

    }

    const isUser = await userMod.findOne({username:username})

    if(!isUser){

        const newUser = await userMod.create({username:username,password:password,likedposts:[],likedcomments:[]});

        res.status(200);

        res.json({id:newUser._id,username:username,accessToken:Token(newUser._id),likedposts:[],likedcomments:[]})

    }else{

        if(await isUser.matchPassword(password)){

            res.status(200);

            res.json({id:isUser._id,username:username,accessToken:Token(isUser._id),likedposts:isUser.likedposts,likedcomments:isUser.likedcomments});
        }else{

            res.status(400);

            throw new Error ('Invalid password or username')
        }

    }

}

module.exports = {authUser} 