import '../../styles/tabs/console/APIKeys.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import {useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import PopupModule from '../../components/PopupModule';
import useConsoleState from '../../hooks/useConsoleState';

//TODO: usereducer for console state and find a better way to deleting apikey

const APIKeys = () => {
    const axiosPrivate = useAxiosPrivate(null);
    const [apiTitle, setAPITitle] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);
    const [consoleState, setConsoleState] = useConsoleState(null);

    const getAPIKeys = async () => {
        setIsPending(true);
        const response = await axiosPrivate.get('/api-keys');
        if (response.errorMessage) {
            isPending(false);
            setErrorMessage(response.errorMessage);
            return;
        }
        setConsoleState({...consoleState, apiKeys: response.data.apiKeys});
        setIsPending(false);
    };

    const addAPIKey = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        const apiTitleRegex = /^[a-z][a-z0-9_-]*$/;
        if (!apiTitleRegex.test(apiTitle)) {
            return setErrorMessage("Invalid API Title. It should start with a lowercase letter or a number, and can contain lowercase letters, numbers, underscores, and hyphens.");
        }
        setIsPending(true);
        const response = await axiosPrivate.post('/api-keys', { apiTitle: apiTitle });
        if (response?.errorMessage) {
            setErrorMessage(response.errorMessage);
            setIsPending(false);
            setAPITitle('');
            return;
        };
        setAPITitle('');
        setConsoleState({...consoleState, apiKeys: [response.data.apiKey, ...consoleState.apiKeys]});
        setIsPending(false);
    };

    const deleteAPIKey = async () => {
        try {
            setIsPending(true);
            const response = await axiosPrivate.delete(`/api-keys/${selectedKey}`);
            if (response?.errorMessage) {
                setErrorMessage(response.errorMessage);
                setIsPending(false);
                return;
            };
            setConsoleState({...consoleState, apiKeys: consoleState.apiKeys.filter(apiKey => apiKey.api_key !== selectedKey)});
            setIsPending(false);
            
        } catch (error) {
            console.log(error);
            setErrorMessage("An error occurred while deleting the API Key.");
            setIsPending(false);
        }
    };

    const copyToClipboard = (id) => {
        const text = document.getElementById(id).innerText;
        navigator.clipboard.writeText(text);
    };

    useEffect(() => {
        if (consoleState.apiKeys) return setIsPending(false);
        getAPIKeys();
    }, [consoleState]);

    if (isPending) return <Loading />;

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
            {errorMessage &&
                <div className="error-message">
                    {errorMessage}
                </div>
            }
            {consoleState.apiKeys?.length !== 0
                ?
                <div className="apikeys-table table-container">
                    <table>
                        <tr>
                            <th>Title</th>
                            <th>API Key</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>

                        {consoleState.apiKeys?.map((apiKey, index) => (
                                <tr key={`row${index}`}>
                                    <td>{apiKey.title}</td>
                                    <td id={`key${index}`} style={{ cursor: "pointer"}} >
                                        {apiKey.api_key}
                                    </td>
                                    <td>{(new Date(apiKey.created_at)).toLocaleDateString("en-EN")}</td>
                                    <td className='table-actions'>
                                        <button
                                            onClick={() => {
                                                copyToClipboard(`key${index}`)
                                            }}
                                            className="apikeys-copy "
                                        >
                                            <FaRegCopy size={18} className="apikeys-copy-icon" />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsPopupVisible(true);
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
                :
                <div className="apikeys-empty">
                    {/* <div className="apikeys-empty-label">
                        You have no API Keys
                    </div> */}
                    <div className="apikeys-empty-sublabel">
                        Create an API Key to access the API.
                    </div>
                </div>
            }
            {isPopupVisible && (<PopupModule
                isVisibleState={[isPopupVisible, setIsPopupVisible]}
                actionCallback={deleteAPIKey}
                actionType='warning'
                buttonColor='rgb(127, 40, 40)'
                buttonLabel='Delete'
                message='Do you really want to delete your API Key? This process can not be irrevocable.'
            />)}
        </div>
    );
}

export default APIKeys;