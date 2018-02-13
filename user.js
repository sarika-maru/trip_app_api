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


const  app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());

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
                var token= jwt.sign({username: user.username, password: user.password}, "abc123");

                User.findOneAndsUpdate({username:user.username, password:user.password},{
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
    console.log(profile);
            User.findOrCreate({username : profile.emails[0].value},
                function (err,user) {
                    console.log(user);
                    return done(err,user);
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
                return done(err,user);
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
    res.json("You are succesfully login");
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