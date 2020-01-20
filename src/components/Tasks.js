import React from 'react';

class Tasks extends React.Component {

  state = {
    text: this.props.task.title,
    readOnlyStates: true,
    idElementWhotWуWantToChengeTitle: '',
  }

  // on double click to make it editable
  dbClickChangeTitleText = (event) => {
    const idElement = this.props.tasks.filter((task) => {
      return task.title === event.target.value
    })
    this.setState({ idElementWhotWуWantToChengeTitle: idElement[0].id })
    this.setState({ readOnlyStates: !this.state.readOnlyStates })
  }

  // handle keypress and save new text to local state
  handleKeyPress = (e) => {
    this.setState({text: e.target.value});
  }

  // on press enter or another action to update global state and save new text
  handleEnter = event => {
    if (event.key === 'Enter') {
      this.props.replacementOldTaskTitle(this.state.idElementWhotWуWantToChengeTitle, this.state.text) 
      this.setState({ readOnlyStates: true })
    }
  };

  render() {
    const {task} = this.props
    const className = 'task ' + (task.status ? 'task-done' : '');

    return (
      <div className={className}>
        <div className='action-btn'>
          <>
          <div className="container">
            <div className="round">
              <input
              type='checkbox' 
              className='toggle'
              id={task.id} 
              checked={task.status}
              //action
              onChange={this.props.handleCheckboxChange} 
              /> 
              <label htmlFor={task.id}></label>
            </div>
          </div>
          <input 
            type='text' 
            className='everyoneToggle'
            value={this.state.text} 
            readOnly={this.state.readOnlyStates}
            //action
            onDoubleClick={this.dbClickChangeTitleText} 
            onKeyPress={this.handleEnter}
            onChange={this.handleKeyPress} 
          />
          <span className='spanX' onClick={this.props.deleteTask}>x</span>
          </>
        </div>
      </div>
    );
  }
};

export default Tasks;