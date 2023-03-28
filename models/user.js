const mongoose=require('mongoose');
//authentication
const plm = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

//Define schema for users
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  oauthProvider: String,
  oauthId: String
});

//extend the model (inherits)
UserSchema.plugin(plm);
UserSchema.plugin(findOrCreate);



const User = mongoose.model('User', UserSchema);
module.exports=User;