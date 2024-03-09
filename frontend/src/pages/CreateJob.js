import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const CreateJob = () => {
    const id = localStorage.getItem('userId')
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        salary: '',
        location: ''
    })

    const handleChange = (event) => {
        setInputs((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const {data} = await axios.post('/api/v1/job/create-job', {
                title: inputs.title,
                description: inputs.description,
                salary: inputs.salary,
                location: inputs.location,
                user: id,
            }) ;
            if(data?.success) {
                toast.success("Job Created")
                navigate("/my-jobs")
            }          
        } catch (error) {
            console.log(error);           
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box
                    width={"40%"}
                    border={3}
                    borderRadius={10}
                    padding={3}
                    margin="auto"
                    boxShadow={"10px 10px 20px #ccc"}
                    display="flex"
                    flexDirection={"column"}
                    marginTop="30px"
                    marginBottom="30px"
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
                        name="description" 
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
                    <Button type='submit' color='primary' variant='contained' sx={{ mt: 2,  borderRadius: "20px"}}>
                        SUBMIT
                    </Button>                    
                </Box>
            </form>       
        </div>
    )
}

export default CreateJob
