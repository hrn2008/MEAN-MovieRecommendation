const express = require('express');
const router = express.Router();

//use recommendation model here
const Recommendation = require('../models/recommendation');
const Comment = require('../models/comment');

//global auth check
const global=require('../controllers/globalFunctions');


/* Get all recommendations from DB */
router.get('/', (req, res) => {
  Recommendation.find().then((recommendations) => {
    // console.log(req.user);
    res.render('recommendations/index', {
      title: 'All Recommendations',
      recs: recommendations,
      user: req.user
    });
  }).catch((err) => {
    console.log(err);
  });
});

/* GET /create - Form*/
//auth  check function as middleware
router.get('/create', global.isAuthenticated, (req, res) => {
  res.render('recommendations/create',{
    title:"Recomend your movie",
    user: req.user
  });
});

// POST /Create - Save data to MongoDB
router.post('/create', global.isAuthenticated, async (req, res) => {
  try {
    const newDocument = await Recommendation.create(req.body);
    res.redirect('/recommendations');
  } catch (err) {
    console.log(err);
  }
});


//GET /view/id 
router.get('/view/:_id', async (req, res) => {
  try {
    let recommendation = await Recommendation.findById(req.params._id)
    let comments = await Comment.find({ recommendation: req.params._id });
    res.render('recommendations/view', { 
      title:'View the recommended movie',
      recommendation,
      comments,
      user:req.user });
  } catch (error) {
    console.log(error)
  }
});


//GET /delete/id
router.get('/delete/:_id',global.isAuthenticated,  (req, res) => {
  Recommendation.deleteOne({ _id: req.params._id })
    .then(() => {
      res.redirect('/recommendations');
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get /edit/id
router.get('/edit/:_id', global.isAuthenticated, (req, res) => {
  Recommendation.findById(req.params._id)
    .then(recommendation => {
      res.render('recommendations/edit', {
        recommendation: recommendation,
        title: 'Edit the Recommendation',
        user:req.user 
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//Post /edit/id
router.post('/edit/:_id', global.isAuthenticated, async (req, res) => {
  try {
    await Recommendation.findByIdAndUpdate(req.params._id, req.body);
    res.redirect('/recommendations');
  } catch (err) {
    console.log(err);
  }
});



//make public
module.exports = router;