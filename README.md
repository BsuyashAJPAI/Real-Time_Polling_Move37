**Task: Move27BackendPoll - Real-Time Polling Application**

**Description**
Move27BackendPoll is a backend service for a real-time polling application. Users can:
- Create polls  
- Vote on polls  
- See live results instantly via WebSockets  

The backend is built with **Node.js**, **Express.js**, and **Prisma** for database management.

-----------------------------------------------------------------------

**Requirements**
- Node.js >= 18
- npm
- Database: PostgreSQL or SQLite (configured via Prisma)

-------------------------------------------------------------------------

**Installation**
1. Clone the repository
2. Install dependencies
3. Set up Prisma
4. Generate Prisma client
5. Running the Application

---------------------------------------------------------------------------

**API Endpoints**
1. Create a Poll
2. Vote on a Poll
3. Get Poll Details

--------------------------------------------------------------------------

**Folder structure**
|- prisma/
│ └─ schema.prisma
|- src/
│ |- server.js
│ |- app.js
│ |- db.js
│ |- routes/
│ │ |- users.js
│ │ |- polls.js
│ │ |- votes.js
│ |- utils/
│ |- broadcast.js 

And other files

----------------------------------------------------------------------------

**Testing**
using Postman
