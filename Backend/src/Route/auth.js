require('dotenv').config()
const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken'); 
const User = require('../Models/User');

router.post('/', async (req, res)=>{

    const {email , password, type} = req.body;
    let query = { email: email?.toString(), type: type?.toString() }

    const user = User.findOne(query, (err, doc) => {
        if(!err) res.send(doc);
        else console.log('Error in Retrieving the User Details :'+JSON.stringify(err,undefined,2));
    });

    if (!user) {
        res.status(400).json({msg : 'User Does not exists'});
    }

    if (user && (await bcrypt.compare(password, admin.password))) {
        res.json({
            token: generateToken(user._id),
            id: user._id,
            name: user.username,
            email: user.email,
            type: user.type
        })
    }else{
        res.status(400).json({ msg : 'Invalid Credentials'});
    }
})

const generateToken = (id) => {
return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
})
}

module.exports = router;