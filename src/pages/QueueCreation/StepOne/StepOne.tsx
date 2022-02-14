import { FC, useState, useEffect } from 'react'
import {
    Button,
    Box,
    Container,
    InputAdornment,
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core'
import {
    Formik,
    Form,
    Field,
} from 'formik'
import {
    HumanQueue
} from 'mdi-material-ui'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import jwt_decode from 'jwt-decode'

import { IQueue, IDecodedToken } from 'types'
import { stepOne, getOneAccount } from 'services'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        content: {
            margin: '2rem auto',
        },
        input: {
            marginBottom: '1rem',
            width: '100%'
        },
        box: {
            display: 'flex',
            justifyContent: 'flex-end'
        }
    })
)

interface Props {
    handleNext: () => void;
}

const StepOne: FC<Props> = ({ handleNext }) => {
    const classes = useStyles();
    
    const [ isInvalid, setIsInvalid ] = useState(false);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('This is a required field'),
    })

    const token: any = localStorage.getItem('token')
    const payload: IDecodedToken = jwt_decode(token.split(' ')[1]);

    const handleSubmit = async (newQueue: IQueue) => {
        try {
            
            const { data } = await getOneAccount(payload._id);    
            const details = data.data[0];

            const body = { ...newQueue, admin: details._id }

            await stepOne(body);
            setIsInvalid(false);
            
            localStorage.removeItem('queue');
            // @ts-ignore
            localStorage.setItem('queue', newQueue.name);
            handleNext();

        } catch (err) {
            console.error(err);
            setIsInvalid(true);
        }
    }

    return (
        <Container className={classes.content}>
            <Formik
              initialValues={{
                  queueId: '',
                  name: '',
                  status: true,
                  numOfStations: 0,
                  admin: []
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
                <Form autoComplete='off'>
                    <Field
                      className={classes.input}
                      component={TextField}
                      variant='outlined'
                      required
                      name='name'
                      label='Queue Name'
                      InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                                <HumanQueue />
                            </InputAdornment>
                          )
                      }}
                    />
                    <Box className={classes.box} >
                        <Button 
                          size='small'
                          type='submit'
                          variant='contained'
                        >
                            Submit
                        </Button>
                    </Box>
                </Form>
            </Formik>
        </Container>
    );
}

export default StepOne;