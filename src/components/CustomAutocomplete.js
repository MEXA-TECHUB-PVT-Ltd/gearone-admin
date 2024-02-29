import React from 'react';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CustomAutocomplete = ({ label, options, value, onChange,defaultValue  }) => {
  const placeholderText = value ? '' : 'Please select';

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
          color: '#1F1F1F',
        }}
      >
        {label}
      </Typography>
      <Autocomplete
        sx={{
          borderRadius: '50px',
          backgroundColor: 'darkgray',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none', // Remove the border
          },
        }}
        options={options}
        getOptionLabel={(option) => option.name}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} placeholder={placeholderText}
          defaultvalue={defaultValue} />
        )}
      />
    </>
  );
};

export default CustomAutocomplete;
