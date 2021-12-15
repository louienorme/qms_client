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
    const [ accounts, setAccounts ] = useState<IAccount[]>([]);
    const [ admin, setAdmin ] = useState([`${accounts[0]}`]);

    // Page Status
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isInvalid, setIsInvalid ] = useState(false);

    const validationSchema = Yup.object().shape({
        stations : Yup.array().min(1).max(5).of(
            Yup.object().shape({
                numOfWindows: Yup.number().min(1).max(5).required('This is a required field'),
                name: Yup.string().required('This is a required field'),
                admin: Yup.array().of(
                    Yup.string().required('This is a required field')
                )
            })
        )
    })

    const queueName = localStorage.getItem('queue') ? localStorage.getItem('queue') : '' ;

    const handleSubmit = async (createStations: any) => {
        console.log('HITS!');
        console.log(createStations);
        try {
            // @ts-ignore
            await stepTwo(queueName, createStations);
            setIsInvalid(false);
            handleNext();

        } catch(error) {
            console.error(error);
            setIsInvalid(true);
        }
    }

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const { data } = await getAccounts();
                setAccounts(data.data)
                setAdmin(data.data[0].adminId);

            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAccounts();
    }, [ queueName])

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
                                numOfWindows: 1,
                                admin: [`account[${0}]`]
                            }
                        ]
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    render={({ values, isSubmitting, errors }) => (
                        <Form>
                            <FieldArray 
                                name='stations'
                                render={({ push, remove }) => (
                                    <>
                                        {values.stations.map((station, index) => (
                                            <div key={index} >
                                                <FormControl className={classes.control}>
                                                    <Typography style={{ marginBottom: '1rem' }}>
                                                        Station {index + 1}
                                                        {console.log(errors, values)}
                                                    </Typography>
                                                    <Field
                                                        className={classes.input}
                                                        component={TextField}
                                                        variant='outlined'
                                                        required
                                                        name={`stations[${index}].name`}
                                                        label='Station Name'
                                                    />  
                                                    <Field
                                                        className={classes.input}
                                                        component={TextField}
                                                        variant='outlined'
                                                        required
                                                        type='number'
                                                        name={`stations[${index}].numOfWindows`}
                                                        label='Number of Station Windows'   
                                                    />
                                                    <FieldArray 
                                                        name={`stations[${index}].admin[0]`}
                                                        render={() => (
                                                            <Field
                                                                component={TextField}    
                                                                variant='outlined'
                                                                required
                                                                select
                                                                autoFocus
                                                                fullWidth
                                                                name={`stations[${index}].admin[0]`}
                                                                label='Station Administrator'
                                                            >
                                                            {accounts.map((option, index) => (
                                                                //@ts-ignore
                                                                <MenuItem key={index} value={option.adminId}>
                                                                    {`${option.fullName.firstName} ${option.fullName.lastName}`}
                                                                </MenuItem>
                                                            ))}
                                                            </Field>
                                                        )}
                                                    />
                                                </FormControl>
                                            </div>
                                        ))}
                                        <Box style={{ marginTop: '1rem' }} className={classes.box} >
                                            <Button 
                                                variant='contained'
                                                onClick={() => push({
                                                    name: '',
                                                    numOfWindows: 1,
                                                    admin: []
                                                 })}
                                                >
                                                Add 
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            />
                            <Box className={classes.box} >
                                <Button 
                                    disabled={isSubmitting}
                                    type='submit'
                                    variant='contained'
                                    >
                                    Submit
                                </Button>
                            </Box>
                        </Form>
                    )}
                    />
                </Container>
            ) : (
                <Loader />
            )}
        </>
    );
}

export default StepTwo;