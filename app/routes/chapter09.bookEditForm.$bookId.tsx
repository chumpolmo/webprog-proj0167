import { useEffect, useState } from "react";
import { useNavigate, useParams } from "@remix-run/react";
import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";

export default function BookForm () {
    const navigate = useNavigate();
    const myParams = useParams();
    const bookId = myParams.bookId;
    const [bookData, setBookData] = useState({
        bookId: '',
        bookTitle: '',
        bookDesc: '',
        bookAuthor: '',
        bookCategory: '',
        bookStock: ''
    });
    const [selectedOption, setSelectedOption] = useState('');
    const [categoryOption, setCategoryOption] = useState('');

    useEffect(() => {
        try {
            const fetchData = async () => {
                const data = await fetch(`http://localhost:3000/api/getOneBook/${bookId}`);
                if (data.ok) {
                    const json = await data.json();
                    setBookData(json);
                    setSelectedOption(json.bookStock);
                    setCategoryOption(json.bookCategory);
                    console.log(json);
                } else {
                    alert('Failed to loaded data.');
                }
            }

            // call the function
            fetchData().catch(console.error);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while loading the data.');
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
          ...bookData,
          [name]: value
        });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(confirm('ยืนยันการแก้ไขข้อมูล?')){
        const form = e.target;
        const formData = new FormData(form);  
        const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);
        
        try {
            const response = await fetch('http://localhost:3000/api/updateBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert('Form updatted successfully.');
                navigate('/chapter09/bookLists');
            } else {
                alert('Failed to update form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updatting the form');
        }
        return true;
      }
    }

    return (
    <>
    <MyMenu />
    <div className="m-3">
    <form method="POST" onSubmit={handleSubmit}>
        <h1 className="font-bold m-2 border-b border-gray-900/10 pb-2 text-lg">แก้ไขข้อมูลหนังสือ</h1>
        <input type="hidden" name="bookId" id="bookId" value={bookData.id} required />
        <label className="m-2">ชื่อหนังสือ<span className="text-red-600">*</span></label><br />
        <input type="text" name="bookTitle" id="bookTitle" className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-indigo-200 sm:text-sm sm:leading-6 p-2" value={bookData.bookTitle} onChange={handleChange} required />
        <label className="m-2">รายละเอียด</label><br />
        <textarea rows={3} name="bookDesc" id="bookDesc" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 p-2" value={bookData.bookDesc}  onChange={handleChange} />
        <label className="m-2">ผู้แต่ง<span className="text-red-600">*</span></label><br />
        <input type="text" name="bookAuthor" id="bookAuthor" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200 sm:text-sm sm:leading-6 p-2" value={bookData.bookAuthor} onChange={handleChange} required />
        <label className="m-2">หมวดหมู่<span className="text-red-600">*</span></label><br />
        <div className="mt-2">
          <select id="bookCategory" name="bookCategory" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" value={bookData.bookCategory}  onChange={handleChange} required>
            <option value="">-เลือกหมวดหมู่หนังสือ-</option>
            <option value={10}>เทคโนโลยี</option>
            <option value={20}>ปรัญชา</option>
          </select>
        </div>
        <label className="m-2">สถานะคลังสินค้า</label><br />
        <div className="p-2 border border-2 rounded-md border-gray-900/10">
            <div className="flex items-center gap-x-3">
                <input name="bookStock" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="In-stock" onChange={handleChange} 
                defaultChecked={selectedOption === 'In-stock'} />
                <label htmlFor="bookInStock" className="block text-sm font-medium leading-6 text-gray-900">In-stock</label>
            </div>
            <div className="flex items-center gap-x-3">
                <input name="bookStock" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Out-of-stock" onChange={handleChange} 
                defaultChecked={selectedOption === 'Out-of-stock'} />
                <label htmlFor="bookOutOfStock" className="block text-sm font-medium leading-6 text-gray-900">Out-of-stock</label>
            </div>
        </div>
        <div className="mt-6 flex justify-center items-center">
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                แก้ไข
            </button>
            <button type="reset" className="ms-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                เคลียร์
            </button>
        </div>
    </form>
    </div>
    <div className="m-2">
        <a href="/chapter09/bookLists" className="ms-2 rounded-md px-3 py-2 text-sm font-semibold bg-yellow-500 text-gray-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">ย้อนกลับ</a>
    </div>
    <MyFooter />
    </>
    );
}