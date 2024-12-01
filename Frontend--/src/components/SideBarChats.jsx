import React, { useContext, useEffect, useState } from 'react'
import OneChat from './OneUser'
import { useNavigate } from 'react-router-dom';
import { useMyChats } from '../apis/user/UseMyChats';
import { AuthContext } from '../Context/AuthProvider';
import LoadingComponents from './LoadingComponent';

function SideBarChats({ setchatId, setUserName, setPic }) {

    const { accessToken } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);


    useEffect(() => {
        useMyChats(accessToken)
            .then((resData) => {
                setIsLoading(false);
                console.log(resData);
                setData(resData);
            })
            .catch((err) => {
                console.log(err, accessToken);
                setIsLoading(false);
            });


    }, [accessToken]);

    const onClickHandler = (chatid, username, pic) => {
        console.log("clicked->", chatid, username, pic);
        setchatId(null);
        setUserName(null);
        setPic(null);
        setchatId(chatid);
        setUserName(username)
        setPic(pic)
    }


    const navigate = useNavigate();
    return (
        <div
            className="hide-scrollbar bg-white px-6 py-8 w-full max-w-2xl rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <div className="flex ">
                <h2 className="text-xl font-bold flex-1 text-gray-800">My Chats</h2>
                <button onClick={() => navigate("/allusers")}
                    className='bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold rounded-md px-5 py-4'>New Chat
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[8px] fill-current ml-2"
                        viewBox="0 0 492.004 492.004">
                        <path
                            d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z"
                            data-original="#000000" />
                    </svg>
                </button>

            </div>
            <div className="flex flex-wrap items-center gap-4">
            </div>


            {isLoading ? <LoadingComponents /> :
                <div className="hide-scrollbar  mt-8 space-y-4 hide-scrollbar">
                    {data.map((element) =>
                        <div onClick={() => {
                            onClickHandler(
                                element.id,
                                element.isGroupChat ? element.chatName : element.userName,
                                element.pic)
                        }
                        }

                        >
                            <OneChat
                                key={element.id}
                                name={element.isGroupChat ? element.chatName : element.userName}
                                pic={element.pic}
                                latestMessage={element.latestMessageText}
                                sideBar={true}

                            />
                        </div>
                    )}

                </div>
            }
        </div>

    )
}

export default SideBarChats;
