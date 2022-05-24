import { FC, Fragment, useState, ReactNode } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
    Container,
    AppBar,
    Box,
    Toolbar,
    Typography,
    Avatar,
    Drawer,
    IconButton,
    Menu,
    MenuItem,
    makeStyles,
    createStyles,
    Theme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'
import {
    Menu as MenuIcon, 
    ViewDashboard,
    AccountCircle,
    AccountBoxMultiple,
    Backburger,
    HumanQueue,
    Archive
} from 'mdi-material-ui'

const drawerWidth = 240

interface Props {
    children?: ReactNode;
    station?: Boolean,
}

const AdminWrapper: FC<Props> = ({ children, station }) => {
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        page: {
            padding: theme.spacing(2),
            marginLeft: '25px',
            marginRight: '25px',
        },
        root: {
            height: '100vh',
            transition: theme.transitions.create(['margin'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            ...(drawerOpen && {  
                marginLeft: drawerWidth,
                transition: theme.transitions.create(['margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
            })
        },
        active: {
            background: '#f4f4f4'
        }, 
        drawer: {
            width: drawerWidth,
            boxSizing: 'border-box'
        },
        drawerPaper: {
            width: drawerWidth,
            
        },
        drawerContent: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        brandName: {
            fontSize: theme.typography.pxToRem(12),
            fontWeight: theme.typography.fontWeightBold,
            marginLeft: theme.spacing(2),
            textAlign: 'left'
        },
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.leavingScreen,
              }),
            ...(drawerOpen && {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: `${drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                })
            })
        },
        toolbar: theme.mixins.toolbar,
    })
)

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

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

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <ViewDashboard />,
            path: '/dashboard'
        },
        {
            text: 'Management',
            icon: <AccountBoxMultiple />,
            path: '/management'
        },
        {
            text: 'Archives',
            icon: <Archive />,
            path: '/archives'
        },
    ];
    
    return (
        <div className={classes.root}>
            {/* App Bar */}
            <AppBar
              className={ drawerOpen ? classes.appBar : ''}
              position='fixed'
              elevation={0}
            >
                <Toolbar>
                    <IconButton onClick={toggleDrawer}>
                        {
                            drawerOpen 
                                ? <Backburger />
                                : <MenuIcon />
                        }
                    </IconButton>
                    <div className={classes.brandName}>
                        <Typography>
                            Queue Management System
                        </Typography>
                    </div>
                    <Box style={{ flexGrow: 1 }} />
                    <Typography>
                        
                    </Typography>
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

            {/* Side Drawer */}
            <Drawer
              className={ drawerOpen ? classes.drawer : '' }
              variant='persistent'
              anchor='left'
              classes={ { paper: drawerOpen ? classes.drawerPaper : '' }}
              open={drawerOpen}
            >
                <div className={classes.drawerContent} > 
                    <div className={classes.toolbar}></div>
                    {/** Link Items */}
                    <List>  
                        {menuItems.map((item, index) => (
                            <Fragment key={index} >
                                <ListItem
                                    button
                                    key={item.text}
                                    onClick={() => history.push(item.path)}
                                    className={location.pathname === item.path ? classes.active : '' }
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText secondary={item.text} />
                                </ListItem>
                            </Fragment>
                        ))}
                    </List>
                </div>

            </Drawer>

            {/* Main Content */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                { children }
            </div>
        </div>
    )
}

export default AdminWrapper
