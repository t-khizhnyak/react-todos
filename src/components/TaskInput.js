import React from 'react';

const TaskInput = (props) => {

  const inputChange = event => {
    props.updateInputValue(event.target.value);
  };

  const handleEnter = event => {
    if (event.key === 'Enter') addTask();
  };

  const addTask = () => {
    props.addTask({
      id: +new Date(),
      title: props.input,
      status: false
    })
  };

  const checkboxChecked = () => {
    props.mainCheckboxHandler(props.mainCheckboxStatus);
  }

  const mainCheckbox = () => {
    return ( props.tasks.length ? 
      <>
        <div className="form-group">
          <input type='checkbox'  
            id='mainCheckbox'
            checked={props.mainCheckboxStatus} 
            onChange={checkboxChecked}
          />
          <label htmlFor={'mainCheckbox'}></label>
        </div>
      </> : null )
  };

  return  (
    <div className='task-input'>
      {mainCheckbox()}
      <input 
        className='new-todo'
        placeholder="What needs to be done?"
        onChange={inputChange}
        value={props.input}
        onKeyPress={handleEnter}
      />
    </div>
  );
}

export default TaskInput;