import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './views/Home';
import Models from './views/Models';
import Pricing from './views/Pricing';
import Blogs from './views/Blogs';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import Console from "./views/Console";
import Admin from "./views/Admin";
import Model from "./views/Model";
import Test from "./views/Test";
import './styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <NavBar />
        </header>
        <main>
        <Routes>
          <Route path='models' element={<Models />} />
          <Route exact path='pricing' element={<Pricing/>} />
          <Route exact path='blogs' element={<Blogs/>} />
          <Route exact path='sign-up' element={<SignUp/>} />
          <Route exact path='login' element={<LogIn/>} />
          <Route exact path='model/:id' element={<Model/>} />
          <Route exact path='test' element={<Test/>} />
          <Route exact path='console' element={<Console/>} />
          <Route exact path='admin' element={<Admin/>} />
          <Route index element={<Home/>} />
        </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>

    </BrowserRouter>
  );
}

export default App;
