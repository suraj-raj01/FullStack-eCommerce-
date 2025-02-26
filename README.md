# eCommerce Website (MERN Stack)

## 📌 Overview
This is a fully functional eCommerce website built using the **MERN** stack (**MongoDB, Express.js, React, Node.js**). It provides a seamless online shopping experience, including features like product browsing, cart management, user authentication, and payment processing.

## 🚀 Features
- User Authentication (Login/Register) 🔑
- Admin Dashboard for Product & Order Management 🛠️
- Product Listing with Search & Filtering 🔍
- Shopping Cart 🛒
- Secure Checkout with Payment Gateway 💳
- Order Management System 📦
- Responsive Design 📱

## 🛠️ Technologies Used
- **Frontend:** React.js (with Redux for state management)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **Authentication:** JSON Web Tokens (JWT), bcrypt
- **Payment Integration:** RazorPay / PayPal
- **Cloud Storage:** Multer (for product images)
- **Deployment:** Vercel (Frontend), Render (Backend)

## 📂 Project Structure
```
/ecommerce-website
│── backend/           # Node.js + Express.js Server
│   ├── models/       # Database models (MongoDB)
│   ├── routes/       # API routes
│   ├── controllers/  # Business logic
│── frontend/         # React.js Application
│   ├── src/
│   │   ├── components/   # Reusable Components
│   │   ├── pages/        # Application Pages
│   │   ├── redux/        # State Management
│   │   ├── utils/        # Helper Functions
│── .env                 # Environment Variables
│── package.json         # Dependencies
│── README.md            # Documentation
```

## 🔧 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/ecommerce-mern.git
cd ecommerce-mern
```
### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file inside the `backend/` directory and add the necessary environment variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```
Run the backend server:
```sh
nodemon
```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
```
Run the frontend:
```sh
npm run dev
```

## 🌍 Deployment
### 1️⃣ Deploy Backend
- Use **Railway** or **Heroku** for Node.js server
- Set up MongoDB Atlas for database hosting
- Configure `.env` variables in the deployment platform

### 2️⃣ Deploy Frontend
- Use **Vercel** or **Netlify** for React app
- Ensure the frontend `.env` file contains the correct API URL for the backend

## 🤝 Contributing
Feel free to fork this repository and submit pull requests for improvements! 🚀

## 📜 License
This project is licensed under the MIT License.

---

Made with ❤️ by SURAJ KUMAR

