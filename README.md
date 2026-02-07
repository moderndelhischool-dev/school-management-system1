# School Management System

A modern, scalable **School Management System** built using **React (Vite)** and **Firebase**.  
This application is designed to help educational institutions manage **students, parents, fees, and administration** efficiently with a secure and user-friendly interface.

---

## Overview

The School Management System provides a centralized platform for managing school operations.  
It supports **role-based authentication**, **real-time data handling**, and **responsive dashboards**, making it suitable for real-world school environments.

The project follows clean coding practices and a modular architecture, making it easy to maintain and extend.

---

## Core Features

### User / Parent Module
- Secure login and registration
- View student profile and academic information
- View fee details (total, paid, pending)
- Month-wise fee status
- Last update timestamp
- Fully responsive user dashboard

### Admin Module
- Secure admin authentication
- Dashboard overview
- Add new students
- View all students
- Edit student details (class, fees, month)
- Automatic fee status calculation
- Responsive admin dashboard
- Sidebar navigation with mobile toggle support

### Authentication & Security
- Firebase Authentication
- Role-based access control (Admin / User / Parent)
- Secure logout
- Restricted access to dashboards
- Firestore-based data storage

---

## Technology Stack

| Category | Technology |
|--------|------------|
| Frontend | React (Vite) |
| Styling | Bootstrap 5 |
| Routing | React Router DOM |
| Backend | Firebase |
| Authentication | Firebase Authentication |
| Database | Firestore |

---

## Project Structure
src/
│
├── components/
│ ├── Navbar/
│ ├── Sidebar.jsx
│ ├── DashboardHome.jsx
│ ├── AddStudent.jsx
│ ├── StudentList.jsx
│
├── pages/
│ ├── Landing.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── AdminDashboard.jsx
│ ├── UserDashboard.jsx
│
├── firebase/
│ └── firebase.js
│
├── App.jsx
├── main.jsx
└── index.css

