import { FC } from 'react'
import {
    Box,
    BoxProps,
    CircularProgress,
    CircularProgressProps
} from '@material-ui/core'

interface LoaderProps extends CircularProgressProps {
    BoxProps?: BoxProps;
}

const Loader: FC<LoaderProps> = ({ BoxProps, ...rest }) => {
    return (
        <Box display='flex' justifyContent='center' width='100%' {...BoxProps}>
            <CircularProgress {...rest} />
        </Box>
    );
};

export default Loader;