import { useNavigate } from "@remix-run/react";

export default function MyComponent() {
    const navigate = useNavigate();
    let testid = 1001;
    const handleRedirect = () => {
      navigate(`/authens/myLogin/${testid}`);
    };
  
    return (
      <div>
        <h1>Current Page</h1>
        <button onClick={handleRedirect}>Go to Another Page</button>
      </div>
    );
  }