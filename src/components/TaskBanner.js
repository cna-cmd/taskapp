import React from "react";
export const TaskBanner = props => (
    <div className='col'>
        <h4 className='text-white text-center p-4 ml-1'>
        {props.userName} Task App ({props.taskItems.filter(t => !t.done).length} tasks to do)
    </h4>
    </div>
    
)