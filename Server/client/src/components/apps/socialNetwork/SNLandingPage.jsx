import React from 'react';
import PropTypes from 'prop-types';
import "./snstyle.css";
import {FiSend} from "react-icons/fi";
import {FiUser} from "react-icons/fi";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {fade, makeStyles} from '@material-ui/core/styles';
import {Grid} from "@material-ui/core";
import Posts from "./Posts";
import history from "../../../utils/history";
import { NavLink, Switch, Route } from 'react-router-dom';
import Profile from "./Profile";

SnLandingPage.propTypes = {};

const useStyles = makeStyles((theme) => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '40%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
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
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function SnLandingPage(props) {
    
    const classes = useStyles();
    
    const openCreatePostModal=()=>{
        history.push("/createPost")
    }
    
    const openUserProfile=()=>{
        history.push("/profile")
    }
    
    const routeToPosts=()=>{
        history.push("/social")
    }
    
    return (
        <div>
            <div className="navbar">
                <div className="title" onClick={routeToPosts}>
                    Finstagram
                </div>
                <div style={{width: "30%", textAlign: "initial", paddingTop: "20px"}}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon/>
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{'aria-label': 'search'}}
                        />
                    </div>
                </div>
                <div className="post">
                    <Tooltip title="Create Post">
                        <IconButton aria-label="Create Post">
                            <FiSend size={"1em"}
                                    color={"#0c56d2"}
                                    onClick={openCreatePostModal}
                            />
                        </IconButton>
                    </Tooltip>
                
                </div>
                <div className="profile">
                    
                    <Tooltip title="Profile">
                        <IconButton aria-label="delete">
                            <FiUser size={"1em"}
                                    color={"#5910e1"}
                                    onClick={openUserProfile}
                            />
                        </IconButton>
                    </Tooltip>
                
                </div>
            </div>
        </div>
    );
}

export default SnLandingPage;