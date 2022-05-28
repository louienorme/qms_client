import { FC, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { 
    Typography,
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        footer: {
            padding: theme.spacing(2),
            textAlign: 'center'
        }
    })
)

const Footer: FC = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <div className={classes.footer}>
            <Typography variant='overline'>
                &copy; 2022 Queue Management System
            </Typography>
            <div>
                <Typography 
                    onClick={() => history.push('/terms-and-conditions') } 
                    style={{ marginRight: '1rem' }} 
                    variant='overline'>
                    Terms and Conditions 
                </Typography>
                <Typography 
                    onClick={() => history.push('/privacy-policy')} 
                    variant='overline'
                >
                    Privacy Policy 
                </Typography>
            </div>
        </div>
    )
}

export default Footer