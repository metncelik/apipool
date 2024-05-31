import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuthState";
import Loading from "../components/Loading";
import "../styles/views/Oauth.css";
import useAxiosAuth from "../hooks/useAxiosAuth";
import { enqueueSnackbar, useSnackbar } from "notistack";

const Oauth = () => {
    const { provider, method } = useParams();
    const navigate = useNavigate()
    const { setAuth } = useAuth();
    const [isPending, setIsPending] = useState(true);
    const axiosAuth = useAxiosAuth();
    const {endqueueSnackbar} = useSnackbar();

    useEffect(() => {
        const authorize = async () => {
            setIsPending(true);
            const params = new URLSearchParams(window.location.search);
            if (params.includes('error_description')) {
                enqueueSnackbar(params.get('error_description'), { variant: "error" });
                return navigate("/login");
            }
            if (!params.includes("code"))
                return navigate("/login");

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