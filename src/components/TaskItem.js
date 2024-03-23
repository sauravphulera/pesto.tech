import React, { useState } from 'react';
import '../App.css';
import { statusMap } from '../data/contants';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';

const TaskItem = ({ task, openEditDialog, onTaskDelete }) => {
	const [status, setStatus] = useState(task.status);
	const deleteTask = () => {
		onTaskDelete(task.id);
	}


	return (
	  <li className={`task-item h70`} 
	  	  style={{borderColor : statusMap[task.status]?.color}} 
	  >
		<div className='flex space-btw'>

		  <div className='flex justify-center'>
					<div> 
					  	<div className='card-text' >{task.title}</div>
						<div className='sub-text'>{task.description}</div>
						<div className='task-status-chip' style={{borderColor: statusMap[task.status]?.color, color: statusMap[task.status]?.color}}>{statusMap[task.status]?.displayName}</div>
					</div>
		  </div>

			<div>
				<Tooltip title="Delete this task">
					<IconButton aria-label="delete" onClick={() => deleteTask()} style={{color: '#cf1f1f'}}>
						<DeleteIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title="Edit this task">
					<IconButton aria-label="edit" title="Edit Task" onClick={() => {
							openEditDialog({status, id: task.id, title: task.title, description: task.description});
					}
					} style={{color: '#0b045e'}}>
						<EditIcon />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	  </li>
	);
  };
  
  export default TaskItem;