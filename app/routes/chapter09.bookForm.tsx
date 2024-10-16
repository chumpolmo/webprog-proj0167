import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";

export default function BookForm () {
    const navigate = useNavigate();
    // const [formData, setFormData] = useState({
    //     bookTitle: '',
    //     bookDesc: '',
    //     bookAuthor: '',
    //     bookCategory: '',
    //     bookStock: 'In-stock'
    // });
    const [selectedOption, setSelectedOption] = useState('In-stock');

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value
    //     });
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        // fetch('http://localhost:3000/insertBook', { method: form.method, body: formData });    
        const formJson = Object.fromEntries(formData.entries());
        // console.log(formJson);
        
        try {
            const response = await fetch('http://localhost:3000/api/insertBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formJson),
            });
    
            if (response.ok) {
                const data = await response.json();
                alert('Form submitted successfully.');
                navigate('/chapter09/bookLists');
            } else {
                alert('Failed to submit form.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form');
        }
    }

    return (
    <>
    <MyMenu />
    <div className="m-3">
    <form method="POST" onSubmit={handleSubmit}>
        <h1 className="font-bold m-2 border-b border-gray-900/10 pb-2 text-lg">เพิ่มหนังสือใหม่</h1>
        <label className="m-2">ชื่อหนังสือ<span className="text-red-600">*</span></label><br />
        <input type="text" name="bookTitle" id="bookTitle" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200 sm:text-sm sm:leading-6" required />
        <label className="m-2">รายละเอียด</label><br />
        <textarea rows={3} name="bookDesc" id="bookDesc" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200 sm:text-sm sm:leading-6" />
        <label className="m-2">ผู้แต่ง<span className="text-red-600">*</span></label><br />
        <input type="text" name="bookAuthor" id="bookAuthor" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-indigo-200 sm:text-sm sm:leading-6" required />
        <label className="m-2">หมวดหมู่<span className="text-red-600">*</span></label><br />
        <div className="mt-2">
          <select id="bookCategory" name="bookCategory" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6" required>
            <option value="">-เลือกหมวดหมู่หนังสือ-</option>
            <option value={10}>เทคโนโลยี</option>
            <option value={20}>ปรัญชา</option>
          </select>
        </div>
        <label className="m-2">สถานะคลังสินค้า</label><br />
        <div className="p-2 border border-2 rounded-md border-gray-900/10">
            <div className="flex items-center gap-x-3">
                <input name="bookStock" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="In-stock" 
                defaultChecked={selectedOption === 'In-stock'} />
                <label htmlFor="bookInStock" className="block text-sm font-medium leading-6 text-gray-900">In-stock</label>
            </div>
            <div className="flex items-center gap-x-3">
                <input name="bookStock" type="radio" className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600" value="Out-of-stock" 
                defaultChecked={selectedOption === 'Out-of-stock'} />
                <label htmlFor="bookOutOfStock" className="block text-sm font-medium leading-6 text-gray-900">Out-of-stock</label>
            </div>
        </div>
        <div className="mt-6 flex justify-center items-center">
            <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                เพิ่มข้อมูล
            </button>
            <button type="reset" className="ms-2 rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                เคลียร์
            </button>
        </div>
    </form>
    </div>
    <MyFooter />
    </>
    );
}