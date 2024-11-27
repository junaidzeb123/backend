import React from 'react';

function Message({ message, username, isSender }) {
  return (
    <div className={`flex ${isSender ? 'flex-row-reverse' : 'flex-row'} items-center w-full max-w-xl my-2`}>
      {/* Avatar Section (You can add user avatars if available) */}
      <div className="mr-3">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
          {username ? username.charAt(0).toUpperCase() : ''}
        </div>
      </div>

      {/* Message Box */}
      <div
        className={`flex flex-col p-3 rounded-lg shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] ${
          isSender ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
        }`}
      >
        {/* Username */}
        <span className="text-sm font-semibold">{username}</span>

        {/* Message Content */}
        <div className="mt-2 text-sm">{message}</div>
      </div>
    </div>
  );
}

export default Message;
