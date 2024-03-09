const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// router import
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

connectDB();

const app = express();

//  middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/job', jobRoutes);


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode port no ${PORT}.`.bgCyan.white);
})

// CLbxpLhqfojGmSH3 : jobboarduser
//   mongodb+srv://jobboarduser:<password>@job-board-api.h9ihzkc.mongodb.net/