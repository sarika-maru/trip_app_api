const mongoose = require('mongoose');
const passport= require('passport');
const localStrategy= require('passport-local').Strategy;
const express= require('express');
const bodyParser= require('body-parser');
const jwt=require('jsonwebtoken');
const authenticate = require('./../middleware/authenticate');



const db = require('./../config/db');
const {User}= require('../model/user.model');

var add_user=(req,res)=>{

    var user = new User({username: req.body.username, password : req.body.password, city : req.body.city});
    user.save().then((user)=>{
        console.log(user);
        res.json("Successfully Inserted");
    },(err)=>{
        res.json("Failed To Insert"+ err);
    }).catch((ex)=>{
        console.log("exception");
    });
}

var update_profile=(req,res)=>{
    User.findOneAndUpdate({token: req.token},{
        $set:{
            city:req.body.city
        }
    }).then((docs)=>{
        res.json("1")
    },(err)=>{
        res.json("0");
    }).catch((ex)=>{
        res.json("0");
    });
}

var getUserByToken=(req,res)=>{
    var token= req.query.token;
    console.log("tkejk"+token);
    User.findByToken(token).then((user)=>{

        if(!user){
            return promise.reject();
        }

        res.json(user);
    }).catch((e)=>{
        res.status(401).send();
    })
}

var logIn=((username,password,done)=> {
    User.findOne({username, password}, function (user, err) {
        if (err) {
            return done(null, false);
        }
        if (!user) {
            return done(null, false);
        }
        console.log(user);
        return done(null, user);
    })
});

var logout=(req,res)=>{
    req.user.removeToken(req.token).then(()=>{
        res.json("success");
    },(err)=>{
        res.json("Error");
    }).catch((ex)=>{
        res.json("Error");
    })
}


module.exports={add_user, logIn, getUserByToken,update_profile,logout}