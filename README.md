           Admin Panel for User Management and Registration Analytics


This project is an Admin Panel built with React.js for managing users and visualizing user registration analytics. It includes features like CRUD (Create, Read, Update, Delete) operations on users and displays metrics related to user registrations over different time frames. The backend is simulated using JSON Server.


User Management:

Display a list of all users with key information (name, email, role).
Search and sort users by name, email, or role.
Perform CRUD operations:
Create: Add new users.
Update: Edit existing user details.
Delete: Remove users from the list


Analytics Dashboard:

Display key user registration metrics:
Number of users registered in the last 24 hours.
Number of users registered in the last 7 days.
Number of users registered in the last 30 days.
Visual representation of registration trends using Chart.js.


Responsive Design:

Works on desktops, tablets, and mobile devices.

Tech Stack
Frontend: React.js.  
Backend: JSON Server,  start json server:  npx json-server --watch db.json --port 5000
Charting: Chart.js with react-chartjs-2.  npm install  Chart.js  react-chartjs-2
HTTP Client: Axios.  npm install axios


The app will be running at http://localhost:3000.  json server sets at --port 5000

User Management
View a list of users in the admin panel.
Use the search bar to filter users by name or email.
Add a new user by clicking the "Add User" button and filling in the form. use the "Edit" and "Delete" buttons for respective operations.
Analytics Dashboard
View the number of users registered in the last 24 hours, 7 days, and 30 days.
Check the registration trends on a line chart, which is dynamically updated based on user data.


├── public
│   ├── index.html
├── src
│   ├── components
│   │   ├── UserList.js         # Displays the list of users
│   │   ├── UserForm.js         # Form for creating/updating users
│   │   ├── UserDetail.js     
│   │   ├── Dashboard.js        # User registration analytics
│   ├── App.js                  # Main App component
│   ├── index.js                # React entry point
├── db.json                     # JSON Server database
├── package.json                
└── README.md



Dependencies
React: Frontend framework.
Axios: For making HTTP requests.
react-chartjs-2: For charting and data visualization.
JSON Server: Simulated backend API.
react-route-dom : for single page routings


- `GET http://localhost:5000 /users` – Fetch all users
- `POST http://localhost:5000/users` – Add a new user
- `PUT http://localhost:5000 /users/:id` – Update an existing user
- `DELETE http://localhost:5000/users/:id` – Delete a user