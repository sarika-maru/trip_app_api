const mongoose = require('mongoose');
const passport= require('passport');
const localStrategy= require('passport-local').Strategy;
const express= require('express');
const bodyParser= require('body-parser');
const jwt=require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const route=require('./route/route');
const {User}=require('./model/user.model');
const {Trip}= require('./model/trip.model');
var {logIn} = require('./controller/userController');
var googleStrategy = require('passport-google-oauth').OAuth2Strategy;
var githubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var {authenticate} = require('./middleware/authenticate')

const  app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
var token="";
global.storeToken="";

passport.use(new localStrategy(function (username, password, done) {

    User.findOne({username}, function (err, user) {
        if (err) {
            return done(null, false);
        }
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password,user.password,(err,res)=>{
            if(err){
                return done(null,false);
            }
            if(res){
                token= jwt.sign({_id: user._id.toHexString()}, "abc123").toString();

                User.findOneAndUpdate({username:user.username, password:user.password},{
                    $set:{
                        token:token
                    }
                }).then((docs)=>{
                    return done(null, user);
                }).catch((ex)=>{
                    return done(null,false);
                })

            }

        });


    });

}));

passport.use(new googleStrategy({
    clientID :'832970101324-ahamsi78e446psmbjmqau04oikjrufqk.apps.googleusercontent.com',
    clientSecret:'6Sk0Fzyfvg_mTR5B1MuMKH_N',
    callbackURL:'http://localhost:8888/trip_app/auth/google/callback'
},
    function (token,tokenSecret, profile, done) {
    //console.log(profile);
            User.findOrCreate({username : profile.emails[0].value},
                function (err,user) {
                   // console.log(user);
                    token= token;

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
))

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
))

passport.serializeUser(function (user,done) {
    done(null,user);
});

passport.deserializeUser(function (id,done) {
    done(null,user);
});

//local strategy
app.post('/UserLoginForm',passport.authenticate('local',{ successRedirect : '/',
    failureRedirect : '/err'}));


app.get('/',(req,res)=>{
    storeToken = token;
    res.json(token);
});

app.get('/err',(req,res)=>{
    res.json("Login Failed");
});

//google strategy
app.get('/auth/google', passport.authenticate('google', {scope: ['profile','email'] }));

app.get('/trip_app/auth/google/callback', passport.authenticate('google',{failureRedirect: '/UserLoginForm'}),
    function (req,res) {
        res.json('success');
    }
)

//github strategy
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/trip_app/auth/github/callback', passport.authenticate('github',{failureRedirect : '/UserLoginForm'}),
    function (req,res) {
        res.json("success");
    }
)


route.route(app);

app.listen(8888,()=>{
    console.log("Connected on server at 8888");
});

module.exports={app}