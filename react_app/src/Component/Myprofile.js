import React from 'react'

function Myprofile() {
 // Retrieve user data from local storage or state
 const userData = JSON.parse(localStorage.getItem('user'));

 return (
   <div>
    <h1>My Profile</h1> <span className='w-100 rounded-0 text-decoration-none'>
                            <a href="/">Sign out</a>
                        </span>
     <p><center>  Welcome, {userData.firstname +" "+ userData.lastname}!</center></p>
     <p><center>Email: {userData.email}</center></p>
   </div>
   
 );
};


export default Myprofile