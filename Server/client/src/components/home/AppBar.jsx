import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { AiFillAppstore } from "react-icons/ai";
import { FaMailchimp } from "react-icons/fa";
import { FaRegGrinStars } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";
import history from "../../utils/history";
import { FcHome } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";
import {storeAccessToken, StoreLoggedInUserDetails} from "../../reduxModules/actions";
import {connect} from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor:'#267cb9',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function MiniDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onLogout=()=> {
        window.FB.logout()
    }

    const handlePersonalInfo=()=>{
        history.push('/personalInfo')
    }

    const handleProfessionalInfo=()=>{
        history.push('/professionalInfo')
    }

    const routeToHome=()=>{
        history.push('/')
    }

    const routeToApps=()=>{
        history.push('/apps')
    }
    
    const handleLogout=()=>{
        props.storeAccessToken( null);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div style={{width:"100%"}}>
                       <span style={{textAlign:"start",width:"50%",float:"left",fontSize:"22px",fontWeight:"bold"}}>
                            AjaUI
                       </span>
                        <span style={{width:"50%",textAlign:"end",float:"right"}}>
                            <FiLogOut size={'2em'}
                                          onClick={handleLogout}
                                          color={'#fff'}/>
                        </span>
                    </div>
                   
                   
                </Toolbar>
            </AppBar>
            <Drawer
                style={{backgroundColor:'transparent'}}
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                {/*'Profession Info', 'PersonalInfo', 'Interests'*/}



                <List>
                    <ListItem button key={'Apps'}>
                        <ListItemIcon> <FcHome size={'2em'}
                                               onClick={routeToHome}
                                               color={'#de4010'}/></ListItemIcon>
                        <ListItemText primary={'Home'} />
                    </ListItem>
                </List>

                <List>
                        <ListItem button key={'Apps'}>
                            <ListItemIcon>
                                <AiFillAppstore size={'2em'}
                                                onClick={routeToApps}
                                                color={'#de4010'}/></ListItemIcon>
                            <ListItemText primary={'Apps'} />
                        </ListItem>
                </List>
                <Divider />

                <List>
                    <ListItem button key={'Profession Info'}>
                        <ListItemIcon> <FaUserTie
                            size={'2em'}
                            onClick={handleProfessionalInfo}
                            color={'#9512c4'}/></ListItemIcon>
                        <ListItemText primary={'Professional Info'} />
                    </ListItem>
                </List>
                <Divider />

                <List>
                    <ListItem button key={'PersonalInfo'}
                              onClick={handlePersonalInfo}
                    >
                        <ListItemIcon> <FaMailchimp size={'2em'} color={'#21a2c9'} /></ListItemIcon>
                        <ListItemText primary={'Personal Info'} />
                    </ListItem>
                </List>
                <Divider />

                <List>
                    <ListItem button key={'Interests'}>
                        <ListItemIcon> <FaRegGrinStars size={'2em'} color={'#e00d61'} /></ListItemIcon>
                        <ListItemText primary={'Interests'} />
                    </ListItem>
                </List>
                <Divider />

            </Drawer>
            {/*<main className={classes.content}>*/}
            {/*    <div className={classes.toolbar} />*/}
            {/*</main>*/}
        </div>
    );
}

const mapDispatchToProps=(dispatch)=>{
    return{
        StoreLoggedInUserDetails:(payload)=>dispatch(StoreLoggedInUserDetails(payload)),
        storeAccessToken: (payload) => dispatch(storeAccessToken(payload))
    }
}

export default connect(null,mapDispatchToProps)(MiniDrawer)
