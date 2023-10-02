const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.tg3da.mongodb.net/${process.env.DB_NAME}`, {
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