const today = new Date();
const name = 'Khaeg';

function formatDate(date: Date) {
  return new Intl.DateTimeFormat(
    'en-US',
    {
        day: 'numeric', 
        month: 'long',
        year: 'numeric',  
        weekday: 'long' 
    }
  ).format(date);
}

const person = {
    name: 'Chumpol Mokarat',
    avatar: '/images/profile.jpg',
    theme: {
      backgroundColor: 'pink',
      color: 'blue'
    }
};
  
export default function TodoList() {
    return (
      <div style={person.theme}>
        <h1>{person.name}'s Todos</h1>
        <img
          className="avatar"
          src={person.avatar}
          alt={person.name}
        />
        <ul>
          <li>เข้าร่วมกิจกรรมวันเจ้าฟ้าฯ</li>
          <li>ขายสินค้าออนไลน์</li>
          <li>เตรียมเนื้อหาเรียนวิชาในวันพรุ่งนี้</li>
        </ul>
      </div>
    );
  }
