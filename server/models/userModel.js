const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userModel = mongoose.Schema(

    {
      username:{type:String, required:true},
      password:{type:String,required:true},
      likedposts:{tpye:Array},
      likedcomments:{type:Array},
    },

    {timestamps: true}

);

userModel.methods.matchPassword = async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword,this.password)
     
}

userModel.pre("save",async function (next) {

if(!this.isModified){
    next();
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt)

});

const userMod = mongoose.model("User",userModel);

module.exports = userMod;
