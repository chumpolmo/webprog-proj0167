import { useNavigate } from "@remix-run/react";

function MyHome() {
    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('isLoggedIn');
      navigate('/chapter07/myLogin');
    };
  
    return (
      <div>
        <h2>Home</h2>
        <button onClick={handleLogout}
           className='text-white bg-red-700 hover:bg-blue-800 text-center p-1 mt-1'
        >Logout</button>
      </div>
    );
}

export default MyHome;