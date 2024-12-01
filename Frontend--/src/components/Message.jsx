import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';

function Message({ message, username, sender, pic }) {
    const { user } = useContext(AuthContext);

    return (
        <div className={`flex ${user.id == sender ? 'flex-row-reverse' : 'flex-row'} items-center w-full max-w-xl my-2`}>
            <div className="mr-3">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                    {/* {username ? username.charAt(0).toUpperCase() : ''} */}
                    {
                        pic && pic != "abc" ?
                            <img src={pic} className='w-8 h-8 rounded-full' /> :
                            null
                    }
                </div>
            </div>
            <div
                className={`flex flex-col p-3 rounded-lg shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)]
                     ${user.id == sender ? 'bg-blue-600 text-white' : 'bg-gray-400 text-black-800'
                    }`}
            >
                <span className="text-sm font-semibold">{username}</span>
                <div className="mt-2 text-sm">{message}</div>
            </div>
        </div>
    );
}

export default Message;
