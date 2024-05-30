import React, { useCallback, useEffect, useState } from 'react';
import '../../styles/tabs/console/Settings.css';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";
import { AddEmailAuthForm, AddGithubAuthButton, AddGoogleAuthButton, ChangePassword, SendEmailVerificationButton } from "../../components/Auth";
import useAuth from '../../hooks/useAuthState';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useConsoleState from '../../hooks/useConsoleState';
import Expandable from '../../components/Expandable';
import Loading from '../../components/Loading';

const Settings = () => {
  const navigate = useNavigate(null);
  const { setAuth } = useAuth(null);
  const axiosPrivate = useAxiosPrivate();
  const [isPending, setIsPending] = useState(false);
  const [consoleState, setConsoleState] = useConsoleState(null);

  const handleLogout = async () => {
    try {
      const response = await axiosPrivate.delete(`/auth/logout`);
      if (response.status !== 200) return;
      setAuth({ isLoggedIn: false });
      localStorage.removeItem("isLoggedIn");
      navigate("/login", { state: { from: "/console" }, replace: true });
    } catch (error) {
      setAuth({ isLoggedIn: false });
      localStorage.removeItem("isLoggedIn");
    }
  }

  const getAuthMethods = useCallback(async () => {
    setIsPending(true);
    const response = await axiosPrivate.get(`/auth/auth-methods`);
    const authMethods = response.data.authMethods;
    setConsoleState({ ...consoleState, authMethods });
    setIsPending(false);
  }, []);

  useEffect(() => {
    if (consoleState.authMethods) {
      return;
    }
    getAuthMethods();

  }, [consoleState]);

  const methodComponents = {
    "Google": <AddGoogleAuthButton />,
    "Github": <AddGithubAuthButton />,
    "Email": <AddEmailAuthForm updateAuthMethods={getAuthMethods} />
  }

  if (isPending || !consoleState.authMethods) return <Loading />

  return (
    <div className="settings container">
            <Expandable label={"Auth Methods"} expanded={true}>
              <table className="console-table auth-table">
                <thead>
                  <tr>
                    <th>Provider</th>
                    <th>Email</th>
                    <th>Verified</th>
                    <th>Added At</th>
                  </tr>
                </thead>
                <tbody>
                  {consoleState.authMethods?.map((authMethod, index) => (
                    <tr key={index}>
                      <td>{authMethod.provider}</td>
                      <td>{authMethod.email}</td>
                      <td> {authMethod.verified ? "yes" :
                      <span style={{backgroundColor: "red"}}>
                        <SendEmailVerificationButton email={authMethod.email} />
                      </span>
                      }

                      </td>
                      <td>{new Date(authMethod.added_at).toLocaleDateString('en-GB')}</td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            </Expandable>
            {
              Object.keys(methodComponents).map((method) => {
                if (!consoleState.authMethods.some((authMethod) => authMethod.provider === method)) {
                  return (
                    <Expandable label={`Add ${method} Auth`}>
                      {methodComponents[method]}
                    </Expandable>
                  );
                }
              })
            }
        


      {consoleState.authMethods?.some((authMethod) => authMethod.provider === "Email" && authMethod.verified) &&
        <Expandable label={"Change password"}>
          <ChangePassword />
        </Expandable >
      }

      <div className='logout'>
        <button className='logout-button' onClick={handleLogout}>
          <BiLogOut size={15} className='logout' />
          <div className="logout-label">
            Logout
          </div>
        </button>
      </div>
    </div>
  );
}

export default Settings;