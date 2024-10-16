import { useState } from 'react';
import { sculptureList } from './SculptureList';

export default function Gallery() {
  const [index, setIndex] = useState(0);
  const [like, setLike] = useState(false);

  function handleClick() {
    if(index === 11) setIndex(0);
    else setIndex(index + 1);
  }

  function handleClickPrev() {
    if(index === 0) setIndex(11);
    else setIndex(index - 1);
  }

  function handleClickLike(id:number) {
    console.log(id);
    if(like)
      setLike(false);
    else
      setLike(true);
  }

  let sculpture = sculptureList[index];

  return (
    <div className="container mx-auto">
      <div className="grid grid-flow-col auto-cols-auto gap-2">
        <div className='flex place-items-center justify-end'>
          <button className='hover:bg-amber-700 box-borderfont-bold py-2 px-4 rounded bg-amber-500 text-white' onClick={handleClickPrev}>
          Prev
          </button>
        </div>
        <div className='bg-amber-200 w-full min-w-full'>
          <h2 className='p-2 text-lg text-yellow-800 font-bold'>
          <div className="flex flex-row justify-between">
            <div>
              <i>{sculpture.name} </i> 
              by {sculpture.artist}
            </div>
            <div>
            <button onClick={() => handleClickLike(sculpture.id)}>
            { like ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>)
            }
            </button>
            </div>
          </div>
          </h2>
          <h3 className='p-2 font-bold'>  
            ({index + 1} of {sculptureList.length})
          </h3>
          <div className="flex justify-center">
            <img 
              src={sculpture.url} 
              title={sculpture.alt}
              className='w-full max-w-64 h-full max-h-64'
            />
          </div>
          <p className='p-2'>
            {sculpture.description}
          </p>
        </div>
        <div className='flex place-items-center justify-start'>
          <button className='hover:bg-amber-700 box-borderfont-bold py-2 px-4 rounded bg-amber-500 text-white' onClick={handleClick}>
          Next
          </button>
        </div>
      </div>
    </div>
  );
}