import { useEffect } from "react";
import { axiosAuth } from "../api/axios";
import { useSnackbar } from "notistack";
import useModal from "./useModal";

const useAxiosAuth = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { setIsModalOpen } = useModal();

    useEffect(() => {
        const responseIntercept = axiosAuth.interceptors.response.use(
            response => {
                if (response.data?.message) {
                    enqueueSnackbar(response.data.message, { variant: "success" });
                }
                return response;
            },
            async (error) => {
                if (!error.response.data?.message) return;
                const errorMessage = error.response.data.message;
                if (errorMessage === "Email not verified!") {
                    setIsModalOpen(true);
                }
                enqueueSnackbar(error.response.data.message, { variant: "error" });
            }
        );
        return () => {
            axiosAuth.interceptors.response.eject(responseIntercept);
        };
    }, []);

    return axiosAuth;
}

export default useAxiosAuth;