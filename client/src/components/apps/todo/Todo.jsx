import React from 'react';
import PropTypes from 'prop-types';
import TaskTable from "./TaskTable";

Todo.propTypes = {

};

function Todo(props) {
    return (
        <div>
            <TaskTable/>
        </div>
    );
}

export default Todo;