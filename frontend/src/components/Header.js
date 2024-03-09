import React, {useState} from 'react'
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Header = () => {
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem("userId");
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState()

    const handleLogout = () => {
        try {
            dispatch(authActions.logout())
            toast.success("Logout Successfully")
            navigate("/login")
            localStorage.clear()
        } catch (error) {
            console.log(error);           
        }
    }

    return (
        <div>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant='h4'>
                        JOB BOARD
                    </Typography>
                    {isLogin && (
                        <Box display={'flex'} marginLeft="auto" marginRight={'auto'}>
                            <Tabs textColor='inherit' value={value} onChange={(e, val) => setValue(val)} >
                                <Tab label="Jobs" LinkComponent={Link} to="/jobs" />
                                <Tab label="My Jobs" LinkComponent={Link} to="/my-jobs" />
                                <Tab label="Create Job" LinkComponent={Link} to="/create-job" />
                            </Tabs>
                        </Box>
                    )}
                    <Box display={'flex'} marginLeft="auto">
                        { !isLogin && (
                            <div>
                                <Button sx={{margin: 1, color: 'white'}} LinkComponent={Link} to="/login">Login</Button>
                                <Button sx={{margin: 1, color: 'white'}} LinkComponent={Link} to="/register">Register</Button>
                            </div>
                        )}
                    </Box>
                    {isLogin && (
                        <Button onClick={handleLogout} sx={{margin: 1, color: 'white'}}>Logout</Button>
                    )}
                </Toolbar>              
            </AppBar>
        </div>
    )
}

export default Header
