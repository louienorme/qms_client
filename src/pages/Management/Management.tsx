import { FC, useState, ChangeEvent } from 'react'
import {
    AppBar,
    Container,
    Typography,
    Tab,
    Box,
    makeStyles,
} from '@material-ui/core'
import {
    TabPanel,
    TabList,
    TabContext
} from '@material-ui/lab'

import { AdminWrapper } from '../../components'
import Accounts from './Accounts'

const tabItems = [
    {
        name: 'Account Manager',
        component: <Accounts />
    },
    {
        name: 'Queue Manager',
        component: '2'
    }
]

const useStyles = makeStyles((theme) => {
    return {
    }
})

const Management: FC = () => {
    const classes = useStyles();

    const [currentTabValue, setCurrentTabValue] = useState<string>('0');

    const handleTabChange = (event: ChangeEvent<{}>, newValue: string) => setCurrentTabValue(newValue);

    return (
        <AdminWrapper>
            <Typography variant='h4' gutterBottom>
                Management 
            </Typography>
            <TabContext value={currentTabValue}>
                <AppBar position='static' color='transparent' elevation={0}>
                    <TabList
                        onChange={handleTabChange}
                        aria-label='Management Tabs'
                        variant='scrollable'
                    >
                        {tabItems.map((tabItem, index) => (
                            <Tab key={index} label={tabItem.name} value={index.toString()} />
                        ))}
                    </TabList>
                </AppBar>
                {tabItems.map((tabItem, index) => (
                    <TabPanel key={index} value={index.toString()}>
                        {tabItem.component}
                    </TabPanel>
                ))}
            </TabContext>
        </AdminWrapper>
    )
}

export default Management
