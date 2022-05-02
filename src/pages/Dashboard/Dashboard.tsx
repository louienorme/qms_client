import { FC, useEffect, useState } from 'react'

import {
    Typography,
    Grid,
    Paper,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import {
    HumanQueue,
    ClockOutline,
    TicketOutline,
    BookCheckOutline,
    KeyboardReturn,
    PhoneCheck
} from 'mdi-material-ui'

import { AdminWrapper } from '../../components' 
import LineGraph from './LineGraph'
import PieGraph from './PieGraph'
import BarGraph from './BarGraph'
import { getDashboardData } from 'services'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        paper : {
            padding: theme.spacing(2),
            width: 275,
            height : 50,
            marginBottom: '1rem',
            display: 'flex',
        },
        displayBlock: {
            display: 'block'
        },
        icon: {
            display: 'flex-end'
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
        },
    })
)




const Dashboard: FC = () => {
    const classes = useStyles();

    const [ isLoading, setIsLoading ] = useState(true)
    const [ dashboardData, setDashboardData ] = useState<any>()

    const sAdder = (duration: number) => {
        if(duration != 1) return 's '
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                const { data } = await getDashboardData()
                setDashboardData(data.data)
                console.log(dashboardData)

            } catch (err) {
                console.error(err);
            }
        }

        const interval = setInterval (() => {
            fetchData()
        }, 2000)
             
        return () => clearInterval(interval)
    }, [dashboardData])

    return (
        <AdminWrapper> 
            <Typography variant='h4' gutterBottom>
                Dashboard
            </Typography>
            <hr></hr>
            <Grid container spacing={2}>
                <Grid item>
                    <Paper className={classes.paper}>
                        <div className={classes.displayBlock}> 
                            <Typography variant='h6'>
                                { dashboardData ? dashboardData.activeQueues.length + 1 : 0}
                            </Typography>
                            <Typography variant='overline'>
                                Active Queues 
                            </Typography>
                        </div>
                        <div style={{flexGrow: 1}}></div>
                        <HumanQueue style={{ color: '2155CD' }} fontSize='large' className={classes.icon}/>
                    </Paper>
                    <Paper className={classes.paper}>
                        <div className={classes.displayBlock}> 
                            <Typography variant='h6'>
                                { dashboardData ? dashboardData.totalCompleted.length + 1 : 0}
                            </Typography>
                            <Typography variant='overline'>
                                Total Completed Transactions
                            </Typography>
                        </div>
                        <div style={{flexGrow: 1}}></div>
                        <PhoneCheck style={{ color: '446A46' }} fontSize='large' className={classes.icon}/>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paper}>
                        <div className={classes.displayBlock}> 
                            <Typography variant='h6'>
                                { dashboardData ? dashboardData.ticketCreated.length + 1 : 0}
                            </Typography>
                            <Typography variant='overline'>
                                Overall Tickets Created
                            </Typography>
                        </div>
                        <div style={{flexGrow: 1}}></div>
                        <TicketOutline style={{ color: 'FD5D5D' }} fontSize='large' className={classes.icon}/>
                    </Paper>   
                    <Paper className={classes.paper}>
                        <div className={classes.displayBlock}> 
                            <Typography variant='h6'>
                                { dashboardData ? dashboardData.totalReturns.length + 1 : 0}
                            </Typography>
                            <Typography variant='overline'>
                                Overall Returns
                            </Typography>
                        </div>
                        <div style={{flexGrow: 1}}></div>
                        <KeyboardReturn style={{ color: 'A85CF9' }} fontSize='large' className={classes.icon}/>
                    </Paper>
                </Grid>
                <Grid item> 
                    <Paper className={classes.paper}>
                        <div className={classes.displayBlock}> 
                            <Typography variant='h6'>
                               {
                                   dashboardData
                                        ? dashboardData.averageDuration.hours
                                            ? dashboardData.averageDuration.hours + "hr" + sAdder(dashboardData.averageDuration.hours)
                                                + dashboardData.averageDuration.minutes + "min" + sAdder(dashboardData.averageDuration.hours) 
                                                + Math.round(dashboardData.averageDuration.seconds) + "s"
                                            :  dashboardData.averageDuration.minutes 
                                                ? dashboardData.averageDuration.minutes + "min" + sAdder(dashboardData.averageDuration.hours) 
                                                    + Math.round(dashboardData.averageDuration.seconds) + "s"
                                                : Math.round(dashboardData.averageDuration.seconds) + "s"
                                        : 0
                               }
                            </Typography>
                            <Typography variant='overline'>
                                Average Transaction Duration
                            </Typography>
                        </div>
                        <div style={{flexGrow: 1}}></div>
                        <ClockOutline style={{ color: 'F66B0E' }} fontSize='large' className={classes.icon}/>
                    </Paper>
                    <Paper className={classes.paper}>
                        <div className={classes.displayBlock}> 
                            <Typography variant='h6'>
                                {dashboardData ? Math.round(dashboardData.averageTicketsCompleted) : 0}
                            </Typography>
                            <Typography variant='overline'>
                                Average Tickets Completed
                            </Typography>
                        </div>
                        <div style={{flexGrow: 1}}></div>
                        <BookCheckOutline style={{ color: 'B22727' }} fontSize='large' className={classes.icon}/>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginBottom: '1rem'}}>
                <Grid className={classes.lineGraph} item>
                    <BarGraph />
                </Grid>
                <Grid item>
                    <PieGraph />
                </Grid>
            </Grid>
        </AdminWrapper>
    )
}

export default Dashboard