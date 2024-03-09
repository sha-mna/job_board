import * as React from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { Avatar, Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function JobCard({ title, description, salary, location, username, time, id, isUser }) {
	const navigate = useNavigate()

	const handleEdit = () => {
		navigate(`/job-details/${id}`)
	}

	const handleDelete = async () => {
		try {
			const {data} = await axios.delete(`/api/v1/job/delete-job/${id}`)
			if (data?.success) {
				toast.success("Job Deleted");
				window.location.reload();
			}
			
		} catch (error) {
			console.log(error);			
		}
	}

  return (
    <Card 
        sx={{ 
            width: '40%', 
            margin: 'auto', 
            mt:2, 
            padding:2, 
            boxShadow: '5px 5px 10px #ccc',
            ":hover:": {
                boxShadow: "10px 10px 20px #ccc",
            },
        }}
    >
		{isUser && (
			<Box display={"flex"}>
				<IconButton onClick={handleEdit} sx={{marginLeft: "auto"}}>
					<ModeEditIcon color="info" />
				</IconButton>
				<IconButton onClick={handleDelete}>
					<DeleteIcon color="error" />
				</IconButton>
			</Box>
		)}
      	<CardHeader
			avatar={
				<Avatar sx={{ bgcolor: red[500] }} ></Avatar>
			}
			title={username}
			subheader={time}
      	/>
		<CardContent >
			<Typography sx={{ mb: 1 }} color="#20279d"  variant='h5' fontWeight={"bold"}>
				{title}
			</Typography>
			<Typography sx={{ mb: 1 }} variant="subtitle2" fontWeight={700} >
				{description}
			</Typography>
			<Typography  sx={{ mb: 1 }} fontWeight={500}>
				{salary}
			</Typography>
			<Typography  sx={{ mb: 1 }} fontWeight={500}>
				{location}
			</Typography>
		</CardContent>
    </Card>
  );
}