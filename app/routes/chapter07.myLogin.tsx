import { useState, useEffect } from 'react';
import { useNavigate } from "@remix-run/react";

function MyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Replace this with actual authentication logic (e.g., API call)
    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      // Redirect to home page
      //window.location.href = '/chapter10/myLogin';
      navigate('/chapter07/myHome');
    } else {
      alert('Invalid credentials, try again!');
    }
  };

  return (
    <div>
      <h2 className='font-bold'>Login:</h2>
      <form onSubmit={handleLogin}>
        <label>E-mail:</label><br />
        <input type="email" placeholder="Email" value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className='border-2'
        /><br />
        <label>Password:</label><br />
        <input type="password" placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className='border-2'
        /><br />
        <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 text-center p-1 mt-1'>Login</button>
      </form>
    </div>
  );
}

export default MyLogin;