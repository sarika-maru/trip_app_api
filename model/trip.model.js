const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
    trip_name:{
        type:String
    },places:[{
        type:String
    }],no_of_days:{
        type:Number
    }, food :[{
        type : String
    }],per_person_price:{
        type:Number
    },description:{
        type:String
    },image :{
        type : String
    }
})

const Trip = mongoose.model('Trips',TripSchema);

module.exports={Trip}