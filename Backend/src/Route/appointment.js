const express = require('express');
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const Appointment= require('../Models/Appointment');

// Get All Booking Details By User ID
router.get('/user-appointment/:id',(req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`)
    };

    let query = { userId : id, isConsulted : false }
    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" + JSON.stringify(err,undefined,2));
    })
})

// Get All Booking Details, but not consulted
router.get('/appointment',(req,res)=>{
    let query = { isConsulted: false }
    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get All Booking Details By Date, but not Consulted
router.get('/report-not/:date',(req,res)=>{
    let query = {isConsulted: false, date: Date(req.params.date) }
    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get All Booking Details By Date, but Consulted
router.get('/report/:date',(req,res)=>{
    let query = { isConsulted:true, date: Date(req.params.date) }
    Appointment.find(query, (err,doc) =>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get All Appointment Feedbacks
router.get('/feed-appointment',(req,res)=>{
    let query = { isConsulted: true }
    Appointment.find(query, (err,doc) => {
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Not Used
// Get All Booking Details By Doctor Name
router.get('/all-appointment/:name',(req,res)=>{
    let query = { doctor: req.params.name.toString() }
    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :' + JSON.stringify(err,undefined,2));
    })
})

// Get All Booking History By Doctor Name, but not consulted
router.get('/appointment/:name',(req,res)=> {
    let query = { isConsulted:false, doctor:req.params.name.toString() }
    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    })
})

// Get Treatment History of Patient (Doctor) 
router.get('/doctor-treatment/:name',(req,res)=>{
    let query = { isConsulted:true, doctor:req.params.name.toString() }
    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Get Appointment By Booking ID
router.get('/appointment/:id',(req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`)
    };
    
    Appointment.findById(id, (err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err, undefined, 2));
    })
})

// Not Used
// Retrieve Time Details
router.post('/appointment-time',(req,res)=>{
    const {doctor, date, category} = req.body;
    let query = {doctor: doctor.toString(), category: category.toString(), date: Date(date) }

    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Updating Prescription and Treatment (Doctor)
router.put('/doctor-prescription/:id',(req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`)
    };

    const {prescription, treatment} = req.body;

    const Prescription = {
        prescription : prescription.toString(),
        treatment: treatment.toString(),
        isConsulted : true,
    }

    Appointment.findByIdAndUpdate(id, {$set : Prescription}, {new:true}, (err,doc) => {
        if(!err) res.send(doc)
        else console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    });
})

// Updating Feedback (Patient)
router.put('/app-feedback/:id',(req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }

    const { feed } = req.body;

    const feedback = { feed : feed.toString() }

    Appointment.findByIdAndUpdate(id, {$set : feedback}, {new:true}, (err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    });
})

//  Update Appointment (Patient)
router.put('/appointment/:id',(req,res)=>{
    const id = req.params.id.toString()
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }
    
    const { name, email, address, phone, doctor, date, time, category } = req.body;

    const app = {
        name : name.toString(),
        email: email.toString(),
        address: address.toString(),
        phone: phone.toString(),
        doctor: doctor.toString(),
        date: Date(date),
        time: time.toString(),
        category: category.toString(),
    }

    Appointment.findByIdAndUpdate(id, {$set : app}, {new:true}, (err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    });
})

// Delete Appointment (Patient)
router.delete('/appointment/:id',(req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }
    
    Appointment.findByIdAndDelete(id, (err,doc)=>{
        if(!err) res.send(doc);
        else console.log("Error in Deleting Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Get Patient Treatment History By User ID
router.get('/user-treatment/:id',(req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }

    let query = { userId: id, isConsulted: true };
    Appointment.find(query, (err,doc)=>{
        if(!err) res.send(doc)
        else console.log("Error in Retrieving Appointment :" +JSON.stringify(err,undefined,2));
    })
})

// Book an Appointment
router.post('/appointment',(req,res)=>{
    const { name ,email , address, phone, doctor, date, time, category, userId, feed, isConsulted, prescription, treatment } = req.body;
    let query = { doctor: doctor.toString(), category: category.toString(), date: Date(date), time: time.toString()}

    Appointment.findOne(query).then((appointment)=>{
        if(appointment)
            return res.status(400).json({msg : 'Appointment does exists'});

        const newAppointment= new Appointment({
            userId: userId.toString(),
            feed: feed.toString(),
            name: name.toString(),
            email: email.toString(),
            address: address.toString(),
            date: Date(date),
            phone: phone.toString(),
            doctor: doctor.toString(),
            time: time.toString(),
            category: category.toString(),
            isConsulted,
            prescription: prescription.toString(),
            treatment: treatment.toString(),
        });

        newAppointment.save();
        
        return res.status(200).json({msg : 'Appointment has been Booked'});
        }
    ).catch(e => console.log(e))
})

module.exports = router;