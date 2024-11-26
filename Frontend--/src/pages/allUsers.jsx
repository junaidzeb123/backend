// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

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


    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/user/allUser', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);


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
        <Container>
            <Row className="mt-4">
                {users.map((user, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card id={user.userName} onClick={cardHandler}>
                            <Card.Img id={user.userName} variant="top" src={user.pic || 'https://via.placeholder.com/150'} />
                            <Card.Body id={user.userName}>
                                <Card.Title id={user.userName}>{user.userName}</Card.Title>
                                <Card.Text id={user.userName}>{user.email}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default UserList;
