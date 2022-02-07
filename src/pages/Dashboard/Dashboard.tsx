import { FC } from 'react'

import {
    Typography,
    Grid,
    Paper,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import { Pie, Bar } from 'react-chartjs-2'
import { 
    Chart, 
    ArcElement, 
    Tooltip, 
    Legend,
    CategoryScale,
    LinearScale,
    Title,
    BarElement 
} from 'chart.js'

import { AdminWrapper } from '../../components' 

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        paper : {
            padding: theme.spacing(2),
            width: 275,
        },
        bar : {
            width: 625
        }
    })
)

const Dashboard: FC = () => {
    const classes = useStyles();

    Chart.register(
        ArcElement, 
        Tooltip, 
        Legend,
        BarElement,
        CategoryScale,
        LinearScale,
        Title
    );

    const pieData = {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
    }
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: true,
            text: 'Chart.js Bar Chart',
          },
        },
        scales: {
            y: {
              beginAtZero: true
            }
          }
      };
      
      const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      const dataset1 = [ 12, 15, 11, 8, 14, 20, 24]
      const dataset2 = [ 10, 14, 11, 6, 21, 27, 19]
      
      const barData = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: dataset1,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: dataset2,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };



    return (
        <AdminWrapper> 
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography variant='h4'>
                            3
                        </Typography>
                        <Typography variant='overline'>
                            Active Queues
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <Typography variant='h4'>
                            3
                        </Typography>
                        <Typography variant='overline'>
                            Average Ticket per Day
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item> 
                    <Paper className={classes.paper}>
                        <Typography variant='h4'>
                            3
                        </Typography>
                        <Typography variant='overline'>
                            Average Transaction Duration
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item>
                    <Bar className={classes.bar} options={options} data={barData} />   
                </Grid>
                <Grid item>
                    <Pie data={pieData} options={options}/>
                </Grid>
            </Grid>
        </AdminWrapper>
    )
}

export default Dashboard