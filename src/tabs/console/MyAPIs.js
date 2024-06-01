import { useEffect, useState } from 'react';
import useConsoleState from '../../hooks/useConsoleState';
import '../../styles/tabs/console/MyAPIs.css'
// import { CgAddR } from "react-icons/cg";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
// import Loading from '../../components/Loading';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

const MyAPIs = () => {
    const [consoleState, setConsoleState] = useConsoleState();
    const axiosPrivate = useAxiosPrivate();
    const [isPending, setIsPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const getMyAPIs = async () => {
        const response = await axiosPrivate.get(`/apis/my-apis`);
        if (!response || response.errorMessage) {
            setIsPending(false);
            setErrorMessage(response.errorMessage);
            return;
        }
        setIsPending(false);
        setConsoleState({ ...consoleState, apis: response.data?.apis });
    }

    useEffect(() => {
        if (consoleState.apis) return setIsPending(false);
        getMyAPIs();
    }, [consoleState]);

    return (
        <div className="my-apis container">
            {/* <button className="add-api" onClick={() => {
                setSearchParams({ "tab": parseInt(searchParams.get("tab")) + 1 });
            }}>
                <span className='button-label'>
                    <CgAddR size={20} />
                    &nbsp;
                    Add API
                </span>
            </button> */}
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            {consoleState.apis ?
                <table className='console-table apis-table'>
                    <tr>
                        <th>API Name</th>
                        <th>API Alias</th>
                        <th>Visibility</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>

                    {consoleState.apis.map((api, index) => {
                        return (
                            <tr key={index}>
                                <td>{api.title}</td>
                                <td>{api.alias}</td>
                                <td>{api.is_public ? "PUBLIC" : "PRIVATE"}</td>
                                <td>{(new Date(api.created_at)).toLocaleDateString('en-GB')}</td>
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
                : <div className='no-apis'>No apis found</div>
            }

        </div>
    );
};

export default MyAPIs;