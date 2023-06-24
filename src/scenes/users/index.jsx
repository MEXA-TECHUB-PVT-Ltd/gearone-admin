import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Card, CardContent, Modal } from "@mui/material";
import { Subscriptions, Notifications, Settings, Person, Add, Upload, Email, MoreVert, Close } from '@mui/icons-material';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 300,
    // height: 220,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 254,
    p: 2,
    borderRadius: 3
};

const btn = {
    letterSpacing: "3px",
    width: '100%',
    marginTop: '80px',
    // marginBottom: '20px',
    color: 'white',
    backgroundColor: '#006FFF',
    borderColor: '#006FFF',
    height: '45px',
    padding: '0px',
    fontWeight: "bold",
    textTransform: "capitalize"
}