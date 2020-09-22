import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PlusOneRoundedIcon from '@material-ui/icons/PlusOneRounded';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import history from "../../../utils/history";
import { AiFillDelete } from "react-icons/ai";
import {StoreEditToDoUser} from "../../../reduxModules/actions";
import {connect} from 'react-redux';
// import 'date-fns';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    formControl: {
        minWidth: 120,
    },
});

function TaskTable(props) {

    const [tableData, setTableData] = React.useState();


    const [refreshData, setrefreshData] = React.useState(false);
    React.useEffect(() => {
        fetch("http://localhost:5000/todo", {
            method: "GET"
        }).then(res => res.json())
            .then(data => setTableData(data))
    }, [refreshData])


    const addNewTask = () => {
        history.push('/addTodo')
    }

    function createData(userName, taskName, status, _id) {
        return {userName, taskName, status, _id};
    }

    const rows = tableData && tableData.map((row) => {
        return createData(row.userName, row.taskName, row.status, row._id)
    });

    const deleteTodoItem = (id) => {
        fetch('http://localhost:5000/todo/delete/' + id, {
            method: "Delete"
        }).then(() => setrefreshData(!refreshData))
    }

    const editTodoItem=(user)=>{
        props.StoreEditToDoUser(user);
        history.push('/addTodo')
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow style={{border: '1px solid transparent'}}>
                            <TableCell>Task</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Priority</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>

                        <TableRow style={{width: '100%', cursor: 'pointer'}}>
                            <TableCell style={{border: '2px dashed green'}} onClick={addNewTask}>
                                <PlusOneRoundedIcon style={{color: '#5cb61b', marginBottom: '-1.5%'}}/>
                                <span style={{
                                    marginLeft: "2%",
                                    color: '#5cb61b',
                                    fontSize: '16px'
                                }}>Add New Task</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows && rows.map((row) => (
                            <TableRow key={row.userName}>
                                <TableCell component="th" scope="row">
                                    {row.userName}
                                </TableCell>
                                <TableCell align="right">{row.taskName}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>

                                <TableCell align="right">

                                    <button
                                        onClick={() => editTodoItem(row)}>
                                        EDIT
                                    </button>

                                    <button onClick={() => deleteTodoItem(row._id)}>
                                        {/*//     onClick={() => editTodoItem(row._id)}>*/}
                                        {/*// Edit*/}

                                        DELETE
                                    </button>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>

    );
}

const mapDispatchToProps=(dispatch)=>{
    return{
        StoreEditToDoUser:(payload)=>dispatch(StoreEditToDoUser(payload))
    }
}

export default connect(null,mapDispatchToProps)(TaskTable)