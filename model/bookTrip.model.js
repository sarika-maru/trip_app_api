const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const BookTripSchema = new Schema ({
    trip_id:{
        type: Schema.Types.ObjectId,
        ref: ['Trips']
    },user_id:{
        type: Schema.Types.ObjectId,
        ref: ['User']
    },number_of_person:[{
        name:{
            type:String
        },age:{
            type:Number
        }
    }],totalAmount:{
        type:Number
    }
})

const BookTrip = mongoose.model("BookTrip", BookTripSchema);

module.exports = {BookTrip}
