import { FC, useState, useEffect, ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Container,
    Typography,
    Stepper,
    Box,
    Step,
    StepLabel,
    Button,
    makeStyles,
    createStyles,
    Theme
} from '@material-ui/core'

import { ProcessWrapper } from 'components';
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'

const steps = [
    'Create your Queue',
    'Create Stations',
    'Finalization',
]

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        content: { 
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
        }
    })
)

const QueueCreation: FC = () => {
    const classes = useStyles();
    const history = useHistory();

    const [ activeStep, setActiveStep ] = useState(0);

    const handleDone = () => history.push('/management');

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

    const renderContent = ( stepCount: any ) => {
        switch(stepCount) {
            case 1:
                return <StepOne handleNext={handleNext} />;
            case 2:
                return <StepTwo handleNext={handleNext} />;
            case 3: 
                return <StepThree handleNext={handleNext}/>;
        }
    }

    return (
        <>
            <ProcessWrapper>
                <Container>
                    <Box>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel>
                                            {label}
                                        </StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography 
                                    variant='h3' 
                                    align='center' 
                                    gutterBottom
                                >
                                    Your Queue has been created!
                                </Typography>
                                <Box className={classes.content}>
                                    <Button 
                                        style={{ justifyContent: 'center'}} 
                                        onClick={handleDone}
                                        color='primary'
                                        variant='contained'
                                    >
                                        Continue
                                    </Button>
                                </Box>
                            </div>
                        ) : (
                            <>
                                <Typography variant='h4'>
                                    Step { activeStep + 1 } 
                                </Typography>
                                <div className={classes.content}>
                                    {renderContent(activeStep + 1)}
                                </div>
                            </>
                        )}
                    </Box>
                </Container>
            </ProcessWrapper>
        </>
    )
}

export default QueueCreation;