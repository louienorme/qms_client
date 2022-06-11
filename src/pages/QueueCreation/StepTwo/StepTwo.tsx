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
    Alert
} from '@material-ui/lab'
import {
    Formik,
    Form,
    Field,
    FieldArray
} from 'formik'
import {
    CardAccountDetails,
    FormatListNumbered,
    BadgeAccountHorizontal,
    Plus,
    Minus
} from 'mdi-material-ui'
import { Loader } from 'components'
import { TextField } from 'formik-material-ui'
import * as Yup from 'yup'
import { IAccount } from 'types'
import { stepTwo, createFlashboardsAccounts, 
    stepThree, createWindowAccounts, getAccountsByType } from 'services'

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        content: {
            margin: '1rem auto',
        },
        input: {
            margin: '1rem',
        },
        box: {
            display: 'flex',
            margin:  '1rem'
        },
        control: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }
    })
)

interface Props {
    handleNext: () => void;
}

const StepTwo: FC<Props> = ({ handleNext }) => {
    const classes = useStyles();

    // Data
    const [ accounts, setAccounts ] = useState<IAccount[]>([]);
    const [ admin, setAdmin ] = useState([`${accounts[0]}`]);

    // Page Status
    const [ isLoading, setIsLoading ] = useState(true);
    const [ isInvalid, setIsInvalid ] = useState(false);

    const validationSchema = Yup.object().shape({
        stations : Yup.array().min(2).max(5).of(
            Yup.object().shape({
                numOfWindows: Yup.number().min(1).max(5).required('This is a required field'),
                name: Yup.string()
                    .required('This is a required field')
                    .matches(/^[0-9a-zA-Z .'+_-]+$/, "This field does not accept special characters such as &,=,+,<,>"),
                admin: Yup.array().of(
                    Yup.string().required('This is a required field')
                )
            })
        )
    })

    const queueName = localStorage.getItem('queue') ? localStorage.getItem('queue') : '' ;

    const handleSubmit = async (createStations: any) => {
        try {
            // @ts-ignore
            await stepTwo(queueName, createStations);
            // @ts-ignore
            await createFlashboardsAccounts(queueName);
            // @ts-ignore
            await stepThree(queueName);
            // @ts-ignore
            await createWindowAccounts(queueName);
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
                const { data } = await getAccountsByType('Station');
                setAccounts(data.data)
                console.log(accounts, data.data)
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
                    <Alert severity='info' style={{ marginBottom: '1rem' }}>
                        <Typography >
                            Note:
                        </Typography>
                        <ul>
                            <li>This version is only limited to 5 Stations maximum</li>
                        </ul>
                    </Alert>
                    <Formik
                    // @ts-ignore
                    initialValues={{
                        stations : [
                            {  
                                name: '',
                                numOfWindows: 1,
                                admin: [`account[${0}]`]
                            },
                            {  
                                name: '',
                                numOfWindows: 1,
                                admin: [`account[${0}]`]
                            },
                        ]
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    render={({ values, isSubmitting, errors }) => (
                        <Form>
                            <FieldArray 
                                name='stations'
                                render={({ push, remove, }) => (
                                    <>
                                        {values.stations.map((station, index) => (
                                            <div key={index} >
                                                <Typography variant='h5' style={{ marginBottom: '1rem' }}>
                                                    Station {index + 1}
                                                    {console.log(errors)}
                                                </Typography>
                                                <FormControl className={classes.control}>
                                                    <Field
                                                        className={classes.input}
                                                        style={{ width: '35%' }}
                                                        component={TextField}
                                                        variant='outlined'
                                                        required
                                                        name={`stations[${index}].name`}
                                                        label='Station Name'
                                                        InputProps={{
                                                            startAdornment: (
                                                              <InputAdornment position='start'>
                                                                  <CardAccountDetails />
                                                              </InputAdornment>
                                                            )
                                                        }}
                                                    />  
                                                    <Field
                                                        className={classes.input}
                                                        component={TextField}
                                                        style={{ width: '30%' }}
                                                        variant='outlined'
                                                        required
                                                        type='number'
                                                        name={`stations[${index}].numOfWindows`}
                                                        label='Number of Station Windows' 
                                                        InputProps={{
                                                            startAdornment: (
                                                              <InputAdornment position='start'>
                                                                  <FormatListNumbered />
                                                              </InputAdornment>
                                                            )
                                                        }}  
                                                    />
                                                    <FieldArray 
                                                        name={`stations[${index}].admin[0]`}
                                                        render={() => (
                                                            <Field
                                                                component={TextField}    
                                                                variant='outlined'
                                                                style={{ width: '30%' }}
                                                                required
                                                                select
                                                                autoFocus
                                                                name={`stations[${index}].admin[0]`}
                                                                label='Station Administrator'
                                                                InputProps={{
                                                                    startAdornment: (
                                                                      <InputAdornment position='start'>
                                                                          <CardAccountDetails />
                                                                      </InputAdornment>
                                                                    )
                                                                }}
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
                                                <Box className={classes.box} >
                                                        {index < 2 ? (
                                                            <Button 
                                                                size='small'
                                                                variant='contained'
                                                                onClick={() => remove(index)}
                                                                >
                                                                <Minus />
                                                            </Button> 
                                                            ) : (
                                                                ''
                                                            )
                                                        }
                                                </Box>
                                            </div>
                                        ))}
                                        <Box className={classes.box} >
                                            {
                                                values.stations.length === 5 
                                                    ? (
                                                        <Button
                                                            size='small'
                                                            color='primary'
                                                            disabled
                                                            variant='contained'
                                                            >
                                                            <Plus /> Add Station
                                                        </Button>
                                                    )  : (
                                                        <Button
                                                            size='small'
                                                            color='primary'
                                                            variant='contained'
                                                            onClick={() => push({
                                                                name: '',
                                                                numOfWindows: 1,
                                                                admin: []
                                                            })}
                                                            >
                                                            <Plus /> Add Station
                                                        </Button>
                                                    )
                                                
                                            }
                                            
                                        </Box>
                                    </>
                                )}
                            />
                            <Box className={classes.box} style={{ justifyContent: 'flex-end' }}>
                                <Button 
                                    disabled={isSubmitting}
                                    size='small'
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