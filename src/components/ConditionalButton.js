import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ClipLoader from 'react-spinners/ClipLoader'; // You may need to adjust the import based on your project setup
const override = {
  display: ' block',
  margin: '0 auto',
  borderColor: 'red',
}
const ConditionalButton = ({ isloading, handleAdd, bgColor, Title }) => {
  const btn = {
    letterSpacing: "1px",
    width: '50%',
    marginTop: '40pxs',
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
    height: '50px',
    padding: '0px',
    font: 'normal normal normal 17px/26px Roboto',
    borderRadius: "50px",
    boxShadow: "none",
    fontWeight: "medium",
    fontSize: "15px",
    textTransform: "capitalize"
  }
  console.log(Title)
  return (
    <Grid xs={12} align="center">
      {isloading ? (
        <Button disabled variant="contained" style={btn}>
          <ClipLoader
            
            loading={isloading}
            css={override} // Customize the loader styles
            size={10}
          />
        </Button>
      ) : (
        <Button variant="contained" style={btn} onClick={handleAdd}>
          {Title ? Title : "Add"}
        </Button>
      )}
    </Grid>
  );
};

export default ConditionalButton;
