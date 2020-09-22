import React from 'react';
import './App.css';
import AppBar from "./components/home/AppBar";
import {StoreLoggedInUserDetails} from "./reduxModules/actions";
import {connect} from "react-redux";
import Authentication from "./components/authentication/auth";
import Spinner from "./Spinner";
import {usePromiseTracker} from "react-promise-tracker";

const LoadingIndicator = () => {
  const { promiseInProgress } = usePromiseTracker({delay:0});
  // {console.log('inside loader')}
  return (

      promiseInProgress &&

      <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor:"white",
          }}
      >
        <div >



          <div style={{marginLeft:"40%",marginTop:"60%"}}>
            <Spinner/>
          </div>

        </div>
      </div>
  );
};
function App(props) {
  return (
    <div className="App">
        <LoadingIndicator/>
        {/*{props.userDetails && props.userDetails ? <AppBar/> :*/}
      <Authentication/>
        {/*}*/}
    </div>
  );
}

// const mapDispatchToProps=(dispatch)=>{
//     return{
//         dispatch,
//         StoreLoggedInUserDetails:(payload)=>dispatch(StoreLoggedInUserDetails(payload))
//     }
// }
//
// function mapStateToProps(state) {
//     return{
//         userDetails:state.loggedInUserDetails
//     }
//
// }

export default (App);
