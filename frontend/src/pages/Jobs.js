import React, { useState, useEffect } from 'react';
import axios from 'axios'
import JobCard from '../components/JobCard';

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    
    const getAllJobs = async () => {
        try {
            const {data} = await axios.get('/api/v1/job/all-job');
            if(data?.success) {
                setJobs(data?.jobs);
            }          
        } catch (error) {
            console.log(error);           
        }
    }

    useEffect(()=> {
        getAllJobs();
    },[]);

    return (
        <div>
            {jobs && jobs.map((job) => 
                <JobCard 
                    id={job?._id}
                    isUser={localStorage.getItem("userId") === job?.user?.id}
                    title={job?.title}
                    description={job?.description}
                    salary={job?.salary}
                    location={job?.location}
                    username={job?.user?.username}
                    time={job.createdAt}
                />
            )}
        </div>
    )
}

export default Jobs
