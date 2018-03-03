const {add_user,getUserByToken,update_profile,logout}= require('./../controller/userController');
const {GetAllTrip,add_trip}= require('./../controller/TripController');
const {book_trip, AllBookTrip,GetOneBookTrip}= require('./../controller/BookTripController');
const {authenticate} = require('./../middleware/authenticate');
const passportLocal = require('./../auth/localStrategy');
const passportGoogle= require('./../auth/googleStartegy');
const passportGithub= require('./../auth/githubStrategy');

exports.route=(app)=>{

    //local startegy
    app.post('/login',passportLocal.authenticate('local',{ successRedirect : '/',
        failureRedirect : '/err'}));


    app.get('/',(req,res)=>{
        res.header('x-auth',storeToken).json("success");
        //res.status(200).json(storeToken);
    });

    app.get('/err',(req,res)=>{
        res.status(404).json("login failed");
    });

    //googleStraregy
    app.get('/auth/google', passportGoogle.authenticate('google', {scope: ['profile','email'] }));

    app.get('/trip_app/auth/google/callback', passportGoogle.authenticate('google',{failureRedirect: '/err'}),
        function (req,res) {
            res.json('success');
        }
    )

    //github strategy
    app.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

    app.get('/trip_app/auth/github/callback', passportGithub.authenticate('github',{failureRedirect : '/err'}),
        function (req,res) {
            res.json("success");
        }
    )


    app.post('/User',add_user);

    app.get('/Trip',GetAllTrip);

    app.post('/Trip', add_trip);


   // private route

    app.delete('/logout',authenticate,logout);

    app.get('/User',authenticate,getUserByToken);

    app.put('/User',authenticate,update_profile);

    app.post('/BookTrip/:token',authenticate, book_trip);

    app.get('/BookTrip/:token',authenticate,AllBookTrip);

    app.get('/GetBookTrip/:token/:id', authenticate, GetOneBookTrip);

}