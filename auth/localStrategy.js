const localStrategy= require('passport-local').Strategy;
const passport= require('passport');
const {User} = require('./../model/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

passport.use(new localStrategy(function (username, password, done) {
    console.log(username + password);

    User.findOne({username:username}).then((user)=>{
        if(!user)
        {
            return done(null,false);
        }
        else
        {
            if(!bcrypt.compareSync(password,user.password))
            {
                return done(null,false);
            }
            else
            {
                storeToken= jwt.sign({_id: user._id.toHexString()}, "abc123").toString();

                User.findOneAndUpdate({username:user.username, password:user.password},{
                    $set:{
                        token:storeToken
                    }
                }).then((docs)=>{
                    return done(null, user);
                }).catch((ex)=>{
                    return done(null,false);
                })
            }
        }
    },(err)=>{
        console.log('err');
        return done(null,false);
    })

}));

passport.serializeUser(function (user,done) {
    done(null,user);
});

passport.deserializeUser(function (id,done) {
    done(null,user);
});


module.exports=passport