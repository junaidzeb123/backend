import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import AllChatsBox from '../components/AllChatsBox';
function AllChats() {
 
    // const backendLink = 'http://localhost:3001';
   
    // const navigate = useNavigate();


    // const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // const s = localStorage.getItem('tokens');
    // let token = "";
    // const  onclick   = async(event) =>{
    //     const clickedDivId = (event.target ).id;
    //     navigate(`/message`, { state: { id: clickedDivId } }); // Pass id via state
          
    // }
    // if (s) {
    //     try {
    //         // Try parsing only if 's' is a valid JSON string
    //         const parsedToken = JSON.parse(s);
    //         if (parsedToken && parsedToken.data.accessToken) {
    //             token = parsedToken.data.accessToken;
    //         }
    //     } catch (e) {
    //         console.error('Error parsing token:', e);
    //     }
    // }    useEffect(() => {
    //     const fetchUsers = async () => {
    //         try {
    //             const response = await axios.get(`${backendLink}/user/chatUsers`, {
    //                 headers: {
    //                   Authorization: `Bearer ${token}`
    //                 }
    //               });
    //             console.log(response.data);
                
    //             setUsers(response.data);
    //             setLoading(false);
    //         } catch (err) {
    //             // setError(err);
    //             setLoading(false);
    //         }
    //     };

    //     fetchUsers();
    // }, []);

    
    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    // const handleAllUsersClick = () => {
    //     navigate("/allusers"); // Navigate to the /allusers route when button is clicked
    //   };
    return (
    
        <div  className="border-black border-9">
            <div className=" bg-blue-100 ">
                <AllChatsBox/>
            </div>

        </div>
    );
}

export default AllChats;
