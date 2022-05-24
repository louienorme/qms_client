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
import { IArchive, IQueue } from 'types'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            alignItems: 'center',
            justifyContent: 'center'
        },
        paper : {
            display: 'flex',
            marginBottom: '1rem',     
            padding: theme.spacing(2),
            maxWidth: 400,
            maxHeight : 250,

        },
        displayBlock: {
            display: 'block'
        },
        icon: {
            display: 'flex-end'
        },
        barGraph : {
            minWidth: 400, 
        },
    })
)




const Dashboard: FC = () => {
    const classes = useStyles();

    const [ isLoading, setIsLoading ] = useState(true)
    const [ dashboardData, setDashboardData ] = useState<any>()
    const [ completedData, setCompletedData ] = useState<number>()
    const [ returnedData, setReturnedData ] = useState<number>()
    const [ activeQueues, setActiveQueues ] = useState<IQueue[]>([])
    const [ ticketsCreated, setTicketsCreated ] = useState<IArchive[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {

                const { data } = await getDashboardData()
                setDashboardData(data.data)
                setCompletedData(data.data.ticketCreated.length)
                setReturnedData(data.data.totalReturns.length)
                setActiveQueues(data.data.activeQueues)
                setTicketsCreated(data.data.ticketCreated)

                setIsLoading(false)
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
            <hr style={{ marginBottom:'1rem' }}></hr>
            <div>
                <Grid container spacing={2} className={classes.root}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.paper}>
                            <div className={classes.displayBlock}> 
                                <Typography variant='h6'>
                                    { dashboardData ? dashboardData.activeQueues.length: 0}
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
                                    { dashboardData ? dashboardData.totalCompleted.length : 0}
                                </Typography>
                                <Typography variant='overline'>
                                    Total Completed Transactions
                                </Typography>
                            </div>
                            <div style={{flexGrow: 1}}></div>
                            <PhoneCheck style={{ color: '446A46' }} fontSize='large' className={classes.icon}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper className={classes.paper}>
                            <div className={classes.displayBlock}> 
                                <Typography variant='h6'>
                                    { dashboardData ? dashboardData.ticketCreated.length : 0}
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
                                    { dashboardData ? dashboardData.totalReturns.length : 0}
                                </Typography>
                                <Typography variant='overline'>
                                    Overall Returns
                                </Typography>
                            </div>
                            <div style={{flexGrow: 1}}></div>
                            <KeyboardReturn style={{ color: 'A85CF9' }} fontSize='large' className={classes.icon}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}> 
                        <Paper className={classes.paper}>
                            <div className={classes.displayBlock}> 
                                <Typography variant='h6'>
                                {
                                    dashboardData
                                            ? dashboardData.averageDuration.hours
                                                ? dashboardData.averageDuration.hours + "hr/s "
                                                    + dashboardData.averageDuration.minutes + "min/s " 
                                                    + Math.round(dashboardData.averageDuration.seconds) + "s "
                                                :  dashboardData.averageDuration.minutes 
                                                    ? dashboardData.averageDuration.minutes + "min/s " 
                                                        + Math.round(dashboardData.averageDuration.seconds) + "s "
                                                    : Math.round(dashboardData.averageDuration.seconds) + "s "
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
                <Grid container spacing={2} className={classes.root} style={{ marginBottom: '1rem'}}>
                    <Grid className={classes.barGraph} item>
                        <BarGraph active={activeQueues} tickets={ticketsCreated} />
                    </Grid>
                    <Grid item>
                        <PieGraph completed={completedData} returned={returnedData} />
                    </Grid>
                </Grid>
            </div>
        </AdminWrapper>
    )
}

export default Dashboard