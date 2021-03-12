import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid,
    Typography,
    MenuItem,
    TextField, 
    makeStyles,
    InputLabel,
    FormControl,
    Select,
    Paper,
    Button,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    },
}));



export default function SelectCategory() {

    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const categories = useSelector((store) => store.categories)
    const event = useSelector((store) => store.event)

    useEffect(() => {
        dispatch({ type: 'FETCH_CATEGORIES' });
      }, []);

    //onClick function to go back to EnterPerson
    const handleBack = () => {
        history.push('/person');
    }; //end handleBack


    //onClick function to submit person & relationship details
    const handleContinue = () => {
        //conditional if logged in go to dashboard
        history.push('/dashboard');
        //else go to register/login

    }; //end handleContinue



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                    <Paper align="center" elevation={4} className={classes.paper}>
                    <Typography variant="h6">What type of cards would you like to consider for this occasion?</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid align="center" item xs={12} sm={6}>
                    <Paper elevation={4}>
                        <FormControl>
                            <Select
                                id="event-category"
                                label= "select category"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                style={{ width: 250, margin: 8 }}
                                variant="outlined"
                                value={ event?.category || '' }
                                onChange={(event) => dispatch({ type: 'SET_CATEGORY', payload: event.target.value })}
                            >
                                    <option value="">Choose a category:</option>
                                {categories.map((category) => {
                                    return (
                                        <option value = {category.id} key = {category.id}>{category.category}</option>
                                    );
                                })}
                                    
                            </Select>
                        </FormControl>
                        
                        <div>
                            <Button variant="outlined" onClick={handleBack}>
                            Back
                            </Button>
                            
                            <Button variant="outlined" onClick={handleContinue}>
                            Continue
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
            </Grid>
        </div>
    )
}