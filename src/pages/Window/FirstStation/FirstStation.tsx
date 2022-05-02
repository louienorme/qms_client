import { FC, useState, useEffect } from 'react'
import {
    Container,
    Grid,
    Paper,
    Button,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TableContainer,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { createNumber, getOneAccount, getStationOneData} from 'services'
import { IDecodedToken as DecodedToken } from 'types'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            width:'100%',
        },
        card: {
            padding: theme.spacing(3),
            textAlign: 'center'
        },
        details: {
            padding: theme.spacing(2),
            textAlign: 'center',
            marginBottom: '1rem'
        },
    })
)


const FirstStation: FC = () => {
    const classes = useStyles();    

    const [ isLoading, setIsLoading ] = useState(true);
    const [ numbers, setNumbers ] = useState<any>();
    const [ windowNumber, setWindowNumber ] = useState<number>(0);

    const token: any = localStorage.getItem('token')
    const payload: DecodedToken = jwt_decode(token.split(' ')[1]);

    const handleClick = async () => {
        try {
            const { data } = await getOneAccount(payload._id);
            const details = data.data[0];
            const body = {
                creator: details._id,
                window: details.window
            }

            await createNumber(details.queueName, body)
            toast.success('Ticket Number Created!')

        } catch (err) {
            console.error(err)
            toast.error('Something went wrong!')
        } finally {

        }
    }

    useEffect(() => {
        const recentNumbers = async () => {
            const { data } = await getOneAccount(payload._id);
            const details = data.data[0];
            try {
                const body = {
                    queueName: details.queueName,
                   _id: details._id
                }
                
                const { data } =  await getStationOneData(body)
                
                data.data 
                    ? setNumbers(data.data)
                    : setNumbers({
                        ticketCount: [],
                        lastNumberCreated: [],
                        numberCount: 0,
                        recentNumbers: []
                    })

                setWindowNumber(details.window)

            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        const interval = setInterval (() => {
            recentNumbers();
        }, 2000)
             
        return () => clearInterval(interval)
    }, [ numbers ])
    
    return (
        <Container>
            <Typography variant='h6' align='center'>
                Window {windowNumber}
            </Typography>
            <hr></hr>
            <Grid container className={classes.row} spacing={2}>
                <ToastContainer 
                    position='bottom-left'
                    theme='colored'
                    draggable={false}
                    closeOnClick
                    autoClose={4000}
                />
                <Grid item xs={4}> 
                    <Paper elevation={3} className={classes.card}>
                        <Typography>
                            Get Queue Number
                        </Typography>
                        <br/><br/>
                        <Button
                            variant='contained'
                            fullWidth
                            color='primary'
                            size='large'
                            onClick={handleClick}
                        >
                            Create Number
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={4}> 
                    <Paper elevation={3} className={classes.card}>
                        <Typography>
                            Queue Details
                        </Typography>
                        <br/>
                        <Grid justifyContent='center' className={classes.column}>
                            <Grid item xs={12}>
                                <Paper className={classes.details}>
                                    <Typography variant='h4'>
                                        {   
                                            numbers?.ticketCount.length !== 0 
                                                ? numbers?.ticketCount[0].ticket
                                                : 0
                                        }
                                    </Typography>
                                    <Typography variant='overline'>
                                        Count
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.details}>
                                    <Typography variant='h4'>
                                        {
                                            numbers?.lastNumberCreated.length !== 0 
                                                ? numbers?.lastNumberCreated[0].ticket
                                                : 0
                                        }
                                    </Typography>
                                    <Typography variant='overline'>
                                        Last Number Created
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.details}>
                                    <Typography variant='h4'>
                                        {
                                            numbers?.ticketCount.length !== 0 
                                                ? numbers?.numberCount
                                                : 0
                                        }
                                    </Typography>
                                    <Typography variant='overline'>
                                        Numbers Created
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={4}> 
                    <Paper elevation={3} className={classes.card}>
                        <Typography>
                            Recent Numbers
                        </Typography>
                        <br/>
                        {
                            numbers?.recentNumbers.length !== 0 
                                ? <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableCell align='center'>
                                                <Typography variant='h6'>
                                                    Ticket Number
                                                </Typography>
                                            </TableCell>
                                        </TableHead>
                                            {numbers?.recentNumbers.map((num: any, index: any) => (
                                                <TableRow key={index}>
                                                    <TableCell align='center'>
                                                        {num.ticket}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        <TableBody>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                : ''
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FirstStation;