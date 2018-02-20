const db = require('./../config/db');
const {BookTrip}= require('../model/bookTrip.model');

var book_trip=(req,res)=>{

    var bookTrip= new BookTrip({trip_id :req.body.trip_id,user_id:req.body.user_id,number_of_person:req.body.number_of_person,totalAmount:req.body.totalAmount});
    bookTrip.save().then((trip)=>{
        res.json("succes");
    },(err)=>{
        res.json("error :"+ err);
    }).catch((ex)=>{
        res.json("exception"+ ex);
    });
}

var AllBookTrip=(req,res)=>{
    BookTrip.find().then((booktrips)=>{
        res.send(booktrips);
    },(err)=>{
        res.send("Error : "+err);
    }).catch((ex)=>{
        res.send("Exception : "+ ex);
    });
}

var GetOneBookTrip=(req,res)=>{
    console.log(req.params.id);
    BookTrip.find({trip_id:req.params.id}).then((booktrip)=>{
        res.send(booktrip);
    },(err)=>{
        res.send("Error : "+err);
    }).catch((ex)=>{
        res.send("Exception : "+ ex);
    });
}

module.exports={book_trip, AllBookTrip, GetOneBookTrip}


