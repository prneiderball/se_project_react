# SE Project Express

This is a Node.js backend server built with Express and MongoDB (via Mongoose) for the **WTWR (What To Wear?)** app. It provides a REST API to manage users and clothing items. 

Frontend deployed at: https://prnbwtwr.twilightparadox.com/ 
Server deployed at: https://api.prnbwtwr.twilightparadox.com/

## Features

* REST API with Express
* MongoDB with Mongoose
* User and ClothingItem models
* Data validation with express-validator
* Like/dislike functionality for clothing items
* Error handling

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/prneiderball/se_project_react
   cd SE_PROJECT_REACT/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start MongoDB locally.

4. Run the server:

   ```bash
   npm start
   ```

## Database

* Connects to `mongodb://127.0.0.1:27017/wtwr_db`.

## API Endpoints

### Users

* **POST /users** — Create a new user.

  * Body:

    ```json
    {
      "name": "John Doe",
      "avatar": "https://example.com/avatar.jpg"
    }
    ```

* **GET /users** — Get all users.

* **GET /users/\:userId** — Get a user by ID.

### Clothing Items

* **POST /clothingItems** — Create a clothing item.

  * Body:

    ```json
    {
      "name": "Rain Jacket",
      "weather": "cold",
      "imageUrl": "https://example.com/jacket.jpg"
    }
    ```

* **GET /clothingItems** — Get all clothing items.

* **PUT /clothingItems/\:itemId/likes** — Like a clothing item.

* **DELETE /clothingItems/\:itemId/likes** — Dislike a clothing item.

* **DELETE /clothingItems/\:itemId** — Delete a clothing item.
