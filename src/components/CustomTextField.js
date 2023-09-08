import React from 'react';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';

function CustomTextField({ label, value, onChange,defaultValue , PlaceHolder}) {
  return (
    <>
      <Typography
        variant="paragraph"
        pl={1}
        pb={1}
        sx={{
          font: 'normal normal normal 17px/26px Roboto',
          fontSize: '12px',
          fontWeight: 'medium',
        }}
        color="#1F1F1F"
      >
        {label}
      </Typography>
      <OutlinedInput
        multiline
        maxRows={6}
        defaultValue={defaultValue}
        value={value}
        placeholder={PlaceHolder}
        onChange={onChange}
        id="input-with-icon-adornment"
        sx={{
          borderRadius: '50px',
          backgroundColor: 'darkgray',
          "& fieldset": { border: 'none' },
          resize: 'none',
          overflow: 'hidden', 
          transition: 'height 0.2s',
          height: 'auto',
        }}
      />
    </>
  );
}

export default CustomTextField;