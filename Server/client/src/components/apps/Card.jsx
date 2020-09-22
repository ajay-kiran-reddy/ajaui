import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import OpenInBrowserRoundedIcon from '@material-ui/icons/OpenInBrowserRounded';
import history from "../../utils/history";

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
        minHeight:'344px'
    },
    media: {
        height: 180,
    },
});

export default function AppCard(props) {
    const classes = useStyles();
    const routeToTodoApp=()=>{
        history.push(props.path)
    }
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="ToDo"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <div style={{textAlign:'center',width:'100%'}}>
                    <Button
                        variant="contained"
                        // color="primary"
                        className={classes.button}
                        onClick={routeToTodoApp}
                        startIcon={<OpenInBrowserRoundedIcon style={{color: '#dc0a6b'}}/>}
                    >
                        Oepn
                    </Button>
                </div>


            </CardActions>
        </Card>
    );
}
