# Hello Arun App - Complete Development Journey

This document explains how we built the Hello Arun mobile application from
the beginning, including the backend, database, networking, React Native
mobile app, APK generation, problems we faced, and how we solved them.

---

# 1. Project Goal

We wanted to build a very small full-stack mobile application.

The application should:

1. Allow the user to enter a name.
2. Send the name from the mobile application to the backend.
3. Store the name in PostgreSQL.
4. Backend returns the saved name.
5. Mobile application displays:

   Hello Arun

---

# 2. Technologies Used

## Backend

- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Psycopg

## Database

- PostgreSQL

## Mobile

- React Native
- Expo
- TypeScript
- Expo Router

## Android Build

- EAS Build
- Android APK

## Development Environment

- Windows
- WSL Ubuntu
- Git
- GitHub

---

# 3. Project Structure

Our project was organized like this:

hello_arun/

├── backend/
│   ├── .venv/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── create_tables.py
│   ├── insert_user.py
│   ├── get_users.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   └── script.js
│
└── mobile/
    ├── src/
    │   └── app/
    │       └── index.tsx
    ├── app.json
    ├── eas.json
    └── package.json

---

# 4. Created the Backend Folder

We created the backend project:

    mkdir ~/hello_arun
    cd ~/hello_arun
    mkdir backend
    cd backend

The backend contains the Python FastAPI application.

---

# 5. Created Python Virtual Environment

We created a Python virtual environment:

    python3 -m venv .venv

Activated it:

    source .venv/bin/activate

The virtual environment keeps project dependencies separate from the
system Python installation.

---

# 6. Installed Backend Dependencies

Installed:

    pip install fastapi
    pip install uvicorn
    pip install sqlalchemy
    pip install psycopg[binary]

The main purpose of each package:

- FastAPI → Creates the API.
- Uvicorn → Runs the FastAPI application.
- SQLAlchemy → Communicates with the database.
- Psycopg → PostgreSQL database driver.

Saved the dependencies:

    pip freeze > requirements.txt

---

# 7. Created FastAPI Application

Created `main.py`.

Initially we created a simple endpoint:

    @app.get("/hello")
    def hello(name: str):
        return {"message": "Hello " + name}

This allowed us to test the backend before connecting the database.

Example:

    GET /hello?name=Arun

Response:

    {
        "message": "Hello Arun"
    }

---

# 8. Ran the FastAPI Server

Started FastAPI using:

    uvicorn main:app --reload

Later, because the application needed to be accessed from the phone,
we changed it to:

    uvicorn main:app --reload --host 0.0.0.0

`0.0.0.0` allows the server to listen on network interfaces instead of
only localhost.

---

# 9. Created PostgreSQL Database

Installed PostgreSQL and created the database:

    hello_arun

The database is running inside our WSL environment.

---

# 10. Created Database Connection

Created `database.py`.

The database connection uses:

    postgresql+psycopg://postgres:postgres@localhost/hello_arun

Created the SQLAlchemy engine:

    engine = create_engine(DATABASE_URL)

Also created the SQLAlchemy base:

    Base = declarative_base()

---

# 11. Created User Database Model

Created `models.py`.

The model represents the `users` table.

    class User(Base):
        __tablename__ = "users"

        id = Column(Integer, primary_key=True)
        name = Column(String)

The table contains:

- id
- name

---

# 12. Created the Database Table

Created `create_tables.py`.

Used:

    Base.metadata.create_all(engine)

This created the `users` table in PostgreSQL.

---

# 13. Tested Database Operations

We created scripts to insert and retrieve users.

For example:

    INSERT INTO users ...

and:

    SELECT * FROM users

This confirmed that Python could communicate with PostgreSQL.

---

# 14. Created Pydantic Schema

Created `schemas.py`.

    class UserCreate(BaseModel):
        name: str

This describes the expected request body when creating a user.

Example request:

    {
        "name": "Arun"
    }

---

# 15. Created GET /users Endpoint

Added:

    @app.get("/users")

This endpoint retrieves users from PostgreSQL.

Flow:

    Mobile/Web
        ↓
    FastAPI
        ↓
    SQLAlchemy
        ↓
    PostgreSQL
        ↓
    Users returned as JSON

---

# 16. Created POST /users Endpoint

Added:

    @app.post("/users")

This endpoint receives a name and stores it in PostgreSQL.

Example request:

    {
        "name": "Arun"
    }

Example response:

    {
        "id": 1,
        "name": "Arun"
    }

---

# 17. Tested FastAPI Using Swagger

FastAPI automatically provides API documentation.

Opened:

    http://127.0.0.1:8000/docs

Swagger allowed us to test:

- GET /hello
- GET /users
- POST /users

This helped us verify the backend independently before connecting the
mobile application.

---

# 18. Created the Web Frontend

Created:

    frontend/index.html
    frontend/script.js

The page contained:

- Text input
- Say Hello button
- Message area

The user enters a name and the frontend sends it to:

    POST /users

The returned name is displayed.

---

# 19. Ran the Web Frontend

Started the simple web server:

    python3 -m http.server 5500

The frontend was available at:

    http://127.0.0.1:5500

---

# 20. Added CORS

The frontend and backend run on different ports.

Therefore, we added FastAPI CORS middleware.

Allowed origin:

    http://127.0.0.1:5500

CORS is required for browser-based requests from another origin.

---

# 21. Created React Native / Expo Project

Created the mobile application using:

    npx create-expo-app@latest mobile

The application uses:

- React Native
- Expo
- TypeScript
- Expo Router

---

# 22. Created the Mobile UI

The mobile screen contains:

- Application title
- Name input
- Say Hello button
- Message area

The state is managed using React's:

    useState()

The entered name is stored in:

    name

The response message is stored in:

    message

---

# 23. Connected Mobile App to FastAPI

The mobile application uses:

    fetch()

to send a POST request.

The request contains:

    {
        "name": name
    }

The backend saves the name and returns the created user.

The mobile app then displays:

    Hello + data.name

---

# 24. First Mobile Networking Problem

## Problem

The mobile application could not connect to:

    172.17.48.58:8000

The error was:

    java.net.ConnectException:
    Failed to connect to /172.17.48.58:8000

## Why?

FastAPI was running inside WSL.

The phone could not directly access the WSL network address.

## Solution

We used Windows `portproxy` to forward traffic:

    Windows → WSL

---

# 25. Found the WSL IP Address

Used:

    hostname -I

We found:

    172.17.48.58

This is the WSL IP address.

---

# 26. Found the Windows Wi-Fi IP

Used:

    ipconfig

Initially, the Windows Wi-Fi address was:

    192.168.0.38

Later it changed to:

    192.168.0.4

This change became an important problem later.

---

# 27. Created Windows Port Forwarding

Created a forwarding rule:

    Windows port 8000
            ↓
    WSL port 8000

The original rule was:

    192.168.0.38:8000
            ↓
    172.17.48.58:8000

---

# 28. Added Windows Firewall Rule

Allowed TCP port 8000 through Windows Firewall:

    New-NetFirewallRule `
      -DisplayName "FastAPI 8000" `
      -Direction Inbound `
      -Protocol TCP `
      -LocalPort 8000 `
      -Action Allow

This allowed network traffic to reach FastAPI.

---

# 29. Verified Phone Networking

Opened the API from the phone browser:

    http://192.168.0.38:8000/users

The phone successfully received JSON.

This proved:

    Phone
      ↓
    Windows
      ↓
    WSL
      ↓
    FastAPI

was working.

---

# 30. Expo Go Worked

We tested the application using Expo Go.

The React Native application successfully opened on the phone.

This proved that the mobile UI itself was working.

---

# 31. Expo Web CORS Problem

When testing the React Native application in a browser,
the API request failed because of CORS.

The browser was running on a different origin.

Our backend CORS configuration allowed:

    http://127.0.0.1:5500

but Expo Web used a different origin.

## Important

This problem applies to browser requests.

Native Android applications do not use browser CORS in the same way.

---

# 32. Created an Installable Android APK

Installed EAS CLI:

    npm install --global eas-cli

Checked:

    eas --version

Then logged into Expo.

---

# 33. Configured EAS

Ran:

    eas build:configure

This created:

    eas.json

The Android application ID was:

    com.arun_aikaryashala.mobile

EAS also created Android signing credentials.

---

# 34. Used Preview Build

Our `eas.json` contains:

    "preview": {
        "distribution": "internal"
    }

The preview build produces an installable Android APK.

We used:

    eas build --platform android --profile preview

---

# 35. APK Worked Differently from Expo Go

## Problem

Expo Go could communicate with the development environment,
but the standalone APK could not communicate with our HTTP API.

The API URL was:

    http://192.168.0.38:8000/users

The FastAPI terminal showed no POST request.

## Cause

Android applications can block cleartext HTTP traffic.

Our API was using:

    http://

instead of:

    https://

---

# 36. Added Android Cleartext HTTP Support

Installed:

    npx expo install expo-build-properties

Added the Expo build property:

    "usesCleartextTraffic": true

inside the `expo-build-properties` plugin.

Verified the configuration using:

    npx expo config --type public

The output showed:

    expo-build-properties

with:

    usesCleartextTraffic: true

---

# 37. Another Networking Problem: Windows IP Changed

The phone browser stopped reaching:

    http://192.168.0.38:8000/users

We checked:

    ipconfig

and discovered that the laptop's current Wi-Fi IP was:

    192.168.0.4

The old IP was:

    192.168.0.38

Therefore, the old port-forwarding rule was pointing at an address
that was no longer the laptop's current Wi-Fi address.

---

# 38. Updated Windows Port Forwarding

Removed the old rule:

    netsh interface portproxy delete v4tov4 listenaddress=192.168.0.38 listenport=8000

Created the new rule:

    netsh interface portproxy add v4tov4 listenaddress=192.168.0.4 listenport=8000 connectaddress=172.17.48.58 connectport=8000

Verified with:

    netsh interface portproxy show v4tov4

The correct rule became:

    192.168.0.4:8000
            ↓
    172.17.48.58:8000

---

# 39. Tested Windows → WSL

Inside WSL:

    curl http://127.0.0.1:8000/users

worked successfully.

From Windows:

    curl http://172.17.48.58:8000/users

also worked successfully.

This proved:

    Windows → WSL → FastAPI

was working.

---

# 40. Tested Phone → Windows → WSL

From the phone browser:

    http://192.168.0.4:8000/users

successfully returned the users JSON.

This proved the network path was working again.

---

# 41. Final APK Problem

The phone browser worked, but the installed APK still did nothing.

We checked the mobile source code.

The APK source was still using:

    http://192.168.0.38:8000/users

This was the old IP address.

The correct address was:

    http://192.168.0.4:8000/users

---

# 42. Fixed the Mobile API URL

Changed:

    http://192.168.0.38:8000/users

to:

    http://192.168.0.4:8000/users

Verified using:

    grep -n "192.168" src/app/index.tsx

The correct result was:

    "http://192.168.0.4:8000/users",

---

# 43. Important APK Lesson

Changing the source code does NOT change an APK that has already
been installed.

The APK contains the code that existed when the APK was built.

Therefore, after changing the API URL, we must build a new APK:

    eas build --platform android --profile preview

Then install the new APK.

---

# 44. Current Architecture

Our current application architecture is:

    ┌─────────────────────┐
    │     Android APK     │
    │   React Native UI   │
    └──────────┬──────────┘
               │
               │ HTTP
               ↓
    ┌─────────────────────┐
    │   Windows Laptop    │
    │    192.168.0.4      │
    └──────────┬──────────┘
               │
          portproxy
               │
               ↓
    ┌─────────────────────┐
    │      WSL Ubuntu     │
    │   172.17.48.58      │
    │                     │
    │      FastAPI        │
    └──────────┬──────────┘
               │
               ↓
    ┌─────────────────────┐
    │     PostgreSQL      │
    │     hello_arun      │
    └─────────────────────┘

---

# 45. Current Requirements for Testing

Because this is currently a local development setup:

1. Laptop must be running.
2. PostgreSQL must be running.
3. FastAPI must be running.
4. Phone and laptop must be on the same Wi-Fi network.
5. Windows port forwarding must be configured.
6. APK must contain the current laptop IP address.

---

# 46. Database

The database is:

    hello_arun

The main table is:

    users

We can inspect it using:

    psql -U postgres -d hello_arun

Then:

    SELECT * FROM users;

---

# 47. Complete Data Flow

When the user enters:

    Arun

and presses:

    SAY HELLO

the following happens:

    1. React Native reads the input.
            ↓
    2. fetch() sends POST /users.
            ↓
    3. Windows receives the request.
            ↓
    4. portproxy forwards it to WSL.
            ↓
    5. FastAPI receives the request.
            ↓
    6. Pydantic validates the request.
            ↓
    7. SQLAlchemy creates the database query.
            ↓
    8. PostgreSQL stores the user.
            ↓
    9. FastAPI returns the created user.
            ↓
   10. React Native receives the JSON.
            ↓
   11. App displays:
   
       Hello Arun

---

# 48. Problems We Faced

| Problem | Cause | Solution |
|---|---|---|
| Phone could not reach FastAPI | WSL networking | Windows portproxy |
| Windows could not initially use phone address | Wrong network path | Tested WSL and Windows separately |
| Phone browser could not reach API | Old laptop IP | Updated portproxy |
| Laptop IP changed | DHCP/network change | Checked `ipconfig` and updated IP |
| APK did nothing | API request never reached FastAPI | Debugged network and API URL |
| Expo Web API request failed | Browser CORS | CORS configuration / native app doesn't use browser CORS |
| Standalone APK failed while Expo Go worked | Android cleartext HTTP restriction | `usesCleartextTraffic: true` |
| APK continued using old IP | APK contained old source code | Changed URL and rebuilt APK |
| Empty database rows appeared | Earlier tests submitted empty names | Database contained those test rows |

---

# 49. Most Important Lessons

## Backend

A mobile application normally does not directly communicate with
the database.

Correct architecture:

    Mobile
      ↓
    API
      ↓
    Database

Not:

    Mobile
      ↓
    Database

---

## API

FastAPI acts as the bridge between the mobile application and database.

---

## Networking

`localhost` means the current machine.

For example:

    127.0.0.1

from the phone means:

    the phone itself

It does NOT mean the laptop.

Therefore, the phone needed the laptop's network IP:

    192.168.0.4

---

## WSL

WSL has its own network address:

    172.17.48.58

Therefore, we needed forwarding between:

    Windows → WSL

---

## APK

An APK is a built version of the mobile application.

Changing source code requires creating a new APK if we want the
installed APK to contain those changes.

---

## Local Development vs Production

Our current setup is for development.

Current:

    Phone
      ↓
    Local Wi-Fi
      ↓
    Laptop
      ↓
    WSL FastAPI
      ↓
    PostgreSQL

A production application would normally use:

    Phone
      ↓
    Internet
      ↓
    HTTPS API
      ↓
    Cloud Server
      ↓
    Cloud PostgreSQL

Then the laptop would not need to remain running.

---

# 50. Useful Commands

## Start backend

    cd ~/hello_arun/backend
    source .venv/bin/activate
    uvicorn main:app --reload --host 0.0.0.0

## Find WSL IP

    hostname -I

## Find Windows IP

    ipconfig

## Check port forwarding

    netsh interface portproxy show v4tov4

## Test FastAPI inside WSL

    curl http://127.0.0.1:8000/users

## Test FastAPI from Windows

    curl http://172.17.48.58:8000/users

## Test database

    psql -U postgres -d hello_arun

## View users

    SELECT * FROM users;

## Check mobile API address

    grep -n "192.168" src/app/index.tsx

## Check Expo configuration

    npx expo config --type public

## Build Android APK

    eas build --platform android --profile preview

---

# 51. Final Status

The Hello Arun application now consists of:

- PostgreSQL database
- FastAPI backend
- React Native mobile application
- Android APK build configuration
- Local network communication between phone and laptop
- Windows-to-WSL port forwarding

The main remaining development direction is to continue improving the
mobile application and eventually move the backend and PostgreSQL
database to a publicly accessible production environment.
