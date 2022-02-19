import { FC } from 'react'
import {
    Typography,
    Container,
    Grid,
    makeStyles, 
    Theme, 
    createStyles 
} from '@material-ui/core'

import Empty from '../../assets/Empty.svg'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            height: "50vh",
        },
        emptyImgContainer: {
            maxWidth: 1000,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", 
        },
        emptyImg: {
            maxHeight: '40vh',
            width: "100%",
            height: "100%",
            marginBottom: theme.spacing(2)
        }
    })
)

const EmptyPage: FC = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root} >
            <Grid item>
                <Container className={classes.emptyImgContainer}>
                    <img className={classes.emptyImg} alt='Login' src={Empty} />
                    <Typography variant='h4' align='center'>
                        Oops! There is no data here!
                    </Typography>
                </Container>
            </Grid>
        </Grid>
    )
}

export default EmptyPage