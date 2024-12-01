import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/AllUsers.jsx';
import HomePage from './pages/Home.jsx';
import PrivateComponent from "./Context/PrivateComponent.jsx"
import { AuthProvider } from './Context/AuthProvider.jsx';
import Register from './pages/Register.jsx';
import ChatPage from './pages/ChatPage.jsx';

const AppRouter = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />



                    <Route path="/allusers" element={<PrivateComponent element={UserList} />} />
                    <Route path="/chat" element={<PrivateComponent element={ChatPage} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default AppRouter;
