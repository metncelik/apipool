import '../../styles/components/dashboard/Overview.css'

const Overview = ({user}) => {
    return (
        <div className="overview container dashboard-container full">
            <div className="stats">
                <div className="info">
                    <p>Balance:</p>
                    <div className="value">
                        {user.balance}$
                    </div>
                </div>
                <div className="info">
                    <p>Requests:</p>
                    <div className="value">
                        {user.s_requests}
                    </div>
                </div>
                <div className="info">
                    <p>Faild Requests:</p>
                    <div className="value">
                        {user.f_requests}
                    </div>
                </div>
                <div className="info">
                    <p>Execution Time:</p>
                    <div className="value">
                        {user.ex_time}
                    </div>
                </div>
                <div className="info">
                    <p>Avarage Ex. Time:</p>
                    <div className="value">
                        {user.ex_time}
                    </div>
                </div>
            </div>
            <div className="table-container">
                <table className='requests-table'>
                    <tr>
                        <th>req id</th>
                        <th>model</th>
                        <th>status</th>
                        <th>ex time</th>
                        <th>date</th>
                    </tr>
                    {/* {
                        user.s_requests.map((request, index)=>(
                            <tr key={index}>
                                <td>{request.id}</td>
                                <td>{request.model}</td>
                                <td className='centered-text'>{request.status}</td>
                                <td className='centered-text'>{request.execution_time}</td>
                                <td>{request.date}</td>
                            </tr>
                        ))
                    } */}
                </table>
            </div>
        </div>
    );
}

export default Overview;