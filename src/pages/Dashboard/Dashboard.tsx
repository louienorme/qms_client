import { FC } from 'react'

import {
    Typography,
    Grid,
    Paper,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'

import { AdminWrapper } from '../../components' 
import LineGraph from './LineGraph'
import PieGraph from './PieGraph'
import BarGraph from './BarGraph'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        paper : {
            padding: theme.spacing(2),
            width: 275,
        },
        miniPaper : {
            padding: theme.spacing(2),
            height : 50,
            width: 275,
            marginBottom: '2rem'
        },
        lineGraph : {
            width: 625,
        },
        barGraph : {
            width: 625,
        }
    })
)

const Dashboard: FC = () => {
    const classes = useStyles();
    return (
        <AdminWrapper> 
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>
            <hr></hr>
            <Grid container spacing={2} style={{ marginBottom: '1rem'}}>
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
            <Grid container spacing={2} style={{ marginBottom: '1rem'}}>
                <Grid className={classes.lineGraph} item>
                    <LineGraph />
                </Grid>
                <Grid item>
                    <PieGraph />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: '1rem'}}>
                <Grid item>
                    <Paper className={classes.miniPaper}>
                        <Typography variant='h6'>
                            27
                        </Typography>
                        <Typography variant='overline'>
                            Average Completed Transactions
                        </Typography>
                    </Paper>
                    <Paper className={classes.miniPaper}>
                        <Typography variant='h6'>
                            13
                        </Typography>
                        <Typography variant='overline'>
                            Average Returns
                        </Typography>
                    </Paper>
                    <Paper className={classes.miniPaper}>
                        <Typography variant='h6'>
                            45
                        </Typography>
                        <Typography variant='overline'>
                            Average Tickets created per day
                        </Typography>
                    </Paper>
                </Grid>
                <Grid className={classes.lineGraph} item>
                    <BarGraph />
                </Grid>
            </Grid>
        </AdminWrapper>
    )
}

export default Dashboard