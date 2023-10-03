const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken'); 
const User = require('../Models/User');

// Patient Sign Up
router.post('/sign-up', async (req,res) => {

    const { username, email, password } = req.body;

    // Check if user alredy exists with provided email
    let query = { email: email.toString() }
    const user = await User.findOne(query)
    
    if (user) {
        return res.status(400).json({msg : 'User already exists'});
    }

    const saltPassword = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, saltPassword);
    
    const newUser = new User({
        username: username?.toString(),
        email: email?.toString,
        password: securePassword,
    });

    await newUser.save()

    if (newUser) {
        return res.json({
            token: generateToken(newUser._id),
            id: newUser._id,
            name: newUser.username,
            email: newUser.email
        })
    }else{
        return res.status(400).json({msg: 'Invalid user! please check again'})
    }
})

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    })
  }

module.exports = router;