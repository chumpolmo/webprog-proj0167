import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";

export default function BookLists () {
    const navigate = useNavigate();
    const [relStatus, setStatus] = useState(true);
    const [bookData, setBookData] = useState([]);
    const [loggedIn, setIsLoggedIn] = useState(false);

    const handleDelete = async(bookId) => {
        if(await confirm(`ยืนยันการลบหนังสือรหัส --> ${bookId}?`)){
            try {
                const fetchData = async () => {
                    const data = await fetch(
                        `http://localhost:3000/api/deleteBook/${bookId}`,
                        { method: 'DELETE' }
                    );
                    if (data.ok) {
                        const json = await data.json();
                        alert(json.message);
                        //navigate('/chapter09/bookLists');
                    } else {
                        alert('Failed to deleted data.');
                    }
                }

                // call the function
                fetchData().catch(console.error);
                setStatus(true);
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while deleting the data.');
            }
        }
    }

    useEffect(() => {
      console.log('Reload status:',relStatus);
      //if(relStatus){
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
        }

        try {
            const fetchData = async () => {
                const data = await fetch('http://localhost:3000/api/getBooks');
                if (data.ok) {
                    const json = await data.json();
                    setBookData(json);
                } else {
                    alert('Failed to loaded data.');
                }
            }

            // call the function
            return () => {
                fetchData().catch(console.error);
                console.log('Book Data:',bookData);
                setStatus(false);
            };
        } catch (error) {
            // console.error('Error:', error);
            alert('An error occurred while loading the data.');
        }
      //}
    }, [relStatus]); // [bookData]

    if (!Array.isArray(bookData)) {
        return <div>Error: Data is not an array.</div>;
    }

    if (!loggedIn) {
        return (
        <>
            <MyMenu />
            <div className="m-3 text-center">Permission Denied.</div>
            <MyFooter />
        </>
        );
    }

    return (
    <>
        <MyMenu />
        <div className="m-3">
        <div className="w-full m-2 border-b border-gray-900/10 pb-2">
            <h1 className="flex justify-start font-bold text-lg">ข้อมูลหนังสือในร้าน</h1>
        </div>
        <div className="relative overflow-x-auto sm:rounded-lg border border-slate-400 md:max-lg:flex">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">No.</th>
                <th scope="col" className="px-6 py-3">ชื่อเรื่อง</th>
                <th scope="col" className="px-6 py-3">ผู้เขียน</th>
                <th scope="col" className="px-6 py-3">หมวดหมู่</th>
                <th scope="col" className="px-6 py-3">สถานะคลังสินค้า</th>
                <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
        {
            bookData.length === 0 ? (
            <tr>
                <td colSpan={6} className="text-center px-6 py-4">--ไม่มีหนังสือในร้าน--</td>
            </tr>
            ) : (
            bookData.map((item, index) =>
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td scope="row" className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap dark:text-white">{index + 1}</td>
                    <td className="px-6 py-4">{item.bookTitle}</td>
                    <td className="px-6 py-4">{item.bookAuthor}</td>
                    <td className="px-6 py-4">{item.bookCategory}</td>
                    <td className="px-6 py-4">{item.bookStock}</td>
                    <td className="px-6 py-4 text-right">
                        <a href={`/chapter09/bookDetail/${item.id}`} className="ms-2 rounded-md border border-green-400 px-3 py-2 text-sm font-semibold text-green-400 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">ดูรายละเอียด</a>
                        <a href={`/chapter09/bookEditForm/${item.id}`} className="ms-2 rounded-md border border-orange-400 px-3 py-2 text-sm font-semibold text-orange-400 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">แก้ไข</a>
                        <a href="#" onClick={(e) => handleDelete(`${item.id}`)} className="ms-2 rounded-md border border-red-400 px-3 py-2 text-sm font-semibold text-red-400 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">ลบ</a>
                    </td>
                </tr>
            )
            )
        }
        </tbody>
        </table>
        </div>
        </div>
        <MyFooter />
    </>
    );
}