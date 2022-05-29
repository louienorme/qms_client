import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Typography,
    Box,
    Button,
    Grid,
    Paper,
    Container,
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core'
import { Loader } from 'components'
import {
    IQueue,
    IStation,
    IWindow,
    IWindowAccount,
    IFlashboard,
    IAccount,
} from 'types'
import {
    getQueue,
    getStations,
    getWindowAccounts,
    getFlashboards
} from 'services'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        section: {
            margin: '0.5rem 0',
            padding: theme.spacing(1)
        },
        box: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            margin: '1rem',
            justifyContent: 'flex-end'
        },
    })
)

interface Props {
    handleNext: () => void;
}

const StepThree: FC<Props> = ({ handleNext }) => {
    const classes = useStyles();
    
    // Page Status
    const [ isLoading, setIsLoading ] = useState(true);
    
    // Data
    const [ queue, setQueue ] = useState<IQueue>()
    const [ stations, setStations ] = useState<IStation[]>([])
    const [ windows, setWindows] = useState<IWindowAccount[]>([])
    const [ flashboards, setFlashboards] = useState<IFlashboard[]>([])

    const queueName = localStorage.getItem('queue') ? localStorage.getItem('queue') : '' ;

    useEffect(() => {
        const queueFinal = async () => {
            try {
                // @ts-ignore
                const { data } = await getQueue(queueName);
                setQueue(data.data)

            } catch (err) {
                console.error(err);
            }  finally {
                setIsLoading(false);
            }
        }

        const stationsFinal = async () => {
            try {
                // @ts-ignore
                const { data } = await getStations(queueName);
                setStations(data.data)

            } catch (err) {
                console.error(err);
            }  finally {
                setIsLoading(false);
            }
        }

        const windowsFinal = async () => {
            try {
                // @ts-ignore
                const { data } = await getWindowAccounts(queueName);
                setWindows(data.data)

            } catch (err) {
                console.error(err);
            }  finally {
                setIsLoading(false);
            }
        }

        const flashboardsFinal = async () => {
            try {
                // @ts-ignore
                const { data } = await getFlashboards(queueName);
                setFlashboards(data.data)

            } catch (err) {
                console.error(err);
            }  finally {
                setIsLoading(false);
            }
        }

        queueFinal();
        stationsFinal();
        windowsFinal();
        flashboardsFinal();
    }, [])

    return (
        <>
            {!isLoading ? (
                <Grid component={Paper} className={classes.section} container spacing={2}>
                    <Typography variant='h4'>
                        Overview
                    </Typography>
                    <Grid className={classes.section} item sm={12}>
                            <Typography variant='overline'>
                                Queue Name
                            </Typography>
                            <Typography variant='h5'>
                                {   queue?.name } 
                            </Typography>
                    </Grid>
                    <Grid className={classes.section} item sm={12}>
                        <Grid container>
                            <Grid item sm={12}>
                                <Typography variant='overline'>
                                    {  // @ts-ignore  
                                        queue?.numOfStations > 1 
                                            ? `${queue?.numOfStations} Stations` 
                                            : `${queue?.numOfStations} Station`
                                    }
                                </Typography>
                            </Grid>
                            {stations.map((station, index) => (
                                <Grid item key={index} sm={6}>
                                    <Typography variant='h5'>
                                        Station { index + 1 } - {station.name}
                                    </Typography>
                                    <Typography variant='body2'>
                                        {station.admin[0]}
                                    </Typography>
                                    <Typography variant='caption'>
                                        {
                                            station.numOfWindows > 1 
                                                ? `${station.numOfWindows} Windows`
                                                : `${station.numOfWindows} Window`
                                        }
                                    </Typography>
                                    <br/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid className={classes.section} item sm={12}>
                        <Grid container>
                            <Grid item sm={12}>
                                <Typography variant='overline'>
                                    Window Accounts
                                </Typography>
                            </Grid>
                            {windows.map((window, index) => (
                                <Grid item key={index} sm={6} >
                                    <Typography variant='subtitle1'>
                                        {`Station ${window.station} - Window ${window.window}`}
                                    </Typography>
                                    <Typography variant='overline'>
                                        username
                                    </Typography>
                                    <Typography variant='h6'>
                                        {window.username}
                                    </Typography>
                                    <Typography variant='overline'>
                                        Password
                                    </Typography>
                                    <Typography variant='h6'>
                                        queue123
                                    </Typography>
                                    <br/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Grid className={classes.section} item sm={12}>
                        <Grid container>
                            <Grid item sm={12}>
                                <Typography variant='overline'>
                                    Flashboard Accounts
                                </Typography>
                            </Grid>
                            {flashboards.map((flash, index) => (
                                <Grid item key={index} style={{ marginRight: '1rem' }}>
                                    <Typography variant='subtitle1'>
                                        {`Station ${flash.station} Flashboard`}
                                    </Typography>
                                    <Typography variant='overline'>
                                        username
                                    </Typography>
                                    <Typography variant='h6'>
                                        {flash.username}
                                    </Typography>
                                    <Typography variant='overline'>
                                        Password
                                    </Typography>
                                    <Typography variant='h6'>
                                        queue123
                                    </Typography>
                                    <br/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Box className={classes.box} >
                        <Button 
                            onClick={handleNext}
                            size='small'
                            type='submit'
                            variant='contained'
                            style={{ marginRight: '1rem' }}
                            >
                            Complete
                        </Button>
                    </Box>
                </Grid>
            ) : (
                <Loader />
            )}
        </>
    )
}

export default StepThree;