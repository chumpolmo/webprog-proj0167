import React, { useState, useEffect } from 'react';

function App() {
  const [person, setPerson] = useState(101);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
//   const [errmsg, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async() => {
      try {
        const response = await fetch(`http://localhost:3000/users/${person}`);
        console.log(`http://localhost:3000/users/${person}`);
        
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchData();
  }, [person]);

  if (loading) return <p>Loading...</p>;
//   if (errmsg) return <p>Error: {errmsg}</p>;

  return (
    <div>
    <h1>Choose user profile:</h1>
      <select value={person} onChange={e => {
        setPerson(Number(e.target.value));
      }}>
        <option value="101">User101</option>
        <option value="102">User102</option>
        <option value="103">User103</option>
      </select>
      <hr />
      <h1>You choose user profile:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;