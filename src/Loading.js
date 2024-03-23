import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
    
    function Loading() {
      return (
		<div className='loader-container'>
			<CircularProgress />
		</div>
      );
    }
    
    export default Loading;