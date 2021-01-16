// This file does the authentation for the login
const express = require('express');
const router =  express.Router();

// Route to get logined user
router.get('/',(req,res)=>{
    res.send("Get logined user");
});

// authentiate user and get token
router.post('/',(req,res)=>{
    res.send("Login user");
});

// export the router, must do
module.exports = router;