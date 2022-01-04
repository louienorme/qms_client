import { FC, useState, useEffect } from 'react'
import {
    Typography,
    Container,
    Grid,
    Paper,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'

import {
    TopNav
} from 'components'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        grid: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: '0.5rem'
        },
        card: {
            padding: theme.spacing(10),
            textAlign: 'center'
        }
    })
)

const Flashboard: FC = () => {
    const classes = useStyles();

    const windows = [
        {
            number: 12,
            window: 1,
            status: 'Transacting'
        },
        {
            number: 13,
            window: 2,
            status: 'Transacting'
        },
        {
            number: 14,
            window: 3,
            status: 'Open'
        },
        {
            number: 15,
            window: 4,
            status: 'Transacting'
        }
    ]

    useEffect(() => {
        const flashboard = () => {
            try {

            } catch {
                
            }
        }

        flashboard();
    },[])

    return (
        <TopNav>
            <Typography variant='h4'>
                Station 2 - Admissions
            </Typography>
            <hr/>
            <Container>
                <Grid container>
                    <Grid item sm={12}>
                        <Grid container justifyContent='center' className={classes.grid} spacing={2}>
                            {
                                windows.map(value => (
                                    <Grid item >
                                        <Paper className={classes.card}>
                                            <Typography variant='h2'>
                                                {value.number}
                                            </Typography>
                                            <br/>
                                            <Typography>
                                                Window {value.window}
                                            </Typography>
                                            <br/><br/>
                                            <Typography variant='overline'>
                                                {value.status}
                                            </Typography>
                                        </Paper>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </TopNav>
    )
}

export default Flashboard