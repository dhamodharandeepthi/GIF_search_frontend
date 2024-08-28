# GIF Search and Favorite Management Application

## Overview

This project is a GIF search and favorite management application built with the MERN stack (MongoDB, Express, React, Node.js). Users can search for GIFs, mark their favorites, and manage their GIFs using this application. The app also includes user authentication with JWT for secure access.

## App link

https://gif-search-app-using-mern.netlify.app/register

## Demo

https://github.com/user-attachments/assets/420fd752-b85a-4d60-b57e-1028855f649a

## Features

- **Search GIFs:** Users can search for GIFs using the Giphy API.

- **Favorites Management:** Users can mark GIFs as favorites and manage them.

- **User Authentication:** Users can register, log in, and log out.

- **Pagination:** Results are paginated to manage large sets of GIFs.

- **Responsive Design:** The app is designed to be responsive and user-friendly.

# API Endpoints

## Authentication

- **POST /auth/register:** Register a new user.

- **POST /auth/login:** Log in and receive a JWT token.

## Favorites

- **GET /api/favorites:** Retrieve all favorites.
- **POST /api/favorites:** Add a new favorite.
- **DELETE /api/favorites/:id:** Delete a favorite by ID.

## Technologies Used

- **Frontend:** React, Material-UI, Axios

- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.

- **Authentication:** JWT (JSON Web Tokens)

- **Deployment:** Deployed backend in **onrender** and Deployed frontend in **netlify**

## Conclusion

- This GIF Search and Favorite Management App demonstrates a complete MERN stack solution, featuring GIF search, favorite management, and user authentication. The app provides a user-friendly interface with Material-UI, secure authentication via JWT, and robust functionality for managing GIFs.
