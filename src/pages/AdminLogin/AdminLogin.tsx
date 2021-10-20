import { FC, useState } from 'react'
import { useHistory, Link as RouterLink }from 'react-router-dom'
import {
    Container,
    Typography,
    InputAdornment,
    IconButton,
    Button,
    Link,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui';
import { Eye, EyeOff } from 'mdi-material-ui'

import { LoginBase } from '../../components'
import { IAdminLogin } from '../../types'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({
        loginFormContainer: {
            maxWidth: 500,
            height: '100%',
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: "center",  
        },
        field: {
            marginTop: 20,
            marginBottom: 20,
            display: 'block'
        },
    })
)


const loginSchema = Yup.object().shape({
    username: Yup.string().required('This is a required field'),
    password: Yup.string().required('This is a required field'),
})

const AdminLogin: FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false)

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSubmit = async (adminDate: IAdminLogin) => {}

    return (
        <LoginBase>
          <Container className={classes.loginFormContainer} >
            <Typography 
            variant='h4'
            style={{ marginBottom: '1.5rem' }} 
            gutterBottom
            >Sign In</Typography>
            <Formik
              initialValues={{
                  username: '',
                  password: ''
              }}
              onSubmit={handleSubmit}
              validationSchema={loginSchema}
            >
                <Form style={{ marginBottom: '2rem' }}>
                    <Field
                      className={classes.field}
                      component={TextField}
                      variant='outlined'
                      fullWidth
                      required
                      name='username'
                      label='Username'
                    />
                    <Field
                      className={classes.field}
                      component={TextField}
                      fullWidth
                      variant='outlined'
                      required
                      name='password'
                      label='Password'
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={togglePasswordVisibility}
                                >
                                { showPassword ? <Eye/> : <EyeOff/> }
                                </IconButton>
                            </InputAdornment>
                          )
                      }}
                    />
                    <Button
                      variant='contained'
                      fullWidth
                      size='large'
                      type='submit'
                    >
                    Sign In
                    </Button>
                </Form>
            </Formik>
            <Typography>
                <Link component={RouterLink} to='#'>
                    Forgot Password?
                </Link>
            </Typography>
        </Container>
        </LoginBase>
    )
}

export default AdminLogin
