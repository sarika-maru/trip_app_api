const {add_user}= require('./../controller/userController');
const {GetAllTrip,add_trip}= require('./../controller/TripController');
exports.route=(app)=>{

    app.post('/UserRegForm',add_user);

    app.get('/GetAllTrip',GetAllTrip);

    app.post('/AddTrip', add_trip);
}