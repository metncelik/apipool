import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";
import "../styles/views/Oauth.css";

const Oauth = () => {
    const { provider, method } = useParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()
    const { setAuth } = useAuth();
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const authorize = async () => {
            try {
                setIsPending(true);
                if (!window.location.search.includes("code"))
                    return navigate("/login");

                const params = new URLSearchParams(window.location.search);
                const code = params.get('code');

                const body = { code };
                await axiosAuth.post(`/${provider}/${method}`, body);

                setIsPending(false);
                setAuth({ isLoggedIn: true });
                localStorage.setItem("isLoggedIn", true);
                navigate("/console");
            } catch (error) {
                setIsPending(false);
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                    return;
                }
                setErrorMessage("An error occurred");
                return;
            }
        };
        authorize();
    }, [method]);

    if (isPending) return <Loading />

    return (
        <div className="oauth-main">
            <h1>Oauth</h1>
            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}
        </div>
    );
}

export default Oauth;