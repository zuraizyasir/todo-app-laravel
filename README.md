
## 🎉 Todo App - Laravel & Vue.js

### 🌟 Overview
The **Todo App** is a modern, full-stack web application built with [Laravel 12](https://laravel.com) (backend) and [Vue.js 3](https://vuejs.org) (frontend). It helps users manage tasks efficiently with a secure RESTful API (powered by [Laravel Sanctum](https://laravel.com/docs/sanctum)) and a responsive UI featuring gradients, custom fonts (Serenity, Warnock-Pro), and animations.

**Tested to Perfection**: Backed by **14 PHPUnit backend tests** and **16 Vitest frontend tests**—totaling **30 tests**! 🚀

---

### ✨ Features

- **🔐 User Authentication**:
  - Register with name, email, and password (min. 8 characters, confirmed).
  - Login with email/password for a Sanctum token.
  - Logout to revoke the token.

- **📝 Task Management**:
  - Create todos with title, description, status (`pending`, `in-progress`, `completed`), and due date.
  - List todos with status and due date filters.
  - Update own todos (title, description, status, due date).
  - Delete own todos.

- **🛡️ Security**:
  - Policies block unauthorized todo edits/deletes (403 Forbidden).
  - Sanctum token-based API authentication.

- **🎨 User Interface**:
  - Responsive design with [Tailwind CSS](https://tailwindcss.com).
  - Custom fonts (Serenity, Warnock-Pro) and gradients.
  - Smooth animations for a polished feel.

- **✅ Testing**:
  - 14 PHPUnit tests for backend (auth, CRUD).
  - 16 Vitest tests for frontend (UI, API integration).

---

### 🛠️ Tech Stack
| Component         | Technologies                                      |
|-------------------|---------------------------------------------------|
| **Backend**       | Laravel 12, PHP 8.2, SQLite, Laravel Sanctum      |
| **Frontend**      | Vue.js 3, Vite, Tailwind CSS, Vitest             |
| **Database**      | SQLite (testing), MySQL  |
| **Testing**       | PHPUnit 11.5.38, Vitest                          |
| **Dependencies**  | `laravel/framework:^12.0`, `laravel/sanctum:^4.0`, `phpunit/phpunit:^11.5`, `vite`, `vue`, `tailwindcss`, `vitest` |

---

### 🚀 Setup Instructions

#### 📋 Prerequisites
- PHP 8.2+
- Composer
- Node.js 22+ and npm
- MySQL
- Git

#### 🛠️ Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/your-repo/todo-app-laravel.git
   cd todo-app-laravel
2. Install backend dependencies:
    ```bash
   composer install
3. Install frontend dependencies:
    ```bash
   npm install
4. Configure the environment:
   (This will create the .env file)
   ```bash
   cp .env.example .env
5. Edit .env for your database:
   ```bash
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=todo_app_laravel
   DB_USERNAME=root
   DB_PASSWORD=
6. Run database migrations:
   ```bash
   php artisan migrate
   
   
