import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';
import { getTaskList, addTaskList, setTaskList, deleteTaskFromStore } from './firebase';
import Loading from './Loading';

function App() {
  const [taskData, setTaskData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTaskListFromStore = () =>{
    setIsLoading(true);
    getTaskList().then(res => {
      setTaskData([...res]);
      setIsLoading(false);
      console.log(res)
    }).catch(e => {
      console.log(e);
    })
  }

  const handleUpdateTasks = (data) => {
    setIsLoading(true);
    setTaskList(data).then(() => {
      getTaskListFromStore();
      setIsLoading(false);
    })
  }

  const addTask = (data) => {
    let id = Date.now();
    const newTask = {
      id,
      title: data.title,
      status: data.status,
      description: data.description,
    };
    addTaskList(newTask).then(() =>{
      
      getTaskListFromStore();
    })
  };

  const handleDeleteTask = (id) => {
    console.log(id)
    deleteTaskFromStore(id).then(() => {
      getTaskListFromStore();
    });
  }


  useEffect(() => {
    getTaskListFromStore();
  }, [])


  if(isLoading) {
    return <Loading />
  }

  return (
    <div className="container flex">
      {/*<h1>Task Management</h1>*/}
      {/*<TaskForm addTask={addTask} />*/}
      <div style={{flexBasis: '70%'}}>
        <TaskList tasks={taskData} updateTaskData={handleUpdateTasks} deleteTask={handleDeleteTask} addTaskData={addTask} />
      </div>
      {/*<div style={{flexBasis: '30%'}}> Analytics</div>*/}
    </div>
  );
}

export default App;