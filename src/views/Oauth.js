import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import useAuth from "../hooks/useAuthState";
import Loading from "../components/Loading";
import "../styles/views/Oauth.css";
import useAxiosAuth from "../hooks/useAxiosAuth";
import { useSnackbar } from "notistack";

const Oauth = () => {
    const { provider, method } = useParams();
    const navigate = useNavigate()
    const { setAuth } = useAuth();
    const [isPending, setIsPending] = useState(true);
    const axiosAuth = useAxiosAuth();
    const {enqueueSnackbar} = useSnackbar();
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const authorize = async () => {
            setIsPending(true);
            if (method == error && searchParams.has('error_description')) {
                enqueueSnackbar(searchParams.get('error_description'), { variant: "error" });
                return navigate("/login");
            } else if (method == error) return;
            if (!searchParams.has("code"))
                return navigate("/login");

            const code = searchParams.get('code');

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