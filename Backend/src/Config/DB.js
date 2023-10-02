const mongoose = require('mongoose');

const connectDB = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const connectionString = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.tg3da.mongodb.net/${process.env.DB_NAME}`;
    
    try {
        mongoose.set('strictQuery', true);
        const conn = await mongoose.connect(connectionString, connectionParams);
        console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.db.databaseName}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports=connectDB;