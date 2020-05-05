import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import iconDecider from './WeatherIcon';
import sunriselogo from '../assets/sunrise.svg';
import sunsetlogo from '../assets/sunset.svg';

const useStyles = makeStyles(theme =>({
    container:{
        // height:'80vh',
        height:'auto',
        width:'100%',
        // background: 'linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c)',
        background: `linear-gradient(1.00turn, ${theme.palette.secondary.main}, #ebf8e1, ${theme.palette.secondary.main})` ,   
    },
    container2:{
        ...theme.typography.divide,
       marginLeft:'5vw',
       marginRight:'5vw',
       maxWidth:'90vw',
       height:'auto',
       padding:'0',
       justifyContent:'center',
    },
    root: {
        flexGrow: 1,
      },
      paper: {
        ...theme.typography.paper,
        fontSize:'35px'
      },
      descrip:{
        ...theme.typography.paper,
        fontSize:'22px'
      },
      temp:{
        ...theme.typography.paper,
        fontSize:'40px',
        fontWeight:'bolder'
      },
      logo:{
          height:'50px'
      },
      name:{
        ...theme.typography.paper,
        fontSize:'35px',
        marginTop:'10vh',
        color:theme.palette.secondary.main

      },
}))

const Days = ({response, typeCheck, keyNum}) =>{
    const classes = useStyles()
    const cloudCover = response.clouds;
    const dew_point = response.dew_point;
    const dt = response.dt;
    const feelsDay = response.feels_like.day;
    const feelsEve = response.feels_like.eve;
    const feelsMorn = response.feels_like.morn;
    const feelsNight = response.feels_like.night;
    const humidity = response.humidity;
    const pressure = response.pressure;
    const sunrise = response.sunrise;
    const sunset = response.sunset;
    const tempDay = response.temp.day;
    const tempEve = response.temp.eve;
    const tempMorn = response.temp.morn;
    const tempNight = response.temp.night;
    const tempMin = response.temp.min;
    const tempMax = response.temp.max;
    const uvi = response.uvi;
    const description = response.weather[0].description;
    const wind_deg = response.wind_deg;
    const wind_speed = response.wind_speed;
    const deg = '\xB0';

   var celsiusToFahrenheit = require('celsius-to-fahrenheit');
    const degToCompass = (num) =>{
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
    }
    const convert = (temperature) =>{
        if(typeCheck){
            return celsiusToFahrenheit(temperature);
        }
        else{
            return temperature;
        }
    }
    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm" className={classes.container2}>
            <Paper elevation={3} className={classes.container}>
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>{(new Date(dt*1000)).toLocaleString()} Day {keyNum}</Paper>
                        <Paper className={classes.descrip}>{description.toUpperCase()}</Paper>
                        <Paper className={classes.descrip}>{iconDecider(description, sunrise*1000, sunset*1000)}</Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}><img src={sunriselogo} className={classes.logo} alt="Weather"/><div className={classes.descrip}>Sunrise {(new Date(sunrise*1000)).toLocaleString()}</div></Paper>
                        <Paper className={classes.descrip}> Clouds {cloudCover}%</Paper>
                        <Paper className={classes.descrip}> Humidity {humidity}%</Paper>
                        <Paper className={classes.descrip}> Pressure {pressure} hPa</Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.paper}><img src={sunsetlogo} className={classes.logo} alt="Weather"/><div className={classes.descrip}>Sunset {(new Date(sunset*1000)).toLocaleString()}</div></Paper>
                        <Paper className={classes.descrip}>Wind Speed {Math.round(wind_speed*3600*0.000621371)} mph<div className={classes.descrip}>Wind Direction {degToCompass(wind_deg)}</div></Paper>
                        <Paper className={classes.descrip}><div className={classes.descrip}>UV Index {uvi}</div></Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.descrip}>
                            Feels Morning {Math.round(convert(feelsMorn))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}
                            <div className={classes.descrip}>Feels Day {Math.round(convert(feelsDay))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                            <div className={classes.descrip}>Feels Evening {Math.round(convert(feelsEve))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                            <div className={classes.descrip}>Feels Night {Math.round(convert(feelsNight))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                            <div className={classes.descrip}>Dew Point {Math.round(convert(dew_point))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Paper className={classes.descrip}>
                            Temp Morning {Math.round(convert(tempMorn))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}
                            <div className={classes.descrip}>Temp Day {Math.round(convert(tempDay))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                            <div className={classes.descrip}>Temp Evening {Math.round(convert(tempEve))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                            <div className={classes.descrip}>Temp Night {Math.round(convert(tempNight))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                            <div className={classes.descrip}>Temp Min {Math.round(convert(tempMin))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                            <div className={classes.descrip}>Temp Max {Math.round(convert(tempMax))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>    
            </Container>
           
        </React.Fragment>
    )
}
export default Days;