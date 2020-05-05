import React from 'react';
import Days from './Days';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
const Panel = ({response, typeCheck}) =>{
    const classes = useStyles();
    return(
        <React.Fragment>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Days keyNum={'1'} response={response[0]} typeCheck={typeCheck}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Days keyNum={'2'} response={response[1]} typeCheck={typeCheck}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Days keyNum={'3'} response={response[2]} typeCheck={typeCheck}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Days keyNum={'4'} response={response[3]} typeCheck={typeCheck}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Days keyNum={'5'} response={response[4]} typeCheck={typeCheck}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Days keyNum={'6'} response={response[5]} typeCheck={typeCheck}/>
                    </Grid> 
                    <Grid item xs={12}>
                        <Days keyNum={'7'} response={response[6]} typeCheck={typeCheck}/>
                    </Grid> 
                    <Grid item xs={12}>
                        <Days keyNum={'8'} response={response[7]} typeCheck={typeCheck}/>
                    </Grid>   
                </Grid> 
            </div> 
        </React.Fragment>
    )
        
       
}
export default Panel;