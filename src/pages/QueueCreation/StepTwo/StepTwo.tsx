import { FC, useEffect, useState, ChangeEvent } from 'react'
import {
    Button,
    Typography,
    Box,
    Container,
    InputAdornment,
    MenuItem,
    FormControl,
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core'
import {
    Formik,
    Form,
    Field,
    FieldArray
} from 'formik'
import {
    
} from 'mdi-material-ui'
import { Loader } from 'components'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import { IStation, IAccount } from 'types'
import { stepTwo, getStations, getAccounts } from 'services'

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
        },
        control: {
            display: 'block',
            marginBottom: '1rem'
        }
    })
)

interface Props {
    handleNext: () => void;
    handleBack: () => void;
}

const StepTwo: FC<Props> = ({ handleNext, handleBack }) => {
    const classes = useStyles();

    // Data
    const [ stationsData, setStations ] = useState<IStation[]>([]);
    const [ accounts, setAccounts ] = useState<IAccount[]>([]);
    const [ admin, setAdmin ] = useState<IAccount | String>();

    // Page Status
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isInvalid, setIsInvalid ] = useState(false);

    const validationSchema = Yup.object().shape({
        stations : Yup.array().of(
            Yup.object().shape({
                stationNumber: Yup.string().required('This is a required field'),
                numOfWindows: Yup.number().required('This is a required field'),
                name: Yup.string().required('This is a required field'),
                admin: Yup.array().of(
                    Yup.string().required('This is a required field')
                )
            })
        )
    })

    const queueName = localStorage.getItem('queue') ? localStorage.getItem('queue') : '' ;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setAdmin(event.target.value);

    const handleSubmit = async (editStation: IStation) => {
        console.log('HITS!');
        try {
            console.log(editStation);
            // @ts-ignore
            await stepTwo(queueName, editStation);
            setIsInvalid(false);
            handleNext();

        } catch(error) {
            console.error(error);
            setIsInvalid(true);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // @ts-ignore
                const { data } = await getStations(queueName);
                setStations(data.data);

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        const fetchAccounts = async () => {
            try {
                const { data } = await getAccounts();
                setAccounts(data.data);

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
        fetchAccounts();
    }, [ queueName, stationsData])

    return (
        <>
            {!isLoading ? (
                <Container className={classes.content}>
                    <Formik
                    // @ts-ignore
                    initialValues={{
                        stations : [
                            {
                                name: '',
                                numOfWindows: 0,
                                admin: ['']
                            }
                        ]
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    >
                        <Form>
                            <FieldArray name='stations'>
                                {(({ push }) => (
                                    <> 
                                        {stationsData.map((station, index) => (
                                            <FormControl key={index} className={classes.control}>
                                                <Typography style={{ marginBottom: '1rem' }}>
                                                    Station {index + 1}
                                                </Typography>
                                                <Field
                                                    className={classes.input}
                                                    component={TextField}
                                                    variant='outlined'
                                                    required
                                                    name={`station[${index}].name`}
                                                    label='Station Name'
                                                />  
                                                <Field
                                                    className={classes.input}
                                                    component={TextField}
                                                    variant='outlined'
                                                    required
                                                    type='number'
                                                    name={`station[${index}].numOfWindows`}
                                                    label='Number of Station Windows'   
                                                />
                                                <Field
                                                    component={TextField}
                                                    value={admin}
                                                    onChange={handleChange}
                                                    variant='outlined'
                                                    required
                                                    select
                                                    autoFocus
                                                    fullWidth
                                                    name={`station[${index}].admin[0]`}
                                                    label='Station Administrator'
                                                >
                                                {accounts.map(option => (
                                                    //@ts-ignore
                                                    <MenuItem key={option.adminId} value={option.adminId}>
                                                        {`${option.fullName.firstName} ${option.fullName.lastName}`}
                                                    </MenuItem>
                                                ))}
                                                </Field>
                                            </FormControl>
                                        ))}
                                    </>
                                ))}
                            </FieldArray>
                            <Box className={classes.box} >
                                <Button 
                                    type='submit'
                                    variant='contained'
                                    >
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    </Formik>
                </Container>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default StepTwo;