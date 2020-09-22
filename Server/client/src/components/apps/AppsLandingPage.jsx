import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AppCard from "./Card";
import TodoWall from '../../images/TodoWall.jpg';
import weatherHome from '../../images/weatherHome.jpg';
import ecommerce from '../../images/ecommerce.jpg';
import blogs from '../../images/blogs.jpg';
import social from '../../images/socialNetworking.jpg';
import Sports from '../../images/sports.jpg';

AppsLandingPage.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width:'100%'
    },
    paper: {
        marginTop:'1%',
        padding: theme.spacing(0),
        textAlign: 'center',
        backgroundColor:'transparent',
        color: theme.palette.text.secondary,
    },
}));

function AppsLandingPage(props) {
    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={5} style={{marginTop:"2%"}}>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <AppCard
                            image={TodoWall}
                            title='To Do List'
                            description='You can easily add your list of todo items by using this application.'
                            path='/todo'
                        />
                    </Paper>

                    {/*<Grid item xs={4}>*/}
                        <Paper className={classes.paper} style={{marginTop:"5%"}}>
                            <AppCard
                                image={blogs}
                                title='Blogs'
                                description='Welcome to Mailuu Kuttys endless blogs..!!!'
                                path='/blogs'
                            />
                        </Paper>
                    {/*</Grid>*/}
                </Grid>


                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <AppCard
                            image={weatherHome}
                            title='Weather Application'
                            description='Want to know weather in your favourite city, Lets dive in'
                            path='/weather'
                        />
                    </Paper>

                    <Paper className={classes.paper} style={{marginTop:"5%"}}>
                        <AppCard
                            image={social}
                            title='Social Network'
                            description='Lets get connected with people across the globe...!!!'
                            path='/social'
                        />
                    </Paper>

                </Grid>

                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <AppCard
                            image={ecommerce}
                            title='E- Commerce'
                            description='No need to step out for your needs, Just login here to get it deliver to your door..!!!'
                            path='/ecommerce'
                        />
                    </Paper>

                    <Paper className={classes.paper} style={{marginTop:"5%"}}>
                        <AppCard
                            image={Sports}
                            title='Sports News'
                            description='Got bored buddy ?Come on, Lets get to know whats happening on Outfield...!!!'
                            path='/sports'
                        />
                    </Paper>
                </Grid>

            </Grid>
        </div>
    );
}

export default AppsLandingPage;