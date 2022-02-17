import { FC, useState, useEffect } from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Grid,
    Typography,
    Paper,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import {
    ChevronDown,
} from 'mdi-material-ui'
import jwt_decode from 'jwt-decode'

import { IDecodedToken  } from 'types'
import { getWindowTickets, getOneAccount, getStations, getQueue } from 'services'

import { 
    TopNav,
} from 'components'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        fullWidth : {
            width: 1000
        }
    })
)

const Station: FC = () => {
    const classes = useStyles();

    const [ stations, setStations ] = useState<any[]>([]);
    const [ windowDetails, setWindowDetails ] = useState<any[]>([]);

    const token: any = localStorage.getItem('token')
    const payload: IDecodedToken = jwt_decode(token.split(' ')[1]);
    const queue = localStorage.getItem('queue')

    const timeFormatter = (datetime: any) => {
        let date = new Date(datetime);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds()

        return (`${hours}:${minutes}:${seconds}`);
    }

    useEffect(() => {
        const fetchStations = async () => {
            const { data } = await getOneAccount(payload._id);    
            const details = data.data[0];
            try {   
                
                // @ts-ignore
                const { data } = await getStations(queue);
                const yourStations = data.data.filter((station: any) => station.admin[0] === details.adminId)
                setStations(yourStations);
                
            } catch (err) {
                console.error(err)
            }
        }
        
        const fetchData = async () => {
            // @ts-ignore
            const { data } = await getQueue(queue);    
            const station = data.data.numOfStations;
            try {   
                let stationArray = [];

                for ( let i = 0; i < station; i++) {
 
                    const body = {
                        queueName: queue,
                        station: i + 1
                    }

                    const { data } = await getWindowTickets(body);
                    stationArray.push(...data.data) 
                    
                }  
                    setWindowDetails(stationArray)
                    console.log(windowDetails, stationArray)

            } catch (err) {
                console.error(err)
            }
        }

        fetchStations();
        fetchData();
    }, [ windowDetails ])

    return (
       <TopNav>
           <Typography variant='h3' gutterBottom>
                Stations
           </Typography>
           <hr></hr>
           <br></br>
           <Grid container spacing={2}>
                {
                    stations.map((station) => (
                        <Grid item>
                            <Accordion>
                                <AccordionSummary   
                                    expandIcon={<ChevronDown/>}
                                >
                                    <Typography className={classes.fullWidth} variant='h5'>
                                        {`${station.queueName} - Station ${station.stationNumber}`}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>

                                        {
                                            windowDetails.map((window) => (
                                                window.station === station.stationNumber
                                                    ? <Accordion>
                                                        <AccordionSummary>   
                                                            <Grid container className={classes.fullWidth}>
                                                                <Grid item xs={6} >
                                                                    <div>
                                                                        <Typography variant='overline'>
                                                                            Window Number
                                                                        </Typography>
                                                                        <Typography variant='h5'>
                                                                            { window ? window.window : 0}
                                                                        </Typography>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={6} >
                                                                    <div>
                                                                        <Typography variant='overline'>
                                                                            Status
                                                                        </Typography>
                                                                        <Typography variant='h5'>
                                                                            { window ? window.status: 'Waiting'}
                                                                        </Typography>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </AccordionSummary>
                                                        <AccordionDetails>
                                                            <Grid container>
                                                                <Grid item xs={6} >
                                                                    <div>
                                                                        <Typography variant='overline'>
                                                                            Ticket Number
                                                                        </Typography>
                                                                        <Typography variant='h5'>
                                                                            { window ? window.ticket : 'N/A'}
                                                                        </Typography>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={6} >
                                                                    <div>
                                                                        <Typography variant='overline'>
                                                                            Time Started
                                                                        </Typography>
                                                                        <Typography variant='h5'>
                                                                            { window ? timeFormatter(window.timeStarted) : 'N/A'}
                                                                        </Typography>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                : ''
                                            ))
                                        }

                                    </div>      
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))
                }
           </Grid>
       </TopNav>
    )
}

export default Station