import React,{useState} from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'
import './index.css';

const Indprofile = () => {
  const params=useParams();
  const [rating,setrating]=useState();
  const [taskprovider,settaskprovider]=useState();

  const submitHandler = e =>{
    axios.get('http://localhost:5000/myprofile',{
      headers:{
          'x-token' : localStorage.getItem('token')
      }
}).then(res =>settaskprovider(res.data.fullname) )

    let review = {
      taskprovider,
      taskworker:params.id,
      rating,
    }
    axios.post('http://localhost:5000/addreview',review,{
          headers:{
            'x-token' : localStorage.getItem('token')
          }
    }).then(res =>alert(res.data) )
  }

  return (
    <div>
        <nav className="navbar">
        <h1>
            <Link to='/'className="navbar__link">Developers Hub</Link>
        </h1>
        <ul>
          <Link to="/myprofile" className='navbar__link'>My Profile</Link>
          <Link to="/login" className='navbar__link'>LogOut</Link>
        </ul>
        </nav>
           <section className="container">
            <Link to = "/dashboard"  className='btn btn-primary'>Back to Profile</Link>

        <div className='profile-grid my-1'> 

           <div className='profile-top bg-primary p-2'>
              <img 
                src="https://static.vecteezy.com/system/resources/thumbnails/009/734/564/small/default-avatar-profile-icon-of-social-media-user-vector.jpg"
                className="round-img" 
                alt=""
                />
          
            <h1 className='large'>{params.fullname}</h1>
            <p className='lead'>{params.email}</p>
            <p className='large'>{params.skill}</p>
            </div>

            <div className='profile-github'> 
                <h2 className='text-primary my-1'>
                    <i className='fab fa-github'></i>Reviews and Ratings
               </h2> 
                  <div className='repo bg-white p-1 my-1'>
                      <div>
                        <h4>Enter your reviews</h4>
                        <form className='form' autoComplete='off' onSubmit={submitHandler}>
                            <div className='form-group'>
                                <input 
                                  type="text"
                                  placeholder="Enter your rating out of 5"  
                                  name="rating"
                                  onChange={e => setrating(e.target.value)}
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
    </div>
  )
}

export default Indprofile
