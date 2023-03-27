const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Movie Recommendation',
    user:req.user });
});

/* Get /about */
router.get('/about',(req,res) => {
  res.render('about',{
    title:'About Us',
    user:req.user 
  });
});



module.exports = router;
