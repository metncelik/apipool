import '../styles/views/SignUp.css'
import { GithubAuthButton, GoogleAuthButton, SignUpWithEmail } from '../components/Auth';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <div className="auth-main">
            <div className='auth-box'>
                <h1>
                    Sign Up
                </h1>
                <SignUpWithEmail />
                <br />
                {/* <GoogleAuthButton method={"sign-up"} /> */}
                <GithubAuthButton method={"sign-up"} />
                <br />
                <p className='sign-up-info'>By signing up, you are accepting our <span className='sign-up-info-link' to="/terms-of-service">Terms of Service</span> and <span className='sign-up-info-link' to="/privacy-policy">Privacy Policy</span>.</p>
            </div>
        </div>
    );
}

export default SignUp;