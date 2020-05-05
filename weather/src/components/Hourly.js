import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
// import iconDecider from './WeatherIcon';
const deg = '\xB0';

const degToCompass = (num) =>{
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
    }
  
  const useStyles = makeStyles(theme =>({
    root: {
      ...theme.typography.divide,
      width: '96%',
      marginLeft:'2%', 
    },
    container: {
      maxHeight: 500,
    },
    head:{
        ...theme.typography.tab,
        fontSize:'1.1rem',
        background:theme.palette.secondary.main,
    },
    tail:{
        ...theme.typography.tab,
        background:theme.palette.primary.main,
        color:theme.palette.secondary.main,
        fontSize:'1.1rem',

    },
    rowCell:{
        background:'#F5FCFF',
    },
    cell:{
        fontFamily:'Kalam,cursive',
        fontSize:"1.2rem",
        color:theme.palette.primary.main
    }
  }));
  
  export default function StickyHeadTable({response, typeCheck}) {
    const letter = typeCheck ? 'F':'C';
    var celsiusToFahrenheit = require('celsius-to-fahrenheit');
    const convert = (temperature) =>{
      if(typeCheck){
          return Math.round(celsiusToFahrenheit(temperature)).toLocaleString('en-US')+deg+letter;
      }
      else{
          return Math.round(temperature).toLocaleString('en-US')+deg+letter;
      }
  }
    const columns = [
        { id: 'dt', 
          label: 'Time', 
          minWidth: 100,
          align: 'center',
          format: (value) => (new Date(value*1000)).toLocaleString()
          
          },
        { id: 'temp', 
          label: 'Temperature', 
          minWidth: 40,
          align: 'center',
          format: (value) => convert(value),
          },
        {
          id: 'feels_like',
          label: 'Feels Like',
          minWidth: 40,
          align: 'center',
          format: (value) => convert(value),
        },
        {
          id: 'weather',
          label: 'Description',
          minWidth: 120,
          align: 'center',
          format: (value) => value.toLocaleString('en-US'),
        //   format: (value) => <React.Fragment>{iconDecider(value,sunrise,sunset)} {value.toLocaleString('en-US')}</React.Fragment>
        },
        {
          id: 'clouds',
          label: 'Clouds',
          minWidth: 50,
          align: 'center',
          format: (value) => value+'%',
        },
        {
          id: 'wind_speed',
          label: 'Wind Speed',
          minWidth: 75,
          align: 'center',
          format: (value) =>  (value*3600*0.000621371).toFixed(2)+" mph",
        },
        {
          id: 'wind_deg',
          label: 'Wind Direction',
          minWidth: 75,
          align: 'center',
          format: (value) => degToCompass(value),
        },
        {
          id: 'humidity',
          label: 'Humidity',
          minWidth: 75,
          align: 'center',
          format: (value) => value+"%",
        },
        {
          id: 'pressure',
          label: 'Pressure',
          minWidth: 75,
          align: 'center',
          format: (value) => value+" hPa",
        },
      ];
      
    const rows = response;
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    return (
      <Paper className={classes.root} elevation={3}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className={classes.head}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell className={classes.head}
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow className={classes.rowCell} role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                        var value = row[column.id];
                        if(column.id === 'weather'){
                            value = row[column.id][0].description;
                        }
                      return (
                        <TableCell key={column.id} align={column.align} className={classes.cell}>
                            { column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            className={classes.tail}
            rowsPerPageOptions={[10,25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
