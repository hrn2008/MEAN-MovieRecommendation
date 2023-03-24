const express = require('express');
const router = express.Router();

//use recommendation model here
const Recommendation = require('../models/recommendation');

/* Get all recommendations */
router.get('/', (req,res) => {
    const recommendations =  [
        {
            "name": "Bad Boy"
        },
        {
            "name":"Impossible misson"
        },
        {
            "name":"Hell boy"
        },
        {
            "name":"Green Book"
        }
    
    ];
            res.render('recommendations/index',{
                title:'All Recommendations',
                recs : recommendations
            }); 
});

/* GET /create - Form*/
router.get('/create',(req,res)=>{
    res.render('recommendations/create');
});

// POST /Create - Save data to MongoDB
router.post('/create',async (req,res)=>{
    try {
        const newDocument = await Recommendation.create(req.body);
        res.redirect('/recommendations');
      } catch (err) {
        console.log(err);
      }
    });

//make public
module.exports=router;