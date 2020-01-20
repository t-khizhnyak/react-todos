import React from 'react';

const TaskMenu = ({tasks, ...props}) => {
    const activeTasks = tasks.filter(task => !task.status);

    return (
        <div className={'footer'}>
            <span id={'itemsLeft'}>{activeTasks.length} items left</span>
            <span id={'all'} onClick={props.changeTasksListFunction}>All </span>   
            <span id={'active'} onClick={props.changeTasksListFunction}>Active </span>   
            <span id={'completede'} onClick={props.changeTasksListFunction}>Completede </span>   
            <span id={'clearCompleted'} onClick={props.deleteAllCompletedTask}>Clear completed</span>
        </div>
    );
}
export default TaskMenu;