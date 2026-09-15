# GiftLink — Full Stack Capstone Web Application

GiftLink is a full-stack platform that connects people who want to give away household items they no longer need with neighbors looking to recycle or obtain free items instead of buying new.

## 🚀 Key Features

- **Full-Stack Architecture**: React (Frontend) + Express / Node.js (Backend) + MongoDB database with automatic local offline fallback.
- **REST APIs**:
  - `/api/gifts` & `/api/gifts/:id`: Full catalog and item details
  - `/api/search`: Multi-parameter search by category, condition, age, and name
  - `/api/auth`: User registration, JWT login, and profile update
- **Natural Language Processing**: Real-time sentiment evaluation on item comments using the `natural` npm package.
- **Modern UI/UX**: Glassmorphic styling, responsive cards, category pill filtering, interactive modal details, and user profile management.
- **DevOps & Containerization**: Fully containerized with `Dockerfile` and `docker-compose.yml`.

---

## 💻 Quick Start Guide

### 1. Install Dependencies
In the root directory, run:
```bash
npm run install:all
```
*(Or install individually: `cd giftlink-backend && npm install`, then `cd ../giftlink-frontend && npm install`)*

### 2. Start Both Backend & Frontend
```bash
npm start
```
- **Backend API**: Running on `http://localhost:3060`
- **Frontend App**: Running on `http://localhost:3000`

---

## 🐳 Docker Deployment
To run with Docker Compose:
```bash
docker-compose up --build
```

---

## 📁 Capstone Project Submission Deliverables

| Task | File / URL | Description |
| :--- | :--- | :--- |
| **Task 1** | `user-story.md` | User story template with 8 prioritized stories |
| **Task 2** | `userstories.png` | GitHub Issues directory with required labels (`new`, `icebox`, `technical debt`, `backlog`) |
| **Task 3** | `inserted_items` | MongoDB output showing 16 documents imported |
| **Task 4** | `giftlink-backend/models/db.js` | MongoDB connection with `await client.connect()` |
| **Task 5** | `giftlink-backend/routes/giftRoutes.js` | Includes `connectToDatabase()` and routes `/api/gifts` & `/api/gifts/:id` |
| **Task 6** | `giftlink-backend/routes/searchRoutes.js` | Filter gifts by category, condition, and keyword |
| **Task 7** | `giftlink-backend/app.js` | Express server mounting `/api/search` |
| **Task 8** | `giftlink-backend/sentiment/index.js` | Sentiment analysis with `natural` package |
| **Task 9** | `giftlink-frontend/.../RegisterPage.js` | Required `POST` method and header attributes in fetch request |
| **Task 10** | `giftlink-frontend/.../LoginPage.js` | `Content-Type` and `Authorization` headers in fetch request |
| **Task 11** | `giftlink-backend/routes/authRoutes.js` | Register, login, and update user info APIs |
| **Task 12** | `deployed_landingpage.png` | Deployed landing page showing URL, site title, tagline, and "Get Started" button |
| **Task 13** | `mainpage` | cURL command and output listing all gifts |
| **Task 14** | `register` | cURL command and output for user registration |
| **Task 15** | `login` | cURL command and output for user login |
| **Task 16** | `item_detail` | cURL command and output showing item details |
| **Task 17** | `search_item` | cURL command and output filtering by category |
| **Task 18** | `CI/CD` | GitHub Actions workflow terminal output |
