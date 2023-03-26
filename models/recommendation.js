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


const Recommendation = mongoose.model('Recommendation', recSchema);
module.exports=Recommendation;

  