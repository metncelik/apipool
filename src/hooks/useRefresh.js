import { axiosAuth } from "../api/axios"
import useAuth from "./useAuthState";

const useRefresh = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const response = await axiosAuth.get("/refresh");
            const { accessToken } = response.data;
            setAuth({ accessToken, isLoggedIn: true });
            return accessToken;
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.removeItem("isLoggedIn");
                setAuth({ isLoggedIn: false });
                return;
            };
        }
    }

    return refresh;
}

export default useRefresh;