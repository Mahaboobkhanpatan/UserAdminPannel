import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddUser = () => {

	const [inputData,setInputData]=useState({
		name:"",
		email:"",
		role:""
	})
	const handleChange=(e)=>{
		setInputData({...inputData,[e.target.name]:e.target.value})
	}
	const navigate=useNavigate();
	// onsubmit to submit the form data 
	const handleSubmit=(e)=>{
		e.preventDefault();
		axios.post('http://localhost:5000/users',inputData)
		.then(res =>{
			console.log(res.data)
			alert("User added Successfully")
		})
		navigate('/users')

	}
  return (
	<div className='field_container'>
		<div className='form_container'>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name' className='label'>Name</label>
					<input type='text' name="name" className='input_field' onChange={handleChange}/>
				</div>
				<div>
					<label htmlFor='email' className='label'>Email</label>
					<input type='email' name="email" className='input_field' onChange={handleChange}/>
				</div>
				<div>
					<label htmlFor='role' className='label'>Role</label>
					<input type='text' name="role" className='input_field' onChange={handleChange}/>
				</div>
				<br/>
				<button className='submit_btn'>Submit</button>
			</form>
		</div>
	</div>
  )
}

export default AddUser