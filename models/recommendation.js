const mongoose=require('mongoose');


// Define schema for recommendations list
const recSchema = new mongoose.Schema({
  name: {
    type:String,
    required: 'Name is required'
  },
  year: {
    type:String,
  },
  genre: {
    type:String,
  },
  imdb :{
    type:String,
  }, 
  summary: {
    type:String,
     required : 'Summary is required'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});



//Define schema for users
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   comments: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Comment'
//   }]
// });

// Define models for each schema
const Recommendation = mongoose.model('Recommendation', recSchema);

// const User = mongoose.model('User', UserSchema);


//export them
module.exports=Recommendation;
// module.exports = {
//     Recommendation,
//     Comment
//     // User
//   };
  