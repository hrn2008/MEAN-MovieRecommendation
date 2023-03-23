const express = require('express');
const router = express.Router();

//add fs
const fs=require('fs');

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
   

    
})



//export it
module.exports=router;