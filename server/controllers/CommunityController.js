const ComModel = require('../models/CommunityModel');
const postMod = require('../models/postModel');

const createCommunity = async(req,res) => {

    const {comname,comtype,adultmode,userid} = req.body;

    if(!comname || !comtype || !userid){

        res.status(404);

        throw new Error('Invalid Data')

    }

    const isCommunity  = await ComModel.find({comname:comname});

    if(isCommunity.length > 0 ) {

        res.status(404);

        throw new Error('Community already exists')

    }else{

        const newCommunity = await ComModel.create({comname:comname,comtype:comtype,adultmode:adultmode,moderator:userid,members:[userid]});

        res.status(200);

        res.json({comname:comname,comtype:comtype,adultmode:adultmode,moderator:userid,members:[userid]});

        
    }

}

const getCommunities = async(req,res) => {

    const communities = await ComModel.find({});

    if(communities.length > 0){

        res.status(200);

        res.json(communities);

    }else{


        res.status(200);

        res.send('No communities available')
    }


}

const getCommunity = async(req,res) => {

    const id = req.params.id

    if(!id){

        res.status(404)

        throw new Error('No Id')
    }

    const community = await ComModel.findOne({_id:id});

    if(community) {

        res.status(200)

        res.json(community)

    }else{


        res.status(404)

        res.send('Invalid Id')
    }

}

const addToCommunity = async(req,res) => {

    const id = req.params.id;

    const {userId} = req.body;

    if(!id || !userId) {

        res.status(404);

        throw new Error('No Id Found')

    }

    const add = await ComModel.findByIdAndUpdate(id,{$push:{members:userId}});

    res.status(200);

    res.json(add)

}

const removeFromCommunity = async(req,res) => {

    const id = req.params.id;

    const {userId} = req.body;

    if(!id || !userId) {

        res.status(404);

        throw new Error('No Id Found')

    }

    const add = await ComModel.findByIdAndUpdate(id,{$pull:{members:userId}});

    res.status(200);

    res.json(add)

}

module.exports = {createCommunity,getCommunities,getCommunity,removeFromCommunity,addToCommunity}