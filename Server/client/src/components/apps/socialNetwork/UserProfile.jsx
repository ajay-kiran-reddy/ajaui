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

UserProfile.propTypes = {};

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

function UserProfile(props) {
    const classes = useStyles();
    const [myPostsData, setMyPostsData] = React.useState();
    
    React.useEffect(() => {
        fetch(API_URL + `/users/${props.selectedUserProfileId}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + props.jwtToken.userDetails.accessToken
            }
        }).then(res => res.json())
            .then(data => setMyPostsData(data))
    }, [])
    
    const handleFollowButton=(followId)=>{
        fetch(API_URL+`/users/follow`,{
            method:"PUT",
            body:JSON.stringify({
                followId
            }),
            headers:{
                "Accept":"application/json",
                "Content-type":"application/json",
                "Authorization":props.jwtToken.userDetails.accessToken
            }
        }).then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.log(err))
    }
    return (
        <div>
            <SNLandingPage/>
            {myPostsData &&
            <Grid container spacing={3}>
                <Grid item xs={2}>
                
                </Grid>
                
                <Grid item xs={8}>
                    
                    <div className="profileHeader">
                        <div className="thumbnail">
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <div className="thumbnailDiv">
                                        <img
                                            src={myPostsData.user.photo}
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
                                            // color="secondary"
                                            className={classes.button}
                                            startIcon={<EditIcon/>}
                                        >
                                            
                                            {myPostsData.posts[0].postedBy._id === props.jwtToken.userDetails.user._id ?
                                                <span style={{width: "200px"}}>Edit Profile </span> :
                                                <span style={{width: "200px"}}
                                                      onClick={() => handleFollowButton(myPostsData.posts[0].postedBy._id)}>Follow</span>}
                                        
                                        </Button>
                                    </div>
                                    <Grid container spacing={3} style={{textAlign: "left", width: "50%"}}>
                                        <Grid item xs={4} className="subHeaders">Posts</Grid>
                                        
                                        <Grid item xs={4} className="subHeaders">Followers</Grid>
                                        
                                        <Grid item xs={4} className="subHeaders">Following</Grid>
                                    </Grid>
                                    
                                    <Grid container spacing={3} style={{textAlign: "left", width: "50%"}}>
                                        <Grid item xs={4}
                                              className="subHeadersValues">{myPostsData && myPostsData.posts.length}</Grid>
                                        
                                        <Grid item xs={4} className="subHeadersValues">120</Grid>
                                        
                                        <Grid item xs={4} className="subHeadersValues">3</Grid>
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
            }
        </div>
    );
}

function mapStateToProps(state) {
    return {
        jwtToken: state.accessToken,
        selectedUserProfileId: state.SelectedUserProfileId
    }
}

export default connect(mapStateToProps)(UserProfile)

