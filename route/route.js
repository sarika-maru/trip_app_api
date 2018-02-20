const {add_user,getUserByToken,update_profile,logout}= require('./../controller/userController');
const {GetAllTrip,add_trip}= require('./../controller/TripController');
const {book_trip, AllBookTrip,GetOneBookTrip}= require('./../controller/BookTripController');
const {authenticate} = require('./../middleware/authenticate');
exports.route=(app)=>{

    app.post('/UserRegForm',add_user);

    app.get('/GetAllTrip',GetAllTrip);

    app.post('/AddTrip', add_trip);


   // private route

    app.delete('/UserLogout/:token',authenticate,logout);

    app.get('/GetUserByToken/:token',getUserByToken);

    app.patch('/UpdateProfile/:token',authenticate,update_profile);

    app.post('/BookTrip/:token',authenticate, book_trip);

    app.get('/API/BookTrip/:token',authenticate,AllBookTrip);

    app.get('/API/GetBookTrip/:token/:id', authenticate, GetOneBookTrip);

}