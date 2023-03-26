const express=require('express');
const router=express.Router();
const passport=require('passport');
const User=require('../models/user');

router.get('/register',(req,res)=>{
    let messages=req.session.messages?.message;
    //clear session
    req.session.messages=[];

    res.render('auth/register',{
        title: 'Register',
        messages:messages
    });
});

router.post('/register',(req,res)=>{
    //creating a new user bu User model
    //checking and hashing passwords
    User.register(
    new User({username: req.body.username}),
    req.body.password,
    (err, user) => {
        if(err){
            //store error in session variable
            req.session.messages=err;
            res.redirect('/auth/register');
        } else {
            res.redirect('/recommendations');
        }
    });
});

//GET - Login
router.get('/login',(req,res)=>{
    let messages=req.session.messages;
    req.session.messages=[];
    res.render('auth/login',{
        title: 'Login',
        messages:messages
    });
});

//POST - Login
router.post('/login',passport.authenticate('local',{
    successRedirect:'/recommendations',
    failureRedirect:'/auth/login',
    failureMessage:'Invalid Login'
}));

//GET - Logout
router.get('/logout',(req,res)=>{
    req.session.messages=[];
    req.logOut((err)=>{
        if(err) {
            console.log(err);
        }
            res.redirect('/');
    })
})

module.exports=router;