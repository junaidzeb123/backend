import React, { useContext, useEffect, useRef, useState } from 'react'
import LoadingComponents from './LoadingComponent';
import Message from './Message';
import { io } from 'socket.io-client';
import { useGetChatMessages } from '../apis/chat/UseGetChatMessages';
import { AuthContext } from '../Context/AuthProvider';
import { useSendMessage } from "../apis/chat/UseSendMessage"
import { flushSync } from 'react-dom';

const URL = "http://localhost:3001";
var socket;

function ChattingArea({ chatId, username, pic }) {

    const { user, accessToken } = useContext(AuthContext);
    const [message, setMessage] = useState("");
    const [preMessages, setPreMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const messagesEndRef = useRef(null);

    const [typing, setTyping] = useState(false);
    const [istyping, setisTyping] = useState(false);

    const[res , setRes] = useState(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const fetchMessages = async () => {
            if (chatId && accessToken !== 'loading') {
                try {
                    const res = await useGetChatMessages(accessToken, chatId);
                    setPreMessages(res);
                    setIsLoading(false);
                    scrollToBottom();
                } catch (error) {
                    alert(error.response.message.data);
                }
            }
        };

        fetchMessages();
    }, [accessToken, chatId]);

    useEffect(() => {
        if (socket && isSocketConnected) {
            socket.on("receive_message", (msg) => {
                setPreMessages((prevMessages) => [...prevMessages, msg]);
            });

            socket.on("typing", () => {
                setisTyping(true)
            })
            socket.on("typingStop", () => {
                setisTyping(false)
            })
        }



    }, [isSocketConnected]);

    useEffect(() => {
        socket = io(URL);
        socket.emit("setup", user);
        socket.on("connected", () => {
            setIsSocketConnected(true);
        });

        return () => {
            socket.disconnect(); // Clean up socket connection on component unmount
        };
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [preMessages]);

    const sendMessageHandler = async (event) => {
        event.preventDefault();
        if (!message || !isSocketConnected) return;

        try {
            const res = await useSendMessage(accessToken, chatId, message);
            setRes(res)
            socket.emit("new_message", { chat: res, message, sender: user.id });
            setPreMessages((preMessages) => [...preMessages, { text: message, sender: user.id }]);
            setMessage("");
            setTyping(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-2/3 flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-white p-6 flex items-center border-b-2 border-gray-200">
                <img src={pic || 'https://readymadeui.com/profile_2.webp'} className="w-14 h-14 rounded-full mr-4 shadow-md" alt="User" />
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{username}</h2>
                    <p className="text-sm text-green-700">{istyping ? "typing..." : "online"}</p>
                </div>
            </div>

            <div className="hide-scrollbar flex-1 overflow-auto px-6 py-4 bg-gray-100 space-y-4">
                {isLoading ? (
                    <LoadingComponents />
                ) : (
                    <>
                        {preMessages.map((msg, index) => (
                            <Message key={index} message={msg.text} sender={msg.sender} isUser={msg.sender === user.id} />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            <form onSubmit={sendMessageHandler} className="bg-white p-4 border-t-2 border-gray-200 flex items-center">
                <input
                    value={message}
                    onChange={(event) => {
                        setMessage(event.target.value);
                        setTyping(true),                        
                            socket.emit("typing", { chat: res, sender: user.id });
                        setTimeout(() => {
                            setTyping(false)
                            socket.emit("typingStop", { chat: res, sender: user.id });
                        }, 2000);
                    }}
                    type="text"
                    placeholder="Type a message..."
                    className="flex-grow px-4 py-3 rounded-full bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    onSubmit={sendMessageHandler}
                    className="ml-4 px-6 py-3 rounded-full text-white bg-blue-500 hover:bg-blue-600 focus:outline-none shadow-lg transition-all duration-300"
                >
                    Send
                </button>
            </form>
        </div>
    )
}

export default ChattingArea;
