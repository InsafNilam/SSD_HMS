const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://DevX:DevX1234@cluster0.tg3da.mongodb.net/hms', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit();
    }
};

module.exports=connectDB;