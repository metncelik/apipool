import 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { getHoursArray } from "./utils";
import { options } from './options';


const TimesBarChart = ({times}) => {
    if (!times) return;

    const getTableData = (dataType) => {
        const hours = getHoursArray();
        const data = hours.map((h, i) => {
            return times.find(r => new Date(r.hour).getHours() === h.getHours())?.[dataType];
        });
        return data || [];
    }

    return (
        <Bar className='chart bar-chart' data={
            {
                labels: getHoursArray().map(h => h.getHours()),
                datasets: [
                    {
                        label: 'Execution Time (sec.)',
                        data: getTableData("avg_execution"),
                        fill: true,
                        backgroundColor: 'rgba(49, 176, 185, 0.594)',
                        borderColor: 'rgba(49, 176, 185, 0.594)',
                        borderWidth: 2,
                        borderRadius: 10,
                        tension: .3
                    },
                    {
                        label: 'Delay Time (sec.)',
                        data: getTableData("avg_delay"),
                        fill: true,
                        backgroundColor: 'rgba(10, 60, 63, 0.765)',
                        borderColor: 'rgba(10, 60, 63, 0.765)',
                        borderRadius: 10,
                        borderWidth: 2,
                        tension: .3
                    }
                ]
            }
        }
            options={options}
        />
    );

}

export { TimesBarChart };