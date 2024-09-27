import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const UpdateUser = () => {
	const {id}=useParams();
	const [inputData,setInputData]=useState({
		name:"",
		email:"",
		role:""
	})
	// user updating functionality by using the id from the param
	useEffect(()=>{
		if(id){
			console.log(id)
			axios.get('http://localhost:5000/users/'+id)
		.then(res=> {setInputData(res.data)
			console.log(res.data)
		})
		.catch(err=> console.log(err))
		}
	},[id])
	const handleChange=(e)=>{
		setInputData({...inputData,[e.target.name]:e.target.value})
	}
	const navigate=useNavigate();
	const handleSubmit=(e)=>{
		e.preventDefault();
		axios.put('http://localhost:5000/users/'+id,inputData)
		.then(res =>{
			console.log(res.data)
			alert("User updated Successfully")
		})
		navigate('/users')  // after successful updation navigating to user list 

	}
  return (
	<div className='field_container'>
		<div className='form_container'>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>Name</label>
					<input type='text' name="name" className='input_field' onChange={handleChange} value={inputData.name}/>
				</div>
				<div>
					<label htmlFor='email'>Email</label>
					<input type='email' name="email" className='input_field' onChange={handleChange} value={inputData.email}/>
				</div>
				<div>
					<label htmlFor='role'>Role</label>
					<input type='text' name="role" className='input_field' onChange={handleChange} value={inputData.role}/>
				</div>
				<br/>
				<button className='submit_btn'>Submit</button>
			</form>
		</div>
	</div>
  )
}

export default UpdateUser