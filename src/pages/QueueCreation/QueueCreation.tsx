import { FC, useState, useEffect, ReactNode } from 'react'
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

const steps = [
    'Create your Queue',
    'Edit Stations',
    'Create Flashboard & Window Accounts',
    'Finalize'
]

const useStyles = makeStyles((theme: Theme) => 
    createStyles({  
        content: { 
        }
    })
)

const QueueCreation: FC = () => {
    const classes = useStyles();

    const [ activeStep, setActiveStep ] = useState(0);

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    
    const handleReset = () => setActiveStep(0);

    const renderContent = ( stepCount: any ) => {
        switch(stepCount) {
            case 1:
                return <StepOne handleNext={handleNext} />;
            case 2:
                return <StepTwo handleNext={handleNext} handleBack={handleBack} />;
            case 3: 
                return '3';
            case 4:
                return '4';
        }
    }

    return (
        <>
            <ProcessWrapper>
                <Container>
                    <Box className={classes.content}>
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
                            <>
                                <Typography>
                                    All steps completed
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex:'1 1 auto' }} />
                                    <Button onClick={handleReset}>
                                        Reset
                                    </Button>
                                </Box>
                            </>
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