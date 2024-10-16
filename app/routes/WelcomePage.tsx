import { useState } from "react";
import { Navigate } from "react-router-dom";
import { CookiesProvider, useCookies } from 'react-cookie'

function WelcomePage({ user }) {
  const [cookies, setCookie] = useCookies(['user'])
  console.log(user);

  function handleClick() {
    setCookie('user', user, { path: '/' })
    window.location.href = "/";
  }

  return (
    <>
      <h1>Welcome, {user.username}!</h1>
      <br />
      <a onClick={handleClick}>Logout</a>
    </>
  );
}

export default WelcomePage