import '../styles/components/Playground.css';
import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuthState';
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from 'axios';
import Loading from './Loading';
import Expandable from '../components/Expandable';
import { GoPlus } from "react-icons/go";
import { MdClose } from 'react-icons/md';
import { FaRegCopy } from 'react-icons/fa';
import { IoMdInformationCircleOutline } from "react-icons/io";
import Tooltip from './Tooltip';
import React from 'react';
import { FaFileImage, FaFileAudio, FaFile, FaFileVideo } from "react-icons/fa";

const Playground = ({ inputs, postURL, fetchURL, outputs }) => {
    const { auth } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const axiosPrivate = useAxiosPrivate();
    const [body, setBody] = useState(
        inputs.reduce((acc, input) => {
            if (input.type.endsWith('[]'))
                acc[input.title] = [input.default_value || ''];
            else
                acc[input.title] = input.default_value ||
                    (input.type === 'number' ? '0' :
                        input.type === 'string' ? '' :
                            input.type === 'boolean' ? "false" :
                                '');

            return acc;
        }, {})
    );
    const [outputValues, setOutputValues] = useState({});
    const [isPending, setIsPending] = useState(false);
    const fetchIntervalId = useRef(null);
    const [fetchStatus, setFetchStatus] = useState(null);

    const fetchResult = async (jobID, apiKey) => {
        try {
            const response = await axios.get(fetchURL + jobID, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                }
            });
            if (!response.data?.status) return;
            const status = response.data.status;
            setFetchStatus(status);
            if (status === 'FAILED') {
                setIsPending(false);
                setFetchStatus("Error.");
                clearInterval(fetchIntervalId.current);
                return;
            }
            else if (status === 'COMPLETED') {
                clearInterval(fetchIntervalId.current);
                setIsPending(false);
                setFetchStatus(null);
                return setOutputValues(response.data.output);
            }
            await new Promise(r => setTimeout(r, 5000));

        } catch (error) {
            clearInterval(fetchIntervalId.current);
            setIsPending(false);
            if (error.response)
                return enqueueSnackbar("Error.", { variant: "error" });
            return enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    const sendRequest = async (e) => {
        try {
            e.preventDefault();

            if (!auth.isLoggedIn)
                return enqueueSnackbar("Log in to use the playground", { variant: "info" });
            setFetchStatus(null);
            setIsPending(true);
            const response = await axiosPrivate.get('/api-keys/get-one');
            if (!response) return;
            const apiKey = response.data.apiKey;


            // Parse numbers in body values and pop last item if it's an empty string
            let parsedBody = {};
            for (let key in body) {
                const value = body[key];
                const type = inputs.find(input => input.title === key).type;
                if (Array.isArray(value)) {
                    if (value[value.length - 1] === '') {
                        parsedBody[key] = value.slice(0, -1);
                    } else {
                        parsedBody[key] = value;
                    }
                    for (let i = 0; i < value.length; i++) {
                        if (type.slice(0, -2) === 'number') {
                            parsedBody[key][i] = parseFloat(value[i]) || parseInt(value[i]) || value[i];
                        }
                    }
                } else if (type === 'number') {
                    parsedBody[key] = Number(value);
                } else if (type === 'boolean') {
                    parsedBody[key] = value === 'true' ? true : false;
                } else parsedBody[key] = value;
            }

            for (const input of inputs) {
                if (input.is_required && (!parsedBody[input.title] || parsedBody[input.title].length < 1)) {
                    setIsPending(false)
                    const requiredElement = document.getElementById(input.title);
                    requiredElement.className = "p-form-element required";
                    setTimeout(() => {
                        requiredElement.className = "p-form-element";
                    }, 1000);
                    const location = requiredElement.getBoundingClientRect();
                    window.scrollTo({
                        top: location.top + 500,
                        behavior: 'smooth'
                    });
                    return enqueueSnackbar(`${input.title} is required`, { variant: "error" });
                }
            }

            setOutputValues({})
            const res = await axios.post(postURL, { input: parsedBody }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey
                }
            });
            const jobID = res.data.id;
            if (!jobID) {
                enqueueSnackbar("Failed to send request", { variant: "error" });
                clearInterval(fetchIntervalId.current);
                return setIsPending(false);
            };
            setFetchStatus('IN QUEUE');

            let count = 0;
            const limit = 60;
            setIsPending(true);
            const intervalId = setInterval(async () => {
                console.log('fetching');
                // remove this line
                setIsPending(true);
                await fetchResult(jobID, apiKey)
                count++;
                if (count === limit) {
                    clearInterval(intervalId.current);
                    setIsPending(false);
                    count = 0;
                }
            }, 5000);
            fetchIntervalId.current = intervalId;
        } catch (error) {
            clearInterval(fetchIntervalId.current);
            setIsPending(false);
            if (error.response)
                return enqueueSnackbar(error.response.data.message, { variant: "error" });
            enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    //prevent fetch when unmounting

    useEffect(() => {
        return () => {
            if (fetchIntervalId) {
                clearInterval(fetchIntervalId.current);
            }
        };
    }, [fetchIntervalId]);

    useEffect(() => {
        inputs.forEach(input => {
            input.relations?.forEach((relation => {
                const relatedKey = relation.related_input_title;
                const element = document.getElementById(input.title);
                if (!element) return; // expandable 
                const children = element.children;
                const relatedValue = relation.related_value;
                const relationType = relation.relation_type;
                const realtionAction = relation.relation_action;
                const actualValue = body[relatedKey];

                const checkConditions = (relationType, actualValue, relatedValue) => {
                    if (relationType === 'EQUALS') return actualValue === relatedValue;
                    if (relationType === 'NOT_EQUALS') return actualValue !== relatedValue;
                    if (relationType === 'NOT_NULL') return !!actualValue;
                    if (relationType === 'NULL') return !actualValue;
                    if (relationType === 'NOT_EMPTY') return actualValue.length > 0;
                }

                if (checkConditions(relationType, actualValue, relatedValue)) {
                    if (realtionAction === 'MAKE_REQUIRED') input.is_required = true;
                    for (let child of children) {
                        child.disabled = false;
                    }
                    return element.setAttribute('class', 'p-form-element');
                } else {
                    if (realtionAction === 'MAKE_REQUIRED') input.is_required = false;
                    for (let child of children) {
                        child.disabled = true;
                    }
                    return element.setAttribute('class', 'p-form-element disabled');
                }
            }));
        });
    }, [body]);

    const renderInput = (input) => {
        const getValue = (inputTitle) => {
            const value = body[inputTitle];
            if (!Array.isArray(value)) return value;
            return value[value.length - 1];
        }
        const type = input.type;

        const fileIcons = {
            'file': <FaFile />,
            'image': <FaFileImage />,
            'audio': <FaFileAudio />,
            'video': <FaFileVideo />,
        }
        switch (true) {
            case type === 'number':
                return (
                    <input
                        // placeholder={input.description.split(".")[0] + "."}
                        className='p-form-input p-form-number-input'
                        type="number"
                        value={getValue(input.title)}
                        onChange={(e) => {
                            if (!Array.isArray(body[input.title]))
                                return setBody({ ...body, [input.title]: e.target.value });
                            const array = body[input.title];
                            array[array.length - 1] = e.target.value;
                            return setBody({ ...body, [input.title]: array });
                        }}
                    />
                );
            case type === 'string':
                return (
                    <textarea
                        // placeholder={input.description.split(".")[0] + "."}
                        className='p-form-input p-form-text-input'
                        value={getValue(input.title)}
                        onChange={(e) => {
                            if (Array.isArray(body[input.title])) {
                                const array = body[input.title];
                                array[array.length - 1] = e.target.value;
                                return setBody({ ...body, [input.title]: array });
                            }
                            setBody({ ...body, [input.title]: e.target.value });

                        }}
                    />
                );
            case type === 'boolean':
                return (
                    <div className='p-form-checkbox-container'>
                        <label className='p-form-label p-description p-form-checkbox-label' htmlFor={input.title + 'checkbox'}>
                            {input.title}
                        </label>
                        <input
                            id={input.title + 'checkbox'}
                            type='checkbox'
                            className='p-form-checkbox-input'
                            checked={getValue(input.title) == 'true'}
                            onChange={(e) => {
                                setBody({ ...body, [input.title]: e.target.checked.toString() });
                            }}
                        />
                    </div>
                );
            case type.startsWith('enum'):
                return (
                    <select
                        className='p-form-input p-form-select-input'
                        value={getValue(input.title)}
                        onChange={(e) => {
                            if (Array.isArray(body[input.title])) {
                                const array = body[input.title];
                                array[array.length - 1] = e.target.value;
                                return setBody({ ...body, [input.title]: array });
                            }
                            setBody({ ...body, [input.title]: e.target.value });
                        }}
                    >
                        <option value={''} hidden={true}>Select...</option>
                        {
                            input.type.slice(5, -1).split(',').map((value) => (
                                <option value={value}>{value}</option>
                            ))
                        }
                    </select>
                );
            case type === 'file':
            case type === 'image':
            case type === 'audio':
            case type === 'video':
                return (
                    <>
                        <label htmlFor={input.title + '-file-input'} className='p-form-file-input-container' >
                            {fileIcons[type]}

                            <span className='p-form-file-input-label'>
                                {document.getElementById(input.title + '-file-input')?.files[0]?.name || `Select ${type}`}

                            </span>
                        </label>
                        <input
                            type='file'
                            placeholder='Upload a file'
                            accept={type + '/*'}
                            className='p-form-input p-form-file-input'
                            id={input.title + '-file-input'}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const base64_string = e.target.result.split(',')[1];
                                    if (Array.isArray(body[input.title])) {
                                        const array = body[input.title];
                                        array[array.length - 1] = base64_string;
                                        return setBody({ ...body, [input.title]: array });
                                    }
                                    setBody({ ...body, [input.title]: base64_string });
                                }
                                reader.readAsDataURL(file);
                            }}

                        />
                    </>
                );
            default:
                return null;
        }
    }

    const renderArray = (input) => {
        const addToBody = (e) => {
            e.preventDefault();
            const values = body[input.title]
            if (values[values.length - 1] === '') return;
            setBody({ ...body, [input.title]: [...values, ''] });
            document.getElementById(input.title).value = '';
        }
        return (
            <>
                {renderInput({ ...input, type: input.type.slice(0, -2) })}
                <button className='p-form-add-button' onClick={addToBody}>
                    Add
                    <GoPlus size={20} />
                </button>
                {body[input.title].map((v, i, self) => {
                    if (i === self.length - 1) return;
                    return (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {<label className='p-description'>
                                {(i + 1) + ". "}
                            </label>}
                            <textarea style={{ width: 'fit-content' }} className='p-form-input p-form-text-input p-form-array-item' readOnly value={v}></textarea>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const array = body[input.title];
                                    array.splice(i, 1);
                                    setBody({ ...body, [input.title]: array });
                                }
                                }
                                className="p-form-array-remove-button"
                            >
                                <MdClose size={17} className='p-form-array-remove-icon' />
                            </button>
                        </span>
                    )

                })}
            </>
        )
    }


    const renderElement = (input) => (
        <div className='p-form-element' id={input.title}>
            {!input.type.endsWith('[]')
                ? renderInput(input)
                : renderArray(input)
            }
        </div>)


    const [selectedOutput, setSelectedOutput] = useState(0);

    const displayOutput = (description, value, type, index = 0, main = true) => {
        if (main && index !== selectedOutput) return;
        const copyToClipboard = (id) => {
            const text = document.getElementById(id).value;
            navigator.clipboard.writeText(text);
            enqueueSnackbar("Output copied to clipboard", { variant: "default" });
        };
        try {
            if (isPending) return <Loading
                height={'200px'}
            />;
            if (!value) {
                return <p className='p-description'>{description}</p>;
            };


            const renderValue = (type, value) => {
                switch (type) {
                    default:
                    case 'string':
                        return <textarea style={{ width: '100%' }} className='p-form-input p-form-text-input' readOnly value={value}></textarea>;
                    case 'number':
                        return <p>{value}</p>;
                    case 'boolean':
                        return <p>{value ? 'True' : 'False'}</p>;
                    case 'file':
                    case 'image':
                    case 'audio':
                        // case 'video':
                        return (
                            <>
                                <p className='p-description'>Decoded</p>
                                <img
                                    className='p-output-media'
                                    src={`data:image/png;base64,${value}`}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `data:audio/wav;base64,${value}`;
                                        e.target.onload = function () {
                                            throw new Error('Not an image or audio');
                                        };
                                    }}
                                />
                            </>
                        );
                }
            }


            return (
                <div>
                    {renderValue(type, value)}
                    {type !== 'string' && <>
                        <span style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <label className='p-description'>Original String</label>
                            <FaRegCopy
                                style={
                                    { cursor: 'pointer', margin: '0 5px' }
                                }
                                size={15} color='grey'
                                onClick={() => copyToClipboard(`base64_string${index}`)}
                            />
                        </span>
                        <textarea id={`base64_string${index}`} style={{ width: '90%' }} className='p-form-input p-form-text-input' readOnly value={value}></textarea>
                    </>}

                </div>
            );
        } catch (error) {
            <FaRegCopy
                style={
                    { cursor: 'pointer', margin: '0 5px' }
                }
                size={15} color='grey'
                onClick={() => copyToClipboard(`base64_string${index}`)}
            />
            return <textarea style={{ width: '100%' }} className='p-form-input p-form-text-input' readOnly value={value}></textarea>;
        }
    }

    const advancedInputs = inputs.filter((input) => input.is_advanced);
    const essentialInputs = inputs.filter((input) => !input.is_advanced);

    const normalizeString = (str) => {
        return str.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    }

    return (
        <div className='playground-main'>
            <div className="p-input">
                <form className='p-form' >
                    {essentialInputs.map((input) => {
                        return (
                            <div className='p-form-element-container'>
                                <label className='p-form-label'>
                                    <Tooltip text={input.description} >
                                        <IoMdInformationCircleOutline
                                            style={{
                                                cursor: 'pointer',
                                                margin: '3px',
                                                verticalAlign: 'middle'
                                            }}
                                            size={16}
                                            color='grey' />
                                    </Tooltip>
                                    {normalizeString(input.title)}
                                    {/* uncomment after proper state management */}
                                    {/* {input.is_required ?
                                        <span className='required-star'>*</span>
                                        : ''} */}
                                </label>
                                {renderElement(input)}
                            </div>
                        )
                    })}
                    {advancedInputs.length > 0 && (
                        <Expandable
                        backgroundColor={'transparent'}
                            contentPadding={'5px'}
                            label={"Advanced"}>
                            {advancedInputs.map((input) => {
                                return (
                                    <div className='p-form-element-container'>

                                        <label className='p-form-label'>
                                            <Tooltip text={input.description} >
                                                <IoMdInformationCircleOutline
                                                    style={{
                                                        cursor: 'pointer',
                                                        margin: '5px',
                                                        verticalAlign: 'middle'
                                                    }}
                                                    size={17}
                                                    color='grey' />
                                            </Tooltip>
                                            {normalizeString(input.title)} {input.is_required ? '*' : ''}</label>
                                        {renderElement(input)}
                                    </div>
                                )
                            })}

                        </Expandable>
                    )

                    }
                    <button className='p-form-button'
                        disabled={isPending}
                        onClick={sendRequest} type="submit">
                        {isPending ? 'Generating...' : 'Generate'}
                    </button>
                    {Object.keys(outputValues).length > 0 &&
                        <p
                            onClick={() => setOutputValues({})}
                            className='p-clear-output p-description'>
                            Clear Output
                        </p>
                    }
                </form>

            </div>
            <div className='p-output'>
                <h3 className='p-output-title'>Output</h3>

                {outputs.map((output) => {
                    return (
                        <>
                            <div className='p-output-value'>
                                {<div>
                                    <label className='p-form-label'>{normalizeString(output.title)}</label>
                                    {/* <p className='p-description'>{output.description}</p> */}
                                    <div className='p-output-value'>
                                        {(() => {
                                            const value = outputValues[output.title];
                                            if (Array.isArray(value)) {
                                                return (
                                                    <div>
                                                        {value.map((item, index) => (
                                                            <div key={index}>
                                                                {displayOutput( output.description,item, output.type.slice(0, output.type.length - 2), index)}
                                                            </div>
                                                        ))}
                                                        <div
                                                            style={
                                                                { display: 'flex', justifyContent: 'center' }
                                                            }
                                                            className='output-selector'>
                                                            {!isPending && value.length > 1 && value.map((item, index) => (
                                                                <div key={index}>
                                                                    <button
                                                                        className='output-selector-button'
                                                                        disabled={selectedOutput === index} onClick={() => setSelectedOutput(index)}>{index + 1}</button>
                                                                </div>
                                                            ))
                                                            }
                                                        </div>
                                                    </div>


                                                );
                                            }
                                            return displayOutput( output.description,value, output.type);

                                        })()}
                                    </div>
                                </div>}
                            </div>
                            {fetchStatus &&
                                <p className='p-output-status'>Status: {
                                    fetchStatus.replace(/_/g, ' ')
                                }</p>
                            }

                        </>
                    )
                })
                }
            </div>

        </div>
    );
}
export default Playground;
