// This file does the authentation for the login
const express = require('express');
const router =  express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config =  require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// Route to get logined user
router.get('/',auth, async( req,res)=>{
    console.log("here")
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// authentiate user and get token

router.post('/',[check('email','Please enter an email').isEmail(), check('password','Enter a password of 6 or more characters').exists()], async (req,res)=>{
    console.log("comes hereww");
    const errors  = validationResult(req);

    if (!errors.isEmpty()){
        // returns an error if any of the validation is not met
        return res.status(400).json({errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        // when the user is logining and the email doesnt exist, then we return an error
        if (!user){
            return res.status(400).json({msg:'Invalid crenditals'});

        }
        else{
            // now we must check that the passwords match
            const isMatch  = await bcrypt.compare(password,user.password);
            if (!isMatch){
                return res.status(400).json({msg:'Invalid crenditals'});

            }
            else{
                // if they match then generate a token
                // generate json web token
                const payload = {
                    user:{
                        id: user.id
                    }
                };
                jwt.sign(payload,config.get('jwtSecret'),{
                    expiresIn: 360000

                }, (err,token) =>{
                    if(err){
                        throw err;
                    }
                    else{
                        res.json({token});
                    }
                });
            }
        }

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }

});

// export the router, must do
module.exports = router;