
# 🚀 Task Management System

A full-stack **Task Management System** built using modern technologies. It supports **Admin and User roles** with secure authentication and role-based access control.

---

## 📌 Features

### 🔐 Authentication
- User Registration & Login
- JWT-based authentication
- Role-based access (Admin / User)

---

### 👨‍💼 Admin Features
- Dashboard with statistics:
  - Total Tasks
  - Pending Tasks
  - In Progress Tasks
  - Completed Tasks
- Create, Update, Delete Tasks
- Assign tasks to users
- View all tasks
- Search tasks by title
- Profile management

---

### 👤 User Features
- View assigned tasks only
- Update task status (Pending → In Progress → Completed)
- Dashboard with:
  - Total assigned tasks
  - Pending tasks
  - Completed tasks
- Search tasks by title
- Profile page

---

### 🎨 UI/UX
- Responsive design (Tailwind CSS)
- Sidebar + Navbar layout
- Role-based navigation
- Icons using Heroicons
- Clean and professional dashboard UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- Heroicons

### Backend
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication

### Database
- mySQL

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/AbiWaqas08/task-management.git
cd task-management
````

---

## 🖥️ Backend Setup (FastAPI)

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate environment
source venv/bin/activate      # Linux/Mac
venv\\Scripts\\activate       # Windows

# Install dependencies
pip install -r requirements.txt

# Run server
python run.py
```

---

## 🌐 Frontend Setup (React)

```bash
cd frontend

# Install dependencies
npm install

# Run app
npm run dev
```

> ⚠️ Frontend dependencies are managed via `package.json` (not requirements.txt)

---

## 🔑 Environment Variables (Backend)

Create a `.env` file inside the backend folder:

```env
DATABASE_URL=Paste your database url here
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## 🔗 API Endpoints

### Auth

* `POST /login`
* `POST /register`

### Admin

* `GET /tasks/admin`
* `POST /tasks/admin`
* `PUT /tasks/{id}`
* `DELETE /tasks/{id}`

### User

* `GET /tasks/user`
* `PUT /tasks/{id}` (update status)

---

## 📊 Dashboard Overview

### Admin Dashboard

* Task statistics cards
* Recent tasks list
* Quick actions (Create / View tasks)

### User Dashboard

* Assigned tasks overview
* Status tracking
* Task updates

---

## 🧠 Architecture Highlights

* Role-based routing (Admin/User dashboards)
* Protected routes using Context API
* Centralized API handling (Axios)
* Modular and scalable structure

---

## 🧪 Future Improvements

* 🔔 Notifications system
* 📅 Task deadlines
* 📊 Analytics dashboard (charts)
* 🌙 Dark mode
* 🔐 Password reset

---

## 👨‍💻 Developer

**Abi Waqas**
Task Management System Developer

---

## ⭐ Support

If you like this project:

* ⭐ Star the repository
* 🍴 Fork it
* 🛠️ Contribute


