// src/Router.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ChatUsers from './pages/AllChats';
import Login from './pages/Login';
import UserList from './pages/allUsers';
import MessagesPage from './pages/ShowMessage';
import HomePage from './pages/Home';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/chatUser" element={<ChatUsers />} />
                <Route path="/login" element={<Login />} />
                <Route path="/allusers" element={<UserList />} />
                <Route path="/message" element={<MessagesPage  />} />
                </Routes>
        </Router>
    );
};

export default AppRouter;
