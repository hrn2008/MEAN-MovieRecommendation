const express=require('express');
const router=express.Router();
const Comment=require('../models/comment');
const Recommendation=require('../models/recommendation');

//global auth check
const global=require('../controllers/globalFunctions');


//GET: /comments/create -> show new comment form
router.get('/create/:_id',  (req,res)=>{
    Recommendation.findById(req.params._id)
    .then((recommendation) => {
      res.render('comments/create', { 
        title:'Add your comment',
        recommendation ,
        user: req.user });
    })
    .catch((err) => {
      console.log(err);
    });
});

//POST: /comments/create -> create new comment in DB
router.post('/create/:_id', async(req,res)=>{
    try {
        const newDocument = await Comment.create(req.body);
        res.redirect(`/recommendations/view/${req.params._id}`);
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;