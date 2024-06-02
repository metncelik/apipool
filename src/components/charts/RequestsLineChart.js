import 'chart.js/auto'
import { Line } from "react-chartjs-2";
import { getHoursArray } from "./utils";
import { options } from './options';

const RequestsLineChart = ({ requestsByHour, statuses }) => {
    if (!requestsByHour) return;

    const getTableData = (status) => {
        const hours = getHoursArray();
        const data = hours.map((h, i) => {
            return requestsByHour.find(r => new Date(r.hour).getHours() === h && r.status === status)?.count;
        }
        );
        return data || [];
    };

    return (
        <Line className='chart' data={
            {
                labels: getHoursArray(),
                datasets: [
                    {
                        label: 'Successful Requests',
                        data: getTableData("COMPLETED"),
                        borderColor: statuses["COMPLETED"].color,
                        backgroundColor: statuses["COMPLETED"].color,
                        borderWidth: 2,
                        fill: false,
                        tension: .5
                    }
                    ,
                    {
                        label: 'Failed Requests',
                        data: getTableData("FAILED"),
                        borderColor: statuses["FAILED"].color,
                        backgroundColor: statuses["FAILED"].color,
                        borderWidth: 2,
                        fill: false,
                        tension: .5
                    }
                ]
            }
        }
            options={options} />
    )
}

export { RequestsLineChart };