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

    return (
       <TopNav>
           <Typography variant='h3' gutterBottom>
                Stations
           </Typography>
           <hr></hr>
           <br></br>
           <Grid container spacing={2}>
                <Grid item>
                    <Accordion>
                        <AccordionSummary   
                            expandIcon={<ChevronDown/>}
                        >
                            <Typography className={classes.fullWidth} variant='h5'>
                                Enrolment - Station 2
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                <Accordion>
                                    <AccordionSummary>   
                                        <Grid container className={classes.fullWidth}>
                                            <Grid item xs={6} >
                                                <div>
                                                    <Typography variant='overline'>
                                                        Window Number
                                                    </Typography>
                                                    <Typography variant='h5'>
                                                        1
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <div>
                                                    <Typography variant='overline'>
                                                        Status
                                                    </Typography>
                                                    <Typography variant='h5'>
                                                        Transacting
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
                                                        4
                                                    </Typography>
                                                </div>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <div>
                                                    <Typography variant='overline'>
                                                        Time Started
                                                    </Typography>
                                                    <Typography variant='h5'>
                                                        13:41:23
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                            </div>      
                        </AccordionDetails>
                    </Accordion>
                    
                </Grid>
                <Grid item>
                   
                </Grid>
           </Grid>
       </TopNav>
    )
}

export default Station