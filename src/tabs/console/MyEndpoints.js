import { useEffect, useState } from 'react';
import useConsoleState from '../../hooks/useConsoleState';
import '../../styles/tabs/console/MyEndpoints.css'
// import { CgAddR } from "react-icons/cg";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
// import Loading from '../../components/Loading';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

const MyEndpoints = () => {
    const [consoleState, setConsoleState] = useConsoleState();
    const axiosPrivate = useAxiosPrivate();
    const [isPending, setIsPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const getMyEndpoints = async () => {
        const response = await axiosPrivate.get(`/endpoints/my-endpoints`);
        if (!response || response.errorMessage) {
            setIsPending(false);
            setErrorMessage(response.errorMessage);
            return;
        }
        setIsPending(false);
        setConsoleState({ ...consoleState, endpoints: response.data?.endpoints });
    }

    useEffect(() => {
        if (consoleState.endpoints) return setIsPending(false);
        getMyEndpoints();
    }, [consoleState]);

    return (
        <div className="my-endpoints container">
            {/* <button className="add-endpoint" onClick={() => {
                setSearchParams({ "tab": parseInt(searchParams.get("tab")) + 1 });
            }}>
                <span className='button-label'>
                    <CgAddR size={20} />
                    &nbsp;
                    Add Endpoint
                </span>
            </button> */}
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            {consoleState.endpoints ?
                <table className='console-table endpoints-table'>
                    <tr>
                        <th>Endpoint Name</th>
                        <th>Endpoint Alias</th>
                        <th>Visibility</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>

                    {consoleState.endpoints.map((endpoint, index) => {
                        return (
                            <tr key={index}>
                                <td>{endpoint.title}</td>
                                <td>{endpoint.alias}</td>
                                <td>{endpoint.is_public ? "PUBLIC" : "PRIVATE"}</td>
                                <td>{(new Date(endpoint.created_at)).toLocaleDateString('en-GB')}</td>
                                <td className='table-actions'>
                                    <button className='edit-button'>
                                        <MdEdit size={20} />
                                    </button>
                                    <button className='table-delete-button'>
                                        <MdDeleteOutline size={20} className='api-keys-delete-icon' />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </table>
                : <div className='no-endpoints'>No endpoints found</div>
            }

        </div>
    );
};

export default MyEndpoints;