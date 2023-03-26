const express=require('express');

//make public auth
exports.isAuthenticated=(req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/auth/login');
    }
};