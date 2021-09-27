import React, { useState } from "react";
export const TaskCreator = props => {
    const [newTaskName, setNewTaskName] = useState('');
    const updateNewTaskValue = e => setNewTaskName(e.target.value)
    const createNewTask = () => {
        // console.log(newTaskName)
        props.callback(newTaskName);
        setNewTaskName('')
    }
    return (
        <div className='my-1'>
            <input type="text" placeholder='Enter the task'
                className='form-control'
                value={newTaskName}
                onChange={updateNewTaskValue}
            />
            <div className='col mt-2 text-center'>
            <button className='btn btn-default text-white' onClick={createNewTask}>
                Add
            </button>
            </div>
        </div>
    )
}