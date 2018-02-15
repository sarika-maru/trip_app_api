const {User} = require('./../model/user.model');

var authenticate = (req,res,next)=>{
    var token= storeToken;
    console.log("inside middleware  : "+token);
    User.findByToken(token).then((user)=>{

        if(!user){
            return promise.reject();
        }
        console.log("user inside middleware"+ user);
        req.user =user;
        req.token =token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    })
}

module.exports ={authenticate};