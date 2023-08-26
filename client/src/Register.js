import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './index.css';

const Register = () => {
  
  const [data,setdata]=useState({
    fullname:'',
    email:'',
    mobile:'',
    skill:'',
    password:'',
    confirmpassword:''
  })
  const changeHandler = e=>{
    setdata({...data,[e.target.name]:e.target.value})
  }
  const submitHandler = e=>{
    e.preventDefault();
    console.log(data);
  }
  const {fullname,email,mobile,skill,password,confirmpassword}=data;
  return (
    <div>
      <nav className='navbar bg-dark'> 
        <h1> <Link to='/'><i className='fas fa-code'></i> Developers Hub</Link></h1>
        <ul>
          <li><Link to='/register'>Register</Link></li>
          <li><Link to='/login'>Login</Link></li>
       </ul>
      </nav>
      <section className='container'>
         <h1 className='large text-primary'>Sign Up</h1>
         <p className='lead'><i className='fas fa-user'></i>Create Your Account</p>
         <form className="form" onSubmit={submitHandler}>
          <div className='form-group'>
          <input type='text' placeholder="Name" name='name' defaultValue={fullname} onChange={changeHandler}></input><br></br>
          </div>
          <div className='form-group'>
            <input type='text' placeholder="Email" name='email' defaultValue={email} onChange={changeHandler}></input><br></br>
          </div>
          <div className='form-group'>
          <input type='text' placeholder="Mobile No" name='mobile' defaultValue={mobile} onChange={changeHandler}></input><br></br>
          </div>
          <div className='form-group'>
          <input type='text' placeholder="Skill" name='skill' defaultValue={skill} onChange={changeHandler}></input>
          <small>Please provide skills by separating with comma <b>( , )</b></small><br></br>
          </div>
          <div className='form-group'>
          <input type="password" placeholder="Password" name='password' defaultValue={password} onChange={changeHandler}></input><br></br>
          </div>
          <div className='form-group'>
          <input type="password" placeholder="Confirm Password" name='confirmpassword' defaultValue={confirmpassword} onChange={changeHandler}></input><br></br>
          </div>
             <input type='submit' className='btn btn-primary' name="submit" value="Register"></input>
          </form>   
          <p>
              Already have an Account? <Link to='/login'>Sign In</Link>
          </p>
       </section>    
    </div>
  )
}

export default Register
