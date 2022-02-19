import { FC, useState, ChangeEvent } from 'react'
import {
    Dialog,
    DialogProps,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    MenuItem,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';
import { IAccount } from 'types';
import { postAccount } from 'services';

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        inputBase: {
            marginBottom: '1rem'
        },
        header :{
            padding: '1rem'
        },
        footer: {
            padding: '1rem'
        }
    })
)

interface createAccountModalProps extends DialogProps {
    onClose: () => void;
    onCreate: (account: IAccount) => void;
}

const CreateAccountModal: FC<createAccountModalProps> = ({
    onClose,
    onCreate,
    ...rest
}) => {
    const classes = useStyles();

    const [ adminType, setAdminType ] = useState('Super');
    const [ isInvalid, setIsInvalid ] = useState(false);

    const handleSubmit = async (values: any) => {
        try {
            const reqBody = {
                ...values,
                permissions: []
            }

            const { data } = await postAccount(reqBody);
            setIsInvalid(false);

            onCreate(data.data);
        } catch (err) {
            console.error(err);
            setIsInvalid(true);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setAdminType(event.target.value)

    const validationSchema = Yup.object().shape({
        adminType: Yup.string().required('This is a required field'),
        fullName: Yup.object().shape({
            firstName: Yup.string().required('This is a required field'),
            middleName: Yup.string(),
            lastName: Yup.string().required('This is a required field'),
            nameExtension: Yup.string(),
        }),
        contact: Yup.object().shape({
            email: Yup.string().email('Email must be valid').required('This is a required field')
        }),
        permissions: Yup.array()
    })

    const selection = [
        {
            value: 'Super',
            label: 'Super Admin'
        },
        {
            value: 'Queue',
            label: 'Queue Admin'
        },
        {
            value: 'Station',
            label: 'Station Admin'
        }
    ]

    return (
        <Formik
            initialValues={{
                adminType,
                fullName: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    nameExtension: ''
                },
                address: '',
                contact: {
                    email: ''
                },
                permissions: []
            }}
            className={classes.header}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ touched, errors, isSubmitting, resetForm }) => (
                <Dialog
                  {...rest}
                  onClose={() => {
                      resetForm();
                      onClose();
                  }}
                  disableBackdropClick={isSubmitting}
                  disableEscapeKeyDown={isSubmitting}
                >
                    <Form>
                        <DialogTitle disableTypography>
                            <Typography variant='h4'>
                                Create Account 
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Field 
                              className={classes.inputBase}
                              component={TextField}
                              variant='outlined'
                              autoFocus
                              required
                              name='fullName.firstName'
                              autoComplete='given-name'
                              label='First Name'
                              fullWidth
                            />
                            <Field
                              className={classes.inputBase} 
                              component={TextField}
                              variant='outlined'
                              autoFocus
                              name='fullName.middleName'
                              autoComplete='additional-name'
                              label='Middle Name'
                              fullWidth
                            />
                            <Field
                              className={classes.inputBase}
                              component={TextField}
                              variant='outlined'
                              autoFocus
                              required
                              name='fullName.lastName'
                              autoComplete='family-name'
                              label='Last Name'
                              fullWidth
                            />
                            <Field
                              className={classes.inputBase}
                              component={TextField}
                              variant='outlined'
                              autoFocus
                              name='fullName.nameExtension'
                              autoComplete='honorific-suffix'
                              label='Suffix'
                              fullWidth
                            />
                            <Field
                              className={classes.inputBase}
                              component={TextField}
                              select
                              value={adminType}
                              onChange={handleChange}
                              variant='outlined'
                              autoFocus
                              name='adminType'
                              label='Admin Type'
                              fullWidth
                            >
                                {selection.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Field>
                            <Field
                              className={classes.inputBase}
                              component={TextField}
                              variant='outlined'
                              autoFocus
                              required
                              name='contact.email'
                              autoComplete='contact-email'
                              label='Email Address'
                              fullWidth
                            />
                        </DialogContent>
                        <DialogActions className={classes.footer}>
                            <Button
                                onClick={() => {
                                    resetForm();
                                    onClose();
                                }}
                                disabled={isSubmitting}
                            >
                                Discard
                            </Button>
                            <Button
                                variant='contained'
                                type='submit'
                                disabled={isSubmitting}
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            )}
        </Formik>
    );
};

export default CreateAccountModal;