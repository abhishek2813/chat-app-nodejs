# Node.js Chat Application

This is a real-time chat application built using Node.js, Express, MongoDB, and Socket.io. The application allows users to register, log in, and send messages in a chat room. The messages are displayed with the sender's name and the time of the message. The application uses Bootstrap for styling and local storage for handling user sessions.

## Features

- **User Registration**: New users can create an account by registering with their details.
- **User Login**: Registered users can log in to access the chat room.
- **Real-time Messaging**: Users can send and receive messages in real-time. Each message displays the sender's name and the time it was sent.
- **Message History**: Users can see all messages sent by all users in the chat room.
- **User Session Management**: The application uses local storage to manage user sessions, ensuring that logged-in users remain logged in until they log out.
- **Logout**: Users can log out of the application, which clears their session.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: Database for storing user and chat data.
- **Socket.io**: Library for real-time communication.
- **Bootstrap**: CSS framework for responsive design.
- **HTML/CSS/JavaScript**: Frontend technologies for building the user interface.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/abhishek2813/chat-app-nodejs.git
    cd chat-app-nodejs
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up MongoDB:
    - Ensure MongoDB is installed and running on your machine.
    - Create a `.env` file in the root directory and add your MongoDB connection string:
        ```env
        MONGODB_URI=your_mongodb_connection_string
        ```

4. Start the application:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- `index.html`: Contains the structure and functionality for the chat, login, and registration pages. Handles communication with the backend.
- `public/css`: Contains the CSS files, including Bootstrap for styling.
- `routes`: Contains the route handlers for user registration, login, and chat functionalities.
- `models`: Contains the Mongoose models for user and chat schemas.
- `server.js`: Entry point of the application, sets up the Express server and Socket.io.

## Usage

1. **Register**: Navigate to the registration page and create a new account by providing the required details.
2. **Login**: Log in using your registered credentials. On successful login, you will be redirected to the chat room.
3. **Chat**: Send messages in the chat room. Your messages, along with the sender's name and timestamp, will be displayed.
4. **Logout**: Click the logout button to end your session.
