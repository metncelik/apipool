import { useNavigate, useSearchParams } from "react-router-dom";
import { axiosAuth } from "../api/axios";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import "../styles/views/VerifyEmail.css";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isPending, setIsPending] = useState(true);
    const [secretKey, setSecretKey] = useState();

    useEffect(() => {
        if (!searchParams.has("secretKey")) {
            navigate("/console");
            return;
        }

        setSecretKey(searchParams.get("secretKey"));

        const verify = async () => {
            try {
                setIsPending(true);
                const headers = { Authorization: secretKey };
                const response = await axiosAuth.get(`/email/verify`, { headers });
                console.log(response);
                navigate("/login");
                setIsPending(false);
            } catch (error) {
                setErrorMessage(error.response?.data?.message);
                setIsPending(false);
            }
        };

        verify();
    }, [secretKey]);

    if (isPending) return <Loading />

    return (
        <div className="verify-email-main">
            <h1>Verify Email</h1>
            {errorMessage && (
                <div className='error-message'>
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default VerifyEmail;