import { FC, useState } from 'react'
import { useAsyncDebounce } from 'react-table'

import {
    TextField,
    InputAdornment,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import {
    Magnify
} from 'mdi-material-ui'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        searchBarContainer: {
            marginBottom: theme.spacing(2),
        }
    })
)

const GlobalFilter: FC<any> = ({ filter, setFilter }) => {
    const classes = useStyles();

    const [ value, setValue ] = useState(filter)

    const onChange = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 200);

    return ( 
        <div className={classes.searchBarContainer}>
            <TextField
                label='Search'
                InputProps={{
                    endAdornment: <InputAdornment position='end'><Magnify /></InputAdornment>
                }}
                size='small'
                variant='filled'
                value={ filter || ''}
                onChange={e => {
                    setFilter(e.target.value);
                    onChange(e.target.value);
                }}
            />
        </div>
    )
}

export default GlobalFilter;