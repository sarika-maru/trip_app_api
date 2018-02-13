const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

const UserSchema=new Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },password:{
        type:String
    },city :{
        type:String,

    },token:{
          type:String
    }

})

UserSchema.pre('save',function (next) {
    var user= this;
    if(user.isModified('password')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if(err)
                {
                    return err;
                }
                user.password = hash;
                next();
            })
        })
    }else{
        next();
    }

})
UserSchema.plugin(findOrCreate);
const User = mongoose.model("User", UserSchema);

module.exports={User}