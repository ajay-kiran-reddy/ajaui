import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import {API_URL} from "../../../reduxModules/constants";
import {connect} from "react-redux";
import SNLandingPage from "./SNLandingPage";
import {Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {storeUserProfile} from "../../../reduxModules/actions";
import history from "../../../utils/history";
import {trackPromise} from "react-promise-tracker";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "20px",
        marginTop: "4%",
        width: "100%",
        MuiCardHeader: {
            title: {
                float: "left"
            }
        }
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

function PostCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [postsData, setPostsData] = React.useState([]);
    const [updatePostData, setUpdatePostData] = React.useState(false);
    const [comment, updateComment] = React.useState("");
    const [commentData, setCommentData] = React.useState([]);
    
    React.useEffect(() => {
        trackPromise(
        fetch("/post/allposts", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + props.jwtToken.userDetails.accessToken
            }
        }))
            .then(res => res.json())
            .then(data => setPostsData(data.posts))
    }, [updatePostData])
    
    const handleLikeClick = (id) => {
        fetch("/post/like", {
            method: "PUT",
            body: JSON.stringify({
                postId: id
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.jwtToken.userDetails.accessToken
            }
        }).then(res => res.json())
            .then(() => setUpdatePostData(!updatePostData))
    }
    
    const handleUnLikeClick = (id) => {
        fetch("/post/unlike", {
            method: "PUT",
            body: JSON.stringify({
                postId: id
            }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.jwtToken.userDetails.accessToken
            }
        }).then(res => res.json())
            .then(() => setUpdatePostData(!updatePostData))
    }
    
    const handleCommentChange = (e) => {
        updateComment(e.target.value)
    }
    
    const updateComments = (id) => {
        fetch( "/post/comment", {
            method: "PUT",
            body: JSON.stringify({
                comment: comment,
                postId: id
            }),
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + props.jwtToken.userDetails.accessToken
            }
        }).then(res => res.json())
            .then(data => setCommentData(data.result.comment))
            .then(() => updateComment(""))
            .finally(() => setUpdatePostData(!updatePostData))
    }
    
    const deleteComment = (postId, commentId) => {
        fetch(`/post/${postId}/${commentId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                "Authorization": props.jwtToken.userDetails.accessToken
            }
        }).then(res => res.json())
            .then(data => console.log(data, 'deleted data'))
            .finally(() => setUpdatePostData(!updatePostData))
    }
    
    const deletePost = (postId) => {
        fetch(`/post/deletePost/${postId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "content-type": "application/json",
                "Authorization": props.jwtToken.userDetails.accessToken
            }
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(err=>console.log(err))
    }
    
    const routeToUserProfile=(userId)=>{
        props.storeUserProfile(userId);
        history.push('/UserProfile')
    }
    
    return (
        <div>
            <SNLandingPage/>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    {postsData.map((post, index) => {
                        return (
                            <Card className={classes.root} key={index}>
                                <Grid container spacing={3} style={{padding: "20px"}}>
                                    <Grid item xs={1} md={1} lg={1}>
                                        <Avatar/>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3} style={{textAlign: "left", marginTop: "10px"}}>
                                        <span className="userName" onClick={()=>routeToUserProfile(post.postedBy._id)}>{post.postedBy.name}</span>
                                    </Grid>
                                    <Grid item xs={7}>
                                    </Grid>
                                    {post.postedBy._id === props.jwtToken.userDetails.user._id ? <Grid item xs={1}>
                                        <DeleteOutlineIcon style={{fill:"red"}}
                                                           onClick={()=>deletePost(post._id)}
                                        />
                                    </Grid> : <Grid item item xs={1} md={1} lg={1}></Grid>}
                                    
                                </Grid>
                                <CardMedia
                                    className={classes.media}
                                    image={post.photo}
                                    title={post.title}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {post.description}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        {post.likes.includes(props.jwtToken.userDetails.user._id) ?
                                            <FavoriteIcon style={{fill: "#dd0c0c"}}
                                                          onClick={() => handleUnLikeClick(post._id)}/> :
                                            <FavoriteIcon onClick={() => handleLikeClick(post._id)}/>
                                            
                                        } <span>{post.likes.length} Likes</span>
                                    </IconButton>
                                    
                                    <TextField required style={{width: '100%'}} id="standard-basic"
                                               label="Write Comment"
                                               value={comment}
                                               onChange={handleCommentChange}
                                    />
                                    <IconButton aria-label="share">
                                        <SendIcon onClick={() => updateComments(post._id)}/>
                                    </IconButton>
                                </CardActions>
                                <div style={{width: "100%"}}>
                                    {post.comment.map(comment => {
                                        return (
                                            <div style={{width: "100%"}}>
                                              <span style={{
                                                  fontWeight: "bold",
                                                  fontSize: "18px",
                                                  display: "flex",
                                                  width: "100%",
                                                  textAlign: "initial",
                                                  float: "left"
                                              }}>
                                                 <span
                                                     style={{width: "90%"}}>{comment.postedBy.name} : {comment.text} </span> <span
                                                  style={{textAlign: "end"}}><DeleteOutlineIcon
                                                  onClick={() => deleteComment(post._id, comment._id)}
                                                  style={{cursor: "pointer"}}/> </span>
                                            </span>
                                            
                                            </div>
                                        )
                                    })}
                                </div>
                            </Card>
                        )
                    })}
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
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

const mapDispatchToProps=(dispatch)=>{
    return{
        storeUserProfile:(payload)=>dispatch(storeUserProfile(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostCard)
