# Real-Time Poll Rooms

A full-stack web application that allows users to create polls, share them using a unique link, and view voting results in real time. The system includes fairness mechanisms to prevent duplicate and abusive voting and uses persistent storage to ensure polls and votes remain available even after refresh or restart.

This project demonstrates end-to-end full-stack development including REST API design, real-time communication, database integration, and frontend UI development.

---

## Features

### Poll Creation

Users can create a poll by entering a question and at least two options. After creation, the system generates a unique shareable link that can be used to access the poll.

Example:

```
http://localhost:3000/poll/{pollId}
```

---

### Join Poll via Shareable Link

Anyone with the poll link can open the poll and cast a single vote. No login or account is required.

---

### Real-Time Result Updates

When a vote is cast, the results update instantly for all users currently viewing the poll. This is implemented using Socket.io to enable real-time communication between the server and clients.

This ensures a smooth and interactive user experience without requiring manual page refresh.

---

### Fairness and Anti-Abuse Mechanisms

To reduce duplicate and abusive voting, the system implements two fairness controls:

#### 1. Cookie-Based Voter Identification

Each browser is assigned a unique voterId stored in cookies when the user votes for the first time.

The backend checks this voterId before allowing a vote.

If the voterId already exists in the poll’s voter list, the vote is rejected.

This prevents multiple votes from the same browser.

---

#### 2. IP-Based Vote Limiting

The system also tracks the IP address of each voter.

Each IP address is allowed a limited number of votes per poll. This helps prevent abuse from users attempting to vote multiple times by clearing cookies or using private browsing.

This approach balances fairness while still allowing multiple users on the same network to participate.

---

### Persistent Data Storage

All polls and votes are stored in MongoDB Atlas.

This ensures:

* Polls remain available after page refresh
* Votes are permanently stored
* Poll links remain functional over time
* No data is lost on server restart

---

### Modern and Responsive UI

The frontend uses TailwindCSS to provide a clean and responsive interface.

UI features include:

* Centered card layout
* Interactive buttons
* Real-time vote percentage display
* Visual vote progress bars
* Mobile-friendly design

---

## Tech Stack

### Frontend

* React.js
* TailwindCSS
* Axios
* Socket.io Client
* React Router

### Backend

* Node.js
* Express.js
* Socket.io
* Cookie-parser
* UUID
* Mongoose

### Database

* MongoDB Atlas

### Deployment (optional)

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

---

## Project Structure

```
realtime-poll-app/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CreatePoll.js
│   │   │   └── SessionPoll.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── backend/
│   ├── models/
│   │   └── Poll.js
│   ├── routes/
│   │   └── pollRoutes.js
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## System Workflow

### Poll Creation Flow

1. User enters poll question and options
2. Frontend sends request to backend API
3. Backend creates poll and stores it in MongoDB
4. Backend returns pollId
5. Frontend generates shareable link

---

### Voting Flow

1. User opens poll link
2. Poll data is fetched from backend
3. User selects an option and votes
4. Backend checks:

   * voterId cookie
   * IP address vote count
5. If valid, vote is recorded
6. Backend emits real-time update via Socket.io
7. All connected users see updated results instantly

---

## Edge Cases Handled

* Duplicate voting from same browser prevented
* Excessive voting from same network limited
* Invalid poll ID handled safely
* Invalid vote requests handled safely
* Data persistence across refresh
* Real-time synchronization across users

---

## Limitations

The system prevents duplicate voting from the same browser and limits voting from the same IP address.

However, users may still vote again using:

* Different devices
* Different networks
* VPN services

Full prevention would require user authentication.

---

## Installation and Setup

### Backend Setup

Navigate to backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Create .env file:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start backend server:

```
npx nodemon server.js
```

---

### Frontend Setup

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start frontend:

```
npm start
```

---

## Future Improvements

Possible enhancements include:

* User authentication system
* Poll expiration feature
* Vote analytics dashboard
* Improved mobile UI
* Poll management dashboard

---

## Conclusion

This project demonstrates practical implementation of a real-time polling system with fairness protection, persistent storage, and modern frontend design.

It showcases skills in full-stack development, real-time communication, database management, and system design.

---
