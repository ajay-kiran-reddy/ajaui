import React from 'react';
import PropTypes from 'prop-types';
import AppBar from "./AppBar";
import {Router, Route,Switch,withRouter} from "react-router-dom";
import history from "../../utils/history";
import PrivateRoute from "../../PrivateRouter";
import LandingPage from "./LandingPage";
import PersonalInfoLandingPage from "../personalInfo/PersonalInfoLandingPage";
import AppBackground from "../../images/AppBackground.jpg";
import ProfLandingPage from "../professionalInfo/ProfLandingPage";
import AppsLandingPage from "../apps/AppsLandingPage";
import Todo from "../apps/todo/Todo";
import WeatherLandingPage from "../apps/weather/WeatherLandingPage";
import EComemrceLandingPage from "../apps/e-commerce/EComemrceLandingPage";
import ECommerceLandingPage from "../apps/e-commerce/EComemrceLandingPage";
import BlogsLandingPage from "../apps/blogs/BlogsLandingPage";
import SnLandingPage from "../apps/socialNetwork/SNLandingPage";
import SportsLandingPage from "../apps/sports/SportsLandingPage";
import ToDoModal from "../apps/todo/ToDoModal";
import SignUp from "../authentication/SignUp";
import CreatePost from "../apps/socialNetwork/CreatePost";
import Profile from "../apps/socialNetwork/Profile";
import FinstaMainPage from "../apps/socialNetwork/FinstaMainPage";
import Posts from "../apps/socialNetwork/Posts";
import UserProfile from "../apps/socialNetwork/UserProfile";

RoutingPage.propTypes = {

};

const AppBackgroundImage = {
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
    backgroundImage: `url(${AppBackground})`
}

function RoutingPage() {
    return (
        <div>
            <div style={AppBackgroundImage}>
                    <AppBar/>
                <div style={{marginLeft:'2%',marginTop:'4%',width:'100%',marginRight:'2%'}}>
                    <Router history={history}>
                        <div>
                            <Switch>
                                <Route
                                    exact
                                    path="/"
                                    component={LandingPage}
                                />
    
                                <Route
                                    exact
                                    path="/signup"
                                    component={SignUp}
                                />

                                <Route
                                    exact
                                    path="/personalInfo"
                                    component={PersonalInfoLandingPage}
                                />

                                <Route
                                    exact
                                    path="/professionalInfo"
                                    component={ProfLandingPage}
                                />

                                <Route
                                    exact
                                    path="/apps"
                                    component={AppsLandingPage}
                                />

                                <Route
                                    exact
                                    path="/todo"
                                    component={Todo}
                                />

                                <Route
                                    exact
                                    path="/weather"
                                    component={WeatherLandingPage}
                                />

                                <Route
                                    exact
                                    path="/ecommerce"
                                    component={ECommerceLandingPage}
                                />

                                <Route
                                    exact
                                    path="/blogs"
                                    component={BlogsLandingPage}
                                />

                                <Route
                                    exact
                                    path="/social"
                                    component={Posts}
                                />

                                <Route
                                    exact
                                    path="/sports"
                                    component={SportsLandingPage}
                                />

                                <Route
                                    exact
                                    path="/addTodo"
                                    component={ToDoModal}
                                />
    
                                <Route
                                    exact
                                    path="/createPost"
                                    component={CreatePost}
                                />
    
                                <Route
                                    exact
                                    path="/profile"
                                    component={Profile}
                                />
    
                                <Route
                                    exact
                                    path="/finstaProfile"
                                    component={Profile}
                                />
    
                                <Route
                                    exact
                                    path="/UserProfile"
                                    component={UserProfile}
                                />
                                
                            </Switch>
                        </div>
                    </Router>
                </div>

            </div>
        </div>
    );
}

export default RoutingPage;