require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000']
};

const connectDB = require('./src/Config/DB');
const routerURLs = require('./src/Route/route')
const authURLs = require('./src/Route/auth')
const AppointmentURLs = require('./src/Route/appointment')

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions));
app.use(mongoSanitize());
app.use(xss());

app.use('/',routerURLs);
app.use('/',authURLs);
app.use('/',AppointmentURLs);

const port = process.env.PORT || 5000;

app.listen(port, (err)=>{
    if(err) console.log("Error ocuured in starting the server:", err)
    console.log(`HMS Server is listening on port ${port}`)
})
