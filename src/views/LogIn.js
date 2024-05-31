import '../styles/views/LogIn.css'
import { GithubAuthButton, GoogleAuthButton, LoginWithEmail } from '../components/Auth';

const LogIn = () => {
    return (
        <div className="auth-main">
            <div className='auth-box'>
                <h2>
                    Login
                </h2>
                <LoginWithEmail />
                <br />
                {/* <GoogleAuthButton method={"login"} /> */}
                <GithubAuthButton method={"login"} />
            </div>
        </div>
    );
}

export default LogIn