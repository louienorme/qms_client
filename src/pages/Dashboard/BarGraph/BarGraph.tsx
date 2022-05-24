import { FC } from 'react'

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
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { IQueue, IArchive } from 'types';
import { Ticket } from 'mdi-material-ui';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        barGraph : {
            padding: theme.spacing(2)
        }
    })
)

interface GraphProps {
  active: IQueue[],
  tickets: IArchive[]
}

const BarGraph: FC<GraphProps> = (graphData) => {
    const classes = useStyles()

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
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
            text: 'Tickets Created By Queue ',
          },
        },
    };

      const colors = ['#006E7F', '#F8CB2E', '#EE5007', '#B22727', 
        '#0E185F', '#2FA4FF', '#00FFDD', '#E8FFC2']

      const labels = [''];
      
      let dataFilter = () => {
        let finalDataset: any = [];
        
        for (let i = 0; i < graphData.active.length; i++) {
          let ticketArray: any = [];

          let dataset = {
            label: graphData.active[i].name,
            data: [],
            borderColor: 'white',
            backgroundColor: 'white',
          }

          const count = graphData.tickets
            .filter(ticket => graphData.active[i].name === ticket.queue)

          ticketArray.push(count.length)
          
          dataset = { ...dataset, 
            data: ticketArray, 
            borderColor: colors[i], 
            backgroundColor: colors[i]
          };


          finalDataset.push(dataset)
        }
        
        return { labels, datasets: finalDataset }
      }
    
      const data = dataFilter()

    return (
        <Paper className={classes.barGraph}>
            <Bar data={data} options={options} />
        </Paper>
    )
}

export default BarGraph