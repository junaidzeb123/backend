
# MERN Chat App with Socket.IO

This is a real-time chat application built using the MERN stack (MongoDB, Express, React, and Node.js) with Socket.IO for WebSocket communication. The app supports both personal and group chats, allowing users to communicate instantly.

## Features

- **Real-Time Messaging**: Instant messaging using WebSockets (Socket.IO).
- **Personal Chats**: One-on-one private messaging between users.
- **Group Chats**: Create and join group chats for multiple users.
- **User Authentication**: Sign up, log in, and secure user sessions.
- **Responsive Design**: Fully responsive UI for desktop and mobile views.
- **MongoDB Database**: Store user data, messages, and chat histories.

## Technologies Used

- **Frontend**: React, CSS (Tailwind css).
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB (Mongoose for schema management).
- **Real-Time Communication**: Socket.IO for WebSocket-based messaging.
- **Authentication**: JWT (JSON Web Tokens) for secure authentication.
  
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/junaidzeb123/chatApp.git
   cd chatApp
   ```

2. Install server and client dependencies:
   ```bash
   # Install server dependencies
   cd backend
   npm install

   # Install client dependencies
   cd ../Fronted--
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `server` directory with the following values:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     SOCKET_PORT=your_socket_port
     ```

4. Start the app:

   - To start the backend server:
     ```bash
     cd server
     npm start
     ```

   - To start the frontend React app:
     ```bash
     cd client
     npm start
     ```

5. Open your browser and visit `http://localhost:3000` to use the app.

## How It Works

- **Socket.IO**: WebSocket connections are established for real-time communication. Messages are instantly transmitted between users.
- **MongoDB**: Used to store user data, messages, and chatroom/group information.
- **JWT Authentication**: Users are authenticated with JWT tokens for secure access to personal and group chats.

## Contributing

Feel free to fork this repository and submit pull requests to contribute!

## License

This project is licensed under the MIT License.

