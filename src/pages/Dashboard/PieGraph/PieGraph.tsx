import { FC } from 'react'

import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

interface GraphProps {
  completed?: number,
  returned?: number
}

const PieGraph: FC<GraphProps> = ( graphData ) => {

    ChartJS.register(
        ArcElement,
        Title,
        Tooltip,
        Legend
      );

      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Service Status',
          },
        },
      };


    const data = {
        labels: ['Completed', 'Returned' ],
        datasets: [
          {
            label: 'Service Done',
            data: [ graphData.completed, graphData.returned ],
            backgroundColor: [
              '#205375',
              '#F8CB2E',
            ],
            borderColor: [
              '#205375',
              '#F8CB2E',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <> 
            <Pie data={data} options={options} />
        </>
    )
}

export default PieGraph