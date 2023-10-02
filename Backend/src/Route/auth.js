const express =require('express');
const router= express.Router();
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken'); 
const User = require('../Models/User');

const secret = 'secret123'

router.post('/',(req,res)=>{

    const {email , password, type} = req.body;
    let query = { email, type }

    User.findOne(query)
    .then(user =>{
        if(!user) return res.status(400).json({msg : 'User Does not exists'});

        //Validate User
        bcrypt.compare(password,user.password)
        .then(isMatch=>{
            if(!isMatch) return res.status(400).json({ msg : 'Invalid Credentials'});
                jwt.sign(
                    {id: user.id},
                    secret,
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({
                            token,
                            id:user.id,
                            name:user.username,
                            email:user.email,
                            type:user.type
                        })
                    }
                );
        }).catch(e => console.log(e))
    }).catch(e => console.log(e))
})
module.exports = router;