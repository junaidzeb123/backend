import React, { useContext } from 'react'
import { useCreateChat } from '../apis/chat/UseCreateChat';
import { AuthContext } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function OneChat({ name, pic, latestMessage, isAllUsersPage, onClick, sideBar = false }) {


    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    const { accessToken } = useContext(AuthContext);

    const onClickHanlder = async () => {

        try {
            const res = await useCreateChat(accessToken, name);
            navigate('/chat', {
                state: {
                    chatId: res.chatId,
                    user: name,
                    pic: pic,
                },
            });

        } catch (error) {
            alert(error.response.data.message);
        }
    }
    return (
        <div onClick={!sideBar ? onClickHanlder : onClick}
            className="bg-blue-200 flex flex-wrap items-center cursor-pointer shadow-[0_2px_6px_-1px_rgba(0,0,0,0.3)] rounded-lg w-full p-4">
            <img src={pic ? pic : 'https://readymadeui.com/profile_2.webp'} className="w-8 h-8 rounded-full" />
            <div className="ml-4 flex-1">
                <p className="text-sm text-gray-800 font-semibold">{name} {user.userName == name ? <span>(You)</span> : null}</p>
                {!isAllUsersPage ?
                    <p className="text-xs text-gray-500 mt-0.5">{latestMessage}</p> :
                    null
                }

            </div>
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-gray-500" viewBox="0 0 32 32">
                <path
                    d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zm0 10c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zm0-20c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3z"
                    data-original="#000000" />
            </svg> */}
        </div>

    )
}

export default OneChat;
