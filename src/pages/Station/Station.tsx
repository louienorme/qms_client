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

import { IDecodedToken } from 'types'
import { getWindowStations, getOneAccount, getAdminStations } from 'services'

import { 
    TopNav,
} from 'components'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        fullWidth : {
            width: 1150
        }
    })
)

const Station: FC = () => {
    const classes = useStyles();

    const [ stations, setStations ] = useState<any[]>([]);
    const [ windowDetails, setWindowDetails ] = useState<any[]>([]);

    const token: any = localStorage.getItem('token')
    const payload: IDecodedToken = jwt_decode(token.split(' ')[1]);
    
    const timeFormatter = (datetime: any) => {
        let date = new Date(datetime);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds()

        return (`${hours}:${minutes}:${seconds}`);
    }

    const statusChecker = (stat: number, station: number) => {
        if (stat === 2) {
            return 'Transacting'
        } 
        else if (stat === 1) {
            if (station === 1) {
                return 'Active'
            }
            return 'Waiting'
        } 
        else {
            return 'Inactive'
        }
    }

    
    useEffect(() => {
        const fetchStations = async () => {
            const { data } = await getOneAccount(payload._id);    
            const details = data.data[0];
            try {   
                
                // @ts-ignore
                const { data } = await getAdminStations(details.adminId);
                setStations(data.data);
                
            } catch (err) {
                console.error(err)
            }
        }
        
        const fetchData = async () => {
            const { data } = await getOneAccount(payload._id);    
            const details = data.data[0]
            try {   
                
                const result = await getWindowStations(details.adminId);
                setWindowDetails(result.data.data)

                console.log(windowDetails)
            } catch (err) {
                console.error(err)
            }
        }

        const interval = setInterval (() => {
            fetchStations();
            fetchData();
        }, 2000)
             
        return () => clearInterval(interval)
    }, [ windowDetails, stations ])

    return (
       <TopNav>
           <Typography variant='h3' gutterBottom>
                Stations
           </Typography>
           <hr></hr>
           <br></br>
           <Grid container spacing={2}>
                {
                    stations.map((station, index) => (
                        <Grid item key={index}>
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
                                            windowDetails.map((element: any) => {
                                                if (element.station === station.stationNumber &&
                                                    element.queueName === station.queueName) {
                                                    return <Accordion>
                                                    <AccordionSummary>   
                                                        <Grid container className={classes.fullWidth}>
                                                            <Grid item xs={6} >
                                                                <div>
                                                                    <Typography variant='overline'>
                                                                        Window Number
                                                                    </Typography>
                                                                    <Typography variant='h5'>
                                                                        {element.window}
                                                                    </Typography>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={6} >
                                                                <div>
                                                                    <Typography variant='overline'>
                                                                        Status
                                                                    </Typography>
                                                                    <Typography variant='h5'>
                                                                        { statusChecker(element.status, element.station) }
                                                                    </Typography>
                                                                </div>
                                                            </Grid>
                                                        </Grid>
                                                    </AccordionSummary>
                                                    {
                                                    element.station !== 1 
                                                        ? (
                                                            <AccordionDetails>
                                                                <Grid container>
                                                                    <Grid item xs={6} >
                                                                        <div>
                                                                            <Typography variant='overline'>
                                                                                Ticket Number
                                                                            </Typography>
                                                                            <Typography variant='h5'>
                                                                                {element.ticket}
                                                                            </Typography>
                                                                        </div>
                                                                    </Grid>
                                                                    <Grid item xs={6} >
                                                                        <div>
                                                                            <Typography variant='overline'>
                                                                                Time Started
                                                                            </Typography>
                                                                            <Typography variant='h5'>
                                                                                {element.timeStarted ? timeFormatter(element.timeStarted) : element.timeStarted }
                                                                            </Typography>
                                                                        </div>
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                        ) : (
                                                            ''
                                                        )
                                                        }
                                                    </Accordion>
                                                } 
                                                else {
                                                    return null
                                                }
                                                
                                            })
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