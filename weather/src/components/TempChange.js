import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme=>({
    temptype:{
        ...theme.typography.tab,
        ...theme.typography.switchTemp,
        color:theme.palette.secondary.main,
        background:theme.palette.primary.main,
    },
    temptype2:{
        ...theme.typography.tab,
        ...theme.typography.switchTemp,
        color:theme.palette.primary.main,
        background:theme.palette.secondary.main,
    },
    rootIcon:{
        
    },switchIcon:{
        justifyContent:'center'
    }
}))
const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.primary.main,
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.common.white,
    },
    checked: {},
  }))(Switch);

export default function CustomizedSwitches({checkedC, setCheck}) {
    const classes = useStyles()
  
    const handleChange = (event) => {
    //   setState({ ...state, [event.target.name]: event.target.checked });
        setCheck(event.target.checked)
    };
  
    return (
        <Typography component="div" >
          <Grid component="label" className={classes.switchIcon} xs={12} container alignItems="center" spacing={1}>
            <Grid className={classes.temptype2} item>C</Grid>
            <Grid item>
              <AntSwitch checked={checkedC} onChange={handleChange} name="checkedC" />
            </Grid>
            <Grid className={classes.temptype} item>F</Grid>
          </Grid>
        </Typography>
    );
  }
  