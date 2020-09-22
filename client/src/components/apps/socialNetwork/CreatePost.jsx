import React from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./snstyle.css";
import {connect} from "react-redux";
import history from "../../../utils/history";
import SnLandingPage from "./SNLandingPage";

CreatePost.propTypes = {};

function CreatePost(props) {
    
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [photo, setPhoto] = React.useState('');
    const [photoUrl, setPhotoUrl] = React.useState('');
    
    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    };
    
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    };
    
    const handlePhotoUpload = (e) => {
        setPhoto(e.target.files[0])
    }
    
    const submitPost = () => {
        const postObject = {}
        const data = new FormData();
        data.append("file", photo);
        data.append("upload_preset", "AjayUi");
        data.append("cloud_name", "AjayUi");
        fetch("https://api.cloudinary.com/v1_1/ajaui/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then((data) => fetch("http://localhost:5000/post/createPost", {
                method: "POST",
                body: JSON.stringify({
                    title,
                    description,
                    photo: data.url
                }),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.jwtToken.userDetails.accessToken
                    
                }
            }))
            .then((res) => res.json)
            .then(data => console.log(data))
            .catch(err => console.log(err))
            .finally(()=>history.push("/social"))
    }
    
    return (
        <div className="postParent">
            <SnLandingPage/>
            <div className="createPost">
                <div style={{minWidth: '400px'}}>
                    <TextField required style={{width: '100%'}} id="standard-basic" label="title"
                               value={title}
                               onChange={handleTitleChange}
                    />
                </div>
                
                <div style={{minWidth: '400px'}}>
                    <TextField required style={{width: '100%'}} id="standard-basic" label="description"
                               value={description}
                               onChange={handleDescriptionChange}
                              />
                </div>
                
                <div style={{padding: "20px", marginTop: "2%"}}>
                    <input id="files" className="Input" type="file" onChange={(e) => handlePhotoUpload(e)}/>
                </div>
                
                
                <Button variant="contained" color="secondary"
                        onClick={submitPost}
                >
                    Submit
                </Button>
            </div>
        </div>
    
    );
}

function mapStateToProps(state) {
    return {
        jwtToken: state.accessToken
    }
}

export default connect(mapStateToProps, null)(CreatePost);