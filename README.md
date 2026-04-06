# 🚀 LankatechX — MERN E-Commerce Platform

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Node](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![Express](https://img.shields.io/badge/Express.js-black?logo=express)
![SendGrid](https://img.shields.io/badge/Email-SendGrid-blue)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-Active-success)

LankatechX is a **Full Stack MERN E-Commerce Web Application** for browsing and ordering computer hardware products.
It includes authentication, admin dashboard, OTP password reset, Google login, and responsive UI.

---

# 🌐 Live Demo

lankatechx
👉 https://lankatech-x.vercel.app/

---

# 🧰 Tech Stack

## Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Axios
* Context API

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* SendGrid Email Service
* Google OAuth

## Deployment

* Frontend → Vercel
* Backend → Railway
* Database → MongoDB Atlas
* Email → SendGrid

---

# ✨ Features

## 👤 User Features

* Register / Login
* JWT Authentication
* Google Login
* Forgot Password (OTP)
* Reset Password
* Profile Update
* Add to Cart
* Place Order
* View My Orders
* Responsive UI

## 🛠️ Admin Features

* Admin Dashboard
* View Users
* Block / Unblock Users
* Change User Role
* Manage Orders
* Pagination
* Protected Routes

## 📧 Email Features

* OTP Password Reset
* SendGrid Integration
* Spam-safe transactional email
* OTP expiration support

---

# 📁 Project Structure

```
LankatechX
│
├── i-computers-frontend
│   ├── src
│   ├── components
│   ├── pages
│   └── main.jsx
│
└── i-computers-backend
    ├── controllers
    ├── models
    ├── routes
    └── index.js
```

---

# ⚙️ Environment Variables

## Backend (.env)

```
MONGO_URI=for database
JWT_SECRET=for token handle
SENDGRID_API_KEY=for email part handle

```

---

## Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

Production:

```
VITE_API_URL=https:lankatechx-backend-production.up.railway.app
```

---

# 🛠️ Installation

## Clone Repository

```
git clone https://github.com/ThejanMihisara/LankatechX.git
cd LankatechX
```

---

# Backend Setup

```
cd i-computers-backend
npm install
npm run dev
```

Runs on:

```
http://localhost:5000
```

---

# Frontend Setup

```
cd i-computers-frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# 🔐 Authentication Flow

Login

* User login
* JWT generated
* Token stored
* Protected routes enabled

Forgot Password

1. Enter email
2. SendGrid sends OTP
3. OTP saved in MongoDB
4. Verify OTP
5. Reset password

---

# 📧 SendGrid Setup

1. Create SendGrid account
2. Verify sender email
3. Create API key
4. Add to `.env`

```
SENDGRID_API_KEY=SG_xxxxxxxxx
SENDGRID_FROM_EMAIL=your@email.com
SENDGRID_FROM_NAME=LankatechX
```

---

# 🚀 Deployment

## Frontend (Vercel)

Add environment variable:

```
VITE_API_URL=https:lankatechx-backend-production.up.railway.app
```

Deploy:

```
vercel --prod
```

---

## Backend (Railway)

Add variables:

```
MONGO_URI=for database handle
JWT_SECRET=for token handle
SENDGRID_API_KEY=for email handle

```

Deploy from GitHub.

---

# 🧪 API Endpoints

Auth

```
POST /api/users/register
POST /api/users/login
POST /api/users/send-otp
POST /api/users/verify-otp
```

Users

```
GET /api/users/me
PUT /api/users/update
PUT /api/users/change-password
```

Admin

```
GET /api/users/all
PUT /api/users/block
PUT /api/users/change-role
```

---

# 🔒 Security

* bcrypt password hashing
* JWT authentication
* Role-based authorization
* OTP expiration
* Protected routes

---

# 👨‍💻 Author

Thejan Mihisara

GitHub
https://github.com/ThejanMihisara

---

# ⭐ Support

If you like this project:

⭐ Star the repo
🍴 Fork the project
🚀 Contribute

---

# 📄 License

MIT License

---

# 🎯 Future Improvements

* Payment gateway
* Product reviews
* Wishlist
* Email notifications
* Analytics dashboard
* Order tracking

---
