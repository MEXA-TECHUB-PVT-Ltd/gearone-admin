import React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Upload from '@mui/icons-material/Upload';

const CustomImageUpload = ({ handleImageChange }) => {
  return (
    <Grid container spacing={0} pt={5}>
      <input
        style={{ display: "none" }}
        id="fileInput"
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      <Grid xs={12} align="">
        <Stack align="">
          <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
            <Stack direction="column" spacing={1}>
              <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
              <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
            </Stack>
          </label>
          <input
            style={{ width: "300px", height: '400px', display: "none" }}
            id="fileInput"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CustomImageUpload;
