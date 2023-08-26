import React, {useState} from 'react'
import {Link,Navigate} from 'react-router-dom'
import axios from 'axios'
import './index.css';

const Login = () => {
  const [auth,setauth]=useState(false);
    const [data,setData]=useState({
        email:'',
        password:''
      })
      const {email,password}=data;

      const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value})
      }
      const submitHandler = e =>{ 
        e.preventDefault();
        axios.post('http://localhost:5000/login',data).then(
            res => {localStorage.setItem('token',res.data.token); setauth(true)} //storing in local storage
        )
      }
     
      if(auth){
        return <Navigate to='/dashboard' />
      }

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
             <h1 className='large text-primary'>Sign In</h1>
             <p className='lead'><i className='fas fa-user'></i>Sign in to  Your Account</p>
             <form className="form" onSubmit={submitHandler}>
              <div className='form-group' >
                  <input type="text" className='type-1' placeholder="Email Address" name='email' onChange={changeHandler} defaultValue={email} ></input><br></br>
                </div>   
                  <div className='form-group' >
                  <input type="password"  className='type-1' placeholder="Password" name='password' defaultValue={password} onChange={changeHandler}></input><br></br>
              </div>
                 <input type="submit" className='btn btn-primary' name="submit" value="Login"></input>
              </form>   
              <p className='my-1'>
                  Don't have an Account? <Link to='/register'>Sign Up</Link>
              </p> 
              </section>     
        </div>
        
      )
    }

export default Login
