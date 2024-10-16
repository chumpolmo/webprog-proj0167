import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";

export default function BookView () {
    return (
    <>
        <MyMenu />
        <div className="m-3">
            <div className="w-full m-2 border-b border-gray-900/10 pb-2">
                <h1 className="flex justify-start font-bold text-lg">รายละเอียดหนังสือ</h1>
            </div>

            <div className="w-full m-15 text-3xl text-center">
            Help me please!!
            </div>
        </div>
        <div className="m-2">
            <a href="/chapter09/bookLists" className="ms-2 rounded-md px-3 py-2 text-sm font-semibold bg-yellow-500 text-gray-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">ย้อนกลับ</a>
        </div>
        <MyFooter />
    </>
    );
}