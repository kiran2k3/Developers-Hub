import React,{useState,useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import './index.css';

const Dashboard = () => {
  const [data,setdata]=useState([]);
  useEffect(()=> {
    axios.get('http://localhost:5000/allprofiles',{
      headers : {
        'x-token' : localStorage.getItem('token')
      }
     }).then(res => setdata(res.data))
     .catch((error) => {
      console.error(error);
    })
},[])
if(!localStorage.getItem('token')){
     return <Navigate to='/login' />
}
  return (
    <div>
        <nav className='navbar bg-dark'>
        <h1> <Link to='/'><i className='fas fa-code'></i> Developers Hub</Link></h1>
        <ul>
          <li><Link to="/myprofile" >My Profile</Link></li>
         <li> <Link to="/login"  onClick={()=>localStorage.removeItem('token')}>LogOut</Link></li>
        </ul>
        </nav>
       
       <section className="container">
            <h1 className="large text-primary">Developers Dashboard</h1>
            <p className='lead'> 
              <i className="fab fa-connectdevelop"></i>Browse and connect with developers
            </p>
         <div className='profiles'> 
         { data.length>=1 ? 
           data.map(profile =>
            <div className='profile bg-light'>
               <img 
                 src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                 className="round-img" 
                 alt=""
                 />
           <div >
             <h2>{profile.fullname}</h2>
             <p>{profile.email}</p>
             <p>{profile.mobile}</p>
             <Link to={`/indprofile/${profile.fullname}/${profile.email}/${profile.skill}/${profile._id}`} className='btn btn-primary'> View Profile</Link>
           </div>
            <ul>
               {profile.skill.split(",").map(skill => 
                   <li className='text-primary'>
                   <i className="fas fa-check"></i>{skill}
                 </li>
                )}            
            </ul>
         </div>
          )
         :null }
           
          </div>
       </section>
    </div>
  )
}

export default Dashboard
