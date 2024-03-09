import React from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import UserJobs from './pages/UserJobs';
import CreateJob from './pages/CreateJob';
import JobDetails from './pages/JobDetails';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

function App() {
	return (
		<div>
			<Header />
			<Toaster />
			<Routes>
				<Route path="/" element={<Jobs />} />
				<Route path="/jobs" element={<Jobs />} />
				<Route path="/my-jobs" element={<UserJobs />} />
				<Route path="/job-details/:id" element={<JobDetails />} />
				<Route path="/create-job" element={<CreateJob />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
			<Footer/>
		</div>
	);
}

export default App;
