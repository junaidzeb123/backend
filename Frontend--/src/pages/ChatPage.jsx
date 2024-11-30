import React, { useContext, useEffect, useState } from 'react';
import Message from '../components/Message';
import { useLocation } from 'react-router-dom';
import { useGetChatMessages } from '../apis/chat/UseGetChatMessages';
import { AuthContext } from '../Context/AuthProvider';
import LoadingComponents from '../components/LoadingComponent';
import { useSendMessage } from "../apis/chat/UseSendMessage";
import { io } from 'socket.io-client'

const URL = "http://localhost:3001";
var socket;

function ChatPage() {



    const { user, accessToken } = useContext(AuthContext);
    const location = useLocation();
    const { chatId, user: username, pic } = location.state || {};
    const [message, setMessage] = useState("");
    const [preMessages, setPreMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSocketConnected, setIsSocketConnected] = useState(false);


    useEffect(() => {
        if (chatId && accessToken !== 'loading') {
            try {
                (async () => {
                    const res = await useGetChatMessages(accessToken, chatId);
                    setPreMessages(res);
                })();
                setIsLoading(false);
            } catch (error) {
                alert(error.response.message.data);
            }
        }
    }, [accessToken, chatId]);

    useEffect(() => {
        socket?.on("receive_message", (msg) => {
            try {
                console.log("message receiving now ");
                setPreMessages([...preMessages, msg])
                console.log("messages ", preMessages);
                console.log("messgea recived", msg);
            } catch (error) {
                console.log(error);

            }
        }
        );
    })




    useEffect(() => {

        socket = io(URL);
        socket.emit("setup", user);
        socket.on("connected", () => {
            setIsSocketConnected(true);
            console.log("I go connected");

        })
    }, [user])





    const sendMessageHandler = async (event) => {
        event.preventDefault();
        try {
            if (!message || message == "" || !isSocketConnected) return;
            const res = await useSendMessage(accessToken, chatId, message);
            socket.emit("new_message", { chat: res, message, sender: user.id });
            setPreMessages([...preMessages , {text : message , sender : user.id}])
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="bg-white shadow-lg px-6 py-4 flex items-center">
                <img src={'https://readymadeui.com/profile_2.webp'} className="w-14 h-14 rounded-full mr-4" alt="User" />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
                    <p className="text-sm text-gray-500">Online</p>
                </div>
            </div>

            <div className="flex-1 overflow-auto px-4 py-6 bg-gray-100">
                {isLoading ? (
                    <LoadingComponents />
                ) : (
                    preMessages.map((msg, index) => (
                        <Message key={index} message={msg.text} sender={msg.sender} />
                    ))
                )}
            </div>
            <form onSubmit={sendMessageHandler} className="bg-white p-4 shadow-xl flex items-center">
                <input
                    value={message}
                    onChange={(event) => { setMessage(event.target.value) }}
                    type="text"
                    placeholder="Enter your message"
                    className="flex-grow px-4 py-3 rounded-full bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="ml-4 px-6 py-2.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none shadow-xl"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default ChatPage;
