const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken'); 
const User = require('../Models/User');

const secret = 'secret123'

// Patient Sign Up
router.post('/sign-up',async (req,res) => {

    const username= req.body.username;
    const email= req.body.email;
    const password = req.body.password;

    
    // Check if user alredy exists with provided email
    let query = { email: email.toString() }
    const user = await User.findOne(query, (err, doc) => { 
        if(!err) res.send(doc);
        else console.log('Error in Retrieving the User Details :' + JSON.stringify(err, undefined, 2));
    })
    
    if (user) {
        res.status(400).json({msg : 'User already exists'});
    }

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password,saltPassword);
    
    const newUser = new User({
        username,
        email,
        password: securePassword,
    });

    newUser.save().then((user)=>{
        res.json({
            token:jwt.sign({id:user.id}, secret, {expiresIn:3600}),
            id:user.id,
            name:user.username,
            email:user.email
            })
    }).catch(e => console.log(e));
})

module.exports = router;