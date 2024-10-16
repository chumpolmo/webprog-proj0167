import { useState, useEffect } from 'react';
import MyHome from './chapter07.myHome';
import MyLogin from './chapter07.myLogin';

function MyApp() {
    const [loggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      }
    }, [loggedIn]);
  
    return (
      <div>
        {loggedIn ? <MyHome /> : <MyLogin />}
      </div>
    );
  }
  
  export default MyApp;