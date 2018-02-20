const {User} = require('./../model/user.model');
const jwt = require('jsonwebtoken');

var authenticate = (req,res,next)=>{
    var token= req.params.token;
    console.log("inside middleware  : "+token);
    User.findByToken(token).then((user)=>{

        if(!user){
            return promise.reject();
        }

        req.user =user;
        req.token =token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    })
}

module.exports ={authenticate};