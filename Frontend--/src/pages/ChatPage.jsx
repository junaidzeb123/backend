import React, { useState } from 'react';
import SideBarChats from "../components/SideBarChats";
import ChattingArea from '../components/ChattingArea';
import ChatNavBar from '../components/ChatNavBar';


function ChatPage() {

    const [chatId, setchatId] = useState(null);
    const [username, setUserName] = useState(null);
    const [pic, setPic] = useState(null);

    return (
        <>
            <div className='w-full justify-center flex flex-row gap-4 h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6'>
              
                <div className={`hide-scrollbar w-[45%] md:w-[30%] bg-white rounded-2xl shadow-lg h-full `}>
                    <div className='h-full overflow-auto hide-scrollbar rounded-2xl shadow-lg'>
                        <SideBarChats
                            setchatId={setchatId}
                            
                            
                            setUserName={setUserName}
                            setPic={setPic} />

                    </div>
                </div>
                <ChattingArea
                    chatId={chatId}
                    username={username}
                    pic={pic} />
            </div>
        </>
    );
}

export default ChatPage;
