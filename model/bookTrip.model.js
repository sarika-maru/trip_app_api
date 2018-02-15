const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const BookTripSchema = new Schema ({
    trip_id:{
        type: Schema.Types.ObjectId,
        ref: ['Trips']
    },user_id:{
        type: Schema.Types.ObjectId,
        ref: ['User']
    }
})

const BookTrip = mongoose.model("BookTrip", BookTripSchema);

module.exports = {BookTrip}