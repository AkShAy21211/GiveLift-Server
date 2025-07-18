# 🌐 Disaster Management Backend (Node.js + Clean Architecture)

This is the backend server for the **Disaster Management & Anti-Fake News Platform**, built with **Node.js, Express**, and **TypeScript**, following **Domain-Driven Design (DDD)** and **Clean Architecture** principles.

---

## 📁 Project Structure

```
server/
├── dist/ # Compiled output
├── seed/ # DB seeding scripts
├── src/
│ ├── config/ # App configs (env, DB, etc.)
│ ├── constants/ # Global constants
│ ├── controllers/ # Express controllers (entry points)
│ ├── domain/ # Domain Layer
│ │ ├── entities/ # Core business models
│ │ ├── enum/ # App-wide enums
│ │ ├── interfaces/ # Abstract interfaces
│ │ └── usecases/ # Application business logic
│ ├── dtos/ # Request/response data shapes
│ ├── infrastructure/ # Infrastructure Layer
│ │ ├── config/ # DB connection, adapters, etc.
│ │ ├── interfaces/ # Interface implementations
│ │ ├── middlewares/ # Express middlewares
│ │ ├── models/ # Mongoose schemas
│ │ ├── repositories/ # DB query logic
│ │ ├── routes/ # Express routers
│ │ ├── services/ # External service logic (e.g., email, maps)
│ │ ├── validation/ # Joi/Zod/Yup schema validations
│ ├── shared/errors/ # App-wide custom error classes
│ ├── types/ # Global types
│ ├── utils/ # Utility functions
│ └── index.ts # Server entry point
├── .env # Environment variables
├── tsconfig.json # TypeScript config
├── package.json # NPM dependencies & scripts
├── nodemon.json # Dev watcher config
```



---

## ⚙️ Tech Stack

| Layer              | Tech Used                  |
|--------------------|----------------------------|
| Language           | TypeScript                 |
| Framework          | Node.js + Express          |
| Database           | MongoDB + Mongoose         |
| Authentication     | JWT                        |
| Architecture Style | Clean Architecture         |
| Realtime (Client)  | Socket.IO                  |
| Validation         | Zod / Joi (depending)      |

---

## 🧠 Core Modules

- **User Management**: Auth, roles (general, district/state coordinator), password handling
- **Disaster Reporting**: Creation, updates, severity tracking
- **Volunteer & Donations**: Pledging, matching, and tracking
- **Anti-Fake News System**: Reporting rumors, fact-checking, broadcasting corrections
- **Notifications**: Triggered via events and role-specific updates

---

## 🚀 Getting Started

### 1. Clone the repository
```
git clone https://github.com/your-username/disaster-management-server.git
cd disaster-management-server

```
### 2. Install dependencies
```
npm install

```

### 3. Configure environment variables
```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

```

### 4. 4. Run the server
```
npm run dev
```


### 📌 API Design Principles
Follows RESTful standards

#### All routes versioned under /api/v1

#### Secured with JWT

#### Middleware-controlled role-based access

#### DTOs enforce request/response consistency



# 📄 License
MIT License © 2025 [Your Name / Team Name]
