import React from 'react';
import Tasks from './components/Tasks';
import TaskInput from './components/TaskInput';
import TaskMenu from './components/TaskMenu'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      tasks: [],
      input: '',
      mainCheckboxStatus: false,
      mode: 'all'
    };
  }
  


//Functions transferred => TaskInput.js
  updateInputValue = value => {
    this.setState({ input: value });
  }

  addTask = task => {
    const nextTasks = [task, ...this.state.tasks]
    this.setState({ tasks: nextTasks })
    this.setState({ input: '' })
  };

  mainCheckboxHandler = () => {
    const tasks = this.state.tasks.map((task) => {
      task.status = !this.state.mainCheckboxStatus;
      return task;
    });
    this.setState({ tasks, mainCheckboxStatus: !this.state.mainCheckboxStatus });
  }

  

//Functions transferred => Tasks.js
  changeTasksListFunction = () => {
    let doneTasksElements = []
    if (this.state.mode === 'completede'){
      doneTasksElements = this.state.tasks.filter(function(value){
        return value.status === true})
  
    } else if (this.state.mode === 'active'){
      doneTasksElements = this.state.tasks.filter(function(value){
        return value.status === false})

    } else if (this.state.mode === 'all'){
       doneTasksElements = this.state.tasks;
    }
    return doneTasksElements
  }

  handleCheckboxChange = event => {
    const doneTaskElement = this.state.tasks.map(function(value){
      if (+event.target.id === value.id ) {
        return {...value, status: !value.status}
      }
      return value 
    })
    this.setState({ tasks: doneTaskElement})
  }

  deleteTask = id => {
    const filtered = this.state.tasks.filter(function(value){
      return value.id !== id;
    });
    this.setState({ tasks: filtered })
  };

  replacementOldTaskTitle = (id, e) => {
    const taskId = this.state.tasks.map((task) => {
      if (task.id === id) {
        return {...task, title: String(e)}
      } else return task
    })
    this.setState({ tasks: taskId })
  }



//Functions transferred => TasksMenu.js
  deleteAllCompletedTask = () => {
    const doneTaskElement = this.state.tasks.filter(function(value){
      return value.status === false;
    });
    this.setState({ tasks: doneTaskElement})
    this.setState({ mainCheckboxStatus: false})
  };

  changeModeFunction = (event) => {
    this.setState({mode: event.target.id})
  }


  
  render() {
    return (
      <aside>
        <h1>todos</h1>
        <div className='App'>
          <TaskInput 
            //props:
            tasks={this.state.tasks} 
            input={this.state.input}
            mainCheckboxStatus={this.state.mainCheckboxStatus}
            //function:
            updateInputValue={this.updateInputValue}
            addTask={this.addTask}
            mainCheckboxHandler={this.mainCheckboxHandler}
          />
          {this.changeTasksListFunction().map(task => (
            <Tasks
              //props:
              tasks={this.state.tasks} 
              task={task}
              key={task.id}
              //function:
              deleteTask={() => this.deleteTask(task.id)}
              handleCheckboxChange={this.handleCheckboxChange}
              replacementOldTaskTitle={this.replacementOldTaskTitle}
          />
          ))}
            {this.state.tasks.length ?
            <TaskMenu 
              //props:
              tasks={this.state.tasks}
              //function:
              deleteAllCompletedTask={this.deleteAllCompletedTask}
              changeTasksListFunction={this.changeModeFunction}
            /> : null}
        </div>
      </aside>
    )
  }
}
export default App;