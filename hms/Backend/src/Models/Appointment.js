const mongoose =require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    doctor:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    register_date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Appointment = mongoose.model('appointments',AppointmentSchema);