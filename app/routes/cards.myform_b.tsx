import { useState } from "react";

export default function MyForm() {
    const [myName, setMyName] = useState('');
    const [myActive, setMyActive] = useState(true);
    const [myMajor, setMajor] = useState('');
    const [myAddress, setMyAddress] = useState('');
    const [myTemplate, setMyTemplate] = useState(''); 

    console.log(myTemplate)
  
    return (
      <form method="post">
        <label className="text-lg font-bold">
            การเพิ่มข้อมูลนามบัตร
        </label><hr />
        <label>
          ชื่อ-สกุล: <input name="myName" defaultValue="" className="border border-blue-200" onChange={(e) => setMyName(e.target.value)} />
        </label>
        <hr />
        <label>
          สถานะของบัตร: <input type="checkbox" name="myActive" defaultChecked={true}  onChange={(e) => setMyActive(e.target.checked)}  />
        </label>
        <hr />
        <p>
          สาขาวิชา:<br />
          <label className="m-2"><input type="radio" name="myMajor" value="IT" onChange={(e) => setMajor(e.target.value)} /> เทคโนโลยีสารสนเทศ</label>
          <label className="m-2"><input type="radio" name="myMajor" value="CS" onChange={(e) => setMajor(e.target.value)} /> วิทยาการคอมพิวเตอร์</label>
          <label className="m-2"><input type="radio" name="myMajor" value="DBI" onChange={(e) => setMajor(e.target.value)} /> นวัตกรรมธุรกิจดิจิทัล</label>
        </p>
        <hr />
        <p>ที่อยู่:<br />
        <textarea
            value={myAddress} // ควบคุมค่าของ input ให้ตรงกับตัวแปรสเตท
            onChange={e => setMyAddress(e.target.value)} // อัปเดตตัวแปรเสตท
            rows={5} cols={60}
            className="border border-blue-200"
        />
        </p>
        <hr />
        <p>
          เลือกรูปแบบนามบัตร:
          <select
            value={myTemplate} // ควบคุมการเลือกข้อมูลให้ตรงกับตัวแปรสเตท
            onChange={(e) => setMyTemplate(e.target.value)} // อัปเดตตัวแปรเสตท
            className="border border-blue-200"
          >
            <option value="">เลือกรูปแบบ</option>
            <option value="bg-red-800">Apple</option>
            <option value="bg-yellow-300">Banana</option>
            <option value="bg-orange-400">Orange</option>
          </select>
        </p>
        <hr />
        <label className="text-lg font-bold">
            ข้อมูลนามบัตร
        </label><hr />
        <p>นามบัตร: { myName !== '' ? <>คุณ {myName}</> : <>กรุณากรอกชื่อ-สกุล</> }</p>
        <p>สถานะบัตร: { myActive ? <>เปิดใช้งาน</> : <>ยังไม่เปิดใช้งาน</> }</p>
        <p>สาขาวิชา: { myMajor !== '' ? myMajor : <>กรุณาเลือกสาขาวิชา</> }</p>
        <p>ที่อยู่: { myAddress !== '' ? myAddress : <>กรุณากรอกที่อยู่</> }</p>
        <>รูปแบบนามบัตร: 
            { 
                myTemplate !== '' ? 
                <div className={ "shadow box-border h-32 w-52 p-4 border-4 " + myTemplate }></div> : <>กรุณาเลือกรูปแบบนามบัตร</> 
            }
        </>
      </form>
    );
  }
  