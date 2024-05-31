import { ResetPasswordForm } from "../components/Auth";
import "../styles/views/ResetPassword.css";

const ResetPassword = () => {
    return (
        <div className="auth-main">
            <div className="auth-box">
                <h1>
                    Reset Password
                </h1>
                <ResetPasswordForm />
            </div>
        </div>
    )
};



export default ResetPassword;