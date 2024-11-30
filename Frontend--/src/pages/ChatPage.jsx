import React, { useContext, useEffect, useState } from 'react';
import Message from '../components/Message';
import { useLocation } from 'react-router-dom';
import { useGetChatMessages } from '../apis/chat/UseGetChatMessages';
import { AuthContext } from '../Context/AuthProvider';
import LoadingComponents from '../components/LoadingComponent';
import { useSendMessage } from "../apis/chat/UseSendMessage";
import { io } from 'socket.io-client';
import AllChats from './AllChats';

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
                setPreMessages([...preMessages, msg]);
            } catch (error) {
                console.log(error);
            }
        });
    }, [preMessages]);

    useEffect(() => {
        socket = io(URL);
        socket.emit("setup", user);
        socket.on("connected", () => {
            setIsSocketConnected(true);
        });
    }, [user]);

    const sendMessageHandler = async (event) => {
        event.preventDefault();
        try {
            if (!message || !isSocketConnected) return;
            const res = await useSendMessage(accessToken, chatId, message);
            socket.emit("new_message", { chat: res, message, sender: user.id });
            setPreMessages([...preMessages, { text: message, sender: user.id }]);
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='w-full flex flex-row gap-4 h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6'>
            {/* Sidebar with all chats */}
            <div className='hide-scrollbar w-1/3 bg-white rounded-2xl shadow-lg  h-full'>
                <div className='h-full overflow-auto hide-scrollbar rounded-2xl shadow-lg'>
                    <AllChats />
                </div>
            </div>

            <div className="w-2/3 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-white p-6 flex items-center border-b-2 border-gray-200">
                    <img src={pic || 'https://readymadeui.com/profile_2.webp'} className="w-14 h-14 rounded-full mr-4 shadow-md" alt="User" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
                        <p className="text-sm text-gray-500">Online</p>
                    </div>
                </div>

                <div className="hide-scrollbar flex-1 overflow-auto px-6 py-4 bg-gray-100 space-y-4">
                    {isLoading ? (
                        <LoadingComponents />
                    ) : (
                        preMessages.map((msg, index) => (
                            <Message key={index} message={msg.text} sender={msg.sender} isUser={msg.sender === user.id} />
                        ))
                    )}
                </div>


                <form onSubmit={sendMessageHandler} className="bg-white p-4 border-t-2 border-gray-200 flex items-center">
                    <input
                        value={message}
                        onChange={(event) => { setMessage(event.target.value); }}
                        type="text"
                        placeholder="Type a message..."
                        className="flex-grow px-4 py-3 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="ml-4 px-6 py-3 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none shadow-lg transition-all duration-300"
                    >
                        Send
                    </button>
                </form>
            </div>

            
        </div>
    );
}

export default ChatPage;
