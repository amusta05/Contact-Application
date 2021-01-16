const express = require('express');
const router =  express.Router();

// Route to register a user
router.post('/',(req,res)=>{
    res.send("Registers a user");
});

// export the router, must do
module.exports = router;