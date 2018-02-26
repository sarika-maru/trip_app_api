var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport= require('passport');
const {User}= require('./../model/user.model');
var findOrCreate = require('mongoose-findorcreate');

passport.use(new googleStrategy({
        clientID :'832970101324-ahamsi78e446psmbjmqau04oikjrufqk.apps.googleusercontent.com',
        clientSecret:'6Sk0Fzyfvg_mTR5B1MuMKH_N',
        callbackURL:'http://localhost:8888/trip_app/auth/google/callback'
    },
    function (token,tokenSecret, profile, done) {
        //console.log(profile);
        User.findOrCreate({username : profile.emails[0].value},
            function (err,user) {

                storeToken= token;

                User.findOneAndUpdate({username:user.username, password:user.password},{
                    $set:{
                        token:storeToken
                    }
                }).then((docs)=>{
                    return done(err,user);
                }).catch((ex)=>{
                    return done(null,false);
                })

            })
    }
))

module.exports=passport