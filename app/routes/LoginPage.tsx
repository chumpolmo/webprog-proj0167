// Example using js-cookie in a React component
import React, { useEffect } from "react";
import Cookies from "js-cookie";

const MyLogin = () => {
 // Set a cookie
 useEffect(() => {
   Cookies.set("user_token", "abc123", { expires: 7, path: "/" });
 }, []);

 // Get a cookie
 const userToken = Cookies.get("user_token");

 // Delete a cookie
 const logout = () => {
   Cookies.remove("user_token");
   // Additional logout logic...
   window.location.href = "/";
 };

 return (
   <div>
     <h1 className="font-bold">ทดสอบ js-cookie</h1>
     <p>User Token: {userToken}</p>
     <button onClick={logout} className="border-2 tex-center ps-2 pe-2 pt-1 pb-1">Logout</button>
   </div>
 );
};

export default MyLogin;