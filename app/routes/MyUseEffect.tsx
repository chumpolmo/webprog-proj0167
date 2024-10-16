import { useState, useEffect } from 'react';
// import { useParams } from "@remix-run/react";
import sculptureBio from './SculptureBio';

export default function Page() {
  const [person, setPerson] = useState('');
  const [bio, setBio] = useState([]);
  // const myParams = useParams();
  // const uid = myParams.userId;
  useEffect(() => {
    async function startFetching() {
      setBio([]);
      const result = await sculptureBio(person);
      console.log(result);
      if (!ignore) {
        setBio(result);
      }
    }

    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  }, [person]);

  return (
    <>
      <select value={person} onChange={e => {
        setPerson(e.target.value);
      }}>
        <option value="Alice">Alice</option>
        <option value="Blue Nana">Blue Nana</option>
        <option value="Hippos">Taylor</option>
      </select>
      <hr />
      <p><i>{bio.length === 0 ? 'Loading...' : bio}</i></p>
    </>
  );
}
