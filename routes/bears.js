/**
 * Created by larris on 23/12/15.
 */
var Bear = require('../models/bear');
var express = require('express');
//routes for api

var router = express.Router();

router.route('/bears')
    .post(function(req, res) {
        //the Bear.js object
        var bear = new Bear(); // create a new instance of the Bear model
        bear.name = req.body.name; // set the bears name (comes from the request)

        // save the bear in mongodb and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({
                message: 'Bear created!'
            });
        });
    })
    .get(function(req, res) { //get the bears
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });


router.route('/bears/:bear_id') //get one bear
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
    .put(function(req, res) {
        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name; // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({
                    message: 'Bear updated hoooooray!'
                });
            });
        });
    })
    .delete(function(req, res) { //remove bear
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({
                message: 'Successfully deleted'
            });
        });
    });


module.exports = router;