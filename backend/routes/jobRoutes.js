const express = require('express')
const { getAllJobsController, createJobController, updateJobController, getJobByIdController, deleteJobController, userJobController } = require('../controllers/jobController')

// router 
const router = express.Router()

// routes
// GET || all jobs
router.get('/all-job', getAllJobsController)

// POST || create job
router.post('/create-job', createJobController)

// PUT || update job
router.put('/update-job/:id', updateJobController)

// GET || single job details
router.get('/get-job/:id', getJobByIdController)

// DELETE || delete job
router.delete('/delete-job/:id', deleteJobController)

// GET || user job
router.get('/user-job/:id', userJobController)

module.exports = router