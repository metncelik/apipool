import { useEffect, useState } from 'react';
import useConsoleState from '../../hooks/useConsoleState';
import '../../styles/tabs/console/MyModels.css'
// import { CgAddR } from "react-icons/cg";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
// import Loading from '../../components/Loading';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';

const MyModels = () => {
    const [consoleState, setConsoleState] = useConsoleState();
    const axiosPrivate = useAxiosPrivate();
    const [isPending, setIsPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const getMyModels = async () => {
        const response = await axiosPrivate.get(`/models/my-models`);
        if (!response || response.errorMessage) {
            setIsPending(false);
            setErrorMessage(response.errorMessage);
            return;
        }
        setIsPending(false);
        setConsoleState({ ...consoleState, models: response.data?.models });
    }

    useEffect(() => {
        if (consoleState.models) return setIsPending(false);
        getMyModels();
    }, [consoleState]);

    return (
        <div className="my-models container">
            {/* <button className="add-model" onClick={() => {
                setSearchParams({ "tab": parseInt(searchParams.get("tab")) + 1 });
            }}>
                <span className='button-label'>
                    <CgAddR size={20} />
                    &nbsp;
                    Add Model
                </span>
            </button> */}
            {errorMessage && <div className='error-message'>{errorMessage}</div>}
            {consoleState.models ?
                <table className='models-table'>
                    <tr>
                        <th>Model Name</th>
                        <th>Model Alias</th>
                        <th>Visibility</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>

                    {consoleState.models.map((model, index) => {
                        return (
                            <tr key={index}>
                                <td>{model.title}</td>
                                <td>{model.alias}</td>
                                <td>{model.is_public ? "PUBLIC" : "PRIVATE"}</td>
                                <td>{(new Date(model.created_at)).toLocaleDateString('en-GB')}</td>
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
                : <div className='no-models'>No models found</div>
            }

        </div>
    );
};

export default MyModels;