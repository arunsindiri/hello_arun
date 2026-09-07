# Hello Arun App 🚀

A small end-to-end application built step by step to learn how a frontend, backend API, database, and mobile application fit together.

The goal is **not** to build a complex app. The goal is to understand the complete development flow by building a very small application first and then converting the client into a mobile application.

---

## 🎯 Final Goal

The application will start as a simple web application:

```text
Browser
   │
   │ HTTP Request
   ↓
Frontend
   │
   │ API Request
   ↓
FastAPI Backend
   │
   ↓
PostgreSQL Database
```

Later, the web frontend will be replaced/extended with a React Native mobile application:

```text
                 ┌──────────────────┐
                 │  React Native App│
                 │ Android + iOS    │
                 └────────┬─────────┘
                          │
                       HTTP/API
                          │
                          ↓
                 ┌──────────────────┐
                 │  FastAPI Backend │
                 └────────┬─────────┘
                          │
                          ↓
                 ┌──────────────────┐
                 │    PostgreSQL    │
                 └──────────────────┘
```

---

# 🗺️ Development Roadmap

## Phase 0: Project Planning

- [ ] Define the first version of the application
- [ ] Decide the technology stack
- [ ] Create the GitHub repository
- [ ] Create the initial project structure
- [ ] Add `README.md`
- [ ] Add `.gitignore`
- [ ] Make the first Git commit

### Initial Stack

**Backend**
- Python
- FastAPI
- Uvicorn

**Web Frontend**
- HTML
- CSS
- JavaScript

**Database**
- PostgreSQL
- SQLAlchemy
- Alembic

**Mobile**
- React Native
- Expo
- TypeScript

**Version Control**
- Git
- GitHub

---

# Phase 1: Build the Smallest Possible Application

## Goal

Create a page containing a button:

```text
┌──────────────────────────┐
│                          │
│        Hello App         │
│                          │
│      [ Say Hello ]       │
│                          │
└──────────────────────────┘
```

When the user clicks the button:

```text
Say Hello
    ↓
Hello Arun 👋
```

After a short time:

```text
Hello Arun 👋
    ↓
disappears
```

### Tasks

- [ ] Create the frontend page
- [ ] Add a button
- [ ] Add JavaScript click handling
- [ ] Display `Hello Arun`
- [ ] Hide the message after a delay
- [ ] Test the application in the browser

---

# Phase 2: Create the FastAPI Backend

## Goal

Move the greeting logic to the backend.

Create an API such as:

```text
GET /hello
```

Expected response:

```json
{
  "message": "Hello Arun"
}
```

### Tasks

- [ ] Create Python virtual environment
- [ ] Install FastAPI
- [ ] Install Uvicorn
- [ ] Create the FastAPI application
- [ ] Create the `/hello` endpoint
- [ ] Run the FastAPI server
- [ ] Open FastAPI Swagger documentation
- [ ] Test `/hello`
- [ ] Understand request and response
- [ ] Commit changes

---

# Phase 3: Connect Frontend → Backend

## Goal

The button should call the FastAPI API instead of creating the message directly in JavaScript.

Flow:

```text
User
 ↓
Click "Say Hello"
 ↓
JavaScript
 ↓
GET /hello
 ↓
FastAPI
 ↓
JSON response
 ↓
JavaScript
 ↓
Display "Hello Arun"
 ↓
Disappear
```

### Tasks

- [ ] Use JavaScript `fetch()`
- [ ] Call the FastAPI `/hello` endpoint
- [ ] Receive JSON response
- [ ] Extract the message
- [ ] Display the message
- [ ] Hide the message after a delay
- [ ] Handle API errors
- [ ] Test frontend + backend together
- [ ] Commit changes

---

# Phase 4: Improve the Backend Structure

## Goal

Stop keeping everything in one Python file.

Create a clean backend structure.

Possible structure:

```text
backend/
├── app/
│   ├── main.py
│   ├── routes/
│   │   └── hello.py
│   ├── schemas/
│   │   └── hello.py
│   └── services/
│       └── hello_service.py
│
├── tests/
│   └── test_hello.py
│
├── requirements.txt
└── .env
```

### Tasks

- [ ] Separate API routes
- [ ] Separate schemas
- [ ] Separate business logic
- [ ] Add configuration
- [ ] Add environment variables
- [ ] Add basic tests
- [ ] Understand why each folder exists
- [ ] Test everything
- [ ] Commit changes

> We should not create folders just for the sake of architecture. Every new file should have a clear purpose.

---

# Phase 5: Add a Name

## Goal

Allow the user to enter a name.

Example:

```text
┌────────────────────────────┐
│                            │
│ Name: [ Arun            ]  │
│                            │
│       [ Say Hello ]        │
│                            │
└────────────────────────────┘
```

Result:

```text
Hello Arun 👋
```

Another example:

```text
Name: Ravi
```

Result:

```text
Hello Ravi 👋
```

### API

The backend should eventually support something like:

```text
GET /hello?name=Arun
```

Response:

```json
{
  "message": "Hello Arun"
}
```

### Tasks

- [ ] Add name input
- [ ] Validate empty names
- [ ] Send name to backend
- [ ] Validate the name in FastAPI
- [ ] Return personalized greeting
- [ ] Display the response
- [ ] Hide the message after a delay
- [ ] Test different names
- [ ] Commit changes

---

# Phase 6: Add PostgreSQL

## Goal

Introduce a real database.

Instead of only returning the greeting, store the names that users have entered.

Example:

```text
User enters:
Arun

       ↓

FastAPI

       ↓

PostgreSQL

       ↓

users table
```

Possible table:

```text
users
--------------------------------
id
name
created_at
```

### Tasks

- [ ] Install PostgreSQL
- [ ] Create development database
- [ ] Add database configuration
- [ ] Install SQLAlchemy
- [ ] Create database connection
- [ ] Create SQLAlchemy model
- [ ] Create `users` table
- [ ] Install Alembic
- [ ] Create first migration
- [ ] Run migration
- [ ] Insert user
- [ ] Read user
- [ ] Test database operations
- [ ] Commit changes

---

# Phase 7: Create Proper API Endpoints

## Goal

Turn the small application into a simple REST API.

Possible endpoints:

```text
POST   /users
GET    /users
GET    /users/{id}
DELETE /users/{id}

GET    /hello/{name}
```

### Tasks

- [ ] Design API endpoints
- [ ] Create request schemas
- [ ] Create response schemas
- [ ] Implement endpoints
- [ ] Validate requests
- [ ] Handle errors
- [ ] Test APIs using Swagger
- [ ] Test APIs using an API client
- [ ] Commit changes

---

# Phase 8: Improve the Web Frontend

## Goal

Create a clean small web interface.

Possible screens:

```text
Home
 │
 ├── Enter Name
 │
 ├── Say Hello
 │
 └── Greeting Message
```

### Tasks

- [ ] Improve HTML structure
- [ ] Add CSS
- [ ] Create reusable JavaScript functions
- [ ] Add loading state
- [ ] Add error state
- [ ] Add success state
- [ ] Connect all API calls
- [ ] Test on different screen sizes
- [ ] Commit changes

---

# Phase 9: Testing

## Goal

Make sure the application works reliably.

### Backend

- [ ] Test `/hello`
- [ ] Test valid names
- [ ] Test empty names
- [ ] Test invalid input
- [ ] Test database operations
- [ ] Test API errors

### Frontend

- [ ] Test button click
- [ ] Test API success
- [ ] Test API failure
- [ ] Test empty input
- [ ] Test message timeout
- [ ] Test mobile-sized browser

### Full Application

- [ ] Start PostgreSQL
- [ ] Start FastAPI
- [ ] Start frontend
- [ ] Test complete flow
- [ ] Fix bugs
- [ ] Commit final web version

---

# Phase 10: Start React Native

## Goal

Create the mobile client.

We will keep the FastAPI backend.

Only the client changes:

```text
BEFORE

HTML
CSS
JavaScript
   ↓
FastAPI
```

becomes:

```text
AFTER

React Native
   ↓
FastAPI
```

### Tasks

- [ ] Learn basic JavaScript/TypeScript syntax needed for React Native
- [ ] Learn React components
- [ ] Learn props
- [ ] Learn state
- [ ] Learn events
- [ ] Learn hooks
- [ ] Install Node.js
- [ ] Install Expo tooling
- [ ] Create React Native project
- [ ] Run the app
- [ ] Run it on Android
- [ ] Understand the project structure
- [ ] Commit changes

---

# Phase 11: Rebuild the UI in React Native

## Goal

Create the same application as a mobile app.

Screen:

```text
┌──────────────────────────┐
│                          │
│       Hello App          │
│                          │
│   [ Enter your name ]    │
│                          │
│      [ Say Hello ]       │
│                          │
└──────────────────────────┘
```

### Tasks

- [ ] Create main screen
- [ ] Add `View`
- [ ] Add `Text`
- [ ] Add `TextInput`
- [ ] Add `Button`
- [ ] Add state
- [ ] Handle button press
- [ ] Display greeting
- [ ] Hide greeting after delay
- [ ] Test on Android
- [ ] Commit changes

---

# Phase 12: Connect React Native → FastAPI

## Goal

Use the existing backend from the mobile application.

Flow:

```text
React Native
     │
     │ HTTP
     ↓
FastAPI
     │
     ↓
PostgreSQL
```

### Tasks

- [ ] Configure backend URL
- [ ] Send HTTP request from React Native
- [ ] Receive JSON
- [ ] Parse response
- [ ] Display greeting
- [ ] Handle loading
- [ ] Handle API errors
- [ ] Test Android → FastAPI
- [ ] Test complete application
- [ ] Commit changes

---

# Phase 13: Android Application

## Goal

Run the application as a real Android application.

### Tasks

- [ ] Test on Android emulator
- [ ] Test on physical Android device
- [ ] Fix network configuration
- [ ] Fix UI issues
- [ ] Test different screen sizes
- [ ] Test offline/error scenarios
- [ ] Create Android build
- [ ] Test release build

---

# Phase 14: Final Project Cleanup

### Tasks

- [ ] Clean unused files
- [ ] Clean unused dependencies
- [ ] Add `.gitignore`
- [ ] Add `.env.example`
- [ ] Update README
- [ ] Document setup instructions
- [ ] Document API endpoints
- [ ] Document project architecture
- [ ] Document how to run backend
- [ ] Document how to run web frontend
- [ ] Document how to run mobile app
- [ ] Add screenshots
- [ ] Final Git commit
- [ ] Push to GitHub

---

# 📁 Final Repository Structure

The final repository can look approximately like this:

```text
hello-arun-app/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── models/
│   │   ├── services/
│   │   └── database/
│   │
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
│
├── web/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── mobile/
│   ├── app/
│   ├── components/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 🧠 Learning Rule

For every implementation step, understand these five things:

```text
1. What are we building?
2. Why do we need it?
3. What does the code do?
4. How does the code connect to the rest of the application?
5. How do we test it?
```

Do **not** blindly copy code.

The objective is to understand the application well enough that you can eventually write the pieces yourself.

---

# 🔄 Development Cycle

For every feature:

```text
PLAN
 ↓
WRITE CODE
 ↓
RUN
 ↓
TEST
 ↓
UNDERSTAND
 ↓
FIX
 ↓
COMMIT
 ↓
NEXT FEATURE
```

Git commits should represent meaningful milestones.

Example:

```text
Initial project setup
Create FastAPI application
Add hello endpoint
Connect frontend to API
Add name input
Add PostgreSQL database
Add user API
Create React Native app
Build mobile greeting screen
Connect mobile app to API
Prepare Android build
```

---

# 🏁 Definition of Done

The project is complete when:

- [ ] A user can open the web application
- [ ] A user can enter their name
- [ ] Clicking the button calls the FastAPI backend
- [ ] FastAPI returns a greeting
- [ ] The greeting appears on the screen
- [ ] The greeting disappears automatically
- [ ] User information can be stored in PostgreSQL
- [ ] APIs are tested
- [ ] The same FastAPI backend works with React Native
- [ ] The React Native app runs on Android
- [ ] The project is documented on GitHub

---

# 🚀 Start Here

We will **not** build all of this at once.

Start with:

```text
Phase 0
   ↓
Phase 1
   ↓
Phase 2
   ↓
Phase 3
```

The first milestone is intentionally tiny:

```text
Click button
     ↓
FastAPI
     ↓
"Hello Arun"
     ↓
Show message
     ↓
Disappear
```

Once this works, we move to the next milestone.
