import { ResetPasswordForm } from "../components/Auth";
import "../styles/views/ResetPassword.css";

const ResetPassword = () => {
    return (
        <div className="auth-main">
            <div className="auth-box">
                <h2>
                    Reset Password
                </h2>
                <ResetPasswordForm />
            </div>
        </div>
    )
};



export default ResetPassword;