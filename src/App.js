import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Users from './components/users/Users';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddUser from './components/users/AddUser';
import UpdateUser from './components/users/UpdateUser';


function App() {
  return (
    <Router>
    <div className='navbar_container'>
      <nav className='navbar' >
        <ul className='navlist' >
          <li className='navitem'>
            <Link to="/" className='navlink'>Dashboard</Link>
          </li>
          <li className='navitem'  >
            <Link to="/users" className='navlink'>Users</Link>
          </li>
        </ul>
      </nav>
      <div >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/updateUser/:id" element={<UpdateUser />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
