import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "../styles/views/VerifyEmail.css";
import useAxiosAuth from "../hooks/useAxiosAuth";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [secretKey, setSecretKey] = useState();
    const axiosAuth = useAxiosAuth();

    useEffect(() => {
        if (!searchParams.has("secretKey")) {
            navigate("/console");
            return;
        }

        setSecretKey(searchParams.get("secretKey"));

        const verify = async () => {
            setIsPending(true);
            const headers = { Authorization: secretKey };
            const response = await axiosAuth.get(`/email/verify`, { headers });
            setIsPending(false);
            // if (!response) return;
            navigate("/login");
        };

        verify();
    }, [secretKey]);

    if (isPending) return <Loading />
};

export default VerifyEmail;