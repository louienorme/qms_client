import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Poppins',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    },
    palette: {
        primary: {
            main: '#2155CD'
        }
    }
})

export default theme