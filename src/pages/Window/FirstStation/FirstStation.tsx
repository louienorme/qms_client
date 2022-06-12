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
import * as Yup from 'yup'
import 'yup-phone'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui';
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    Alert
} from '@material-ui/lab'

import { createNumber, getOneAccount, getStationOneData} from 'services'
import { IDecodedToken as DecodedToken } from 'types'

const contactSchema = Yup.object().shape({
    user: Yup.string()
        .required("Name is a required field.")
        .matches(/^[0-9a-zA-Z .+_-]+$/, "This field does not accept special characters such as &,=,',+,<,>"),
    contactNumber: Yup.string()
        .matches(/^[0-9 .+_-]+$/, "This field does not accept special characters such as &,=,',+,<,>"),
})

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '1rem'
        },
        column: {
            display: 'flex',
            flexDirection: 'column',
            width:'100%',
        },
        card: {
            padding: theme.spacing(3),
        },
        details: {
            padding: theme.spacing(2),
            textAlign: 'center',
            marginBottom: '1rem'
        },
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: 'block'
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

    const handleClick = async (userInfo: any) => {
        try {
            const { data } = await getOneAccount(payload._id);
            const details = data.data[0];
            const body = {
                creator: details._id,
                contact: `+${userInfo.contactNumber}`,
                window: details.window,
                user: userInfo.user
            }   
                
            await createNumber(details.queueName, body)
            toast.success('Ticket Number Created!')

        } catch (err) {
            console.error(err)
            toast.error('Something went wrong!')
        } finally {
            setIsLoading(false)
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
                console.log(data.data)
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
                    autoClose={4000}
                />
                <Grid item sm={12} md={4} lg={4}> 
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center' gutterBottom>
                            Get Queue Number
                        </Typography>
                        <Alert severity='info' style={{ marginBottom: '1rem' }}>
                            <Typography >
                                Note:
                            </Typography>
                            <ul>
                                <li>Contact Number should start in 63 </li>
                            </ul>
                    </Alert>
                        <Formik
                            initialValues={{
                                user: '',
                                contactNumber: ''
                            }}
                            onSubmit={(values, { resetForm }) => {
                                handleClick(values)
                                resetForm()
                            }}
                            validationSchema={contactSchema}
                            enableReinitialize
                        >   
                            <Form>
                                <Field
                                    className={classes.field}
                                    component={TextField}
                                    variant='outlined'
                                    fullWidth
                                    required
                                    name='user'
                                    label='Full Name'
                                    />
                                <Field
                                    className={classes.field}
                                    component={TextField}
                                    variant='outlined'
                                    fullWidth
                                    name='contactNumber'
                                    label='Contact Number'
                                    />
                                <Button
                                    variant='contained'
                                    fullWidth
                                    color='primary'
                                    size='large'
                                    type='submit'
                                >
                                    Create Number
                                </Button>
                            </Form>
                        </Formik>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={4} lg={4}> 
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center'>
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
                                    <Typography variant='overline' >
                                        Numbers Created
                                    </Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item sm={12} md={4} lg={4}> 
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center'>
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