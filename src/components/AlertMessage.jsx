import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

const AlertMessage = ({open, setOpen, text, type}) => {

  //Codigo para que la alerta se cierre luego de 2 segundos
  React.useEffect(()=>{
    if(open === false) return;

    setTimeout(()=>{
      setOpen(false);
    }, 2000)
  },[open])

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert                    
          sx={{ mb: 2 }}
          severity={type}
        >
          {text}
        </Alert>
      </Collapse>      
    </Box>
  );
}

export default AlertMessage;