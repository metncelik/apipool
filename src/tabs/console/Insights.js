import '../../styles/tabs/console/Insights.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import useConsoleState from '../../hooks/useConsoleState';
import { FaCheckCircle } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RequestsLineChart } from '../../components/charts/RequestsLineChart';
import { TimesBarChart } from '../../components/charts/TimesBarChart';
import { IoMdRefreshCircle } from "react-icons/io";


const Insights = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isPending, setIsPending] = useState(false);
    const [consoleState, setConsoleState] = useConsoleState(null);

    const getInsights = async () => {
        setIsPending(true);
        const response = await axiosPrivate.get('/api-keys/requests');
        setIsPending(false);
        if (!response) return;
        setConsoleState({ ...consoleState, insights: response.data });
    };

    useEffect(() => {
        if (consoleState.insights) return setIsPending(false);
        console.log(consoleState.insights);
        getInsights();
    }, [consoleState]);

    if (isPending) return <Loading />;

    const statuses = {
        COMPLETED: {
            color: '#856c32',
            icon: <FaCheckCircle />
        },
        FAILED: {
            color: '#942b3b',
            icon: <IoMdCloseCircle />
        },
        IN_QUEUE:
        {
            color: "#9eb5b5",
            icon: <AiOutlineClockCircle />

        },
        IN_PROGRESS:
        {
            color: "#9eb5b5",
            icon: <AiOutlineLoading3Quarters />

        },
        UNKNOWN: {
            color: '#BCD7D7',
            icon: <FaQuestionCircle />
        }
    };

    return (
        <div className="overview container console-container full insights-main">
            {consoleState.insights && consoleState.insights?.requests?.length === 0
                ?
                <p className="table-empty-sublabel">
                    No recent activity.
                </p>
                :
                <>
                    <div className="insights-header">
                        <div className='refreshButton' onClick={getInsights} >
                            <IoMdRefreshCircle size={30} color='grey'/>
                        </div>
                    </div>
                    <div className="charts-container">
                        <div className="chart-container">
                            <RequestsLineChart statuses={statuses} requestsByHour={consoleState.insights?.requestsByHour} />
                        </div>
                        <div className='chart-container'>

                            <TimesBarChart times={consoleState.insights?.delayAndExecutionTimes} />
                        </div>
                    </div>
                    <div className="table-container">
                        <table className='console-table requests-table'>
                            <tr>
                                <th>Status</th>
                                <th>Started At</th>
                                <th>Execution (sec.)</th>
                                <th>Delay (sec.)</th>
                                <th>API Key</th>
                                <th>API</th>
                            </tr>



                            {consoleState.insights?.requests?.map((request, index) => (
                                <tr key={`row${index}`}>
                                    <td><p style={{ color: statuses[request.status].color }}>{new Date() - new Date(request.started_at) > 10 * 60 * 1000 && !request.finished_at ?
                                        statuses["UNKNOWN"].icon : statuses[request.status].icon}</p></td>
                                    <td>{(new Date(request.started_at)).toLocaleTimeString(
                                        'en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false }
                                    )}</td>
                                    <td>{Math.floor(request.execution_time / 1000) || "-"}</td>
                                    <td>{Math.floor(request.delay_time / 1000) || "-"}</td>
                                    <td>{request.api_key_title}</td>
                                    <td>{request.api_title}</td>
                                </tr>
                            ))
                            }
                        </table>
                    </div>
                </>
            }
        </div>
    );
}

export default Insights;