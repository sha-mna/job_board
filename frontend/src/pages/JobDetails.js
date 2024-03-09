import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Typography, TextField, InputLabel,  } from '@mui/material';
import toast from 'react-hot-toast';


const JobDetails = () => {
    const [job, setJob] = useState({})
    const [inputs, setInputs] = useState({})

    const id = useParams().id
    const navigate = useNavigate();


    const getJobDetail = async () => {
        try {
            const {data} = await axios.get(`/api/v1/job/get-job/${id}`)
            if(data?.success) {
                setInputs({
                    title: data?.job.title,
                    description: data?.job.description,
                    salary: data?.job.salary,
                    location: data?.job.location
                });
            }           
        } catch (error) {
            console.log(error);          
        }
    }

    useEffect(() => {
        getJobDetail()
    },[id])
    console.log(job);

    const handleChange = (event) => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const {data} = await axios.put(`/api/v1/job/update-job/${id}`, {
                title: inputs.title,
                description: inputs.description,
                salary: inputs.salary,
                location: inputs.location,
                user: id,
            }) ;
            if(data?.success) {
                toast.success("Job Updated")
                navigate("/my-jobs")
            }          
        } catch (error) {
            console.log(error);           
        }
    }
    console.log(job);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    width={"50%"}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin="auto"
                    boxShadow={"10px 10px 20px #ccc"}
                    display="flex"
                    flexDirection={"column"}
                    marginTop="30px"
                >
                    <Typography
                        variant='h2'
                        textAlign={"center"}
                        fontWeight="bold"
                        padding={3}
                        color="gray"
                    >
                        Create A Job
                    </Typography>
                    <InputLabel
                        sx={{mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold"}}
                    >
                        Title
                    </InputLabel>
                    <TextField 
                        name="title" 
                        value={inputs.title} 
                        onChange={handleChange} 
                        margin='normal' 
                        variant="outlined" 
                        required
                    />
                    <InputLabel
                        sx={{mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold"}}
                    >
                        Description
                    </InputLabel>
                    <TextField 
                        name="company" 
                        value={inputs.description} 
                        onChange={handleChange} 
                        margin='normal' 
                        variant="outlined" 
                        required
                    />
                    <InputLabel
                        sx={{mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold"}}
                    >
                        Salary
                    </InputLabel>
                    <TextField 
                        name="salary" 
                        value={inputs.salary} 
                        onChange={handleChange} 
                        margin='normal' 
                        variant="outlined" 
                        required
                    />
                    <InputLabel
                        sx={{mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold"}}
                    >
                        Location
                    </InputLabel>
                    <TextField 
                        name="location" 
                        value={inputs.location} 
                        onChange={handleChange} 
                        margin='normal' 
                        variant="outlined" 
                        required
                    />
                    <Button type='submit' color='warning' variant='contained' sx={{borderRadius: "20px", mt: 2}}>
                        UPDATE
                    </Button>                    
                </Box>
            </form>          
        </div>
    )
}

export default JobDetails
