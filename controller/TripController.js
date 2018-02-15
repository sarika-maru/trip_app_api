const mongoose = require('mongoose');
const {Trip}= require('./../model/trip.model');
const express= require('express');
const bodyParser = require('body-parser');
const db = require('./../config/db');
const path= require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var GetAllTrip =(req,res)=>{
    Trip.find().then((docs)=>{
        var newArr=[];
        docs.map((val,_key)=>{
            var obj={
                _id: val._id,
                trip_name: val.trip_name,
                places:val.places,
                no_of_days: val.no_of_days,
                food: val.food,
                per_person_price: val.per_person_price,
                description: val.description,
                image: path.join(__dirname,"./../trip_images/",val.image)
            }

            newArr.push(obj);
        })
        res.json(newArr)
    },(err)=>{
        res.json("Error"+err)
    }).catch((ex)=>{
        res.json("Exception"+ ex);
    })
}

var add_trip =((req,res)=>{
    var trip= new Trip({trip_name :req.body.trip_name,places : req.body.places, no_of_days: req.body.no_of_days,food:req.body.food,per_person_price:req.body.per_person_price,description: req.body.description,image: req.body.image});
    trip.save().then((trip)=>{
        res.json("Successfully Inserted");
    },(err)=>{
        res.json("Failed To Insert"+ err);
    }).catch((ex)=>{
        console.log("Exception"+ex);
    });
})

module.exports={GetAllTrip,add_trip}