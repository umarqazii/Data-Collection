import React, { useEffect, useState } from 'react';
import Typed from 'typed.js';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  } from 'mdb-react-ui-kit';
import axios from 'axios';
import logo from '../assets/mind-sight.png'
import '../App.css';
 // Import your image

function Login() {

    const [rollno, setRollno] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:4000/login', {
      userID: rollno
    })
      .then((response) => {
        console.log(response);
        window.location.href = '/closedendedquestions';
      })
      .catch((error) => {
        console.log(error);
      });

  };
  

  return (
    <div className='App'>
      
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Please enter your Roll No</p>

              <MDBInput label='Username' wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' id='formControlLg' type='text' size="lg" onChange={(e) => setRollno(e.target.value)} />
              
              <button className='mx-2 px-5 custom-btn' type='button' onClick={handleSubmit}>
                Login
              </button>


              <div>
                <br></br><br></br>
                <MDBCheckbox className="text-white-50 fw-bold" label='Remember Me' />
              </div>
            </MDBCardBody>
          
    </div>
  );
}

export default Login;
