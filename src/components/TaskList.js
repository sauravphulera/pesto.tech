import React, { useEffect, useRef, useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Button from '@mui/material/Button';
import '../App.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';




const getFilterList = (tasks, statusFilter) =>  {
  return tasks?.filter((task) => {
          if (statusFilter === 'all') {
            return true; // Show all tasks
          }
          if (statusFilter === 'todo') {
            return !(task.status == 'done'); // Show tasks that are not completed
          }
          if (statusFilter === 'in_progress') {
            return task.status === 'in_progress'; // Show tasks that are not completed and marked as in progress
          }
          if (statusFilter === 'done') {
            return task.status == 'done'; // Show completed tasks
          }
          return true; // Default to showing all tasks
        }) || []; 
}

const TaskList = ({ tasks, updateTaskData, deleteTask, addTaskData }) => {

  const [openDialog, setOpenDialog] = React.useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const [filteredTasks, setFilteredTasks] = useState([...tasks] || []);


  //function and vars for drag functionality
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    e.target.style.opacity = 0.5;
    dragItem.current = position;
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    //console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    console.log(e.target);
    e.target.style.opacity = 1;
    const copyListItems = [...filteredTasks];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setFilteredTasks(copyListItems);
  };


  const handleAddTaskData = (title,
		description,
		status) => {

    addTaskData(title, description, status);
    handleCloseDialog();
  }


  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    const copyList = getFilterList(tasks, e.target.value);
    console.log(copyList);
    setFilteredTasks([...copyList]);
  };

 
  const handleTaskChange = (id, status, title) => {
    updateTaskData({id, status, title});
  }

  const handleDeleteTask = (id) => {
    console.log(id);
    deleteTask(id);
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
      setFilteredTasks([...tasks]);
  }, [tasks])

  return (
    <>
        <div className="container">
          <div className='flex align-center mb-20'>
              <div className="mt-4 mb-3 title-text mr-10">Task List</div>
              <div><Button size="small" variant="contained" onClick={handleDialogOpen}>Create New Task</Button></div>
          </div>
          <div className="form-group">
            <label htmlFor="statusFilter">Filter by Status:</label>
            <select
              id="statusFilter"
              className="form-control"
              value={statusFilter}
              onChange={handleStatusChange}
            >
              <option value="all">All</option>
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <ul className="task-list">
            {filteredTasks.map((task,i) => (
              <div key={i}
                   className='list-parent'
                   onDragStart={(e) => dragStart(e, i)} 
                   onDragEnter={(e) => dragEnter(e, i)}
                   onDragEnd={drop}
                   draggable
              >
                <TaskItem task={task} onTaskChange={handleTaskChange} onTaskDelete={handleDeleteTask} />
              </div>
            ))}
          </ul>
        </div>
        <Dialog 
        maxWidth="md"
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>Create New Task</DialogTitle>
          <DialogContent>
            <TaskForm addTask={handleAddTaskData} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button type="submit">Add Task</Button>
          </DialogActions>
        </Dialog>
    </>
  );
};

export default TaskList;