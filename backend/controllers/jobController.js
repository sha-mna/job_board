const mongoose  = require('mongoose');
const jobModel = require('../models/jobModel');
const userModel = require('../models/userModel');

// get all jobs
exports.getAllJobsController = async (req, res) => {
    try {
        const jobs = await jobModel.find({}).populate("user");
        if(!jobs) {
            return res.status(200).send({
                success: false,
                message: "No Jobs Found",
            });
        }
        return res.status(200).send({
            success: true,
            JobCount: jobs.length,
            message: "All Jobs lists",
            jobs,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error while getting jobs",
            error,
        });
    }
}

// create job
exports.createJobController = async (req, res) => {
    try {
        const {title, description, salary, location, user} = req.body
        if(!title || !description || !salary || !location || !user ) {
            return res.status(400).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const exisitingUser = await userModel.findById(user)
        if(!exisitingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user"
            })
        }
        const newJob = new jobModel({title, description, salary, location, user})
        const session = await mongoose.startSession()

        session.startTransaction()
        await newJob.save({session})
        exisitingUser.jobs.push(newJob)
        await exisitingUser.save({session})
        await session.commitTransaction();
        await newJob.save();
        return res.status(201).send({
            success: true,
            message: "Job Created!",
            newJob,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while creating job",
            error
        })
        
    }
}

// update job
exports.updateJobController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, salary, location } = req.body;
        const job = await jobModel.findByIdAndUpdate(
            id,
            { ...req.body },
            { new: true }
        )
        return res.status(200).send({
            success: true,
            message: "Job Updated!",
            job,
        })       
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while updating job",
            error
        })        
    }
}

// single job 
exports.getJobByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobModel.findById(id);
        if(!job) {
            return res.status(404).send({
                success: false,
                message: "Job not found with this id",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Fetch single job",
            job,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error while getting single job",
            error,
        })       
    }
}

// delete job
exports.deleteJobController = async (req, res) => {
    try {
        const job = await jobModel
        // .findOneAndDelete(req.params.id)
        .findByIdAndDelete(req.params.id)
        .populate("user");
        await job.user.jobs.pull(job);
        await job.user.save();
        return res.status(200).send({
            success: true,
            message: "Job Deleted!",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success: false,
            message: "Error while deleting job",
            error,
        })       
    }
}

// Get User Job
exports.userJobController = async (req, res) => {
    try {
        const userJob = await userModel.findById(req.params.id).populate("jobs");
        if(!userJob) {
            return res.status(404).send({
                success: false,
                message: "Jobs not found with this id",
            });
        }
        return res.status(200).send({
            success: true,
            message: "User Jobs",
            userJob,
        });
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success: false,
            message: "Error in user job",
            error
        })       
    }
}
 
// delete job
// exports.deleteJobController = async (req, res) => {
//     try {
//         const job = await jobModel.findOneAndDelete(req.params.id).populate("user");
//         if (!job) {
//             return res.status(404).send({
//                 success: false,
//                 message: "Job not found"
//             });
//         }
//         job.user.jobs.pull(job);
//         await job.user.save();
//         return res.status(200).send({
//             success: true,
//             message: "Job Deleted!"
//         })        
//     } catch (error) {
//         console.log(error)
//         if(error.name === "Cast Error" && error.kind === "ObjectId") {
//             return res.status(400).send({
//                 success: false,
//                 message: "Invalid Job ID format",
//                 error
//             })     
//         } else {
//             return res.status(500).send({
//                 success: false,
//                 message: "error while deleting job",
//                 error
//             })
//         }         
//     }
// }

