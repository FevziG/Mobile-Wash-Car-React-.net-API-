import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registerPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function RegisterPage() {
    const navigate = useNavigate();

    // User form state
    const [userUsername, setUserUsername] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userLocation , setUserLocation] =useState('');
    // Worker form state
    const [workerUsername, setWorkerUsername] = useState('');
    const [workerPassword, setWorkerPassword] = useState('');
    const [workerEmail, setWorkerEmail] = useState('');
    const [workerLocation, setWorkerLocation] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [taxNumber, setTaxNumber] = useState('');

    const handleUserSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/CwUsers', {
                username: userUsername,
                passwordHash: userPassword,
                email: userEmail,
                Location : userLocation, 
                isActive: true
            });
            if (response.data.success) {
                alert("Kayıt Başarılı");
                navigate('/');
            } else {
                alert("Kayıt Başarılı");
                navigate('/');
            }
        } catch (error) {
            console.error('Error during user registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
    };

    const handleWorkerSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/CwWorkers', {
                username: workerUsername,
                passwordHash: workerPassword,
                phoneNumber,
                taxNumber,
                email: workerEmail,
                Location: workerLocation,
                isActive: true
            });
            if (response.data.success) {
                alert("Kayıt Başarılı");
                navigate('/');
            } else {
                alert("Kayıt Başarılı");
                navigate("/")
            }
        } catch (error) {
            console.error('Error during worker registration:', error);
            alert('An error occurred during registration. Please try again.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>REGISTER USER</h1>
                    <form onSubmit={handleUserSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                className="form-control"
                                type="text"
                                value={userUsername}
                                onChange={(e) => setUserUsername(e.target.value)}
                                required
                            />
                            <label className="form-label">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                required
                            />
                            <label className="form-label">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                required
                            />
                            <label className="form-label">Location</label>
                            <input
                                className="form-control"
                                type="text"
                                value={userLocation}
                                onChange={(e) => setUserLocation(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Register User</button>
                    </form>
                </div>
                <div className="col">
                    <h1>REGISTER WORKER</h1>
                    <form onSubmit={handleWorkerSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input
                                className="form-control"
                                type="text"
                                value={workerUsername}
                                onChange={(e) => setWorkerUsername(e.target.value)}
                                required
                            />
                            <label className="form-label">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                value={workerPassword}
                                onChange={(e) => setWorkerPassword(e.target.value)}
                                required
                            />
                            <label className="form-label">Phone Number</label>
                            <input
                                className="form-control"
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                            <label className="form-label">Tax Number</label>
                            <input
                                className="form-control"
                                type="text"
                                value={taxNumber}
                                onChange={(e) => setTaxNumber(e.target.value)}
                                required
                            />
                            <label className="form-label">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                value={workerEmail}
                                onChange={(e) => setWorkerEmail(e.target.value)}
                                required
                            />
                            <label className="form-label">Location</label>
                            <input
                                className="form-control"
                                type="text"
                                value={workerLocation}
                                onChange={(e) => setWorkerLocation(e.target.value)}
                                required
                            />
                        </div>
                        <button className="btn btn-primary" type="submit">Register Worker</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;