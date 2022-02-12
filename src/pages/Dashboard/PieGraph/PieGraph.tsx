import { FC, useState, useEffect } from 'react'

import {
    Chart as ChartJS,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const PieGraph: FC = () => {

    const [ pieData, setPieData ] = useState()

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
            data: [83, 32,],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      useEffect(() => {
        const renderData = async () => {
            try {

            } catch (err) {
                console.error(err)
            }
        }

        renderData()
      }, [])

    return (
        <> 
            <Pie data={data} options={options} />
        </>
    )
}

export default PieGraph