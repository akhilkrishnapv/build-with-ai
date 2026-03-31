# TruthLens - Fullstack AI Media Verification

Welcome to the TruthLens repository. This application is a fully realized fullstack tool designed to identify AI manipulation and deepfakes across images and video. 

It is divided into two parts: a **Node.js/Express Backend** mapping to a MongoDB database, and a **React/Vite Frontend** supplying the user interface.

---

## 🚀 Setup Guide for a New Computer

If you are transferring this source code to a completely new PC, follow these exact steps to boot the application up from scratch:

### 1. Install Prerequisites
Before touching the code, ensure the new computer has the core engines installed:
* **Node.js**: Download and install the latest LTS version from [nodejs.org](https://nodejs.org/).
* **MongoDB**: Download and install **MongoDB Community Server** and **MongoDB Compass**. Ensure the database service is actively running in the background.

### 2. Install Project Dependencies
Because this folder uses a unified package workspace, you only need to run the install command once.
1. Open a terminal inside the root `truthlens` folder.
2. Run the command:
   ```bash
   npm install
   ```
   *(This will download all the required modules like React, Vite, Express, and Mongoose).*

### 3. Configure the Environment Variables
Your database needs a secure connection string and password logic to function.
1. Navigate into the `server/` folder.
2. You will see a file named `.env.example`.
3. Create a **copy** of that file and rename the new copy to exactly: `.env`
4. The `.env` file should look like this:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/truthlens
   JWT_SECRET=super_secret_jwt_key_please_change
   CLIENT_URL=http://localhost:5173
   ```

### 4. Boot the Application
Because it is a fullstack app, you must run both pieces of software simultaneously using two terminal windows.

**Terminal 1 (Backend Database):**
1. Open a terminal in the root `truthlens` folder.
2. Start the database API:
   ```bash
   npm run dev:server
   ```
3. Look for the message: `MongoDB successfully connected`.

**Terminal 2 (Frontend User Interface):**
1. Open a **second** terminal securely in the root `truthlens` folder.
2. Start the website UI:
   ```bash
   npm run dev
   ```
3. Open your web browser to `http://localhost:5173`. 

*(Note: You do not need to manually configure the database tables! The moment you register an account on the web page, Mongoose will automatically spawn the `truthlens` database cluster out of thin air!)*
