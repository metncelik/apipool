import '../styles/views/SignUp.css'
import { GithubAuthButton, GoogleAuthButton, SignUpWithEmail } from '../components/Auth';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="auth-main">
            <div className='auth-box'>
                <h2>
                    Sign Up
                </h2>
                <SignUpWithEmail />
                <br />
                <GoogleAuthButton method={"sign-up"} />
                <GithubAuthButton method={"sign-up"} />
                <div className="under-auth">
                    <Link to={"/login"}> Go to Login </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;