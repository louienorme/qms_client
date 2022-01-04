import { FC , useEffect, useState } from 'react'
import {
    Container,
    Paper,
    Grid,
    Typography,
    Button,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core'

import { Loader, Table } from 'components'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        row: {
            display: 'flex',
            flexDirection: 'row',
        },
        card: {
            padding: theme.spacing(3),
        },
        cardWindow: {
            padding: theme.spacing(2),
        }
    })
)

const NthStation: FC = () => {
    const classes = useStyles();

    const [pools, setPools] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const columns = [
        {
            Header: 'No.',
            id: 'row',
            filterable: false,
            accessor: (row: any, index: number) => index + 1,
            cellStyle : {
                width: 100
            }
        },
        {
            Header: 'Number',
            id: 'number',
            accessor: 'number'
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
    ]

    useEffect(() => {
        const pools = () => {
            try {

            } catch {

            } finally {

            }

        }

        pools();
    }, [])

    return (
        <Container>
            <Grid container className={classes.row} spacing={2}>
                <Grid item xs={6}>
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center'>
                            Window 1
                        </Typography>
                        <hr/>
                        <Typography variant='overline'>
                            Now Transacting
                        </Typography>
                        <Paper className={classes.cardWindow} elevation={5}>
                            <Typography variant='h4'>
                                34
                            </Typography>
                        </Paper>
                        <br/>
                        <Typography>
                            Window Controls
                        </Typography>
                        <br/>
                        <Grid container justifyContent='center' className={classes.row} spacing={6}>
                            <Grid item>
                                <Button variant='contained' color='primary'>
                                    Next
                                </Button>
                            </Grid><Grid item>
                                <Button variant='outlined' color='primary'>
                                    Recall
                                </Button>       
                            </Grid>
                            <Grid item>
                                <Button variant='contained'>
                                    Return
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper elevation={3} className={classes.card}>
                        <Typography align='center'>
                            Queue
                        </Typography>
                        <hr/> <br/>
                        {isLoading ? <Loader /> : (
                            <>    {/** @ts-ignore */}
                                <Table withSearch={false} columns={columns} data={pools} />
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default NthStation