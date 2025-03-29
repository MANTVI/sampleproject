# 📂 Project Title: Authentication System with  NextJs and Firebase

## 📝 Project Overview
This project is a user authentication system built using **NextJs**, **Firebase**, **React Hook Form**, **Redux Toolkit**, and **Tailwind CSS**. It includes **Login** and **Signup** pages with frontend validation, user data management with **Redux Toolkit**, and persistent user sessions using **Local Storage**.

---

## 💡 Features
- **Login and Signup** pages with React Hook Form and frontend validation.
- **Redux Toolkit** for managing authentication state.
- **Firebase Authentication** for secure user sign-up, login, and logout.
- Persistent user sessions using **Local Storage**, ensuring users stay logged in even after refreshing.
- **Tailwind CSS** for responsive and modern UI styling.
- Logout functionality on the home page.

---

## 🛠️ Technologies Used
- **React**: Frontend library.
- **React Hook Form**: Form handling and validation.
- **Redux Toolkit**: State management for user authentication.
- **Firebase**: Authentication and data storage.
- **Tailwind CSS**: Styling framework for responsive design.

---

## 🔧 Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project and add a web app.
   - Copy Firebase configuration and add it to your **.env** file.
   ```env
   REACT_APP_API_KEY=your_api_key
   REACT_APP_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_PROJECT_ID=your_project_id
   REACT_APP_STORAGE_BUCKET=your_bucket.appspot.com
   REACT_APP_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_APP_ID=your_app_id
   ```
4. Start the development server:
   ```bash
   npm start
   ```

---

## 📁 Folder Structure
```plaintext
src/
├── app/
│   ├── auth/
│   │   ├── login/
│   │   ├── signup/
│   ├── dashboard/
│       ├── Dashboard.tsx
├── components/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Dashboard.tsx
│   ├── loginForm.tsx
│   ├── signupForm.tsx
│   ├── Provider.tsx
├── firebase/
│   ├── authService.tsx
├── store/
│   ├── store.js
│   ├── authSlice.js
├── congifFirebase.ts.tsx


## 🔑 Authentication Flow
- **Login** and **Signup** forms use React Hook Form for validation.
- **Redux Toolkit** stores user data and manages authentication status.
- On successful authentication, user data is saved to **Local Storage**.
- The Logout button on the Dashboard page clears the Redux state and local storage.





