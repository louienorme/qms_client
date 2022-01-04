import { FC, MouseEvent, ReactNode, useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    makeStyles,
    createStyles,
    Menu,
    MenuItem,
    Theme,
    Typography
} from '@material-ui/core'
import {
    AccountCircle,
} from 'mdi-material-ui'

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

interface Props {
    children?: ReactNode;
    station?: {
        number: number;
        queue: String;
    }
}

const TopNav: FC<Props> = ({ children, station }) => {
    const classes = useStyles();
    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const signOut = () => {
        handleClose();
        localStorage.removeItem('token');
        history.push('/');
    }

    return (
        <div>
            <AppBar
              position='fixed'
              elevation={0}
            >
                <Toolbar>
                    <Typography onClick={() => history.push('/')}>
                        Queue Management System
                    </Typography>
                    <Box style={{ flexGrow: 1 }} />
                    { station ? (
                        <Typography style={{ marginRight: '1rem' }}>
                            Station {station.number} - {station.queue}
                        </Typography>
                    ) : ''}
                    <IconButton onClick={handleClick}> 
                        <AccountCircle />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={!!open}
                      onClose={handleClose}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                            <MenuItem onClick={signOut} >Sign out</MenuItem>
                        </Menu>
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

export default TopNav