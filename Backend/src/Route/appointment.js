const express = require('express');
const dompurify = require('dompurify');
const asyncHandler = require('express-async-handler')
const { isValidObjectId } = require('mongoose');
const router= express.Router();
const Appointment= require('../Models/Appointment');
const { protect } = require('../MiddleWare/auth');

// Get All Booking Details By User ID
router.get('/user-appointment/:id', protect, asyncHandler( async (req,res) => {
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`)
    };

    let query = { userId : id, isConsulted : false }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    }
}))

// Get All Booking Details, but not consulted
router.get('/appointment', protect, asyncHandler(async (req,res) => {
    let query = { isConsulted: false }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    }
}))

// Get All Booking Details By Date, but not Consulted
router.get('/report-not/:date', protect, asyncHandler(async (req,res) => {
    let query = {isConsulted: false, date: dompurify.sanitize(req.params.date?.toString()) }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));
    }
}))

// Get All Booking Details By Date, but Consulted
router.get('/report/:date', protect, asyncHandler(async (req,res)=>{
    let query = { isConsulted:true, date: dompurify.sanitize(req.params.date?.toString()) }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+ JSON.stringify(err,undefined,2));
    }
}))

// Get All Appointment Feedbacks
router.get('/feed-appointment', protect, asyncHandler(async (req,res) => {
    let query = { isConsulted: true }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+ JSON.stringify(err,undefined,2));
    }
}))

// Not Used
// Get All Booking Details By Doctor Name
router.get('/all-appointment/:name', protect, asyncHandler(async (req,res) => {
    let query = { doctor: dompurify.sanitize(req.params.name.toString()) }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+ JSON.stringify(err,undefined,2));
    }
}))

// Get All Booking History By Doctor Name, but not consulted
router.get('/appointment/:name', protect, asyncHandler(async (req,res) => {
    let query = { isConsulted:false, doctor: dompurify.sanitize(req.params.name.toString()) }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+ JSON.stringify(err,undefined,2));
    }
}))

// Get Treatment History of Patient (Doctor) 
router.get('/doctor-treatment/:name', protect, asyncHandler(async (req,res)=>{
    let query = { isConsulted:true, doctor: dompurify.sanitize(req.params.name.toString()) }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+ JSON.stringify(err,undefined,2));
    }
}))

// Get Appointment By Booking ID
router.get('/appointment/:id', protect, asyncHandler(async (req,res) => {
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`)
    };
    
    try {
        const doc = await Appointment.findById(id);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+ JSON.stringify(err,undefined,2));
    }
}))

// Not Used
// Retrieve Time Details
router.post('/appointment-time', protect, asyncHandler(async (req,res)=>{
    const {doctor, date, category} = req.body;
    let query = {doctor: dompurify.sanitize(doctor.toString()), category: dompurify.sanitize(category.toString()), date: dompurify.sanitize(date?.toString()) }
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+ JSON.stringify(err,undefined,2));
    }
}))

// Updating Prescription and Treatment (Doctor)
router.put('/doctor-prescription/:id', protect, asyncHandler(async (req,res) => {
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`)
    };

    const {prescription, treatment} = req.body;

    const Prescription = {
        prescription : dompurify.sanitize(prescription?.toString()),
        treatment: dompurify.sanitize(treatment?.toString()),
        isConsulted : true,
    }

  try {
    const doc = await Appointment.findByIdAndUpdate(id, {$set : Prescription}, {new:true});
    return res.send(doc);
  } catch (err) {
    console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
  }
}))

// Updating Feedback (Patient)
router.put('/app-feedback/:id', protect, asyncHandler(async (req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }

    const { feed } = req.body;
    // Sanitize user input to prevent XSS

    const feedback = { feed : dompurify.sanitize(feed?.toString()) }

    try {
        const doc = await Appointment.findByIdAndUpdate(id, {$set : feedback}, {new:true});
        return res.send(doc);
    } catch (err) {
        console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    }
}))

//  Update Appointment (Patient)
router.put('/appointment/:id', protect, asyncHandler(async (req,res)=>{
    const id = req.params.id.toString()
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }
    
    const { name, email, address, phone, doctor, date, time, category } = req.body;

    const app = {
        name : dompurify.sanitize(name?.toString()),
        email: dompurify.sanitize(email?.toString()),
        address: dompurify.sanitize(address?.toString()),
        phone: dompurify.sanitize(phone?.toString()),
        doctor: dompurify.sanitize(doctor?.toString()),
        date: dompurify.sanitize(date?.toString()),
        time: dompurify.sanitize(time?.toString()),
        category: dompurify.sanitize(category?.toString()),
    }

    try {
        const doc = await Appointment.findByIdAndUpdate(id, {$set : app}, {new:true});
        return res.send(doc);
    } catch (err) {
        console.log("Error in Updating Appointment :" +JSON.stringify(err,undefined,2));
    }
}))

// Delete Appointment (Patient)
router.delete('/appointment/:id', protect, asyncHandler(async (req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }

    try {
        const doc = await Appointment.findByIdAndDelete(id);
        return res.send(doc);
    } catch (err) {
        console.log("Error in Deleting Appointment :" +JSON.stringify(err,undefined,2));
    }
}))

// Get Patient Treatment History By User ID
router.get('/user-treatment/:id', protect, asyncHandler(async (req,res)=>{
    const id = req.params.id.toString();
    if(!isValidObjectId(id)) {
        res.set('Content-Type', 'text/plain');
        return res.status(400).send(`No Record with given id : ${id}`);
    }

    let query = { userId: id, isConsulted: true };
    try {
        const doc = await Appointment.find(query);
        return res.send(doc)
    } catch (err) {
        console.log('Error in Retrieving Appointment :'+JSON.stringify(err,undefined,2));

    }
}))

// Book an Appointment
router.post('/appointment', protect, asyncHandler(async (req,res) => {
    const { name ,email , address, phone, doctor, date, time, category, userId, feed, isConsulted, prescription, treatment } = req.body;
    let query = { doctor: dompurify.sanitize(doctor?.toString()), category: dompurify.sanitize(category?.toString()), date: dompurify.sanitize(date?.toString()), time: dompurify.sanitize(time?.toString())}

    Appointment.findOne(query).then((appointment)=>{
        if(appointment)
            return res.status(400).json({msg : 'Appointment does exists'});

        if(userId || feed || name || email || address || date || phone || doctor || time || isConsulted || prescription || treatment){
            const newAppointment= new Appointment({
                userId: dompurify.sanitize(userId?.toString()),
                feed: dompurify.sanitize(feed?.toString()),
                name: dompurify.sanitize(name?.toString()),
                email: dompurify.sanitize(email?.toString()),
                address: dompurify.sanitize(address?.toString()),
                date: dompurify.sanitize(date?.toString()),
                phone: dompurify.sanitize(phone?.toString()),
                doctor: dompurify.sanitize(doctor?.toString()),
                time: dompurify.sanitize(time?.toString()),
                category: dompurify.sanitize(category?.toString()),
                isConsulted,
                prescription: dompurify.sanitize(prescription?.toString()),
                treatment: dompurify.sanitize(treatment?.toString()),
            });
    
            newAppointment.save();
            
            return res.status(200).json({msg : 'Appointment has been Booked'});
        }else{
            return res.status(400).json({msg : 'Please Provide Some Essential Details'});
        }
        }
    ).catch(e => console.log(e))
}))

module.exports = router;