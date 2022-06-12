import { FC , useEffect, useState } from 'react'
import {
    Container,
    Paper,
    Grid,
    Typography,
    Button,
    makeStyles,
    createStyles,
    IconButton,
    Theme,
} from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import { Howl, Howler } from 'howler'
import 'react-toastify/dist/ReactToastify.css'
import Tooltip from '@material-ui/core/Tooltip';
import {
    ArrowRight,
    VolumeHigh,
    KeyboardReturn
} from 'mdi-material-ui'

import { Loader, Table, EmptyPage } from 'components'
import { 
    getOneAccount, 
    getStationTickets, 
    getWindowNumber,
    getNumber,
    nextNumber,
    returnNumber, 
} from 'services'
import { IDecodedToken, IPool } from 'types'
import RecallSound from '../../../assets/Recall_Sound.mp3';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        card: {
            padding: theme.spacing(3),
        },
        cardWindow: {
            padding: theme.spacing(2),
        }
    })
)

const NthStation: FC = () => {
    const classes = useStyles();

    const [ poolsData, setPoolsData ] = useState<IPool[]>([]);
    const [ inWindow, setInWindow ] = useState();
    const [ inWindowName, setInWindowName ] = useState();
    const [ windowNumber, setWindowNumber ] = useState<Number>()
    const [ ticketId , setTicketId ] = useState<String>()

    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        {
            Header: 'Ticket Number',
            id: 'number',
            accessor: 'ticket'
        },
        {
            Header: 'Status',
            accessor: (originalRow: any) => originalRow.status === 'waiting' ? 'Waiting' : 'Transacting',
        },
    ]

    const token: any = localStorage.getItem('token')
    const payload: IDecodedToken = jwt_decode(token.split(' ')[1]);

    const handleGet = async () => {
        const { data } = await getOneAccount(payload._id);    
        const details = data.data[0];
        try {
            setIsLoading(true)
            const body = {
                queueName: details.queueName,
                station: details.station,
                window: details.window
            }
            await getNumber(body);
            
            Howler.volume(1.0)
            const sound = new Howl({
                src: [RecallSound]
            })
            sound.play()
            
            toast.success('Ticket Acquired!')
        } catch (err) {
            console.error(err)
            toast.error('The Station Pool is empty!')
        } finally {
            setIsLoading(false)
        }
    }

    const handleNext = async () => {
        const { data } = await getOneAccount(payload._id);    
        const details = data.data[0];
        try {
            setIsLoading(true)
            const body = {
                queueName: details.queueName,
                station: details.station,
                window: details.window,
                id: ticketId
            }
            
            await nextNumber(body);
            toast.success('Transaction Complete!')
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong!')
        } finally {
            setIsLoading(false)
        }
    }

    const handleReturn = async () => {
        const { data } = await getOneAccount(payload._id);    
        const details = data.data[0];
        try {
            setIsLoading(true)
            const body = {
                queueName: details.queueName,
                station: details.station,
                window: details.window,
                id: ticketId
            }
            await returnNumber(body);
            toast.success('Ticket Returned!')
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong!')
        } finally {
            setIsLoading(false)
        }
    }

    const handleRecall = async () => {
        Howler.volume(1.0)
        const sound = new Howl({
            src: [RecallSound]
        })
        sound.play()
    }

    useEffect(() => {
        const pools = async () => {
            const { data } = await getOneAccount(payload._id);
            const details = data.data[0];
            
            try {
                const body = {
                    queueName: details.queueName,
                    station: details.station
                }

                const { data } =  await getStationTickets(body)
                setPoolsData(data.data)
                setWindowNumber(details.window)

            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        const windowTicket = async () => {
            const { data } = await getOneAccount(payload._id);
            const details = data.data[0];
            try {
                const body = {
                    queueName: details.queueName,
                    station: details.station,
                    window: details.window
                }

                const { data } = await getWindowNumber(body);
                setInWindow(data.data.ticket);
                setInWindowName(data.data.user);
                setTicketId(data.data._id);

            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        const interval = setInterval (() => {
            pools();
            windowTicket();
        }, 1000)
             
             
        return () => clearInterval(interval)
    }, [ poolsData, inWindow, inWindowName ])

    return (
        <Container>
            <Grid 
                container 
                className={classes.row} 
                spacing={2}
                justifyContent='center'
            >
                <ToastContainer 
                    position='bottom-left'
                    theme='colored'
                    draggable={false}
                    closeOnClick
                    autoClose={2000}
                />
                <Grid item sm={12} md={6} lg={6}>
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center'>
                            Window {windowNumber}
                        </Typography>
                        <hr/>
                        {!inWindow ? (
                            <br/>
                        ) : (
                            <div>
                                <Typography variant='overline'>
                                    Now Transacting
                                </Typography>
                                <Paper className={classes.cardWindow} elevation={5}>
                                    <Typography variant='h4'>   
                                        {inWindow}
                                    </Typography>
                                    <Typography variant='overline'>   
                                        {inWindowName}
                                    </Typography>
                                </Paper>
                                <br/>
                            </div>
                        )}
                        <Typography>
                            Window Controls
                        </Typography>
                        <br/>
                        {!inWindow ? (
                                <Grid container justifyContent='center' className={classes.row} spacing={4}>
                                    <Grid item>
                                        <Button variant='contained' color='primary' onClick={handleGet}
                                            disabled={ 
                                                poolsData.length === 0 || isLoading === true
                                                    ? true 
                                                    : false  
                                                }
                                        >
                                            Get Number
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container justifyContent='center' className={classes.row} spacing={6}>
                                    <Grid item>
                                        <Tooltip title='Next'>
                                            <IconButton 
                                                style={{ backgroundColor: '#2155CD', color: 'white' }} 
                                                onClick={handleNext}
                                                disabled={ isLoading === true ? true : false }
                                            >
                                                <ArrowRight />
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title='Recall'>
                                            <IconButton 
                                                style={{ backgroundColor: '#446A46', color: 'white' }} 
                                                onClick={handleRecall}
                                                disabled={ isLoading === true ? true : false }
                                            >
                                                <VolumeHigh />
                                            </IconButton>
                                        </Tooltip>       
                                    </Grid>
                                    <Grid item>
                                        <Tooltip title='Return'>
                                            <IconButton 
                                                style={{ backgroundColor: '#FD5D5D', color: 'white' }} 
                                                onClick={handleReturn}
                                                disabled={ isLoading === true ? true : false }
                                            >
                                                <KeyboardReturn />
                                            </IconButton>
                                        </Tooltip>  
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Paper>
                </Grid>
                <Grid item sm={12} md={6} lg={6}>
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center'>
                            Queue
                        </Typography>
                        <hr/> <br/>
                        {isLoading ? <Loader /> : (
                            <>   
                                {
                                    poolsData.length !== 0 ? (
                                        <Table withSearch={false} columns={columns} data={poolsData} />
                                    ) : (
                                        <EmptyPage message='This Station Pool is Empty!'/>
                                    )
                                }
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NthStation