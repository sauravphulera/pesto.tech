import React, { useState } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { statusMap } from '../data/contants';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TaskItem = ({ task, onTaskChange, onTaskDelete }) => {
	const [isEditing, setEditing] = useState(false);

	const [status, setStatus] = useState(task.status);


	const handleStatusChange = (status) => {
		setStatus(status);
	}
	const deleteTask = () => {
		onTaskDelete(task.id);
	}

  
	return (
	  <li className={`task-item ${task.status === 'done' ? 'completed' : ''} h70`} 
	  	  style={{borderColor : statusMap[task.status]}} 
	  >
		<div className='flex space-btw'>

		  <div className='flex justify-center'>
				<div>
					{/*<input
						type="checkbox"
						checked={task.status == 'done'}
						onChange={() => {onTaskChange(task.id,'done', task.title)}}
					/>*/}
				</div>
				{ isEditing ? (
					<>
					<input
						type="text"
						value={task.title}
						onChange={(e) => {task.title = e.target.value;onTaskChange(task.id,task.status, task.title)}}
						onBlur={() => setEditing(false)}
					/>
						<select
							id="statusFilter"
							className="form-control"
							value={status}
							onChange={(e) => handleStatusChange(e.target.value)}
							>
								<option value="all">All</option>
								<option value="todo">To Do</option>
								<option value="in_progress">In Progress</option>
								<option value="done">Done</option>
						</select>
				  </>
				) : (
					<div> 
					  <div className='card-text' >{task.title}</div>
					   <div className='sub-text'>{task.description}</div>
					</div>
				)}
		  </div>


			<div>
				<IconButton aria-label="delete" onClick={() => deleteTask()} style={{color: '#cf1f1f'}}>
					<DeleteIcon />
				</IconButton>
				<IconButton aria-label="delete" onClick={() => {
					setEditing(!isEditing); 
					if(isEditing == true) {
						onTaskChange(task.id, status, task.title);
					}
				}
				} style={{color: '#0b045e'}}>
					{isEditing ? <>Save</> : <EditIcon />}
				</IconButton>
			</div>
		</div>
	  </li>
	);
  };
  
  export default TaskItem;