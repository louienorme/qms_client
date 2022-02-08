import { FC, useState, useEffect } from 'react'

import {
    Paper,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        lineGraph : {
            padding: theme.spacing(2)
        }
    })
)

const LineGraph: FC = () => {
    const classes = useStyles();

    const [ lineData, setLineData ] = useState()

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
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
            text: 'Tickets per Month',
          },
        },
      };

      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      const dataset1 = [ 12, 15, 11, 8, 14, 20, 24]
      const dataset2 = [ 10, 14, 11, 6, 21, 27, 19]
      const dataset3 = [ 7, 26, 14, 9, 26, 20, 17]

      const data = {
        labels,
        datasets: [
          {
            label: 'Queue 1',
            data: dataset1,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Queue 2',
            data: dataset2,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: 'Queue 3',
            data: dataset3,
            borderColor: 'dark',
            backgroundColor: 'green',
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
        <Paper className={classes.lineGraph}>
            <Line data={data} options={options} />
        </Paper>
    )
}

export default LineGraph