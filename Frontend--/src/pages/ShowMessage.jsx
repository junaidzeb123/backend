import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation for state


const MessagesPage = () => {
  const backendLink = 'http://localhost:3001';
  const location = useLocation();
  const { id } = location.state ; // Extract the id from the state
  const [messages, setMessages] = useState([]);
  const [myMessage, setMyMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let token = "";
  const MessageHandler = async (event) => {
    event.preventDefault();
    const target = event.target ;
    setMyMessage(target.value);
  }
  const sendMessage = async (event) => {
    event.preventDefault();
    if (!myMessage) {
      return;
    }
    try {
      const s = localStorage.getItem('tokens');
    
      const parsedToken = JSON.parse(s);
      if (parsedToken && parsedToken.data.accessToken) {
        token = parsedToken.data.accessToken;
      }
      console.log(token , id);
      const response = await axios.post(
        `${backendLink}/user/sendMessage?chatId=${id}`,
        { text: myMessage },  // This is the body of the request
        { headers: {           // This is the configuration object where headers are specified
          Authorization: `Bearer ${token}`
        }}
      );
      console.log(response);
      setMyMessage("");
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchMessages = async () => {
    try {
      const url = `${backendLink}/user/messages?chatId=${id}`;
      const s = localStorage.getItem('tokens');
    
      const parsedToken = JSON.parse(s );
      if (parsedToken && parsedToken.data.accessToken) {
        token = parsedToken.data.accessToken;
      }


      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessages(response.data.messages);
      console.log("response =", response.data);
      console.log(id, url);


      setLoading(false);
    } catch (err) {
      setError("Failed to fetch messages");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    console.log("message = ", messages);
    console.log(" = ", id);

  }, [id]);

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Messages</h2>
      <div className="row">
        {messages.length === 0 ? (
          <div>No messages found</div>
        ) : (
          messages.map((message) => (
            <div className="col-md-4 mb-4" key={message._id}>
              <div className="card">
                <div className="card-body">
                  {/* <h5 className="card-title">Chat ID: {message.chat}</h5> */}
                  {/* <p className="card-text">Sender: {message.sender}</p> */}
                  <p className="card-text">{message.text}</p>
                  {/* <p className="card-text">Created At: {new Date(message.createdAt).toLocaleString()}</p> */}
                  {/* <p className="card-text">Updated At: {new Date(message.updatedAt).toLocaleString()}</p> */}
                </div>
              </div>
            </div>
          ))
        )}

      </div>
      <div className="container">
        <form onSubmit={sendMessage}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              onChange={MessageHandler}
              placeholder="Type your message here"
              value={myMessage}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessagesPage;
