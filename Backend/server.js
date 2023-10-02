const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express();

const connectDB = require('./src/Config/DB');
const routerURLs = require('./src/Route/route')
const authURLs = require('./src/Route/auth')
const AppointmentURLs = require('./src/Route/appointment')

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use('/',routerURLs);
app.use('/',authURLs);
app.use('/',AppointmentURLs);

app.listen('4000',(err)=>{
    if(err) console.log("Error ocuured in starting the server:", err)
    console.log("Server is up and running")
})
