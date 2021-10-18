import { createMuiTheme } from '@material-ui/core'
import { blue, green } from '@material-ui/core/colors'

export default const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: blue
    },
    typography: {
        fontFamily: 'Poppins',
        fontWeightLight: 400,
        fontWeightRegular: 500,
        fontWeightMedium: 600,
        fontWeightBold: 700,
    }
})