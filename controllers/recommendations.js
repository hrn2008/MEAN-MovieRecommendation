const express = require('express');
const router = express.Router();

//use recommendation model here
const Recommendation = require('../models/recommendation');
const Comment = require('../models/comment');

/* Get all recommendations */
router.get('/', (req, res) => {
  Recommendation.find().then((recommendations) => {
    console.log(recommendations);
    res.render('recommendations/index', {
      title: 'All Recommendations',
      recs: recommendations
    });
  }).catch((err) => {
    console.log(err);
  });
});

/* GET /create - Form*/
router.get('/create', (req, res) => {
  res.render('recommendations/create');
});

// POST /Create - Save data to MongoDB
router.post('/create', async (req, res) => {
  try {
    const newDocument = await Recommendation.create(req.body);
    res.redirect('/recommendations');
  } catch (err) {
    console.log(err);
  }
});


//GET /view 
router.get('/view/:_id', async (req, res) => {
  try {
    let recommendation = await Recommendation.findById(req.params._id)
    let comments = await Comment.find({ recommendation: req.params._id });
    res.render('recommendations/view', { recommendation, comments });
  } catch (error) {
    console.log(error)
  }
});


//GET /delete
router.get('/delete/:_id', (req, res) => {
  Recommendation.deleteOne({ _id: req.params._id })
    .then(() => {
      res.redirect('/recommendations');
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get /edit/id
router.get('/edit/:_id', (req, res) => {
  Recommendation.findById(req.params._id)
    .then(recommendation => {
      res.render('recommendations/edit', {
        recommendation: recommendation,
        title: 'Edit the Recommendation'
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//Post /edit/id
router.post('/edit/:_id', async (req, res) => {
  try {
    await Recommendation.findByIdAndUpdate(req.params._id, req.body);
    res.redirect('/recommendations');
  } catch (err) {
    console.log(err);
  }
});



//make public
module.exports = router;