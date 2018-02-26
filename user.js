const mongoose = require('mongoose');
const passport= require('passport');
const express= require('express');
const bodyParser= require('body-parser');
const bcrypt = require('bcryptjs');
const route=require('./route/route');

const  app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
global.storeToken;

route.route(app);

app.listen(8888,()=>{
    console.log("Connected on server at 8888");
});

module.exports={app}