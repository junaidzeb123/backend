import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("loading");
    const [accessToken, setAccessToken] = useState("loading");
    const [refreshToken, setRefreshToken] = useState("loading");

    const login = (user, accessToken, refreshToken) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", JSON.stringify(accessToken));
        localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    const values = {
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        login,
        logout
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRefreshToken = localStorage.getItem("refreshToken");

        setUser(storedUser || "loading");
        setAccessToken(storedAccessToken || "loading");
        setRefreshToken(storedRefreshToken || "loading");
    }, []);


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );

};

