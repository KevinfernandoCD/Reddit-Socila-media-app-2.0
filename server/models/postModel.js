const mongoose = require('mongoose');

const postModel = mongoose.Schema(

    {
        posttitle:{type:String, required:true},
        post:{type:String, required:true},
        posttype:{type:String,required:true},
        iscommunitypost:{type:Boolean, required:true},
        communityId:{type:mongoose.Schema.Types.ObjectId},
        createdby:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
        votes:{type:Number,required:true},
        uploadtime:{type:Date, required:true},
        comments:{type:Array}
    },

    {timestamps: true}

);

const postMod = mongoose.model("Post",postModel);

module.exports = postMod