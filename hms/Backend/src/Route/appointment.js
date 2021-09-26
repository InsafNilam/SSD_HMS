const express =require('express');
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const Appointment= require('../Models/Appointment');

router.get('/appointment',(req,res)=>{
    Appointment.find((err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    }
    )
})

router.get('/appointment/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);
    
    Appointment.findById(req.params.id,(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

router.put('/appointment/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);
    
    const app = {
        name : req.body.name,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
        doctor:req.body.doctor,
        date: req.body.date,
        time:req.body.time,
        category:req.body.category,
    }

    Appointment.findByIdAndUpdate(req.params.id,{$set : app},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    });
})

router.delete('/appointment/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : ${req.params.id}`);
    
    Appointment.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting Appointment :" +JSON.stringify(err,undefined,2));
    })
})

router.post('/appointment',(req,res)=>{
    const {name ,email , address, phone, doctor, date, time, category} = req.body;

    Appointment.findOne({doctor,category,date,time}).then((appointment)=>{
        if(appointment)
            return res.status(400).json({msg : 'Appointment does exists'});

        const newAppointment= new Appointment({
            name,
            email,
            address,
            date,
            phone,
            doctor,
            time,
            category,
        });
        newAppointment.save();
        
        return res.status(200).json({msg : 'Appointment has been Booked'});
        }
    ).catch(e => console.log(e))
})

module.exports = router;