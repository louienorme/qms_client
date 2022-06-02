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
import jwt_decode from 'jwt-decode'

import {
    TopNav
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
            padding: theme.spacing(10),
            textAlign: 'center'
        }
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

    let date = new Date().toLocaleString();

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
        }, 2000)
             
        return () => clearInterval(interval)
    },[ windows ])

    return (
        <TopNav flashboard={queue}>
            <div style={{ display: 'flex' }}>
                <Typography variant='h4' gutterBottom>
                    {`Station ${stationDetails?.number} - ${stationDetails?.name}`}
                </Typography>
                <div style={{ flexGrow: 1 }}></div>
                <Typography variant='h4' align='right'>
                    {date}
                </Typography>
            </div>
            <hr/>
            <Container>
                <Grid container>
                    <Grid item sm={6}>
                        <Grid container justifyContent='center' className={classes.grid} spacing={2}>
                        {
                            windows.map((window) => (
                                <Grid item>
                                    <Paper className={classes.card}>
                                    <Typography variant='h5'>
                                        Window {window.window}
                                    </Typography>
                                    <br/>
                                    <Typography variant='h1'>
                                        {
                                            window.ticket !== 0 
                                                ? window.ticket
                                                : 0
                                        }
                                    </Typography>
                                    <br/>
                                    <Typography variant='h5'>
                                        {window.status === 'transacting'
                                            ? 'Now Serving'
                                            : 'Waiting'
                                        }
                                    </Typography>
                                    </Paper>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </Grid>
                    <Grid item sm={6}>
                        {/** Add MArquee */}
                    </Grid>
                </Grid>
            </Container>
        </TopNav>
    )
}

export default Flashboard