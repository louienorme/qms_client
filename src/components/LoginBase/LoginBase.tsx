import { FC, ReactNode } from 'react'
import {
    Grid,
    Typography,
    Container,
    makeStyles, 
    Theme, 
    createStyles 
} from '@material-ui/core'

import Login from '../../assets/Login.svg'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            height: "100vh",
        },
        loginForm: {
            height: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        loginImgContainer: {
            maxWidth: 450,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", 
        },
        loginImg: {
            maxHeight: '50vh',
            width: "100%",
            height: "100%",
            marginBottom: theme.spacing(6)
        }
    })
)

interface LoginBaseProps {
    children: ReactNode;
    className?: string;
}

const LoginBase: FC<LoginBaseProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} >
            <Grid item md={6} lg={7}>
                <Container className={classes.loginImgContainer}>
                    <img className={classes.loginImg} alt='Login' src={Login} />
                    <Typography variant='h5' align='center'>
                        Queue Management System
                    </Typography>
                </Container>
            </Grid>
            <Grid item md={6} lg={5} className={classes.loginForm} >
                {children} 
            </Grid>
        </Grid>
    )
}

export default LoginBase