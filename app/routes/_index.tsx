import MyContact from "./Contact";
import TodoList from "./ToDoLists";
import PackingList from "./PackageLists";
import List from "./Lists";
import GetRecipe from "./Receipe";
import MyEvents from "./MyEvents";
import Gallery from "./MyUseState";
import TimerA from "./TimerA";
import MyMenu from "./template/mymenu";
import MyFooter from "./template/myfooter";
// import WelcomePage from "./WelcomePage";
// import LoginPage from "./LoginPage";
// import { CookiesProvider, useCookies } from 'react-cookie'
import Cookies from "js-cookie";

export default function MyPage() {
  // const [cookies, setCookie] = useCookies(['user'])

  // function handleLogin(user) {
  //   setCookie('user', user, { path: '/' })
  // }

  return (
    <div>
      {/* User token: {Cookies.get("user_token")}
      <a href="/LoginPage">Login</a> */}
      <MyMenu />
      {/* <MyContact />
      <TodoList />
      <PackingList />
      <List />
      <GetRecipe />
      <MyEvents />
      <Gallery />
      <TimerA /> */}
        <div className="w-6/7 m-4 p-4 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-3xl m-2">Welcome to Web Programming Course</h1>
          <div className="flex justify-center items-center">
          <img
              title='Web Programming'
              src='/images/web-developer.png'
              style={{width:'20%'}}
          />
          </div>
          <h2 className="text-md m-2">
            <strong>Brief&nbsp;--&nbsp;</strong>
            Building Your First Web App with React (Frontend) and Node.js (Backend).</h2>
        </div>
      <MyFooter />
    </div>
  );
}
