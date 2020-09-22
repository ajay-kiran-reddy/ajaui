import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import {StoreLoggedInUserDetails} from "../../reduxModules/actions";
import {connect} from "react-redux";
import Background from '../../images/snowFall.jpeg';
import RoutingPage from "../home/RoutingPage";
import Login from "./Login";
import SignUp from "./SignUp";

const backgroundImage = {
    width: "100%",
    display: 'flex',
    minHeight: 'calc(100vh)',
    // height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    overflow: 'hidden',
    /*// Calculated from the aspect ration of the content (in case of 16:9 it is 9/16= 0.5625)*/
// padding-top: 46.25%;
    position: "relative",
    backgroundPosition: 'center',
    backgroundImage: `url(${Background})`
}

function Authentication(props) {
    
    return (
        <div className="App">
            {
                ((props.accessToken && props.accessToken.userDetails && props.accessToken.userDetails.accessToken) || (props.accessToken && props.accessToken.accessToken)) ?
                    <RoutingPage/>
                    :
                    <div style={backgroundImage}>
                        <Paper style={{margin: 'auto'}}>
                            {props.signUpOrSignIn ? <Login/> : <SignUp/>}
                        </Paper>
                    </div>
            }
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        StoreLoggedInUserDetails: (payload) => dispatch(StoreLoggedInUserDetails(payload))
    }
}

function mapStateToProps(state) {
    return {
        userDetails: state.loggedInUserDetails,
        signUpOrSignIn: state.signUpOrSignIn,
        accessToken: state.accessToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);