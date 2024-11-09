import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
function ChatUsers() {
 
    const backendLink = 'http://localhost:3001';
    interface UserExport {
        email: string,
        chatName: string,
        pic: string,
        _id: string,
    }
    const navigate = useNavigate();


    const [users, setUsers] = useState<UserExport[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const s = localStorage.getItem('tokens');
    let token = "";
    const  onclick   = async(event : React.MouseEvent<HTMLDivElement>) =>{
        const clickedDivId = (event.target as HTMLDivElement).id;
        navigate(`/message`, { state: { id: clickedDivId } }); // Pass id via state
          
    }
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
    }    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${backendLink}/user/chatUsers`, {
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
                  });
                console.log(response.data);
                
                setUsers(response.data);
                setLoading(false);
            } catch (err) {
                // setError(err);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const handleAllUsersClick = () => {
        navigate("/allusers"); // Navigate to the /allusers route when button is clicked
      };
    return (
    
        <div className="container mt-4" >
            <button className='btn btn-primary' onClick={handleAllUsersClick}>All User</button>
            <h2 className="mb-4">Chat Users</h2>
            <div className="row">
                {users.map((user, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card" id = {user._id}  onClick={onclick}>
                            <img src={user.pic} className="card-img-top"  id = {user._id} alt={`${user.chatName} avatar`} />
                            <div className="card-body" id = {user._id}>
                                <h5 className="card-title" id = {user._id}>{user.chatName}</h5>
                                <p className="card-text" id = {user._id}>{user.email}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatUsers;
