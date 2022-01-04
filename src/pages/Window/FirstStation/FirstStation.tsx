import { FC } from 'react'
import {
    Container,
    Grid,
    Paper,
    Button,
    makeStyles,
    createStyles,
    Theme,
    Typography,
    Table,
    TableBody,
    TableHead,
    TableCell,
    TableRow,
    TableContainer,
} from '@material-ui/core'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui';
import { Eye, EyeOff } from 'mdi-material-ui'

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

    const handleClick = () => {

    }

    const numbers = [ 34, 32, 31, 30, 28, ]

    return (
        <Container>
            <Grid container className={classes.row} spacing={2}>
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
                        >
                            Get Number
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
                                        34
                                    </Typography>
                                    <Typography variant='overline'>
                                        Count
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.details}>
                                    <Typography variant='h4'>
                                        34
                                    </Typography>
                                    <Typography variant='overline'>
                                        Last Number Created
                                    </Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <Paper className={classes.details}>
                                    <Typography variant='h4'>
                                        14
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
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableCell align='center'>
                                        <Typography variant='h6'>
                                            Number
                                        </Typography>
                                    </TableCell>
                                </TableHead>
                                <TableBody>
                                    {numbers.map(num => (
                                        <TableRow>
                                            <TableCell align='center'>
                                                {num}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FirstStation;