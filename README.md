# ✨ Ichgram Frontend – Instagram Clone UI

This is the **frontend** of **Ichgram** — a full-stack Instagram clone built with modern technologies. This React + TypeScript client handles all user interactions, UI/UX logic, and integrates with the backend API for real-time chat, social features, authentication, and media management.

---

## 🚀 Features

- 🔐 **Authentication**

  - Sign up, login, logout, email verification, password reset
  - JWT token storage with secure API integration

- 🧑‍🤝‍🧑 **Social Interactions**

  - Follow/unfollow users
  - Post creation, editing, deletion
  - Like and comment on posts
  - Profile view and edit

- 💬 **Real-Time Chat**

  - One-to-one messaging using **Socket.IO**

- 🖼️ **Media Support**

  - Upload images with preview
  - Optimized cloud-hosted images from Cloudinary

- 📱 **Responsive Design**

  - Fully responsive across mobile, tablet, and desktop

- 🔍 **User Search**

  - Find other users by username

- 🌈 **Modern UI/UX**
  - Clean interface using **Lucide Icons**, **React Spinners**, **Emoji Picker**, and **React Toastify**

---

## ⚙️ Tech Stack

| Layer         | Tech                                                 |
| ------------- | ---------------------------------------------------- |
| **Framework** | React 19 + TypeScript                                |
| **Bundler**   | Vite                                                 |
| **Routing**   | React Router v7                                      |
| **State**     | Redux Toolkit + React Hook Form                      |
| **API**       | Axios (connected to Ichgram Backend)                 |
| **Real-Time** | socket.io-client                                     |
| **UI**        | Lucide Icons, Emoji Picker, Toastify, React Spinners |
| **Others**    | clsx, nanoid                                         |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/DimaTaos4/final-project-frontend.git
cd frontend-project

# Install dependencies
npm install

# Start development server
npm run dev
```

## 📁 Project Structure
src/
├── assets/         # Static files
├── components/     # Reusable UI components
├── redux/       # Redux slices & features
├── hooks/          # Custom React hooks
├── pages/          # Route-based pages
├── api/       # API calls (Axios)
├── utils/          # Utility functions
├── App.tsx
└── main.tsx

## 🔗 Related Links
🌍 Live Demo: https://final-project-frontend-ashy.vercel.app

## 🧠 What I Learned
Through this project, I enhanced my skills in:
Modern state and form management with Redux Toolkit + React Hook Form
Real-time client-server communication with Socket.IO
Working with cloud image APIs (Cloudinary)
Building a fully responsive, interactive UI from scratch
