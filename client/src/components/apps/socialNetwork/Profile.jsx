import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import "./snstyle.css";
import SNLandingPage from "./SNLandingPage";
import {API_URL} from "../../../reduxModules/constants";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EditIcon from '@material-ui/icons/Edit';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

Profile.propTypes = {};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function Profile(props) {
    const classes = useStyles();
    const [myPostsData, setMyPostsData] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [profilePic, setProfilePic] = React.useState('');
    
    React.useEffect(() => {
        fetch("/post/myPosts", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + props.jwtToken.userDetails.accessToken
            }
        }).then(res => res.json())
            .then(data => setMyPostsData(data))
    }, []);
    
    const handleEditProfile = () => {
        setOpen(true)
    };
    
    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    
    
    const handleClose = () => {
        setOpen(false)
    };
    
    const handlePhotoChange = (e) => {
        setProfilePic(e.target.files[0])
    }
    
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
    const handleUsername = (e) => {
        setUserName(e.target.value)
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    
    const SaveProfileDetails = () => {
        const data = new FormData();
        data.append("file", profilePic);
        data.append("upload_preset", "AjayUi");
        data.append("cloud_name", "AjayUi");
        fetch("https://api.cloudinary.com/v1_1/ajaui/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => fetch(`/auth/editProfile/${props.jwtToken.userDetails.user._id}`, {
                    method: "POST",
                    body: JSON.stringify({
                        name: username,
                        email: email,
                        password: password,
                        photo: data.url
                    }),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                }).then(res => res.json())
                    .then(data => console.log(data, 'final data'))
            )
    }
    
    return (
        <div>
            {open ? <Dialog
                open={open}
                TransitionComponent={Transition}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Edit your profile"}</DialogTitle>
                <DialogContent>
                    <div style={{minWidth: '400px'}}>
                        <TextField style={{width: '100%'}} id="standard-basic" label="name" value={username}
                                   onChange={handleUsername}/>
                    </div>
            
                    <div style={{minWidth: '400px'}}>
                        <TextField style={{width: '100%'}} id="standard-basic" label="email" value={email}
                                   onChange={handleEmailChange}/>
                    </div>
            
                    <div style={{minWidth: '400px'}}>
                        <TextField style={{width: '100%'}} id="standard-basic" label="Password" value={password}
                                   onChange={handlePassword}
                                   type='password'/>
                    </div>
            
                    <div style={{padding: "20px", marginTop: "2%"}}>
                        <input id="files" className="Input" type="file" onChange={(e) => handlePhotoChange(e)}/>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        cancel
                    </Button>
                    <Button onClick={SaveProfileDetails} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog> : null}
            
            <SNLandingPage/>
            <Grid container spacing={3}>
                <Grid item xs={2}>
                </Grid>
                
                
                <Grid item xs={8} md={8} lg={8}>
                    <div className="profileHeader">
                        <div className="thumbnail">
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6} lg={3}>
                                    <div className="thumbnailDiv">
                                        <img
                                            src={myPostsData && myPostsData.posts[0].postedBy.photo}
                                            className="thumbnailDiv"/>
                                    </div>
                                </Grid>
                                
                                <Grid item xs={9}>
                                    <div className="profileStats">
                                        <h3 className="profileName">{myPostsData && myPostsData.posts[0].postedBy.name}</h3>
                                        <Button
                                            style={{
                                                marginTop: "5%",
                                                float: "right",
                                                width: "200px",
                                                height: "50px",
                                                marginLeft: "2%"
                                            }}
                                            variant="contained"
                                            className={classes.button}
                                            startIcon={<EditIcon/>}
                                            onClick={handleEditProfile}
                                        >
                                            <span style={{width: "200px"}}>Edit Profile</span>
                                        </Button>
                                    </div>
                                    <Grid container spacing={3} style={{textAlign: "left", width: "50%"}}>
                                        <Grid item xs={12} md={6} lg={4} className="subHeaders">Posts</Grid>
                                        
                                        <Grid item xs={12} md={6} lg={4} className="subHeaders">Followers</Grid>
                                        
                                        <Grid item xs={12} md={6} lg={4} className="subHeaders">Following</Grid>
                                    </Grid>
                                    
                                    <Grid container spacing={3} style={{textAlign: "left", width: "50%"}}>
                                        <Grid item xs={12} md={6} lg={4}
                                              className="subHeadersValues">{myPostsData && myPostsData.posts.length}</Grid>
                                        
                                        <Grid item xs={12} md={6} lg={4} className="subHeadersValues">120</Grid>
                                        
                                        <Grid item xs={12} md={6} lg={4} className="subHeadersValues">3</Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    
                    <Grid container spacing={3} style={{marginTop: "3%", backgroundColor: "#dae8e2"}}>
                        {myPostsData && myPostsData.posts.map((post, index) => {
                            return <Grid key={index} item xs={4}>
                                <img style={{padding: "20px", width: "300px", height: "300px"}} src={post.photo}/>
                            </Grid>
                        })}
                    
                    </Grid>
                </Grid>
                
                <Grid item xs={2}>
                
                </Grid>
            
            </Grid>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        jwtToken: state.accessToken
    }
}

export default connect(mapStateToProps)(Profile)

