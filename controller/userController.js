const mongoose = require('mongoose');
const passport= require('passport');
const localStrategy= require('passport-local').Strategy;
const express= require('express');
const bodyParser= require('body-parser');
const jwt=require('jsonwebtoken');



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

}

var getUserByToken=(req,res)=>{
    var token= req.query.token;
    User.findByToken(token).then((user)=>{

        if(!user){
            return promise.reject();
        }
        console.log("user inside middleware"+ user);
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



module.exports={add_user, logIn, getUserByToken}