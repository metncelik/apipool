import '../styles/views/SignUp.css'
import { GithubAuthButton, GoogleAuthButton, SignUpWithEmail } from '../components/Auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-main">
            <div className='auth-box'>
                <h1>
                    Sign Up
                </h1>
                <SignUpWithEmail />
                <br />
                <GoogleAuthButton method={"sign-up"} />
                <GithubAuthButton method={"sign-up"} />
                <br />
                <p className='sign-up-info'>By signing up, you are accepting our 
                <span onClick={()=>(navigate('/terms-of-service'))} className='sign-up-info-link'>Terms of Service</span>, 
                <span onClick={()=>(navigate('/privacy-policy'))}  className='sign-up-info-link' >Privacy Policy</span> and 
                <span onClick={()=>(navigate('/refund-policy'))}   className='sign-up-info-link'>Refund Policy</span>.</p>
            </div>
        </div>
    );
}

export default SignUp;