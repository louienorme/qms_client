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

interface Props {
    message: string;
}

const EmptyPage: FC<Props> = ({ message }) => {
    const classes = useStyles()

    return (
        <Grid container className={classes.root} >
            <Grid item>
                <Container className={classes.emptyImgContainer}>
                    <img className={classes.emptyImg} alt='Login' src={Empty} />
                    <Typography variant='h5' align='center'>
                        {message}
                    </Typography>
                </Container>
            </Grid>
        </Grid>
    )
}

export default EmptyPage