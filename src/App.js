import './styles/App.css'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './views/Home';
import Models from './views/Models';
import Pricing from './views/Pricing';
import Blogs from './views/Blogs';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import Console from "./views/Console";
import Model from "./views/Model";
import NotFound from './views/NotFound';
import ResetPassword from './views/ResetPassword';
import Oauth from './views/Oauth';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ConsoleProvider } from './contexts/ConsoleContext';
import VerifyEmail from './views/VerifyEmail';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app">
          <header className="header">
            <NavBar />
          </header>
          <Routes>
            <Route index element={<Home />} />
            <Route path='models' element={<Models />} />
            <Route exact path='/pricing' element={<Pricing />} />
            <Route exact path='/blogs' element={<Blogs />} />
            <Route exact path='/sign-up' element={<SignUp />} />
            <Route exact path='/login' element={<LogIn />} />
            <Route exact path='/model/:alias' element={<Model />} />
            <Route exact path='/oauth/:provider/:method' element={<Oauth />} />
            <Route exact path='/reset-password' element={<ResetPassword />} />
            <Route exact path='/verify-email' element={<VerifyEmail />} />
            <Route exact path='/console' element={
              <ConsoleProvider>
                <Console />
              </ConsoleProvider>
            } />
            <Route exact path='*' element={<NotFound />} />
          </Routes>
          <footer>
            <Footer />
          </footer>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
