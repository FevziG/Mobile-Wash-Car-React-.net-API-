    import React, { useState } from 'react';
    import {useNavigate, Link} from 'react-router-dom';
    import './loginPage.css'
    import 'bootstrap/dist/css/bootstrap.min.css';
    import axios from 'axios';


function LoginPage() {
    const[userName, setUserName]= useState('');
    const[password, setPassword]= useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    // ------------------------------
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try{
        const response = await axios.post('/api/Login/login', {
          userName,
          password,
        });
        if(response.data.success){
          const userRole = response.data.userType;



          if(userRole === 'User'){
            localStorage.setItem('userId', response.data.user.id);
            navigate('/userPage')
          }

          else if(userRole === 'Admin'){
            localStorage.setItem('adminId', response.data.admin.id);
            navigate('/adminPage')
          }

          else if(userRole === 'Worker'){
            localStorage.setItem('workerId', response.data.worker.id);
            navigate('/workerPage')
          }
          else{
            console.log(response.data,'asdsadadsadsada', response.data.role)
            alert('BU KİM ROLÜ YOK')
          }

        }
          else{
           alert('kullancı adı veya şifre yanlış')
         }
      
        }      
      catch(error){
        console.log('giriş yapılamadı',error)
      }
    }
    
    //--------------------------------
  return (
    <div className='login-container'>
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <input className='form-control'
          type='text'
          placeholder='Write your username'
          value={userName}
          onChange={(e)=> setUserName(e.target.value)}
          
          />
          <input className='form-control'
          type='password'
          placeholder='Write your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <button className='btn btn-outline-secondary'
          type='submit'> Login </button>
                     
         {errorMessage && <p className="error">{errorMessage}</p>}


          <p className='context-register'>
              <Link to = '/register'> Register</Link>
          </p>
        </form>
        
        
    </div>
  )
}

export default LoginPage;
