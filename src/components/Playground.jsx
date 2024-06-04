import { useEffect, useRef, useState } from 'react';
import '../styles/components/Playground.css';
import useAuth from '../hooks/useAuthState';
import { useSnackbar } from 'notistack';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import axios from 'axios';
import Loading from './Loading';
import Expandable from '../components/Expandable';
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from 'react-icons/md';
import { FaRegCopy } from 'react-icons/fa';

//clear intreval bug after completed

const Playground = ({ inputs, postURL, fetchURL, outputs }) => {
    const { auth } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const axiosPrivate = useAxiosPrivate();
    const [body, setBody] = useState(
        inputs.reduce((acc, input) => {
            if (input.type.endsWith('[]'))
                acc[input.title] = [input.default_value || ''];
            else
                acc[input.title] = input.default_value || (input.type === 'number' ? 0 : '');
            return acc;
        }, {})
    );
    const [outputValues, setOutputValues] = useState({});
    const [isPending, setIsPending] = useState(false);
    const fetchIntervalId = useRef(null);

    const fetchResult = async (jobID, apiKey) => {
        try {
            const response = await axios.get(fetchURL + jobID, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                }
            });
            if (response.data.status === 'FAILED')
                return enqueueSnackbar(response.data.error, { variant: "error" });
            else if (response.data.status === 'COMPLETED') {
                clearInterval(fetchIntervalId.current);
                setIsPending(false);
                enqueueSnackbar("Request completed successfully", { variant: "success" });
                return setOutputValues(response.data.output);
            }
            enqueueSnackbar(`Request processing: ${response.data.status}`, { variant: "info" });
            await new Promise(r => setTimeout(r, 5000));

        } catch (error) {
            clearInterval(fetchIntervalId.current);
            setIsPending(false);
            if (error.response)
                return enqueueSnackbar(error.response.data.error, { variant: "error" });
            return enqueueSnackbar(error.message, { variant: "error" });
        }
    }

    const sendRequest = async (e) => {
        try {
            e.preventDefault();
            if (!auth.isLoggedIn)
                return enqueueSnackbar("Log in to use the playground", { variant: "info" });
            for (const input of inputs) {
                if (input.is_required && !body[input.title]) {
                    return enqueueSnackbar(`${input.title} is required`, { variant: "error" });
                }
            }
            setIsPending(true);
            const response = await axiosPrivate.get('/api-keys/get-one');
            if (!response) return;
            const apiKey = response.data.apiKey;

            // Parse numbers in body values and pop last item if it's an empty string
            let parsedBody = {};
            for (let key in body) {
                if (Array.isArray(body[key])) {
                    if (body[key][body[key].length - 1] === '') {
                        parsedBody[key] = body[key].slice(0, -1);
                    } else {
                        parsedBody[key] = body[key];
                    }
                } else {
                    parsedBody[key] = parseFloat(body[key]) || body[key];
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
            if (!jobID) return enqueueSnackbar("Failed to send request", { variant: "error" });
            enqueueSnackbar("Request sent successfully", { variant: "info" });

            let count = 0;
            const limit = 60;
            setIsPending(true);
            const intervalId = setInterval(async () => {
                // todo
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




    const renderInput = (input) => {
        const getValue = (inputTitle) => {
            const value = body[inputTitle];
            if (!Array.isArray(value)) return value;
            return value[value.length - 1];
        }
        switch (input.type) {
            case 'number':
                return (
                    <input
                        // placeholder={input.description.split(".")[0] + "."}
                        className='p-form-input p-form-number-input'
                        type="number"
                        id="numberInput"
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
            case 'string':
                return (
                    <>
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
                    </>
                );
            default:
                return null;
        }
    }

    const renderArray = (input) => {
        const addToBody = (e) => {
            e.preventDefault();
            setBody({ ...body, [input.title]: [...body[input.title], ''] });
        }
        return (
            <>
                {renderInput({ ...input, type: input.type.slice(0, -2) })}
                <button className='p-form-add-button' onClick={addToBody}>
                    <GoPlus size={20} />
                    Add
                </button>
                {body[input.title].map((v, i, self) => {
                    if (i === self.length - 1) return;
                    return (
                        <span style={{ display: 'flex', alignItems: 'center' }}>
                            {<label className='p-description'>{i}</label>}
                            <textarea style={{ width: 'fit-content' }} className='p-form-input p-form-text-input' readOnly value={v}></textarea>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    const array = body[input.title];
                                    array.splice(i, 1);
                                    setBody({ ...body, [input.title]: array });
                                }
                                }
                                className="table-delete-button"
                            >
                                <MdDeleteOutline size={20} className='api-keys-delete-icon' />
                            </button>
                        </span>
                    )

                })}
            </>
        )
    }


    const renderElement = (input) => {
        if (!input.type.endsWith('[]')) return renderInput(input);
        return renderArray(input);
    }

    const [selectedOutput, setSelectedOutput] = useState(0);

    const displayOutput = (value, index = 0, main = true) => {
        if (main && index !== selectedOutput) return;
        try {
            if (isPending) return <p>
                <Loading />
            </p>;
            if (!value) {
                return <p >-</p>;
            };
            //for now only support string output
            if (typeof value !== 'string') return;

            const copyToClipboard = (id) => {
                const text = document.getElementById(id).value;
                navigator.clipboard.writeText(text);
                enqueueSnackbar("Output copied to clipboard", { variant: "default" });
            };


            return (
                <div>
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
                    <br />
                    <br />
                    <span style={{ display: 'flex', justifyContent: 'start' }}>
                        <label className='p-description'>Original String</label>
                        <FaRegCopy
                            style={
                                { cursor: 'pointer', margin: '0 5px' }
                            }
                            size={15} color='grey'
                            onClick={() => copyToClipboard(`base64${index}`)}
                        />
                    </span>
                    <textarea id={`base64${index}`} style={{ width: '90%' }} className='p-form-input p-form-text-input' readOnly value={value}></textarea>

                </div>
            );
        } catch (error) {
            return <textarea style={{ width: '100%' }} className='p-form-input p-form-text-input' readOnly value={value}></textarea>;
        }
    }

    const advancedInputs = inputs.filter((input) => input.is_advanced);
    const essentialInputs = inputs.filter((input) => !input.is_advanced);

    return (
        <div className='playground-main'>
            <div className="p-input">
                <form className='p-form' >
                    {essentialInputs.map((input) => {
                        return (
                            <div className='p-form-element-container'>
                                <label className='p-form-label'>{input.title} {input.is_required ?
                                    <span style={{ color: 'rgb(127, 40, 40)', fontSize: '20px' }}>*</span>
                                    : ''}</label>
                                {renderElement(input)}
                            </div>
                        )
                    })}
                    {advancedInputs.length > 0 && (
                        <Expandable
                            contentPadding={'5px'}
                            label={"Advanced"}>
                            {advancedInputs.map((input) => {
                                return (
                                    <div className='p-form-element-container'>
                                        <label className='p-form-label'>{input.title} {input.is_required ? '*' : ''}</label>
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
                </form>

            </div>
            <div className='p-output'>
                <h3 className='p-output-title'>Output</h3>
                {outputs.map((output) => {
                    return (
                        <div>
                            <div className='p-output-value'>
                                {<div>
                                    <label className='p-form-label'>{output.title}</label>
                                    {/* <p className='p-description'>{output.description}</p> */}
                                    <div className='p-output-value'>
                                        {(() => {
                                            const value = outputValues[output.title];
                                            if (Array.isArray(value)) {
                                                return (
                                                    <div>
                                                        {value.map((item, index) => (
                                                            <div key={index}>
                                                                {displayOutput(item, index)}
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
                                                                        disabled={selectedOutput === index} onClick={() => setSelectedOutput(index)}>{index}</button>
                                                                </div>
                                                            ))
                                                            }
                                                        </div>
                                                    </div>


                                                );
                                            }
                                            return displayOutput(value);

                                        })()}
                                    </div>
                                </div>}
                            </div>
                        </div>
                    )
                })
                }
            </div>

        </div>
    );
}
export default Playground;
