var githubStrategy = require('passport-github').Strategy;
const passport= require('passport');
const {User}= require('./../model/user.model');
var findOrCreate = require('mongoose-findorcreate');

passport.use(new githubStrategy({
        clientID: "de3bb8f50bfa6766019b",
        clientSecret: "05d1c33d3945c17d79cd75b1ec9cedde24154cac",
        callbackURL: "http://localhost:8888/trip_app/auth/github/callback"
    },
    function (accessToken,refreshToken, profile, done) {
        User.findOrCreate({username : profile.username},
            function (err,user) {

                token= accessToken;

                User.findOneAndUpdate({username:user.username, password:user.password},{
                    $set:{
                        token:token
                    }
                }).then((docs)=>{
                    return done(err,user);
                }).catch((ex)=>{
                    return done(null,false);
                })

            })
    }
));

module.exports=passport

