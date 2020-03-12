
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MyDocument from './components/MyDocument'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    margin: '50px 50px 0 50px'
  },
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  steps: {
    display: 'flex',
    padding: theme.spacing(4),
    backgroundColor: 'darkgray',
    justifyContent: 'center'
  },
  formControl: {
    padding: theme.spacing(2)
  }
}));

const getSteps = () => {
  return ['Travel Information', 'Food', 'Shopping'];
}

const getStepContent = (step, values, classes, handleChange) => {
  switch (step) {
    case 0:
      return (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="destination">Destination</InputLabel>
            <OutlinedInput
              id="destination"
              value={values.destination}
              onChange={handleChange('destination')}
              startAdornment={<InputAdornment />}
              labelWidth={60}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="budget">Budget</InputLabel>
            <OutlinedInput
              id="budget"
              value={values.budget}
              onChange={handleChange('budget')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={60}
            />
          </FormControl>
        </>
      );
    case 1:
      return (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="meal">Meal</InputLabel>
            <OutlinedInput
              id="meal"
              value={values.meal}
              onChange={handleChange('meal')}
              startAdornment={<InputAdornment />}
              labelWidth={60}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="meal-price">Price</InputLabel>
            <OutlinedInput
              id="meal-price"
              value={values.mealPrice}
              onChange={handleChange('mealPrice')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={60}
            />
          </FormControl>
        </>
      );
    case 2:
      return (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="shopping">Shopping</InputLabel>
            <OutlinedInput
              id="shopping"
              value={values.shopping}
              onChange={handleChange('shopping')}
              startAdornment={<InputAdornment />}
              labelWidth={60}
            />
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="shopping-price">Price</InputLabel>
            <OutlinedInput
              id="shopping-price"
              value={values.shoppingPrice}
              onChange={handleChange('shoppingPrice')}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={60}
            />
          </FormControl>
        </>
      );
    default:
      return 'Unknown step';
  }
}

const App = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [values, setValues] = useState({
    destination: '',
    budget: '',
    meal: '',
    mealPrice: '',
    shopping: '',
    shoppingPrice: ''
  });

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setValues({
      destination: '',
      budget: '',
      meal: '',
      mealPrice: '',
      shopping: '',
      shoppingPrice: ''
    })
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Stepper activeStep={activeStep} style={{ backgroundColor: 'darkseagreen' }}>
              {steps.map((label) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <Grid className={classes.steps}>
              {activeStep === steps.length ? (
                <Grid>
                  <Typography className={classes.instructions}>
                    All steps completed
            </Typography>
                  <PDFDownloadLink document={<MyDocument values={values} />} fileName={`${values.destination}_bp.pdf`}>
                    {({ blob, url, loading, error }) => (loading ?
                      'Loading document...' :
                      <Button onClick={handleReset} className={classes.button}>
                        Download Pdf
                  </Button>
                    )}
                  </PDFDownloadLink>
                </Grid>
              ) : (
                  <Grid>
                    <Typography className={classes.instructions}>{getStepContent(activeStep, values, classes, handleChange)}</Typography>
                    <Grid>
                      <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                        Back
                  </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </Grid>
                  </Grid>
                )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;