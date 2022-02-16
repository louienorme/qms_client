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
    AdminWrapper,
} from 'components'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        fullWidth : {
            width: 975
        }
    })
)

const Station: FC = () => {
    const classes = useStyles();

    return (
        <AdminWrapper>
            <Typography variant='h4' gutterBottom>
                Stations
            </Typography>
            <Grid container spacing={2} direction='row'>
                <Grid item xs={12}>
                    <Accordion className={classes.fullWidth}>
                        <AccordionSummary
                            expandIcon={<ChevronDown />}
                        >
                            <Typography variant='h5'>
                                Enrolment - Station 2
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Accordion className={classes.fullWidth}>
                                <AccordionSummary
                                    expandIcon={<ChevronDown />}
                                >
                                    <Typography>
                                        Window 1
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container direction='row'>
                                        <Grid item xs={4}>
                                            <Typography variant='overline'>
                                                Status
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant='overline'>
                                                Ticket
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant='overline'>
                                                Time Started
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant='h5'>
                                                Transacting
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant='h5'>
                                                4
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant='h5'>
                                                12:31:00
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </AdminWrapper>
    )
}

export default Station