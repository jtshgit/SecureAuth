# SecureAuth: User Registration and Login System

## Overview
SecureAuth is a web-based user authentication system designed for developers and web application owners who need an easy-to-implement yet secure user login system. Built using the **MERN** stack (MongoDB, Express.js, React, Node.js), this project provides a simple and effective way to manage user registration, login, email authentication, and profile management. It offers:
- **Traditional Login**: Allows users to register with a username and password.
- **Google Authentication**: Users can log in seamlessly using their Google account.
- **Email Authentication (Nodemailer)**: A secure registration process that sends verification emails to users.
- **JWT Tokens**: All users are assigned a JSON Web Token (JWT) for session management, ensuring secure communication between the server and client.
- **Profile Page**: Registered users can view and edit their personal profile information.
- **Forgot Password**: Users can reset their password if they forget it, improving the system's user-friendliness.

## Features
- **User Registration and Login**: Secure traditional username and password login functionality.
- **Google Authentication**: Users can log in using their Google account for quicker access.
- **Email Authentication**: Users will receive a verification email after registration using **Nodemailer**, ensuring only valid users are added.
- **JWT Tokens**: Secure authentication via JWT tokens to ensure valid sessions.
- **Profile Management**: Users can view and update their profile information easily.
- **Forgot Password**: Provides users with the option to reset their password if they forget it, using a secure verification method.

## Technologies Used
This project uses the **MERN** stack to provide a full-stack solution for user authentication:
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens), Google OAuth, and **Nodemailer** for email verification
- **Frontend**: React.js for a dynamic and responsive user interface
- **State Management**: React Context or Redux (optional, depending on your preference)

## Installation
Follow these steps to get the project up and running locally:

1. Clone the repository:

```
git clone https://github.com/jtshgit/secureauth.git
```

2. Install the dependencies:
```
npm install
```
3. Set up environment variables:
Create a .env file in the root of the project and configure it with the required keys for Google OAuth and the JWT secret.

4. Start the server:
```
npm start
```
## How It Works

- **User Registration**: Users can register by providing their email and password. The credentials are securely stored in the database.
- **Login with Google**: Users can log in using their Google account for quick and easy authentication.
- **JWT Tokens**: Once the user logs in (either traditionally or via Google), the backend generates a JWT token, which is stored on the client side (usually in localStorage or cookies). This token is used for authenticating future requests.
- **Profile Page**: After logging in, users can view and edit their profile. Changes made on the profile page are reflected in the database immediately.
- **Forgot Password**: If users forget their password, they can request a password reset. A secure reset link is sent to the user's email, allowing them to change their password.

## Contributing

Feel free to fork the repository and submit pull requests. Contributions are welcome for bug fixes, new features, or documentation improvements.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.