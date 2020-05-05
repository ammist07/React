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
        background: `linear-gradient(1.00turn, ${theme.palette.primary.main}, #ebf8e1, ${theme.palette.secondary.main})` ,   
    },
    container2:{
        ...theme.typography.divide,
       marginLeft:'5vw',
       marginRight:'5vw',
       maxWidth:'90vw',
       height:'54vh',
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
        fontSize:'20px'
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

const Home = ({response,code, typeCheck}) =>{
    const classes = useStyles()
   const timeZone = response.timezone;
   const cloudCover = response.current.clouds;
   const dew_point = response.current.dew_point;
   const feels_like = response.current.feels_like;
   const humidity = response.current.humidity;
   const pressure = response.current.pressure;
   const sunrise = response.current.sunrise;
   const sunset = response.current.sunset;
   const temp = response.current.temp;
   const uvi = response.current.uvi;
   const visibility = response.current.visibility;
   const wind_deg = response.current.wind_deg;
   const wind_speed = response.current.wind_speed;
   const description = response.current.weather[0].description;
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
                {/* <Typography component="div"  /> */}
                <Grid container spacing={1} >
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>{code.city} , {code.state} , {code.country}</Paper>
                        <Paper className={classes.descrip}>{description.toUpperCase()}</Paper>
                        <Paper className={classes.descrip}>{iconDecider(description, sunrise*1000, sunset*1000)}</Paper>
                        <Paper className={classes.temp}>{Math.round(convert(temp))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</Paper>
                        <Paper className={classes.descrip}> Time Zone: {timeZone}</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}><img src={sunriselogo} className={classes.logo} alt="Weather"/><div className={classes.descrip}>Sunrise {(new Date(sunrise*1000)).toLocaleString()}</div></Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.paper}><img src={sunsetlogo} className={classes.logo} alt="Weather"/><div className={classes.descrip}>Sunset {(new Date(sunset*1000)).toLocaleString()}</div></Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.descrip}>Feels Like {Math.round(convert(feels_like))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}<div className={classes.descrip}>Dew Point {Math.round(convert(dew_point))}{deg}{typeCheck ? <span>F</span>:<span>C</span>}</div><div className={classes.descrip}>UV Index {uvi}</div></Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.descrip}>Wind Speed {Math.round(wind_speed*3600*0.000621371)} mph<div className={classes.descrip}>Wind Direction {degToCompass(wind_deg)}</div></Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.descrip}> Clouds {cloudCover}%</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.descrip}> Visibility {Math.round(visibility*0.000621371192)} miles</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.descrip}> Humidity {humidity}%</Paper>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                        <Paper className={classes.descrip}> Pressure {pressure} hPa</Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.name}>React Weather App - Anshul Mistry</Paper>
                    </Grid>
                </Grid>
            </Paper>    
            </Container>
        </React.Fragment>
    )
}
export default Home;