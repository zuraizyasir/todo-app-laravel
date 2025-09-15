
## 🎉 Todo App - Laravel & Vue.js

### 🌟 Overview
The **Todo App** is a modern, full-stack web application built with [Laravel 12](https://laravel.com) (backend) and [Vue.js 3](https://vuejs.org) (frontend). It helps users manage tasks efficiently with a secure RESTful API (powered by [Laravel Sanctum](https://laravel.com/docs/sanctum)) and a responsive UI featuring gradients, custom fonts (Serenity, Warnock-Pro), and animations.

**Tested to Perfection**: Backed by **14 PHPUnit backend tests** and **16 Vitest frontend tests**—totaling **30 tests**! 🚀

---

### ✨ Features

- **🔐 User Authentication**:
  - Register with name, email, and password (min. 8 characters, confirmed).
  - Login with email/password for a Sanctum token.
  - Logout to revoke the token

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
| **Backend**       | Laravel 12, PHP 8.2, MYSQL, Laravel Sanctum      |
| **Frontend**      | Vue.js 3, Vite, Tailwind CSS, Vitest             |
| **Database**      | SQLite (testing), MySQL  |
| **Testing**       | PHPUnit 11.5.38, Vitest                          |
| **Dependencies**  | `laravel/framework:^12.0`, `laravel/sanctum:^4.0`, `phpunit/phpunit:^11.5`, `vite`, `vue`, `tailwindcss`, `vitest` |

---

### 🚀 Setup Instructions

#### 📋 Prerequisites
- PHP 8.2+
- Composer
- Node.js 20+ and npm
- MySQL
- Git

#### 🛠️ Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/zuraizyasir/todo-app-laravel.git
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
7. Start the application:
   ```bash
   php artisan serve
8. Start the Vite server for the frontend:
   ```bash
   npm run dev

### Open http://127.0.0.1:8000 in your browser.
   
### Running Tests
- Backend (PHPUnit):
   ```bash
   ./vendor/bin/phpunit
### Expected Output
PHPUnit 11.5.38 by Sebastian Bergmann and contributors.

Runtime:       PHP 8.2.12
Configuration: D:\xampp\htdocs\todo-app-laravel-master\phpunit.xml

..............                                                    14 / 14 (100%)

Time: 00:09.679, Memory: 46.00 MB

### Running Tests
- Frontend (Vitest):
   ```bash
   npm run test
### Expected Output
 RUN  v3.2.4 D:/xampp/htdocs/todo-app-laravel-master

 ✓ tests/Vitest/Login.test.js (4 tests) 208ms
 ✓ tests/Vitest/Register.test.js (5 tests) 250ms
 ✓ tests/Vitest/Dashboard.test.js (4 tests) 342ms
 ✓ tests/Vitest/TodoForm.test.js (3 tests) 139ms

 Test Files  4 passed (4)
      Tests  16 passed (16)
   Start at  15:20:13
   Duration  8.67s (transform 1.48s, setup 1.86s, collect 2.72s, tests 939ms, environment 10.16s, prepare 2.92s)

## 📚 API Endpoints

| Method | Endpoint        | Description         | Auth |
|--------|----------------|---------------------|------|
| POST   | /api/register  | Register new user   | No   |
| POST   | /api/login     | Login user          | No   |
| GET    | /api/todos     | List user todos     | Yes  |
| POST   | /api/todos     | Create todo         | Yes  |
| GET    | /api/todos/{id}| Show todo           | Yes  |
| PUT    | /api/todos/{id}| Update todo         | Yes  |
| DELETE | /api/todos/{id}| Delete todo         | Yes  |

---

## 👨‍💻 Author

Developed by [Zuraiz Yasir].

---

## 📜 License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).

