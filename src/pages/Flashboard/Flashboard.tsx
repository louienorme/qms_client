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
                    queueName: nthStations[0].queueName
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
            <Typography variant='h4'>
                {`Station ${stationDetails?.number} - ${stationDetails?.name}`}
            </Typography>
            <hr/>
            <Container>
                <Grid container>
                    <Grid item sm={12}>
                        <Grid container justifyContent='center' className={classes.grid} spacing={2}>
                        {
                            windows.map((window) => (
                                <Grid item>
                                    <Paper className={classes.card}>
                                    <Typography variant='h2'>
                                        {
                                            window.ticket !== 0 
                                                ? window.ticket
                                                : ''
                                        }
                                    </Typography>
                                    <br/>
                                    <Typography variant='overline'>
                                        Window {window.window}
                                    </Typography>
                                    <br/><br/>
                                    <Typography variant='overline'>
                                        {window.status  }
                                    </Typography>
                                    </Paper>
                                </Grid>
                            ))
                        }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </TopNav>
    )
}

export default Flashboard