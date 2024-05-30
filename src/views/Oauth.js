import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuthState";
import Loading from "../components/Loading";
import "../styles/views/Oauth.css";
import useAxiosAuth from "../hooks/useAxiosAuth";

const Oauth = () => {
    const { provider, method } = useParams();
    const navigate = useNavigate()
    const { setAuth } = useAuth();
    const [isPending, setIsPending] = useState(true);
    const axiosAuth = useAxiosAuth();

    useEffect(() => {
        const authorize = async () => {
            setIsPending(true);
            if (!window.location.search.includes("code"))
                return navigate("/login");

            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');

            const body = { code };
            const response = await axiosAuth.post(`/${provider}/${method}`, body);
            setIsPending(false);
            navigate("/login");
            if (!response) return;

            setAuth({ isLoggedIn: true });
            localStorage.setItem("isLoggedIn", true);
            navigate("/console");
        };
        authorize();
    }, [method]);

    if (isPending) return <Loading />
}

export default Oauth;