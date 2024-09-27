import React, { useState, useEffect } from 'react';
import UserTable from './UserTable';
import axios from 'axios';
import searchUser from '../../hooks/searchUser';
import filterUser from '../../hooks/filterUser';
import { Link } from 'react-router-dom';
import './user.css'

const Users = () => {
  const [userData, setUserData] = useState([]);   // State to store fetched user data
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [filteredData, setFilteredData] = useState([]); // State for filtered data
  const [selectRoleForFilter, setSelectRoleForFilter] = useState("") // state to store selected role for filter
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [usersPerPage] = useState(5); // Number of users per page

  // Fetching user data 
  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => {
        setUserData(response.data); 
        setFilteredData(response.data); // Initially display all users
      })
      .catch(err => console.log(err));
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchInput) {
      const searchResult = searchUser(searchInput, userData);
      setFilteredData(searchResult);  // Set filtered data based on search
    }
    if (selectRoleForFilter) {
      const filterResult = filterUser("role", selectRoleForFilter, userData);
      setFilteredData(filterResult)
    } 
  }, [searchInput, selectRoleForFilter, userData]);

  // onchange fucntion for  getting the search input
  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput)
  };
  // onchange for  filtering by role
  const handleFilter = (e) => {
    const selectedValue = e.target.value
    setSelectRoleForFilter(selectedValue === 'All' ? '' : selectedValue);
    console.log("selected role filter", selectedValue)
  }

  //unique roles using Set to show in the dropdown
  const uniqueRoles = [...new Set(userData.map(user => user.role))];

   // Pagination logic
   const indexOfLastUser = currentPage * usersPerPage;
   const indexOfFirstUser = indexOfLastUser - usersPerPage;
   const currentUsers = filteredData.slice(indexOfFirstUser, indexOfLastUser);
 
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
   const totalPages = Math.ceil(filteredData.length / usersPerPage);


  return (
    <div className='container'>
      <div className='heading_addbtn'>
      <div className='header_left'>
        <h2>List of all the users</h2>
        <span>Total Users : {userData.length}</span>
      </div>
      <div className='header_right'>
        <Link to="/addUser"><button className='add_user_btn'>+ Add User</button></Link>
      </div>

      </div>
        <div className='search_container'>
        <div className='search_bar'>
          <input
            type="text"
            placeholder="Search Users..."
            className="search_bar"
            value={searchInput}
            onChange={handleSearch}
          />
        </div>
        <div className='filter_dropdown'>
          <label htmlFor="roleFilter"> </label>
          <select
            id="roleFilter"
            className="role_dropdown"
            value={selectRoleForFilter}
            onChange={handleFilter}
          >
            <option value="">All Roles</option>
            {uniqueRoles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='user_table'>
        <UserTable userData={currentUsers} setUserData={setUserData} /> {/* Passing filtered data to UserTable */}
      </div>
      {/* Pagination Controls */}
      <div className='pagination'>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
