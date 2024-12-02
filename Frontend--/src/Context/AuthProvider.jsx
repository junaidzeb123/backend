import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState("loading");
    const [accessToken, setAccessToken] = useState("loading");
    const [refreshToken, setRefreshToken] = useState("loading");
    const [notification, setNotification] = useState(false)
    const [pic, setpic] = useState("loading")

    const login = (user, accessToken, refreshToken ,pic) => {
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setUser({ 'user': user });
        setpic({ 'pic': pic });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("pic", pic);

    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        setpic(null);
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("pic");
    };

    const values = {
        pic,
        setpic,
        user,
        setUser,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        login,
        logout,
        notification,
        setNotification
    };

    useEffect(() => {
        ; (async () => {
            const storedUser = await JSON.parse(localStorage.getItem("user"));
            const storedAccessToken = localStorage.getItem("accessToken");
            const storedRefreshToken = localStorage.getItem("refreshToken");
            const storedPic = localStorage.getItem("pic");

            setUser(storedUser);
            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);
            setpic(storedPic);
        })()

    }, []);


    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    );

};

