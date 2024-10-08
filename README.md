# Blog App 📝
  ## Instructions 🚀
  1. Clone the Repository:

```
git clone https://github.com/Sk8Mahammad-Irfan9/Blog-App.git
cd blogApp
```
  2. Install Prerequisites:
  Ensure you have Docker 🐳 and Docker Compose installed on your machine.
  3. Set Up Environment Variables:
    Copy the sample .env files provided (if you have sample files like .env.example):
    
```
cp server/.env.example server/.env
cp frontend/.env.example frontend/.env
```
Edit the .env files in both the server and frontend directories to include the necessary environment variables:
## Server .env file:
```
PORT=5000
MONGO_URL=<your_mongo_url>
JWT_SECRET=<your_jwt_secret>
```
## Frontend .env file:
 ```REACT_APP_SERVER_URL=http://localhost:5000```
 
  4. Build and Run the Application: In the root directory of the project (where docker-compose.yml is located), run:
 
```

docker-compose up --build

```
  5. Access the Application:
    <ul>
      <li>
        Backend (server): http://localhost:5000
      </li>
      <li>
        Frontend (client): http://localhost:3000
  </li>
</ul>
  6. Stopping the Application: To stop the running containers, execute:
    
  
  ```

  docker-compose down
  
  ```

# Thank You! 🙏
Thank you for taking the time to explore my blogApp project! If you have any questions, suggestions, or feedback, feel free to reach out. I appreciate your interest and support! 😊
    
