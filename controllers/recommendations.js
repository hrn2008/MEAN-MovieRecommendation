const express = require('express');
const router = express.Router();

/* Get all recommendations */
router.get('/', (req,res) => {
    res.render('recommendations/index',{
        title:'All Recommendations'
    });
})



//export it
module.exports=router;