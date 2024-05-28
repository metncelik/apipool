import { useEffect, useState } from "react";
import useAuth from '../hooks/useAuth';
import '../styles/components/Auth.css'
import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const LoginWithEmail = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();
    const navigateTo = "/console";

    useEffect(() => {
        if (auth.isLoggedIn) {
            navigate(navigateTo);
        }
        setEmail(localStorage.getItem("email"));
    }, [auth]);

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage("");
            const data = { user: { email, password } };
            const response = await axiosAuth.post(`/login`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (response?.status !== 200)
                throw new Error(response.data.message);
            setAuth({ isLoggedIn: true });
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("email", email);
            navigate(navigateTo);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage("An error occurred");
            return;

        } finally {
            setPassword('');
        }
    };

    const handleForgatPassword = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try {
            const response = await axiosAuth.post("/email/reset-password/send", { email });
            if (response.status !== 200) {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage("An error occurred");
            return;
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input className='auth-input' value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
                    <input className='auth-input' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
                </div>
                <button type='submit' className='auth-button'>{"Login"}</button>
            </form>

            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}

            <div className="under-auth">

                {errorMessage === "Email not verified!" ?
                    (
                        <SendEmailVerification email={email} />
                    ) :
                    (
                        <a onClick={handleForgatPassword}>Forgot password?</a>
                    )
                }
            </div>

        </>

    );
}

const ResetPasswordForm = () => {
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!searchParams.has("secretKey")) {
            navigate("/login");
        }
    }, [searchParams]);

    const handleResetPassword = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage("");
            if (password !== passwordAgain) {
                setPassword("");
                setPasswordAgain("");
                return setErrorMessage("Passwords do not match");
            }
            const secretKey = searchParams.get("secretKey");
            const headers = { Authorization: secretKey };
            const response = await axiosAuth.post("/email/reset-password", { password }, { headers });
            if (response.status === 200) {
                setAuth({ isLoggedIn: true });
                localStorage.setItem("isLoggedIn", true);
                navigate("/console");
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage("An error occurred");
            return;
        } finally {
            setPassword('');
            setPasswordAgain('');
        }
    }

    return (
        <div>
            <form className="change-password">
                <div className="input-group change-input-group">
                    <input className='auth-input' type="password" placeholder='new password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input className='auth-input' type="password" placeholder='new password again' value={passwordAgain} onChange={(e) => { setPasswordAgain(e.target.value) }} />
                </div>
                {errorMessage && (
                    <div className='error-message'>
                        {errorMessage}
                    </div>
                )}
                <button className="auth-button" type='submit' onClick={handleResetPassword}>
                    Change
                </button>
            </form>
        </div>
    )
}




const SignUpWithEmail = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState("");
    const [passwordAgain, setPasswordAgain] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

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
        try {
            e.preventDefault();
            setErrorMessage("");
            const data = { user: { email, password } };
            await axiosAuth.post(`/sign-up`, data);
            localStorage.setItem("email", email)
            localStorage.setItem("isLoggedIn", true);
            setAuth({ isLoggedIn: true });
            navigate("/console");
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage("An error occurred");
            return;
        } finally {
            setPassword('');
            setPasswordAgain('');
        }
    };

    return (
        <>
            <form onSubmit={handleSignUp}>
                <div className="input-group">
                    <input className='auth-input' value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
                    <input className='auth-input' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
                    <input className='auth-input' value={passwordAgain} onChange={(e) => { setPasswordAgain(e.target.value) }} type="password" placeholder='password' />
                </div>
                <button type='submit' className='auth-button'>{"Sign Up"}</button>
            </form>
            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}
        </>

    );
}

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState();
    const [password, setPassword] = useState();
    const [passwordAgain, setPasswordAgain] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const { setAuth } = useAuth();

    const clickHandler = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage("");
            if (password !== passwordAgain) {
                setCurrentPassword("");
                setPassword("");
                setPasswordAgain("");
                return setErrorMessage("New passwords do not match");
            }
            const response = await axiosAuth.post("change-password", {
                currentPassword,
                newPassword: password,
            }
            )
            if (response.status === 200) {
                setAuth({ isLoggedIn: false })
                localStorage.setItem("isLoggedIn", false);
                // navigate("/login", { state: { from: location }, replace: true });
            };
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage("An error occurred");
            return;
        } finally {
            setCurrentPassword("");
            setPassword("");
            setPasswordAgain("");
        }

    }

    return (
        <div>
            <form className="change-password">
                <div className="input-group change-input-group">
                    <input className='password-input' type="password" placeholder='current password' value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} />
                    <input className='password-input' type="password" placeholder='new password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    <input className='password-input' type="password" placeholder='new password again' value={passwordAgain} onChange={(e) => { setPasswordAgain(e.target.value) }} />
                </div>
                {errorMessage && (
                    <div className='error-message'>
                        {errorMessage}
                    </div>
                )}
                <button type='submit' onClick={clickHandler}>
                    Change
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
    const [errorMessage, setErrorMessage] = useState(null);

    const handleOnSubmit = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage("");
            if (password !== confirmPassword) {
                setPassword("");
                setConfirmPassword("");
                setErrorMessage("Passwords do not match")
                return;
            }
            await axiosAuth.post("/email/add", { user: { email, password } });
            updateAuthMethods();
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage("An error occurred");
            return;
        }
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
            {errorMessage && (
                <div className="error-message">
                    {errorMessage}
                </div>
            )}
            <button type="submit">
                <span className="button-label">
                    {<MdOutlineMailOutline className="auth-icon" size={20} />}
                    Enable Email Auth
                </span>
            </button>
        </form>
    );
}


const SendEmailVerification = ({ email }) => {
    const [errorMessage, setErrorMessage] = useState();

    const handleSendEmailVerification = async (e) => {
        try {
            e.preventDefault();
            setErrorMessage("");
            const response = await axiosAuth.post("/email/send-verify", { email });
            if (response.status !== 200) {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
                return;
            }
            setErrorMessage("An error occurred");
            return;
        }
    };

    return (
        <>
            <button className='send-email-verification' onClick={handleSendEmailVerification}>
                Send Again
            </button>
            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}
        </>
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
    SendEmailVerification
}