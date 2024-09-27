import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './user.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the icons

const UserTable = ({userData,setUserData}) => {

  // delete functionality
  const handleDelete=(id)=>{
    // confirm delete alert for avoiding accidental deletion
    const confirm = window.confirm("confirm delete")
    if(confirm){
      axios.delete('http://localhost:5000/users/'+id)
      .then(res=>{
        alert("user deleted successfully")  
        const updatedUsers = userData.filter(user => user.id !== id);
          setUserData(updatedUsers);  // updating the state after successful deletion 
      })
      .catch(err=>{
        alert(err,"unable to delete user")
      })
    }

  }

  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
		  <th>Edit</th>
		  <th>Delete</th>
        </tr>
      </thead>
      <tbody>
		{userData.map((user)=>(
			<tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
			<td>
				<Link to = {`/updateUser/${user.id}`}><button> <FontAwesomeIcon icon={faEdit} /> </button></Link>
			</td>
			<td>
      <button onClick={e=>handleDelete(user.id)}> <FontAwesomeIcon icon={faTrash} /></button>
			</td>
          </tr>
		))}  
      </tbody>
    </table>
  );
};

export default UserTable;
