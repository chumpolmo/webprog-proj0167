import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";

function Profile() {
    return (
      <p>
        <img
          src="/images/profile.jpg"
          alt="Chumpol Mokarat"
          style={{ width: '100px' }}
        />
      </p>
    );
}

function Avatar({ person, size } : { person: any, size: number}) {
  return (
    <img
      className="avatar"
      src={person.imageId}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}
  
export default function MyContact() {
    return (
      <div>
        <MyMenu />
        <div className="m-3">
            <div className="w-full m-2 border-b border-gray-900/10 pb-2">
                <h1 className="flex justify-start font-bold text-lg">ข้อมูลติดต่อ</h1>
            </div>
        </div>
        <div className="w-6/7 m-4 p-4 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-3xl m-2">Mr. Chumpol Mokarat</h1>
          <div className="flex justify-center items-center">
          <Avatar
            size={80}
            person={{
              name: 'Chumpol Mokarat', 
              imageId: '/images/profile2.jpg'
            }}
          />
          </div>
          <h2 className="text-md m-2">
            <strong>Contact&nbsp;--&nbsp;</strong>
            Information Technology Major<br />
            Faculty of Business Administration and Information Technology<br />
            Rajamangala University of Technology Tawan-Ok.</h2>
        </div>
        <div className="m-2">
            <a href="/chapter09/bookLists" className="ms-2 rounded-md px-3 py-2 text-sm font-semibold bg-yellow-500 text-gray-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">ย้อนกลับ</a>
        </div>
        <MyFooter />
      </div>
    );
}
