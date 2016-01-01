var User = require('../models/user');
var express = require('express');
var router = express.Router();

/* GET users listing. */
//router.get('/', function(req, res, next) {
// res.send('respond with a resource');
//});

router.route('/users')
    .post(function (req, res) {
        //the User.js object
        var user = new User(); // create a new instance of the User model
        user.username = req.body.username; // set the user name (comes from the request)
        user.password = req.body.password; // set the password name (comes from the request)
        user.email = req.body.email;// set the mail (comes from the request)
        // save the bear in mongodb and check for errors
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
    })
    .get(function (req, res) { //get the user
        User.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
 router.route('/users/:user_name')
    .get(function(req,res){
        User.find({ "username": req.params.user_name },function(err,user){
            if (err)
                res.send(err);
 
       res.json(user);      
        });
    });

module.exports = router;
