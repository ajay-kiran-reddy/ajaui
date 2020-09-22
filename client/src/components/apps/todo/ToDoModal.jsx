import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import history from "../../../utils/history";
import {makeStyles} from "@material-ui/core/styles";
import {connect} from 'react-redux';
import {StoreEditToDoUser} from "../../../reduxModules/actions";

ToDoModal.propTypes = {};

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    formControl: {
        minWidth: 120,
    },
});

function ToDoModal(props) {
    const classes = useStyles();
    const onSubmit = () => {
        const postObject = {
            userName: empName,
            taskName: taskName,
            status: status
        };

        if (props.editUser) {
            fetch('http://localhost:5000/todo/edit/' + props.editUser._id, {
                method: "Post",
                body: JSON.stringify(postObject),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    // key: "Content-Type",
                    // value: "application/json"
                }
            }).then(res => res.json())
                .then(()=>props.StoreEditToDoUser(null))
                .then(() => history.push('/todo'))
                .catch(err => console.log(err))
        } else {
            fetch('http://localhost:5000/todo/add', {
                method: "Post",
                body: JSON.stringify(postObject),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    // key: "Content-Type",
                    // value: "application/json"
                }
            }).then(res => res.json())
                .then(() => history.push('/todo'))
                .catch(err => console.log(err))
        }
    }

    console.log(props.editUser, 'edit user')
    const [taskName, setTaskName] = React.useState(props.editUser ? props.editUser.taskName : null);
    const [empName, setEmpName] = React.useState(props.editUser ? props.editUser.userName : null);
    const [status, setStatus] = React.useState(props.editUser ? props.editUser.status : null);
    const [open, setOpen] = React.useState(false);

    const handleEmployeeName = (e) => {
        setEmpName(e.target.value)
    }

    const handleTaskName = (e) => {
        setTaskName(e.target.value)
    }

    const routeBackTodo = () => {
        history.push('/todo')
    }

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            <React.Fragment>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={3}>

                    </Grid>

                    <Grid item xs={6}>
                        <Paper style={{width: '100%'}}>

                            <Grid container spacing={2} style={{marginTop: "2%"}}>
                                <Grid item xs={6}>
                                    <TextField id="outlined-basic"
                                               label="Employee Name"
                                               onChange={handleEmployeeName}
                                               value={empName}
                                               variant="outlined"/>
                                    <div>
                                        <TextField id="outlined"
                                                   label="Task Name"
                                                   onChange={handleTaskName}
                                                   value={taskName}
                                                   variant="outlined"/>
                                    </div>


                                </Grid>

                                <Grid item xs={6}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-controlled-open-select-label">Select
                                            Status</InputLabel>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={'Started'}>Started</MenuItem>
                                            <MenuItem value={'Yet to pick'}>Yet to pick</MenuItem>
                                            <MenuItem value={'Completed'}>Completed</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <div>
                                        {/*<MaterialUIPickers/>*/}
                                    </div>
                                </Grid>
                            </Grid>

                            <button onClick={routeBackTodo}>
                                Cancel
                            </button>

                            <button onClick={onSubmit}>
                                Submit
                            </button>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>

                    </Grid>
                </Grid>


            </React.Fragment>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        editUser: state.todo.editUser
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        StoreEditToDoUser:(payload)=>dispatch(StoreEditToDoUser(payload))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ToDoModal);