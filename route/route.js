const {add_user,getUserByToken,update_profile,logout}= require('./../controller/userController');
const {GetAllTrip,add_trip}= require('./../controller/TripController');
const {authenticate} = require('./../middleware/authenticate');
exports.route=(app)=>{

    app.post('/UserRegForm',add_user);

    app.get('/GetAllTrip',GetAllTrip);

    app.post('/AddTrip', add_trip);


   // private route
    app.delete('/UserLogout',authenticate,logout);

    app.get('/GetUserByToken',getUserByToken);

    app.patch('/UpdateProfile',authenticate,update_profile);
}