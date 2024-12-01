import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AllUsers from './pages/AllUsers';
import HomePage from './pages/Home';
import PrivateComponent from "./Context/PrivateComponent"
import { AuthProvider } from './Context/AuthProvider';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';

const AppRouter = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />



                    <Route path="/allusers" element={<PrivateComponent element={AllUsers} />} />
                    <Route path="/chat" element={<PrivateComponent element={ChatPage} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;
