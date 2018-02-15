const mongoose= require('mongoose');
const bcrypt= require('bcryptjs');
const Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');
var jwt= require('jsonwebtoken');

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

UserSchema.methods.removeToken = function (tokens) {
    var user= this;
    console.log("token inside remove token"+ user);
    return user.update({
        $set:{
            token: ""
            }
        })
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decode;

    try {
        decode= jwt.verify(token,'abc123');
        console.log("try "+decode);
    }catch (e) {
        console.log("catch"+ e);
        return Promise.reject();
    }


    return User.findOne({
        '_id' : decode,
        'token' : token
    });
};

UserSchema.plugin(findOrCreate);
const User = mongoose.model("User", UserSchema);

module.exports={User}