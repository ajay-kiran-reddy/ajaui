import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch} from "react-router-dom";
import Profile from "./Profile";
import SNLandingPage from './SNLandingPage';
import Posts from "./Posts";

FinstaMainPage.propTypes = {

};

function FinstaMainPage(props) {
    return (
        <div>
            <SNLandingPage/>
            <Switch>
                <Route path='/posts' component={Posts}></Route>
                <Route path='/finstaProfile' component={Profile}></Route>
            </Switch>
        </div>
    );
}

export default FinstaMainPage;