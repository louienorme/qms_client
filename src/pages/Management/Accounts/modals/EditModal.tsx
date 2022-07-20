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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { IAccount } from 'types';
import { updateAccount } from 'services'

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

interface editModalProps extends DialogProps {
    account?: IAccount,
    onClose: () => void;
    onEdit: (account: IAccount) => void;
}

const EditModal: FC<editModalProps> = ({
    account,
    onClose,
    onEdit,
    ...rest
}) => {
    const classes = useStyles();

    const { ...initialValues } = account;
    
    const [ isInvalid, setIsInvalid ] = useState(false);

    const handleSubmit = async (values: any) => {
        try {

            const { data } = await updateAccount(values._id, values);
            setIsInvalid(false);
            
            onEdit(data.data);

        } catch (error: any) {
            toast.error(`${error.response.data.message}`)
        }
    }

    const validationSchema = Yup.object().shape({
        type: Yup.string().required('This is a required field'),
        fullName: Yup.object().shape({
            firstName: Yup.string()
                .required('This is a required field')
                .matches(/^[0-9a-zA-Z .'+_-]+$/, "This field does not accept special characters such as &,=,+,<,>"),
            middleName: Yup.string()
                .matches(/^[0-9a-zA-Z .'+_-]+$/, "This field does not accept special characters such as &,=,+,<,>"),
            lastName: Yup.string().required('This is a required field')
                .matches(/^[0-9a-zA-Z .'+_-]+$/, "This field does not accept special characters such as &,=,+,<,>"),
            nameExtension: Yup.string()
                .matches(/^[0-9a-zA-Z .'+_-]+$/, "This field does not accept special characters such as &,=,+,<,>"),
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
            initialValues={initialValues}
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
                        <ToastContainer 
                            position='bottom-left'
                            theme='colored'
                            draggable={false}
                            closeOnClick
                            autoClose={4000}
                        />
                        <DialogTitle disableTypography>
                            <Typography variant='h4'>
                                Edit Account 
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
                              variant='outlined'
                              autoFocus
                              name='type'
                              label='Admin Type'
                              fullWidth
                              InputProps={{
                                readOnly: true,
                              }}
                            >
                                {selection.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
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
                                Edit
                            </Button>
                        </DialogActions>
                    </Form>
                </Dialog>
            )}
        </Formik>
    )
}

export default EditModal