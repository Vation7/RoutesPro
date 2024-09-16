# Social Network API

This is a RESTful API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. It uses Express.js for routing, MongoDB for the database, and Mongoose as the ODM (Object Data Modeling) library.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Thoughts](#thoughts)
  - [Reactions](#reactions)
  - [Friends](#friends)
- [Technologies](#technologies)
- [License](#license)

## Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/Vation7/RoutesPro.git
   ```
2. Install the required dependencies:
    ```bash
   npm install
   ```
4.	Make sure MongoDB is installed and running on your system. Start MongoDB if it’s not running:
    ```bash
   mongod
    ```
5.	(Optional) Seed the database with sample data:
    ```bash
    node seed.js
    ```

## Usage

1.	Start the server:
    ```bash
    npm start
    ```
2.	The server will run on http://localhost:3001.
3.	You can test the API routes using a tool like Insomnia.

## File Structure
```
.
├── config
│   └── connection.js
├── controllers
│   ├── thoughtController.js
│   └── userController.js
├── models
│   ├── Reaction.js
│   ├── Thought.js
│   ├── User.js
│   └── index.js
├── package-lock.json
├── package.json
├── routes
│   ├── api
│   │   ├── thoughtRoutes.js
│   │   └── userRoutes.js
│   └── index.js
└── server.js
```

## API Endpoints

### Users
- Get all users  
  **GET** `/api/users`

- Get a single user by ID  
  **GET** `/api/users/:userId`

- Create a new user  
  **POST** `/api/users`  
    ```json
    {
        "username": "john_doe",
        "email": "john@example.com"
    }
    ```

- Update a user by ID
  **PUT** `/api/users/:userId`
    ```json
    {
        "username": "john_updated",
        "email": "john_updated@example.com"
    }
    ```

- Delete a user by ID
  **DELETE** `/api/users/:userId`
    
### Thoughts
- Get all thoughts  
  **GET** `/api/thoughts`

- Get a single thought by ID  
  **GET** `/api/users/:thoughtId`

- Create a new thought 
  **POST** `/api/thoughts`
    ```json
    {
        "thoughtText": "This is a new thought",
        "username": "john_doe",
        "userId": "60d21b4667d0d8992e610c80"
    }
    ```

- Update a thought by ID
  **PUT** `/api/thoughts/:thoughtId`
  ```json
    {
        "thoughtText": "This is an updated thought text."
    }
    ```

- Delete a thought by ID
  **DELETE** `/api/thoughts/:thoughtId`

### Reactions
- Add a reaction to a thought
  **POST** `/api/thoughts/:thoughtId/reactions`
  ```json
    {
        "reactionBody": "This is a new reaction",
        "username": "jane_doe"
    }
    ```

- Delete a reaction
  **DELETE** `/api/thoughts/:thoughtId/reactions/:reactionId`

### Friends
- Add a friend to a user’s friend list
  **POST** `/api/users/:userId/friends/:friendId`

- Remove a friend from a user’s friend list
  **DELETE** `/api/users/:userId/friends/:friendId`

## Technologies

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JavaScript**: Programming language

## Video
[Watch the video](https://www.youtube.com/watch?v=example)


## License

This project is licensed under the MIT License.
