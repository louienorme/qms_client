import { FC } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Drawer,
    IconButton,
    makeStyles,
    createStyles,
    Theme,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'
import {
    Menu 
} from 'mdi-material-ui'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        root: {
            display: 'flex'
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth,
        },
        title: {
            padding: theme.spacing(2),
            display: 'inline-block'
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        }
    })
)

const AdminWrapper: FC = ({ children }) => {
    const classes = useStyles()
    
    return (
        <div className={classes.root}>
            {/* App Bar */}
            <AppBar
              className={classes.appBar}
              position='fixed'
              elevation={0}
            >
                <Toolbar>
                    <IconButton>
                        <Menu />
                    </IconButton>
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
                    <Typography>
                        Queue Management System
                    </Typography>
                </div>
            </Drawer>

            {/* Main Content */}
            <div>
                {children}
            </div>
        </div>
    )
}

export default AdminWrapper
