import React from 'react'
import OneChat from './OneChat'
import { useNavigate } from 'react-router-dom';

function AllChatsBox({ data }) {
    const navigate = useNavigate();
    return (
        <div
            className="hide-scrollbar bg-white px-6 py-8 w-full max-w-2xl rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4">
            <div className="flex ">
                <h1 className="text-2xl font-bold flex-1 text-gray-800">Available Users</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
            </div>


            <div className="hide-scrollbar  mt-8 space-y-4 hide-scrollbar">
                {data.map((element) =>
                    <OneChat
                        key={element.id}
                        name={element.userName}
                        pic={element.pic}
                    />
                )}

            </div>
        </div>

    )
}

export default AllChatsBox;
