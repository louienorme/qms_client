import { FC, useState, useEffect } from 'react'
import {
    Typography,
    Container,
    Grid,
    Paper,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import {
    Skeleton
} from '@material-ui/lab'
import ReactPlayer from 'react-player/lazy'
import jwt_decode from 'jwt-decode'


import {
    FlashboardNav
} from 'components'
import { IDecodedToken  } from 'types'
import { getWindowTickets, getOneAccount, getStations, } from 'services'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        grid: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '0.5rem'
        },
        card: {
            padding: theme.spacing(6),
            textAlign: 'center'
        },
    })
)

interface Props {
    number: number,
    name: String,
    queueName: String
}

const Flashboard: FC = () => {
    const classes = useStyles();

    const [ stationDetails, setStationDetails ] = useState<Props>()
    const [ windows, setWindows ] = useState<any[]>([])
    const [ queue, setQueue ] = useState({ queue:'testing' })

    let date = new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let time = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' });

    const token: any = localStorage.getItem('token')
    const payload: IDecodedToken = jwt_decode(token.split(' ')[1]);

    useEffect(() => {
        const stationCount = async () => {
            const { data } = await getOneAccount(payload._id);    
            const details = data.data[0];
            
            try {
                
                const { data } = await getStations(details.queueName);
                const nthStations = data.data.filter((station: any) => station.stationNumber === details.station)
                const body = {
                    number: nthStations[0].stationNumber,
                    name: nthStations[0].name,
                    queueName: nthStations[0].queueName,
                }
                setStationDetails(body)
                setQueue({ queue: details.queueName })
            
            } catch (err) {
                console.error(err)
            }
        }

        const flashboard = async () => {
            const { data } = await getOneAccount(payload._id);    
            const details = data.data[0];

            try {
                const body = {
                    queueName: details.queueName,
                    station: details.station
                }

                const { data } = await getWindowTickets(body);
                setWindows(data.data)

            } catch (err) {
                console.error(err)
            }
        }

        const interval = setInterval (() => {
            stationCount();
            flashboard();
        }, 1000)
             
        return () => clearInterval(interval)
    },[ windows ])

    return (
        <FlashboardNav flashboard={queue}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {
                    stationDetails 
                        ? <Typography style={{ fontSize: '45px' }} variant='h4'>
                                {`${stationDetails?.name}`}
                          </Typography>
                        : <Skeleton height='60px' width='250px' variant='text' />

                }
                <div style={{ flexGrow: 1 }}></div>
                {
                    date && time 
                        ? <Typography style={{ fontSize: '45px' }} variant='h4' align='right'>
                                {`${date} - ${time}`}
                          </Typography>
                        : <Skeleton height='60px' width='250px' variant='text' />
                }
            </div>
            <hr/>
            <br/>
            <Container>
                <Grid container alignItems='center' justifyContent='center'>
                    <Grid item sm={4}>
                        <Grid container justifyContent='center' className={classes.grid} spacing={2}>
                        {
                            windows.map((window) => (
                                <Grid item>
                                    <Paper className={classes.card}>
                                    <Typography style={{ textTransform: 'uppercase', fontSize: '40px' }} variant='h5'>
                                        {window.status === 'transacting'
                                            ? 'Now Serving'
                                            : 'Waiting'
                                        }
                                    </Typography>
                                    <br/>
                                    <Typography style={{ fontSize: '200px' }} variant='h1'>
                                        {
                                            window.ticket !== 0 
                                                ? window.ticket
                                                : 0
                                        }
                                    </Typography>
                                    </Paper>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </Grid>
                    <Grid item sm={8}>
                        <ReactPlayer 
                            url='https://www.youtube.com/watch?v=UNl-lMp0Ds4'
                            playing={true}
                            loop={true}
                            height='400px'
                            width='800px'
                        />
                    </Grid>
                </Grid>
            </Container>
        </FlashboardNav>
    )
}

export default Flashboard