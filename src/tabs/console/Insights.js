import '../../styles/tabs/console/Insights.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import PopupModule from '../../components/Modal';
import useConsoleState from '../../hooks/useConsoleState';


const Insights = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isPending, setIsPending] = useState(false);
    const [consoleState, setConsoleState] = useConsoleState(null);

    const getrequests = async () => {
        setIsPending(true);
        const response = await axiosPrivate.get('/api-keys/requests');
        setIsPending(false);
        if (!response) return;
        setConsoleState({ ...consoleState, requests: response.data.requests });
    };

    useEffect(() => {
        if (consoleState.requests) return setIsPending(false);
        getrequests();
    }, [consoleState]);

    if (isPending) return <Loading />;

    const statusColors = {
        COMPLETED: '#1e7e34',
        FAILED: '#8c1616',
        IN_QUEUE: "#9eb5b5",
        IN_PROGRESS: "#9eb5b5"
    };

    return (
        <div className="overview container console-container full">
            {consoleState.requests?.length === 0
                ?
                <p className="table-empty-sublabel">
                    No recent activity.
                </p>
                :
                <div className="table-container">
                    <table className='console-table requests-table'>
                        <tr>
                            <th>Started At</th>
                            <th>Status</th>
                            <th>Execution (sec.)</th>
                            <th>Delay (sec.)</th>
                            <th>API Key</th>
                            <th>API</th>
                        </tr>



                        {consoleState.requests?.map((request, index) => (
                            <tr key={`row${index}`}>
                                <td>{(new Date(request.started_at)).toLocaleTimeString()}</td>
                                <td><p style={{ color: statusColors[request.status] || "#BCD7D7" }}>{request.status}</p></td>
                                <td>{Math.floor(request.execution_time / 1000) || "-"}</td>
                                <td>{Math.floor(request.delay_time / 1000) || "-"}</td>
                                <td>{request.api_title}</td>
                                <td>{request.api_title}</td>
                            </tr>
                        ))
                        }
                    </table>
                </div>
            }
        </div>
    );
}

export default Insights;