import { useSnackbar } from "notistack";
import useAuth from "./useAuthState";
import useAxiosAuth from "./useAxiosAuth";

const useRefresh = () => {
    const { setAuth } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const axiosAuth = useAxiosAuth();

    const refresh = async () => {
        const response = await axiosAuth.get("/refresh");
        if (!response) return;
        const { accessToken } = response.data;
        setAuth({ accessToken, isLoggedIn: true });
        return accessToken;
    }

    return refresh;
}

export default useRefresh;