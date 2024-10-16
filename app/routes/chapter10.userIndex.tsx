import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";

export default function UserIndex () {
    const navigate = useNavigate();
    const [loggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/chapter10/userLogin');
    };

    useEffect(() => {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
          setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      }
    }, [loggedIn]);

    return (
    <>
        <MyMenu />
        <div className="m-3">
        { loggedIn ? 
            <div>
                <h1 className="font-xxl font-bold">Hi, member.</h1>
                <a href='#' onClick={handleLogout}>Logout</a>
            </div> :
            <div>
                <h1 className="font-xxl font-bold">Hi, guest.</h1>
                <a href='/chapter10/userLogin'>Login</a>
            </div>
        }
        </div>
        <MyFooter />
    </>
    );
}
