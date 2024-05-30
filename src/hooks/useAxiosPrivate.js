import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefresh from "./useRefresh";
import useAuth from "./useAuthState";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";


const useAxiosPrivate = () => {
    const refresh = useRefresh();
    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"])
                    config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
                return config;
            },
            error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                if(response.data?.message){
                    enqueueSnackbar(response.data);
                }
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;
                if (error.response.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                if (error.response.status === 401) {
                    localStorage.removeItem("isLoggedIn");
                    setAuth({isLoggedIn: false });
                    navigate("/login");
                    return ;
                }
                if(error.response.status !== 200){
                    return {errorMessage: error.response.data?.message};
                }
                Promise.reject(error);
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refresh, auth])

    return axiosPrivate;
}

export default useAxiosPrivate;