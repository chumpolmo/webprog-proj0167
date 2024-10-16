import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from an API when count changes
    if (count > 0) {
      fetch('https://api.example.com/data')
        .then(response => response.json())
        .then(data => setData(data));
      console.log(count);
    }
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}