import { FC , useEffect, useState } from 'react'
import {
    Container,
    Paper,
    Grid,
    Typography,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core'
import jwt_decode from 'jwt-decode'

import { Loader, Table } from 'components'
import { 
    getOneAccount, 
    getStationTickets, 
    getWindowNumber,
    getNumber,
    nextNumber,
    returnNumber, 
} from 'services'
import { IDecodedToken, IPool } from 'types'

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
    const [ windowNumber, setWindowNumber ] = useState<Number>()
    const [ ticketId , setTicketId ] = useState<String>()

    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        {
            Header: 'No.',
            id: 'row',
            filterable: false,
            accessor: (row: any, index: number) => index + 1,
            cellStyle : {
                width: 100
            }
        },
        {
            Header: 'Ticket Number',
            id: 'number',
            accessor: 'ticket'
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
    ]

    const token: any = localStorage.getItem('token')
    const payload: IDecodedToken = jwt_decode(token.split(' ')[1]);

    const handleGet = async () => {
        const { data } = await getOneAccount(payload._id);    
        const details = data.data[0];
        try {
            const body = {
                queueName: details.queueName,
                station: details.station,
                window: details.window
            }
            await getNumber(body);
        } catch (err) {
            console.error(err)
        }
    }

    const handleNext = async () => {
        const { data } = await getOneAccount(payload._id);    
        const details = data.data[0];
        
        try {
            const body = {
                queueName: details.queueName,
                station: details.station,
                window: details.window,
                id: ticketId
            }
            
            await nextNumber(body);
        } catch (err) {
            console.error(err)
        }
    }

    const handleReturn = async () => {
        const { data } = await getOneAccount(payload._id);    
        const details = data.data[0];
        try {
            const body = {
                queueName: details.queueName,
                station: details.station,
                window: details.window,
                id: ticketId
            }
            await returnNumber(body);
        } catch (err) {
            console.error(err)
        }
    }

    const handleRecall = async () => {

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
                setWindowNumber(details.window)
                setPoolsData(data.data);

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
                setTicketId(data.data._id);

            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        pools();
        windowTicket();
    }, [ poolsData, inWindow ])

    return (
        <Container>
            <Grid container className={classes.row} spacing={2}>
                <Grid item xs={6}>
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
                                        <Button variant='contained' color='primary' onClick={handleGet}>
                                            Get Number
                                        </Button>
                                    </Grid>
                                </Grid>
                            ) : (
                                <Grid container justifyContent='center' className={classes.row} spacing={6}>
                                    <Grid item>
                                        <Button variant='contained' color='primary' onClick={handleNext}>
                                            Next
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='outlined' color='primary'>
                                            Recall
                                        </Button>       
                                    </Grid>
                                    <Grid item>
                                        <Button variant='contained' onClick={handleReturn}>
                                            Return
                                        </Button>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center'>
                            Queue
                        </Typography>
                        <hr/> <br/>
                        {isLoading ? <Loader /> : (
                            <>    {/** @ts-ignore */}
                                <Table withSearch={false} columns={columns} data={poolsData} />
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NthStation