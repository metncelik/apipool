import '../styles/screens/SignUp.css'
import { GithubAuth, GoogleAuth, SignUpWithEmail } from '../components/Auth';


const SignUp = () => {
    return (
        <div className="auth-main">
            <h2>
                Sign Up
            </h2>
            <div className="auth-container">
                <SignUpWithEmail />
                <GoogleAuth method={"Sign Up"} />
                <GithubAuth method={"Sign Up"} />
            </div>
        </div>

    );
}

export default SignUp