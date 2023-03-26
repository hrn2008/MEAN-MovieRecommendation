const mongoose=require('mongoose');
//authentication
const plm=require('passport-local-mongoose');

//Define schema for users
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

//extend the model (inherits)
UserSchema.plugin(plm);





const User = mongoose.model('User', UserSchema);
module.exports=User;