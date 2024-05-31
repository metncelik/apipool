import '../../styles/tabs/console/ApiKeys.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Modal from '../../components/Modal';
import useConsoleState from '../../hooks/useConsoleState';
import useModal from '../../hooks/useModal';
import { useSnackbar } from "notistack";
import { useCallback } from 'react';

const ApiKeys = () => {
    const axiosPrivate = useAxiosPrivate();
    const [apiTitle, setAPITitle] = useState('');
    const [isPending, setIsPending] = useState(false);
    const { isModalOpen, setIsModalOpen } = useModal(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [consoleState, setConsoleState] = useConsoleState(null);
    const { enqueueSnackbar } = useSnackbar("");

    const getApiKeys = useCallback(async () => {
        if (consoleState.apiKeys) return setIsPending(false);
        setIsPending(true);
        const response = await axiosPrivate.get('/api-keys');
        setIsPending(false);
        if (!response) return;
        setConsoleState({ ...consoleState, apiKeys: response.data?.apiKeys });
    }, []);

    const addAPIKey = async (e) => {
        e.preventDefault();
        setIsPending(true);
        const response = await axiosPrivate.post('/api-keys', { apiTitle: apiTitle });
        setIsPending(false);
        if (!response) return;
        setAPITitle('');
        setConsoleState({ ...consoleState, apiKeys: [response.data.apiKey, ...consoleState.apiKeys] });
    };

    const deleteAPIKey = async () => {
        setIsPending(true);
        const response = await axiosPrivate.delete(`/api-keys/${selectedKey}`);
        setIsPending(false);
        if (!response) return;
        setConsoleState({ ...consoleState, apiKeys: consoleState.apiKeys.filter(apiKey => apiKey.api_key !== selectedKey) });
    };

    const copyToClipboard = (id) => {
        const text = document.getElementById(id).innerText;
        navigator.clipboard.writeText(text);
        enqueueSnackbar("API Key copied to clipboard", { variant: "default" });
    };

    useEffect(() => {
        if (consoleState.apiKeys) return setIsPending(false);
        getApiKeys();
    }, []);

    if (isPending || !consoleState.apiKeys) return <Loading />;

    return (
        <div className="apikeys container">
            <form
                onSubmit={addAPIKey}
                className="create-apikey"
            >
                <input
                    value={apiTitle}
                    onChange={(e) => {
                        setAPITitle(e.target.value)
                    }}
                    className='console-input'
                    type="text"
                    placeholder="API Key Title"
                    required
                />
                <button className="create-apikey-button ">
                    <div className="create-apikey-label">
                        Create Key
                    </div>
                </button>
            </form>
            {consoleState.apiKeys.length === 0
                ?
                <div className="table-empty-sublabel">
                    Create an API Key to access the API.
                </div>
                :
                <div className="apikeys-table table-container">
                    <table className='console-table api-keys-table'>
                        <tr>
                            <th>Title</th>
                            <th>API Key</th>
                            <th>Created</th>
                            <th style={{ width: '0px' }}></th>
                        </tr>

                        {consoleState.apiKeys?.map((apiKey, index) => (
                            <tr key={`row${index}`}>
                                <td>{apiKey.title}</td>
                                <td id={`key${index}`} style={{ cursor: "pointer" }} onClick={() => {
                                    copyToClipboard(`key${index}`)
                                }} >
                                    {apiKey.api_key}
                                    <span className='copy-icon'>
                                        <FaRegCopy size={20} className="apikeys-copy-icon" />
                                    </span>
                                </td>

                                <td>{(new Date(apiKey.created_at)).toLocaleDateString("en-EN")}</td>
                                <td className='table-actions'>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setSelectedKey(document.getElementById(`key${index}`).innerText)
                                        }}
                                        className="table-delete-button"
                                    >
                                        <MdDeleteOutline size={20} className='api-keys-delete-icon' />
                                    </button>
                                </td>

                            </tr>
                        ))
                        }
                    </table>
                </div>

            }
            {isModalOpen && (<Modal
                actionCallback={deleteAPIKey}
                actionType='warning'
                buttonColor='rgb(127, 40, 40)'
                buttonLabel='Delete'
                message='Do you really want to delete your API Key? This process can not be irrevocable.'
            />)}
        </div>
    );
}

export default ApiKeys;