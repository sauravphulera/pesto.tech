import React, { useEffect, useState } from 'react';
import '../App.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TASKSTATUSLIST } from '../data/contants';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const TaskForm = ({ addTask, dialogData, isEditOpen, updateTask }) => {
  const [title, setTitle] = useState(' ');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [statusList, setStatusList] = useState(TASKSTATUSLIST);

  const handleSubmit = (e) => {
    console.log(description)
    if(isEditOpen) {
      updateTask({
        title,
        description,
        status,
        id: dialogData.id,
      })
    } else {
      addTask({
        title: title,
        description: description,
        status: status
        });
    }
  };

  useEffect(() => {
      console.log(dialogData);
      if(dialogData) {
        setTitle(dialogData.title);
        setDescription(dialogData.description);
        setStatus(dialogData.status);
      }
  }, [])

  return (
    <div className='dialog-container '>
      <form className="task-form flex flex-column">
        <div className='mb-20'>
          <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter task title"/>
        </div>
        <div className='mb-20'>
          <TextField
          style={{width: '100%'}}
          id="outlined-multiline-static"
          rows={4}
          multiline
            label="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Task Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Task Status"
            id="demo-simple-select"
            value={status}
            onChange={(e) =>  setStatus(e.target.value)}
          >
            {statusList.map((status, i) => {
              return <MenuItem key={i} value={status.value}>{status.name}</MenuItem>
                    
            })}
          </Select>
        </FormControl>
        {/*<select
          id="statusFilter"
          className="form-control mr-4"
          value={status}
          onChange={(e) =>  setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>*/}
      </form>
      <div className='task-form flex justify-center delete-btn'> 
        <button type="submit" onClick={(e) => handleSubmit()}>
            {isEditOpen ? 'Update Task':'Add Task'}
          </button>
      </div>
    </div>
  );
};

export default TaskForm;





