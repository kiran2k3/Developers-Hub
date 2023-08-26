import React,{useState,useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
import axios from 'axios'
import './index.css';

const Myprofile = () => {

    const [data,setdata]=useState([]);
    const [review,setreview]=useState([]);
    useEffect(()=> {
      axios.get('http://localhost:5000/myprofile',{
        headers : {
          'x-token' : localStorage.getItem('token')
        }
       }).then(res => setdata(res.data))
       .catch((error) => {
        console.error(error);
      })
      axios.get('http://localhost:5000/myreview',{
        headers : {
          'x-token' : localStorage.getItem('token')
        }
       }).then(res => setreview(res.data))
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
          <Link to="/myprofile" >My Profile</Link>
          <Link to="/login"  onClick={()=>localStorage.removeItem('token')}>LogOut</Link>
        </ul>
        </nav>
         {data && 
           <section className="container">
            <Link to = "/dashboard"  className='btn btn-primary'>Back to Profiles</Link>

        <div className='profile-grid my-1'> 

           <div className='profile-top bg-primary p-2'>
              <img 
                src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                className="round-img my-1" 
                alt=""
                />
          
            <h1 className='large'>{data.fullname}</h1>
            <p className='lead'>{data.email}</p>
            <p>{data.mobile}</p>
            </div>
            <div className='profile-github'> 
                <h2 className='text-primary my-1'>
                    <i className='fab fa-github'></i>Reviews and Ratings
               </h2>
            <div className='repo bg-white p-1 my-1'>
                {review ?
                   review.map(review =>
                    <div className='repo bg-white p-1 my-1'>
                    <h4>
                        <Link to="#">{review.taskprovider}</Link>
                    </h4>
                      <p>
                        {review.rating}/5
                      </p>
                  </div>
                    )
                    :
                    <p>No Review added yet</p>
                }
             </div>
                  <div className='repo bg-white p-1 my-1'>
                      <div>
                        <h4>Enter your reviews</h4>
                        <form className='form' autoComplete='off'>
                            <div className='form-group'>
                                <input 
                                  type="text"
                                  placeholder="Enter your rating out of 5"  
                                  name="rating"
                                  required  
                                />
                            </div>
                            <input type="submit" className='btn btn-primary' value="Add Rating "/>
                        </form>
                      </div>
                  </div>  
                </div>
            </div>
      </section> 
     }
    </div>
  )
}

export default Myprofile
