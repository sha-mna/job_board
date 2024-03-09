const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    salary: {
        type: String,
        required: [true, 'Salary is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required']
    }

}, {timestamps: true})

const jobModel = mongoose.model('Job', jobSchema)

module.exports = jobModel;