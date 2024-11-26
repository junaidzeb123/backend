import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Login() {
  // State variables to hold email and password input values
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const backendLink = 'http://localhost:3001';


  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend
      console.log("sending post");

      const response = await axios.post(`${backendLink}/user/chatUsers`, {
        userName,
        password,
      });
      localStorage.setItem('tokens', JSON.stringify(response)); // Store data in localStorage

      console.log('Success:', response.data);
      navigate("/chat-users");
    } catch (error) {
      console.error('An error occurred:', error);
      alert(error);
    }
  };

  return (
    <>
      <div className="grid md:grid-cols-3 gap-6 min-h-[164px] py-8 p-16 bg-gradient-to-r from-blue-700 to-blue-400 font-sans overflow-hidden">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-white">Welcome to ReadymadeUI!</h1>
          <p className="text-base text-gray-200 mt-4">Best tailwind css readymade UI plateform</p>

          <button type="button"
            className="py-3 px-6 text-sm font-semibold bg-white text-blue-600 hover:bg-slate-100 rounded-md mt-8">Get
            Started</button>
        </div>

        <div className="relative max-md:hidden">
          <img src="https://readymadeui.com/readymadeui_banner2.webp" alt="Banner Image"
            className="w-full right-4 top-[-13px] md:absolute skew-x-[-16deg] rotate-2 object-cover" />
        </div>
      </div>
    </>

  );
}

export default Login;
