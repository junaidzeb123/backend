// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AllChatsBox from '../components/AllChatsBox';

const UserList = () => {
   
    const [users, setUsers] = useState([]);
    const s = localStorage.getItem('tokens');
    let token = "";
    const navigate = useNavigate();
    if (s) {
        try {
            const parsedToken = JSON.parse(s);
            if (parsedToken && parsedToken.data.accessToken) {
                token = parsedToken.data.accessToken;
            }
        } catch (e) {
            console.error('Error parsing token:', e);
        }
    }


    // useEffect(() => {
    //     // Fetch users from the API
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3001/user/allUser', {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             });
    //             setUsers(response.data);
    //         } catch (error) {
    //             console.error('Error fetching users:', error);
    //         }
    //     };

    //     fetchUsers();
    // }, []);


    const cardHandler = async (event ) => {
        const s = localStorage.getItem('tokens');
        const id = (event.target ).id;
        // let token = "";
        if (s) {
            try {
                // Try parsing only if 's' is a valid JSON string
                const parsedToken = JSON.parse(s);
                if (parsedToken && parsedToken.data.accessToken) {
                    token = parsedToken.data.accessToken;
                }
            } catch (e) {
                console.error('Error parsing token:', e);
            }
        }
        console.log(id);

        const url = `http://localhost:3001/user/personalchat?user=${id}`;
        console.log(token);
        
        try {
            const res = await axios.post(
                url,
                { key: "value" }, // Data (body of the request)
                {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                }
              );
              
              navigate(`/message`, { state: { id: res.data.chatId } }); // Pass id via state



        } catch (error) {
            console.log(error);

        }
    }

    return (
       <div>
            <AllChatsBox/>

       </div>
    );
};

export default UserList;
