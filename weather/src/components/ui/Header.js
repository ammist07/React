import React, { useState, useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import IconButton from '@material-ui/core/IconButton';
import Buttom from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
// import logo from '../../assets/logo.svg';
import sun from '../../assets/sun.svg';
import logo from '../../assets/thunder.svg';
// import logo4 from '../../assets/autumn.svg';
// import logo5 from '../../assets/cloudy.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme, fade} from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MyLocation from '@material-ui/icons/MyLocation';

function ElevationScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  const useStyles = makeStyles(theme =>({
      toolbarMargin:{
          ...theme.mixins.toolbar,
          marginBottom:'2rem',
          [theme.breakpoints.down('md')]:{
            marginBottom:'2rem'
        }

      },
      logo:{
          height:'5rem',
          width:'4rem',
          marginLeft:'.5rem',
          marginRight:'.5rem',
          fontSize:'small',
          [theme.breakpoints.down('md')]:{
              height:'4rem'
          }
      },
      logoInBar:{
        height:'1.5rem',
    },
      tabContainer:{
          marginLeft:'auto',
      },
      tab:{
          ...theme.typography.tab,
          minWidth:150,
          marginLeft:'1rem'
      },
      button:{
        ...theme.typography.search,
          marginRight:'10px',
          "&:hover": {
            backgroundColor:'#ffb74d',
          },
        },
        drawerButton:{
            marginLeft:'auto',
            marginRight:'10px',
            backgroundColor:"#B8E1FB",
            '&:hover': {
                backgroundColor:"#B8E1FB",
            },
            [theme.breakpoints.down('sm')]:{
                fontSize:'small'
             }       
        },
        drawerIcon:{
            height:'1.5rem',
            width:'1.5rem',
            color:'black',
            '&:hover': {
                backgroundColor:"#B8E1FB",
            },
            [theme.breakpoints.down('sm')]:{
                fontSize:'small'
             }
        },
        search:{
            background:'white',
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            marginRight:'.5rem',
            backgroundColor: fade('#FFF', 0.15),
            '&:hover': {
            backgroundColor: fade('#FFF', 0.25),
            },
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
              width: '20ch',
            },
          },
          inputRoot: {
            color: 'white',
          },
          searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          bar:{
            [theme.breakpoints.down('md')]:{
                height:'4rem'
            },zIndex:theme.zIndex.modal+1
          },
        drawer:{
            backgroundColor:theme.palette.secondary.main,
        },
        drawerItem:{
            ...theme.typography.tab,
            color:'#000',
        },
        listItem:{
            background:'#B8E1FB',
        },
        
  }))
const Header = ({ data, onForm, onLocal}) =>{
    const [code, setCode] = useState('');
    const classes = useStyles()
    const [value, setValue] = useState(0);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const onInputChange = (e) =>{
        setCode(e.target.value)
    }
    const onFormSubmit = (e) =>{
        e.preventDefault();
        onForm(code)
    }
    const onLocalCal = () =>{
        onLocal()
    }
    const handleChange = (e, value) =>{
        setValue(value)
    }
    useEffect(()=>{
        if(window.location.pathname==='/' && value!==0){
            setValue(0)
        }
        else if(window.location.pathname==='/hourly' && value!==1){
            setValue(1)
        }
        else if(window.location.pathname==='/5day' && value!==2){
            setValue(2)
        }
        else if(window.location.pathname==='/map' && value!==3){
            setValue(3)
        }
        else if(window.location.pathname==='/more' && value!==4){
            setValue(4)
        }
    },[value])

    const tab = (
        <React.Fragment>
            <Tabs value={value} className={classes.tabContainer} onChange={handleChange} TabIndicatorProps={{
                    style: {
                        transition: "width 0s"
                    }
                }} indicatorColor='secondary'>
                <Tab className={classes.tab} component={Link} to='/' label="Home"/>
                <Tab className={classes.tab} component={Link} to='/hourly' label="Hourly"/>
                <Tab className={classes.tab} component={Link} to='/5day' label="Days"/>
            </Tabs>
        </React.Fragment>
    )
    const drawer = (
        <React.Fragment>
            <SwipeableDrawer classes={{paper:classes.drawer}} disableBackdropTransition={!iOS} disableDiscovery={iOS} open={openDrawer} onClose={()=>setOpenDrawer(false)} onOpen={()=>setOpenDrawer(true)}>
                <div className={classes.toolbarMargin}/>
                <List onChange={handleChange} disablePadding>
                    <ListItem selected={value===0} className={classes.listItem} divider button component={Link} to='/' onClick={()=>{setOpenDrawer(false);setValue(0)}}>
                        <ListItemText className={classes.drawerItem} disableTypography>Home</ListItemText>
                    </ListItem>
                    <ListItem selected={value===1} className={classes.listItem}  divider button component={Link} to='/hourly' onClick={()=>{setOpenDrawer(false);setValue(1)}}>
                        <ListItemText className={classes.drawerItem} disableTypography>Hourly</ListItemText>
                    </ListItem>
                    <ListItem selected={value===2} className={classes.listItem}  divider button component={Link} to='/5day' onClick={()=>{setOpenDrawer(false);setValue(2)}} >
                        <ListItemText className={classes.drawerItem} disableTypography>Days</ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        <IconButton onClick={()=>setOpenDrawer(!openDrawer)} size='small' className={classes.drawerButton} disableRipple>
            <MenuOpenIcon fontSize='medium' className={classes.drawerIcon}/>
        </IconButton>
        </React.Fragment>
    )
    return(
        <React.Fragment>
            <ElevationScroll>
                <AppBar className={classes.bar} position='fixed'>
                    <ToolBar disableGutters>
                        <Buttom component={Link} onClick={()=>setValue(0)} to='/'  size="small" variant="contained" color="primary" style={{boxShadow:'none', borderRadius:'0', padding:'0',margin:'0'}}><img src={logo} className={classes.logo} alt="Weather"/></Buttom>
                        {/* <img src={logo} className={classes.logo}alt="Weather"/>
                        <img src={logo3} className={classes.logo}alt="Weather"/>
                        <img src={logo4} className={classes.logo}alt="Weather"/>
                        <img src={logo5} className={classes.logo}alt="Weather"/> */}
                        <IconButton color='secondary' className={classes.buttonTwo} onClick={onLocalCal} disableGutters>
                                <MyLocation className={classes.location} />
                        </IconButton>
                        <div className={classes.search} >
                            <div className={classes.searchIcon}>
                            <img src={sun} className={classes.logoInBar}alt="Weather"/>
                            </div>
                           
                            <InputBase
                                onChange={onInputChange}
                                value={code}
                                placeholder="Zip…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <IconButton onClick={onFormSubmit} color='secondary' size='small' className={classes.button} disableGutters>
                                <BeachAccessIcon  fontSize='medium'/>
                        </IconButton>
                        {matches ? drawer: tab}
                    </ToolBar>
                </AppBar>  
            </ElevationScroll>
            <div className={classes.toolbarMargin}/>
        </React.Fragment>
    )
}
export default Header;