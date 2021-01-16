const express = require('express');
const router =  express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
// Route to register a user
router.post('/',[check('name','Name is required').not().isEmpty(),check('email','Please enter a vaild email').isEmail(),check('password','Please enter a password with 6 or more characters').isLength({min:6})],(req,res)=>{
    const errors  = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }
    res.send("passed");
});


// export the router, must do
module.exports = router;