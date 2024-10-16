import { useEffect, useState } from "react";
import { useNavigate } from "@remix-run/react";
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function MyMenu () {
    const navigate = useNavigate();
    const [loggedIn, setIsLoggedIn] = useState(false);
    const [isEmail, setIsEmail] = useState();

    const handleLogout = async() => {
        if(await confirm('ยืนยันการออกจากระบบ?')){
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('isEmail');
            navigate('/');
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            setIsLoggedIn(localStorage.getItem('isLoggedIn'));
            setIsEmail(localStorage.getItem('isEmail'));
        }
    }, [loggedIn, isEmail]);

    return (
    <nav className="container mx-auto grid grid-cols-2 justify-between bg-blue-700 text-white p-3">
    <ul className="flex justify-start">
        <li className="mr-6">
            <a className="hover:text-blue-800" href="/">
            หน้าแรก
            </a>
        </li>
        {
        loggedIn ? 
        <>
            <li className="mr-6">
                <a className="hover:text-blue-800"
                href="/chapter09/bookForm"
                >
                    เพิ่มหนังสือใหม่
                </a>
            </li>
            <li className="mr-6">
                <a className="hover:text-blue-800" 
                href="/chapter09/bookLists">
                ข้อมูลหนังสือในร้าน
                </a>
            </li>
        </>
        :
        <>
            <li className="mr-6">
                <a className="hover:text-blue-800"
                href="/chapter09/Contact">
                    ติดต่อ
                </a>
            </li>
            <li className="mr-6">
                <a className="hover:text-blue-800"
                href="/chapter10/userLogin">
                    เข้าสู่ระบบ
                </a>
            </li>
        </>
    }
    </ul>
    {
        loggedIn && 
        <ul className="flex justify-end">
            <li className="mr-2">
                <UserCircleIcon className="flex justify-start h-6 w-6 text-white" />
            </li>
            <li className="mr-6">
                <a className="hover:text-blue-800">
                Hi, {isEmail}
                </a>
            </li>
            <li className="mr-6 flex justify-end">
                <a className="hover:text-blue-800"
                href="#" onClick={handleLogout}>
                    ออกจากระบบ
                </a>
            </li>
        </ul>
    }
    </nav>
    );
}