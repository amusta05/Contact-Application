const express = require('express');
const router =  express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config =  require('config')
const { check, validationResult } = require('express-validator');
// Route to register a user
router.post('/',[check('name','Name is required').not().isEmpty(),check('email','Please enter a vaild email').isEmail(),check('password','Please enter a password with 6 or more characters').isLength({min:6})], async (req,res)=>{
    const errors  = validationResult(req);
    if (!errors.isEmpty()){
        // returns an error if any of the validation is not met
        return res.status(400).json({errors: errors.array() });
    }

    // destructing 
    const {name, email , password } = req.body;
    try{
        let user = await User.findOne({email}); //finds a users in the database
        if(user){
            // if the user exists then we let the user know that user already exists
            return res.status(400).json({msg:'This user already exists'});
        }
        // if its a new user then we create an instance of a new User
        user = new User({name,email,password});
        // decrypt the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        await user.save();

        // generate json web token
        const payload = {
            user:{
                id: user.id
            }
        };
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn: 36000

        }, (err,token) =>{
            if(err){
                throw err;
            }
            else{
                res.json({token});
            }
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send('Something went wrong');
    }
    
});


// export the router, must do
module.exports = router;