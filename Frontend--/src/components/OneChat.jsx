import React from 'react'

function OneChat({ name, pic }) {
    console.log(name);
    
    return (
        <div
            className="flex flex-wrap items-center cursor-pointer shadow-[0_2px_6px_-1px_rgba(0,0,0,0.3)] rounded-lg w-full p-4">
            <img src='https://readymadeui.com/profile_2.webp' className="w-10 h-10 rounded-full" />
            <div className="ml-4 flex-1">
                <p className="text-sm text-gray-800 font-semibold">{name}helo</p>
                <p className="text-xs text-gray-500 mt-0.5">johndoe23@gmail.com</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 fill-gray-500" viewBox="0 0 32 32">
                <path
                    d="M13 16c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zm0 10c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3zm0-20c0 1.654 1.346 3 3 3s3-1.346 3-3-1.346-3-3-3-3 1.346-3 3z"
                    data-original="#000000" />
            </svg>
        </div>

    )
}

export default OneChat;
