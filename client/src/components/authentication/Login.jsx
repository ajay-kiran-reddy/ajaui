import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Button from "@material-ui/core/Button";
import {FaFacebook} from "react-icons/fa";
import GoogleLogin from "react-google-login";
import {FcGoogle} from "react-icons/fc";
import Paper from "@material-ui/core/Paper";
import {createMuiTheme, makeStyles, withStyles} from "@material-ui/core/styles";
import history from "../../utils/history";
import {green} from "@material-ui/core/colors";
import {showSignUpOrSignIn, storeAccessToken, StoreLoggedInUserDetails} from "../../reduxModules/actions";
import {connect} from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const BootstrapButton = withStyles({
    root: {
        boxShadow: 'none',
        width: '100%',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        background: 'linear-gradient(to right, #6699ff 0%, #ff66cc 100%)',
        borderColor: '#0063cc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);
Login.propTypes = {};


const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: '10%',
        margin: theme.spacing(1),
    },
}));

const theme = createMuiTheme({
    palette: {
        primary: green,
    },
});


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Login(props) {
    
    
    const [userDetails, setUserDetails] = React.useState();
    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [snackBarMsgSuccess, setSnackBarMsgSuccess] = React.useState("");
    const [snackBarMsgFailure, setSnackBarMsgFailure] = React.useState("");
    
    const responseFacebook = (response) => {
        props.StoreLoggedInUserDetails(response);
        props.storeAccessToken(response)
        console.log(response);
    }
    
    const responseGoogle = (response) => {
        props.StoreLoggedInUserDetails(response);
        setUserDetails(response)
        console.log(response);
    }
    
    const handleUsername = (e) => {
        setUserName(e.target.value)
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const routeToHome = () => {
        // props.StoreLoggedInUserDetails('looged in');
        fetch("/auth/signin", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        }).then(res => res.json())
            .then(token => props.storeAccessToken(token))
            .catch((res) => setSnackBarMsgFailure(res.error))
            .finally(() => setOpenSnackBar(true))
        
        // history.push('/')
    }
    
    console.log(snackBarMsgSuccess, 'setSnackBarMsgSuccess msg');
    console.log(snackBarMsgFailure, 'setSnackBarMsgFailure msg');
    console.log(openSnackBar, 'open snackbar')
    
    const routeToSignUp = () => {
        props.showSignUpOrSignIn(false);
        
    }
    
    const handleCloseSnackBar = () => {
        setOpenSnackBar(false)
    }
    
    const classes = useStyles();
    
    return (
        <div>
            <div style={{padding: "20px"}}>
                <h3>Login</h3>
                <div style={{minWidth: '400px'}}>
                    <TextField style={{width: '100%'}} id="standard-basic" label="Username" value={email}
                               onChange={handleEmailChange}/>
                </div>
                
                <div style={{minWidth: '400px'}}>
                    <TextField style={{width: '100%'}} id="standard-basic" label="Password" value={password}
                               onChange={handlePassword}
                               type='password'/>
                </div>
                <BootstrapButton variant="contained" color="primary"
                                 onClick={routeToHome}
                                 className={classes.margin}>
                    Login
                </BootstrapButton>
                
                <Typography variant="caption" display="block" gutterBottom>
                    No Account !!! Want to <span style={{color: "#4dda30", fontSize: "18px", cursor: "pointer"}}
                                                 onClick={routeToSignUp}
                > Sign Up here !!!</span>
                
                </Typography>
                
                <div style={{marginTop: '4%'}}>
                                    <span style={{color: 'gray', fontSize: '12px'}}>
                                    Or Sign up using
                                </span>
                    
                    <div style={{marginLeft: "2%"}}>
                        <div style={{display: 'flex', width: '100%'}}>
                            <div style={{marginTop: '10px', width: '50%'}}>
                                <FacebookLogin
                                    style={{fontSize: '14px'}}
                                    appId="2671267476235064" //APP ID NOT CREATED YET
                                    fields="name,email,picture"
                                    render={renderProps => (
                                        <Button style={{
                                            width: '50px',
                                            backgroundColor: '#4267B2',
                                            color: 'white',
                                            height: '40px',
                                            fontSize: "14px"
                                        }} onClick={renderProps.onClick}><FaFacebook
                                            size={'2em'}/></Button>
                                    )}
                                    callback={responseFacebook}
                                />
                            </div>
                            
                            <div style={{width: '50%'}}>
                                <Button>
                                    <GoogleLogin
                                        clientId="678811344605-9ldaqegvtq8khga70lccdsj32ok1oiis.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
                                        onSuccess={responseGoogle}
                                        render={renderProps => (
                                            <Button style={{
                                                width: '50px',
                                                backgroundColor: '#fff',
                                                border: '1px solid gray',
                                                color: 'white',
                                                height: '40px',
                                                fontSize: "14px"
                                            }} onClick={renderProps.onClick}><FcGoogle
                                                size={'2em'}/></Button>
                                        )}
                                        onFailure={responseGoogle}
                                    />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                {props.accessToken && props.accessToken.userDetails && props.accessToken.userDetails.accessToken ?
                    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                        <Alert onClose={handleCloseSnackBar} severity="success">
                           You are Successfully signed in..!!
                        </Alert>
                    </Snackbar>
                    :
                    <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnackBar}>
                        <Alert onClose={handleCloseSnackBar} severity="error">
                            {props.accessToken && props.accessToken.error}
                        </Alert>
                    </Snackbar>
                }
            
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        StoreLoggedInUserDetails: (payload) => dispatch(StoreLoggedInUserDetails(payload)),
        showSignUpOrSignIn: (payload) => dispatch(showSignUpOrSignIn(payload)),
        storeAccessToken: (payload) => dispatch(storeAccessToken(payload))
    }
}

function mapStateToProps(state) {
    return {
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);