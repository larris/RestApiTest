/**
 * Created by larris on 23/12/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    username:String,
    password:String,
    email:String
});

module.exports = mongoose.model('User',UserSchema);