import { people } from "./Data";

// const people = [
//     'Creola Katherine Johnson: mathematician',
//     'Mario José Molina-Pasquel Henríquez: chemist',
//     'Mohammad Abdus Salam: physicist',
//     'Percy Lavon Julian: chemist',
//     'Subrahmanyan Chandrasekhar: astrophysicist'
//   ];
  
  export default function List() {
    const chemists = people.filter(person =>
        person.profession === 'chemist'
    );

    const listItems = chemists.map(person =>
        <li key={person.id}>
           <img
             src={person.avatar}
             alt={person.name}
             style={{ width: '70px' }}
           />
           <p>
             <b>{person.name}:</b>
             {' ' + person.profession + ' '}
             known for {person.accomplishment}
           </p>
        </li>
      );
      

    return (
      <article>
        <h1>Scientists</h1>
        <ul>{listItems}</ul>
      </article>
    );
  }
  