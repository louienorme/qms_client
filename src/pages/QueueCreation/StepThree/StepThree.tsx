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
            padding: theme.spacing(2)
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
                    <Grid className={classes.section} item sm={12}>
                            <Typography variant='overline'>
                                Queue Name
                            </Typography>
                            <Typography variant='h5'>
                                {   queue?.name } 
                            </Typography>
                    </Grid>
                    <hr/>
                    <Grid className={classes.section} item sm={12}>
                            <Typography variant='overline'>
                                {  // @ts-ignore  
                                    queue?.numOfStations > 1 
                                        ? `${queue?.numOfStations} Stations` 
                                        : `${queue?.numOfStations} Station`
                                }
                            </Typography>
                            {stations.map((station, index) => (
                                <div key={index}>
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
                                </div>
                            ))}
                    </Grid>
                    <hr/>
                    <Grid className={classes.section} item sm={12}>
                        {windows.map((window, index) => (
                            <div key={index}>
                                <Typography variant='h5'>
                                    {`Station ${window.station} - Window ${window.window}`}
                                </Typography>
                                <br/>
                                <Typography variant='overline'>
                                    username
                                </Typography>
                                <Typography variant='h5'>
                                    {window.username}
                                </Typography>
                                <Typography variant='overline'>
                                    Password
                                </Typography>
                                <Typography variant='h5'>
                                    queue123
                                </Typography>
                            </div>
                        ))}
                    </Grid>
                    <hr/>
                    <Grid className={classes.section} item sm={12}>
                        {flashboards.map((flash, index) => (
                            <div key={index}>
                                <Typography variant='h5'>
                                    {`Station ${flash.station} Flashboard`}
                                </Typography>
                                <br/>
                                <Typography variant='overline'>
                                    username
                                </Typography>
                                <Typography variant='h5'>
                                    {flash.username}
                                </Typography>
                                <Typography variant='overline'>
                                    Password
                                </Typography>
                                <Typography variant='h5'>
                                    queue123
                                </Typography>
                            </div>
                        ))}
                    </Grid>
                    <Box className={classes.box} >
                        <Button 
                            size='small'
                            type='submit'
                            variant='outlined'
                            style={{ marginRight: '1rem' }}
                            >
                            Discard
                        </Button>
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