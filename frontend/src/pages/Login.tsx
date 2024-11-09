import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Login() {
  // State variables to hold email and password input values
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const backendLink = 'http://localhost:3001';


  const navigate = useNavigate();
  // Function to handle form submission
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
    <div>
      <form onSubmit={handleSubmit}>
        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="email"
            id="form2Example1"
            className="form-control"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            required
          />
          <label className="form-label" htmlFor="form2Example1">Email address</label>
        </div>

        <div data-mdb-input-init className="form-outline mb-4">
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="form-label" htmlFor="form2Example2">Password</label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" />
              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>

        <div className="text-center">
          <p>Not a member? <a href="#!">Register</a></p>
          <p>or sign up with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
