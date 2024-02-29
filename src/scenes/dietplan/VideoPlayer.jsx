import React from 'react';
import './VideoPlayer.css'; // You can define styles for your video player
import Grid from '@mui/material/Grid';

const VideoPlayer = ({ path }) => {
    return (
        <Grid sx={{ width: '10%', height: '10%' }}>
            <video autoPlay controls>
                <source src={path} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Grid>);
};

export default VideoPlayer;
