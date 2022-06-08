const mongoose = require('mongoose');

const CommunityModel = mongoose.Schema(

    {
        comname:{type:String, required:true},
        comtype:{type:String,required:true},
        adultmode:{type:Boolean, required:true},
        moderator:{type:mongoose.Schema.Types.ObjectId},
        members:{type:Array},

    },

    {timestamps: true}

);

const ComModel = mongoose.model("Community",CommunityModel);

module.exports = ComModel