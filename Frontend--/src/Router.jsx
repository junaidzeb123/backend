// src/Router.tsx
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router';
// import ChatUsers from "";
import Login from './pages/Login';
import UserList from './pages/allUsers';
import MessagesPage from './pages/ShowMessage';
import HomePage from './pages/Home';

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/chatUser" element={<ChatUsers />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/allusers" element={<UserList />} />
            <Route path="/message" element={<MessagesPage />} />
        </Routes>

    );
};

export default AppRouter;
