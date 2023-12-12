import '../styles/screens/LogIn.css'
import { SignInWithEmail, GoogleAuth, GithubAuth } from "../components/Auth";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const LogIn = () => {
    const navigator = useNavigate()

    return (
        <div className="auth-main">
            <h2>
                Login
            </h2>
            <div className="auth-container">
                <SignInWithEmail />
                <GoogleAuth  method={"Login"} />
                <GithubAuth  method={"Login"} />
            </div>
        </div>
    );
}

export default LogIn