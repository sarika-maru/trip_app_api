const {User} = require('./../model/user.model');
const jwt = require('jsonwebtoken');

var authenticate = (req,res,next)=>{
    var token= req.header('x-auth');
    console.log("inside middleware  : "+token);
    User.findByToken(token).then((user)=>{

        if(!user){
            return promise.reject();
        }

        req.user =user;
        req.token =token;
        next();
    }).catch((ex)=>{
        res.status(401).send(ex);
    })
}

module.exports ={authenticate};