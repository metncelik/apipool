// import useConsoleState from '../../hooks/useConsoleState';
import '../../styles/tabs/console/Insights.css';

const Insights = () => {
    // const [consoleState] = useConsoleState();
    return (
        <div className="overview container console-container full">
            <div className="table-container">
                <table className='requests-table'>
                    <tr>
                        <th>req id</th>
                        <th>model</th>
                        <th>status</th>
                        <th>ex time</th>
                        <th>date</th>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Insights;