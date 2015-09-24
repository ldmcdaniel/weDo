var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var userSchema = new Schema({
  name : {first: String, last: String},
  username: String,
  email: String,
  password: String,
  group: String,
  tasks: []
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
