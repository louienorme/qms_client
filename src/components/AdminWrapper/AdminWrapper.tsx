import { FC, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
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
    Backburger
} from 'mdi-material-ui'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            display: 'flex'
        },
        active: {
          background: '#f4f4f4'
        }, 
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth,
        },
        title: {
            padding: theme.spacing(2),
            display: 'flex',
            alignItems: 'center'
        },
        brandName: {
            fontSize: theme.typography.pxToRem(12),
            fontWeight: theme.typography.fontWeightBold,
            marginLeft: theme.spacing(2),
            textAlign: 'left'
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    })
)

const AdminWrapper: FC = ({ children }) => {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const menuItems = [
        {
            text: 'Dashboard',
            icon: <ViewDashboard />,
            path: '/dashboard'
        },
        {
            text: 'Account Manager',
            icon: <AccountBoxMultiple />,
            path: '/'
        }
    ];
    
    return (
        <div className={classes.root}>
            {/* App Bar */}
            <AppBar
              className={classes.appBar}
              position='fixed'
              elevation={0}
            >
                <Toolbar>
                    <IconButton onClick={toggleDrawer}> 
                        <Backburger />
                    </IconButton>
                    <Box style={{ flexGrow: 1 }} />
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
                        <MenuItem>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Side Drawer */}
            <Drawer
              className={classes.drawer}
              variant='permanent'
              anchor='left'
              classes={{ paper: classes.drawerPaper }}
            >
                <div className={classes.title}>
                    <Avatar>Q</Avatar>
                    <Typography className={classes.brandName}>
                        Queue Management System
                    </Typography>
                </div>

                {/** Link Items */}
                <List>  
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : '' }
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>

            </Drawer>

            {/* Main Content */}
            <div>
                {children}
            </div>
        </div>
    )
}

export default AdminWrapper
