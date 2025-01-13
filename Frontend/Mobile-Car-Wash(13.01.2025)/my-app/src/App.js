import './App.css'
import {BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import StartPage from './components/startPages/startPage.jsx'
import RegisterPage from './components/startPages/registerPage.jsx'
import UserPage from './components/homePage/userPage/jsxCode/userPage.jsx'
import AdminPage from './components/homePage/adminPage/jsxCode/adminPage.jsx';
import WorkerPage from './components/homePage/workerPage/jsxCode/workerPage.jsx'
import LoginPage from './components/startPages/loginPage.jsx';
function App() {
  return (
    <div className="App">


          <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<StartPage/>}></Route>
          <Route path = '/register' element = {<RegisterPage/>}></Route>
          <Route path = '/userPage'element = {<UserPage/>} ></Route>
          <Route path = '/adminPage'element = {<AdminPage/>} ></Route>
          <Route path = '/workerPage'element = {<WorkerPage/>} ></Route>
          <Route path = '/admin'element = {<AdminPage/>} ></Route>

          </Routes>
      </BrowserRouter>      
    </div>
  );
}

export default App;
