import { useState, useEffect } from 'react';
import { useNavigate } from "@remix-run/react";
import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('http://localhost:3000/api/userLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formJson),
        });

        if (response.ok) {
            const data = await response.json();
            if(data[0].userLoggedIn === true){
                alert(`Hi, ${data[0].email} logged in successfully.`);
                localStorage.setItem('isLoggedIn', data[0].userLoggedIn);
                localStorage.setItem('isEmail', data[0].email);
                navigate('/');
            }else{
                alert('Logged in unsuccessful, try again.');

            }
        } else {
            alert('Invalid credentials, try again!');
            localStorage.setItem('isLoggedIn', 'false');
            localStorage.setItem('isEmail', 'null');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the form');
    }
  }

  return (
    <>
        <MyMenu />
        <div className='mt-10 w-1/3 flex flex-col m-auto'>
        <h2 className='text-center font-bold text-lg rounded-lg p-3 bg-blue-200'>เข้าสู่ระบบ</h2>
        <form method='POST' onSubmit={handleLogin}>
            <label className="p-2 font-bold">อีเมล (E-mail):</label><br />
            <input type="email" placeholder="Email" 
            className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200 sm:text-sm sm:leading-6" 
            autoFocus name='userEmail' required /><br />
            <label className="p-2 font-bold">รหัสผ่าน (Password):</label><br />
            <input type="password" placeholder="Password" 
            className="p-2 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200 sm:text-sm sm:leading-6" 
            name='userPasswd' required /><br />
            <div className='m-auto w-1/2'>
            <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 text-center p-2 mt-1 rounded-lg w-24'>เข้าสู่ระบบ</button>
            <button type="reset" className='text-white bg-blue-400 hover:bg-blue-400 text-center p-2 mt-1 ms-2 rounded-lg w-24'>เคลียร์</button>
            </div>
        </form>
        </div>
        <MyFooter />
    </>
  );
}

export default UserLogin;