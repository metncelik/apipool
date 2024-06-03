import { useEffect, useState } from "react";
import useAuth from '../hooks/useAuthState';
import '../styles/components/Auth.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import useAxiosAuth from "../hooks/useAxiosAuth";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { enqueueSnackbar, useSnackbar } from 'notistack';
import useModal from "../hooks/useModal";
import Modal from "./Modal";

const LoginWithEmail = () => {
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useAuth();
    const axiosAuth = useAxiosAuth();
    const { isModalOpen, setIsModalOpen } = useModal(false);
    const [mailForgat, setMailForgat] = useState(false);

    const navigate = useNavigate();
    const navigateTo = "/console";

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate(navigateTo);
        }
        setEmail(localStorage.getItem("email"));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsPending(true);
        const data = { user: { email, password } };
        const response = await axiosAuth.post(`/login`, data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        setIsPending(false);
        setPassword('');
        if(!response) return;

        setAuth({ isLoggedIn: true });
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("email", email);
        navigate(navigateTo);
    };

    const handleForgatPassword = async () => {
        enqueueSnackbar("Password Reset Email sending...", { variant: "info" });
        const response = await axiosAuth.post("/email/reset-password/send", { email });
        if (!response) return;
        setMailForgat(false);
    };

    const handleSendEmailVerification = async (e) => {
        await axiosAuth.post("/email/send-verify", { email });
    };


    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input className='auth-input' value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
                    <input className='auth-input' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
                </div>
                <button disabled={isPending} type='submit' className='auth-button'>{isPending ? "..." : "Login"}</button>
                <div className="under-auth">
                    {isModalOpen && !mailForgat && (
                        <Modal
                            actionCallback={handleSendEmailVerification}
                            actionType='warning'
                            buttonLabel='Send'
                            buttonColor='green'
                            message='Your email address has not been verified yet. Would you like to resend the verification email?'
                        />
                    )}
                    {isModalOpen && mailForgat && (
                        <Modal
                            actionCallback={handleForgatPassword}
                            actionType='info'
                            buttonLabel='Send'
                            buttonColor='green'
                            message='Would you like to send reset password email?'
                        />
                    )}
                    <a onClick={() => {setMailForgat(true); setIsModalOpen(true)}}>Forgot password?</a>
                </div>
            </form>


        </>

    );
}

const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const axiosAuth = useAxiosAuth();

    useEffect(() => {
        if (!searchParams.has("secretKey")) {
            navigate("/login");
        }
    }, [searchParams]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== passwordAgain) {
            setPassword("");
            setPasswordAgain("");
            enqueueSnackbar("Passwords do not match", { variant: "error" });
            return;
        }
        const secretKey = searchParams.get("secretKey");
        const headers = { Authorization: secretKey };
        const response = await axiosAuth.post("/email/reset-password", { password }, { headers });
        setPassword('');
        setPasswordAgain('');
        if (!response) return;
        navigate("/login");
    }

    return (
        <div>
            <form className="change-password">
                <div className="input-group change-input-group">
                    <input className='auth-input' type="password" placeholder='new password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input className='auth-input' type="password" placeholder='new password again' value={passwordAgain} onChange={(e) => { setPasswordAgain(e.target.value) }} />
                </div>
                <button className="auth-button" type='submit' onClick={handleResetPassword}>
                    Change
                </button>
            </form>
        </div>
    )
}




const SignUpWithEmail = () => {
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const axiosAuth = useAxiosAuth();
    const { enqueueSnackbar } = useSnackbar();

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const navigateTo = "/console";

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate(navigateTo);
            return;
        }
        setEmail(localStorage.getItem("email"));
    }, [auth]);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsPending(true);

        if (password != passwordAgain) {
            enqueueSnackbar("Passwords do not match.", { variant: "error" });
            setIsPending(false);
            return;
        }

        const data = { user: { email, password } };
        const response = await axiosAuth.post(`/sign-up`, data);
        setIsPending(false);
        setPassword('');
        setPasswordAgain('');
        if (!response) return;

        localStorage.setItem("email", email)
        localStorage.setItem("isLoggedIn", true);
        setAuth({ isLoggedIn: true });
        navigate("/console");

    };

    return (
        <>
            <form onSubmit={handleSignUp}>
                <div className="input-group">
                    <input className='auth-input' value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
                    <input className='auth-input' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
                    <input className='auth-input' value={passwordAgain} onChange={(e) => { setPasswordAgain(e.target.value) }} type="password" placeholder='password' />
                </div>
                <button disabled={isPending} type='submit' className='auth-button'>{isPending ? "..." : "Sign Up"}</button>
            </form>
        </>

    );
}

const ChangePassword = () => {
    const [isPending, setIsPending] = useState(false);
    const [currentPassword, setCurrentPassword] = useState();
    const [password, setPassword] = useState();
    const [passwordAgain, setPasswordAgain] = useState();
    const { setAuth } = useAuth();
    const axiosAuth = useAxiosAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const clickHandler = async (e) => {
        e.preventDefault();
        setIsPending(true);
        if (password !== passwordAgain) {
            setCurrentPassword("");
            setPassword("");
            setPasswordAgain("");
            enqueueSnackbar("New passwords do not match", { variant: "error" });
            return;
        }

        const response = await axiosAuth.post("change-password", {
            currentPassword,
            newPassword: password,
        });
        setIsPending(false);
        setCurrentPassword("");
        setPassword("");
        setPasswordAgain("");
        if (!response) return;

        setAuth({ isLoggedIn: false })
        localStorage.setItem("isLoggedIn", false);
        navigate("/login");
    }

    return (
        <div>
            <form className="change-password">
                <div className="input-group change-input-group">
                    <input className='password-input console-input' type="password" placeholder='current password' value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} />
                    <input className='password-input console-input' type="password" placeholder='new password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input className='password-input console-input' type="password" placeholder='new password again' value={passwordAgain} onChange={(e) => { setPasswordAgain(e.target.value) }} />
                </div>
                <button disabled={isPending} type='submit' onClick={clickHandler}>
                    {isPending ? "..." : "Change"}
                </button>
            </form>
        </div>
    )
}

const GoogleAuthButton = ({ method }) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        //TO-DO: to backend
        const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUrl = encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/oauth/google/${method}`);
        const scope = encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",);
        const url = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=${clientID}&scope=${scope}&include_granted_scopes=true&redirect_uri=${redirectUrl}&service=lso&o2v=2&theme=dark&flowName=GeneralOAuthFlow`;

        window.location.assign(url);
    }

    return (
        <button onClick={handleOnClick} className="auth-button oauth google-auth">
            <span className="button-label">
                {<FaGoogle className="auth-icon" size={20} />}
                {method === "login" ? "Login" : "Sign Up"} with Google
            </span>
        </button>
    );
}


const GithubAuthButton = ({ method }) => {
    const handleOnClick = (e) => {
        e.preventDefault();
        const clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
        const redirectUrl = encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/oauth/github/${method}`);
        const url = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email&redirect_uri=${redirectUrl}`;
        window.location.assign(url);
    }
    return (
        <button onClick={handleOnClick} className="auth-button oauth github-auth">
            <span className="button-label">
                {<FaGithub className="auth-icon" size={20} />}
                {method === "login" ? "Login" : "Sign Up"} with Github
            </span>
        </button>
    );
}

const AddGoogleAuthButton = () => {
    const handleOnClick = (e) => {
        e.preventDefault();
        const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUrl = encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/oauth/google/add`);
        const scope = encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile");
        const url = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=${clientID}&scope=${scope}&include_granted_scopes=true&redirect_uri=${redirectUrl}&service=lso&o2v=2&theme=dark&flowName=GeneralOAuthFlow`;

        window.location.assign(url);
    }

    return (
        <button onClick={handleOnClick} className="auth-button oauth google-auth">
            <span className="button-label">
                {<FaGoogle className="auth-icon" size={20} />}
                Enable Google Auth
            </span>
        </button>
    );
}

const AddGithubAuthButton = () => {
    const handleOnClick = (e) => {
        e.preventDefault();
        const clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
        const redirectUrl = encodeURIComponent(`${process.env.REACT_APP_CLIENT_URL}/oauth/github/add`);
        const url = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user:email&redirect_uri=${redirectUrl}`;
        window.location.assign(url);
    }
    return (
        <button onClick={handleOnClick} className="auth-button oauth github-auth">
            <span className="button-label">
                {<FaGithub className="auth-icon" size={20} />}
                Enable Github Auth
            </span>
        </button>
    );
}

const AddEmailAuthForm = ({ updateAuthMethods }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const axiosAuth = useAxiosAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            enqueueSnackbar("Passwords do not match", { variant: "error" });
            return;
        }
        const response = await axiosAuth.post("/email/add", { user: { email, password } });
        if (!response) return;
        updateAuthMethods();
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="input-group">
                <input
                    className="password-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="password-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="password-input"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button type="submit">
                <span className="button-label">
                    {<MdOutlineMailOutline className="auth-icon" size={20} />}
                    Enable Email Auth
                </span>
            </button>
        </form>
    );
}


const SendEmailVerificationButton = ({ email }) => {
    const axiosAuth = useAxiosAuth();
    const { enqueueSnackbar } = useSnackbar();

    const handleSendEmailVerification = async (e) => {
        enqueueSnackbar("Verify Email sending...", { variant: "info" });
        await axiosAuth.post("/email/send-verify", { email });
    };

    return (
        <button className='send-email-verification-button' onClick={handleSendEmailVerification}>
            Send Verification
        </button>
    )
}



export {
    LoginWithEmail,
    SignUpWithEmail,
    ChangePassword,
    GoogleAuthButton,
    GithubAuthButton,
    AddGoogleAuthButton,
    AddGithubAuthButton,
    AddEmailAuthForm,
    ResetPasswordForm,
    SendEmailVerificationButton
}