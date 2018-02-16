const {User} = require('./../model/user.model');
const jwt = require('jsonwebtoken');

var authenticate = (req,res,next)=>{
    var token= req.query.token;
    console.log("inside middleware  : "+token);
    User.findByToken(token).then((user)=>{

        if(!user){
            return promise.reject();
        }
        console.log("user inside middleware"+ user);
        req.user =user;
        console.log("user update :" + req.user);
        req.token =token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    })
}

module.exports ={authenticate};