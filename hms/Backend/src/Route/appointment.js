const express = require('express');
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const Appointment= require('../Models/Appointment');

// Retrieve Appointment By User ID
router.get('/user-appointment/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    Appointment.find({userId : req.params.id ,isConsulted: false},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Get All Appointments
router.get('/appointment',(req,res)=>{
    Appointment.find({isConsulted:false},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get All Appointment Feedback
router.get('/feed-appointment',(req,res)=>{
    Appointment.find({isConsulted:true},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get All Appointments By Doctor Name
router.get('/all-appointment/:name',(req,res)=>{
    Appointment.find({doctor:req.params.name},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get All Booking History By Doctor Name
router.get('/appointment/:name',(req,res)=>{
    Appointment.find({isConsulted:false, doctor:req.params.name},(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get Doctor Treatment History
router.get('/doctor-treatment/:name',(req,res)=>{
    Appointment.find({isConsulted: true, doctor:req.params.name},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Retrieve Appointment By Booking ID
router.get('/appointment/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);
    
    Appointment.findById(req.params.id,(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// TODO
// Retrieve Time Details
router.post('/appointment-time',(req,res)=>{
    const {doctor, date,category} = req.body;

    Appointment.find({doctor,category,date},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Updating Prescription and Treatment
router.put('/doctor-prescription/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    const Prescription = {
        prescription : req.body.prescription,
        treatment: req.body.treatment,
        isConsulted : true,
    }

    Appointment.findByIdAndUpdate(req.params.id,{$set : Prescription},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    });
})

// Updating Feedback
router.put('/app-feedback/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    const feedback = {
        feed : req.body.feed,
    }

    Appointment.findByIdAndUpdate(req.params.id,{$set : feedback},{new:true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    });
})

//  Update Appointment
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

// Delete Appointment
router.delete('/appointment/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : ${req.params.id}`);
    
    Appointment.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Get Patient Treatment History
router.get('/user-treatment/:id',(req,res)=>{
    if(!isValidObjectId(req.params.id)) return res.status(400).send(`No Record with given id : $(req.params.id)`);

    Appointment.find({isConsulted: true},(err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Make Appointment
router.post('/appointment',(req,res)=>{
    const {name ,email , address, phone, doctor, date, time, category, userId, feed, isConsulted, prescription, treatment} = req.body;

    Appointment.findOne({doctor,category,date,time}).then((appointment)=>{
        if(appointment)
            return res.status(400).json({msg : 'Appointment does exists'});

        const newAppointment= new Appointment({
            userId,
            feed,
            name,
            email,
            address,
            date,
            phone,
            doctor,
            time,
            category,
            isConsulted,
            prescription,
            treatment,
        });
        newAppointment.save();
        
        return res.status(200).json({msg : 'Appointment has been Booked'});
        }
    ).catch(e => console.log(e))
})

module.exports = router;