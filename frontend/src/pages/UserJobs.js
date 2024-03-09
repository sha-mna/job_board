import React, {useState, useEffect} from 'react';
import axios from 'axios'
import JobCard from '../components/JobCard';

const UserJobs = () => {
    const [jobs, setJobs] = useState([])

    const getUserJobs = async () => {
        try {
            const id = localStorage.getItem('userId')
            const {data} = await axios.get(`/api/v1/job/user-job/${id}`)
            if(data?.success) {
                setJobs(data?.userJob.jobs)
            }           
        } catch (error) {
            console.log(error);           
        }
    }

    useEffect(() => {
        getUserJobs();  
    }, []);
    

    return (
        <div>
            {jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                    <JobCard 
                        id={job._id}
                        isUser={true}
                        title={job.title}
                        description={job.description}
                        salary={job.salary}
                        location={job.location}
                        username={job.user.username}
                        time={job.createdAt}
                    />
                ))               
            ) : (
                <h1>You Haven't Created A Job</h1>
            )}       
        </div>
    )
}

export default UserJobs

