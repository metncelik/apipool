import { Link, Navigate, useNavigate } from 'react-router-dom';
import '../styles/components/Auth.css'
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthErrorCodes, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, updatePassword } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from "../database/firebaseConfig";
import { useEffect, useState } from 'react';
import PopupModule from './PopupModule';
import { setUser } from '../database/db';

export const GoogleAuth = ({ method }) => {
    const navigator = useNavigate()
    const googleClick = () => {
        signInWithPopup(auth, googleProvider)
            .then(async (result) => {
                const user = result.user;
                await setUser(user)
                navigator("/console")
            }).catch((error) => {
                alert(error)
            });
    }
    return (
        <button onClick={googleClick} className="dashboard-button auth-button">
            <FcGoogle size={20} />
            <div className="auth-label">
                {method} with Google
            </div>
        </button>
    );
}

export const GithubAuth = ({ method }) => {
    const navigator = useNavigate()
    const githubClick = () => {
        signInWithRedirect(auth, githubProvider)
            .then(async (result) => {
                const user = result.user;
                await setUser(user)
                navigator("/console")
            }).catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // const email = error.customData.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);
            });

    }
    return (
        <button disabled onClick={githubClick} className="dashboard-button auth-button">
            <FaGithub size={20} />
            <div className="auth-label">
                {method} With Github
            </div>
        </button>
    );
}

export const SignUpWithEmail = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [moduleVisible, setModuleVisible] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const signUpHandler = async (e) => {
        e.preventDefault()
        setIsPending(true)
        if (password !== password2) {
            setErrorMessage("passwords don't match")
            setIsPending(false)
            return
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                await setUser(user)
                sendEmailVerification(user);
                localStorage.setItem("apipool_email", user.email)
                auth.signOut();
                setModuleVisible(true)
                setErrorMessage("")
                setPassword("")
                setPassword2("")
                setIsPending(false)
            })
            .catch((error) => {
                setIsPending(false)
                setErrorMessage(error.message)
            });
    }
    return (
        <div>
            {moduleVisible && (
                <PopupModule message='We have sent a verification link to your email address. Please check your inbox or spam folder for the email.' buttonLabel='Go to Login Page' path='/login' />
            )
            }
            <form onSubmit={signUpHandler} className="email-auth">
                <div className="input-group">
                    <input className='auth-input' value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
                    <input className='auth-input' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
                    <input className='auth-input' value={password2} onChange={(e) => { setPassword2(e.target.value) }} type="password" placeholder='password' />
                </div>
                <button type='submit' className='dashboard-button auth-button' onClick={signUpHandler}>{isPending ? "..." : "Sign Up"}</button>
                {errorMessage && (
                    <div className='error-message'>
                        {errorMessage}
                    </div>
                )}
            </form>
            <div className="under-login">
                <Link to={"/login"}> Go to Login </Link>
            </div>
        </div>
    )
}

export const SignInWithEmail = () => {
    const navigator = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState()
    const [isPending, setIsPending] = useState(false)

    const signInHandler = (e) => {
        e.preventDefault()
        setIsPending(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                if (!user.emailVerified) {
                    auth.signOut()
                    throw new Error(AuthErrorCodes.UNVERIFIED_EMAIL);
                }
                setErrorMessage()
                setPassword()
                localStorage.setItem("apipool_email", user.email)
                setIsPending(false)
                navigator("/console")
            })
            .catch((error) => {
                setIsPending(false)
                setErrorMessage(error.message)
            });
    }
    useEffect(() => {
        const apiPoolEmail = localStorage.getItem("apipool_email")
        if (apiPoolEmail) {
            setEmail(apiPoolEmail)
        }
    }, [])
    return (
        <form onSubmit={signInHandler} className="email-auth">
            <div className="input-group">
                <input className='auth-input' value={email} onChange={(e) => { setEmail(e.target.value) }} type="email" placeholder='email' />
                <input className='auth-input' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='password' />
            </div>
            <button type='submit' className='dashboard-button auth-button' onClick={signInHandler}>{isPending ? "..." : "Login"}</button>
            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}
            <div className="under-login">
                <Link to={"/sign-up"}> Go to Sign Up </Link>
                <PasswordReset email={email} />
            </div>
        </form>
    )
}

export const PasswordReset = ({ email }) => {
    const [moduleVisible, setModuleVisible] = useState(false)
    const clickHandler = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setModuleVisible(true)
            })
            .catch(error => alert(error));
    }
    return (
        <>
            {moduleVisible && (
                <PopupModule message='We have sent a password reset link to your email address. Please check your inbox or spam folder for the email.' buttonLabel='Close' navigate={false} />
            )
            }
            <div className='reset-password' onClick={clickHandler}>
                Reset password
            </div>
        </>
    )
}

export const ChangePassword = () => {
    const navigator = useNavigate()
    const [password, setPassword] = useState()
    const [password2, setPassword2] = useState()
    const [errorMessage, setErrorMessage] = useState();

    const clickHandler = (e) => {
        e.preventDefault()
        const user = auth.currentUser;
        updatePassword(user, password).then(() => {
            if (password != password2) {
                throw Error("passwords dont match")
            }
            auth.signOut()
            navigator("/login")
        }).catch((error) => {
            setErrorMessage(error.message)
        });
    }

    return (
        <div>
            <form className="change-password">
                <h2>Change Password</h2>
                <div className="change-container gap">
                    <div className="input-group change-input-group">
                        <input className='password-input' type="password" placeholder='new password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <input className='password-input' type="password" placeholder='new password' value={password2} onChange={(e) => { setPassword2(e.target.value) }} />
                    </div>
                    {errorMessage && (
                        <div className='error-message'>
                            {errorMessage}
                        </div>
                    )}
                    <button type='submit' className="dashboard-button" onClick={clickHandler}>
                        Change
                    </button>
                </div>
            </form>
        </div>
    )
}
