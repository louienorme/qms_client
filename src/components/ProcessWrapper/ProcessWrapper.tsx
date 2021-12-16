import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import {
    AppBar,
    Toolbar,
    IconButton,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import { ArrowLeft } from 'mdi-material-ui'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            display: 'flex'
        },
        page: {
            padding: theme.spacing(2)
        },
        toolbar: theme.mixins.toolbar
    })
)

const ProcessWrapper: FC = ({ children }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div>
            <AppBar
              position='fixed'
              elevation={0}
            >
                <Toolbar>
                    <IconButton onClick={() => history.push('/management')}>
                        <ArrowLeft />
                    </IconButton>
                </Toolbar>
            </AppBar>

            { /** Main Content */ }
            <div className={classes.page}>
                <div className={classes.toolbar} ></div>
                { children }
            </div>
        </div>
    )
}

export default ProcessWrapper