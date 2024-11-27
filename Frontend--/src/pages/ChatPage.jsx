import React, { useContext, useEffect, useState } from 'react'
import Message from '../components/Message'
import { useFetcher, useLocation, useSearchParams } from 'react-router-dom';
import { useGetChatMessages } from '../apis/chat/UseGetChatMessages';
import { AuthContext } from '../Context/AuthProvider';
import LoadingComponents from '../components/LoadingComponent';
import { useSendMessage } from "../apis/chat/UseSendMessage";

function ChatPage() {

    const { accessToken } = useContext(AuthContext);
    const location = useLocation();
    const { chatId, user, pic } = location.state || {};
    const [message, setMessage] = useState("");
    const [preMessages, setPreMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);



    console.log(chatId, user, pic);

    useEffect(() => {
        if (chatId && accessToken != 'loading') {
            try {
                ; (async () => {
                    const res = await useGetChatMessages(accessToken, chatId);
                    setPreMessages(res);
                    console.log("messages = ", res);

                })();
                setIsLoading(false);
            } catch (error) {
                alert(error.response.message.data);
            }
        }
    }, [accessToken, chatId]);

    const sendMessageHandler = async (event) => {
        event.preventDefault();
        try {
            const res = await useSendMessage(accessToken, chatId, message);
            console.log(res);
            setMessage("");
        } catch (error) {
            alert(error.response.message.data);
        }
    }

    return (

        <>
            <div className="min-h-screen bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] px-3
                            py-3 w-full  max-w-2xl rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
                <div className="flex flex-wrap items-center gap-4">

                    <div className="flex flex-col flex-wrap items-center cursor-pointer rounded-lg w-full p-4">
                        <img src='https://readymadeui.com/profile_2.webp' className="w-20 h-20 rounded-full" />
                        <p className="text-md text-gray-800 font-semibold">{user}</p>
                    </div>
                    {isLoading ? <LoadingComponents /> :
                        preMessages.map((msg) => {
                            return <Message id = {msg._id} message={msg.text} />
                        })
                    }

                </div>
                <form onSubmit={sendMessageHandler} className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl flex items-center px-5 py-3 bg-white">
                    <input
                        value={message}
                        onChange={(event) => { setMessage(event.target.value) }}
                        type="text"
                        placeholder="Enter your message"
                        className="flex-grow px-4 py-3 h-12 rounded-full bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="button"
                        className="ml-3 px-5 py-2.5 h-12 rounded-full text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none shadow-xl">
                        Send
                    </button>
                </form>

            </div>
        </>
    )
}

export default ChatPage;
