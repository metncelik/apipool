import './styles/App.css'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './views/Home';
import Endpoints from './views/Endpoints';
import Pricing from './views/Pricing';
import Blogs from './views/Blogs';
import SignUp from './views/SignUp';
import LogIn from './views/LogIn';
import Console from "./views/Console";
import Endpoint from "./views/Endpoint";
import NotFound from './views/NotFound';
import ResetPassword from './views/ResetPassword';
import Oauth from './views/Oauth';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { ConsoleProvider } from './contexts/ConsoleContext';
import VerifyEmail from './views/VerifyEmail';
import { SnackbarProvider } from 'notistack';
import { ModalProvider } from './contexts/ModalContext';
import TermsOfService from './views/TermsOfService';
import PrivacyPolicy from './views/PrivacyPolicy';

function App() {
  return (
    <BrowserRouter>
    <SnackbarProvider>
      <ModalProvider>
      <AuthProvider>
        <div className="app">
          <header className="header">
            <NavBar />
          </header>
          <Routes>
            <Route index element={<Home />} />
            <Route path='endpoints' element={<Endpoints />} />
            <Route exact path='/pricing' element={<Pricing />} />
            <Route exact path='/blogs' element={<Blogs />} />
            <Route exact path='/sign-up' element={<SignUp />} />
            <Route exact path='/login' element={<LogIn />} />
            <Route exact path='/endpoint/:alias' element={<Endpoint />} />
            <Route exact path='/oauth/:provider/:method' element={<Oauth />} />
            <Route exact path='/reset-password' element={<ResetPassword />} />
            <Route exact path='/verify-email' element={<VerifyEmail />} />
            <Route exact path='/console' element={
              <ConsoleProvider>
                <Console />
              </ConsoleProvider>
            } />
            <Route exact path='/terms-of-service' element={<TermsOfService/>}/>
            <Route exact path='/privacy-policy' element={<PrivacyPolicy/>}/>
            <Route exact path='*' element={<NotFound />} />
          </Routes>
          <footer>
            <Footer />
          </footer>
        </div>
      </AuthProvider>
      </ModalProvider>
    </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
