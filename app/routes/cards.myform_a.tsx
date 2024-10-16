// import { useCookies } from 'react-cookie';

export default function MyForm() {
    // const [cookies, setCookie] = useCookies(['loggedIn','userId']);

    // function onSetCookieA(e) {
    //   setCookie('loggedIn', e.target.value);
    //   console.log(cookies);
    // }

    // function onSetCookieB(e) {
    //   setCookie('userId', e.target.value);
    //   console.log(cookies);
    // }

    function handleSubmit(e) {
      // Prevent the browser from reloading the page
      e.preventDefault();
  
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
      // You can pass formData as a fetch body directly:
      //fetch('/someApi', { method: form.method, body: formData });
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson);
    }
  
    return (
      <form method="post" onSubmit={handleSubmit}>
          {/* <input onChange={onSetCookieA} defaultValue="" className="border border-blue-200" />
          {cookies.loggedIn && <>Hello {cookies.loggedIn}!</>}<br />
          <input onChange={onSetCookieB} defaultValue="" className="border border-blue-200" />
          {cookies.userId && <>Hello {cookies.userId}!</>} */}
        <label className="text-lg font-bold">
            การเพิ่มข้อมูลนามบัตร
        </label><hr />
        <label>
          ชื่อ-สกุล: <input name="myName" defaultValue="" className="border border-blue-200" />
        </label>
        <hr />
        <label>
          สถานะของบัตร: <input type="checkbox" name="myActive" defaultChecked={true} />
        </label>
        <hr />
        <p>
          สาขาวิชา:<br />
          <label className="m-2"><input type="radio" name="myMajor" value="IT" defaultChecked={true} /> เทคโนโลยีสารสนเทศ</label>
          <label className="m-2"><input type="radio" name="myMajor" value="CS" /> วิทยาการคอมพิวเตอร์</label>
          <label className="m-2"><input type="radio" name="myMajor" value="DBI" /> นวัตกรรมธุรกิจดิจิทัล</label>
        </p>
        <hr />
        <label>
          ติดต่อ:<br />
          <textarea
            name="myAddress"
            defaultValue=""
            rows={4}
            cols={40}
            className="border border-blue-200"
          />
        </label>
        <hr />
        <p>
          เลือกรูปแบบนามบัตร:
          <select name="myTemplate" className="border border-blue-200">
            <option value="">เลือกรูปแบบ</option>
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
          </select>
        </p>
        <hr />
        <button type="reset" className="bg-green-300 m-2 p-2">เคลียร์ฟอร์ม</button>
        <button type="submit" className="bg-red-300 m-2 p-2">บันทึกฟอร์ม</button>
      </form>
    );
  }
  