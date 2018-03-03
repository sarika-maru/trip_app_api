const mongoose = require('mongoose');
const passport= require('passport');
const localStrategy= require('passport-local').Strategy;
const express= require('express');
const bodyParser= require('body-parser');
const jwt=require('jsonwebtoken');
const authenticate = require('./../middleware/authenticate');
const {User}= require('../model/user.model');

var add_user=(req,res)=>{

    var user = new User({username: req.body.username, password : req.body.password, city : req.body.city});
    user.save().then((user)=>{
        if(!user){
            res.status(404).json(user);
        }
        res.status(200).json(user);
    },(err)=>{
        res.status(404).json("Failed To Insert :"+ err);
    }).catch((ex)=>{
        res.status(401).json("Exception :"+ ex);
    });
}

var update_profile=(req,res)=>{
    User.findOneAndUpdate({token: req.token},{
        $set:{
            city:req.body.city
        }
    }).then((docs)=>{
        res.status(200).json("succes");
    },(err)=>{
        res.status(404).json("Error");
    }).catch((ex)=>{
        res.status(401).json("Exception");
    });
}

var getUserByToken=(req,res)=>{
    var token= req.token;
    console.log("tkejk"+token);
    User.findByToken(token).then((user)=>{

        if(!user){
            return promise.reject();
        }

        res.json(user);
    }).catch((e)=>{
        res.status(401).send(e);
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
    console.log(req.token);
    req.user.removeToken(req.token).then((response)=>{
        res.status(200).json("success");
    },(err)=>{
        res.status(404).json("Error");
    }).catch((ex)=>{
        res.status(401).json("Exception");
    });
}


module.exports={add_user, logIn, getUserByToken,update_profile,logout}