const mongoose=require('mongoose');
const Recommendation = require('../models/recommendation');

//Define schema for comments
const CommentSchema = new mongoose.Schema({
    desc:{
      type: String,
      required: "text is required"
    },
    recommendation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recommendation'
    },
    username: {
      type: String
    }
    
  });

  const Comment = mongoose.model('Comment', CommentSchema);
  module.exports=Comment;