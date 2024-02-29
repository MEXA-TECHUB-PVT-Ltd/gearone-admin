import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar, OutlinedInput, FormControl } from "@mui/material";

import Header from "../../components/Header";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import url from "../url"
import img from '../../components/Images/hairstyleimage.jpg'
import { tokens } from "../../theme";
import workout1 from '../../components/Images/workout1.png'
import workout2 from '../../components/Images/workout2.png'
import workout3 from '../../components/Images/workout3.png'
import workout4 from '../../components/Images/workout4.png'
import workout5 from '../../components/Images/workout5.png'
import workout6 from '../../components/Images/workout6.png'
import workout7 from '../../components/Images/workout7.png'
import workout8 from '../../components/Images/workout8.png'
import { Subscriptions, Notifications, Settings, Person, Add, List, Apps, MoreVert, People, Lock, Search } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Checkbox } from '@mui/material';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { ImageGroup, Image } from "react-fullscreen-image";
import { Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";
// import "./index.css";

const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}

const btncancel = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: '#B5030B',
    backgroundColor: '#ffffff',
    border: '1px solid #B5030B',
    height: '50px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "large",
    textTransform: "capitalize"
}

const btndel = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
    height: '50px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "large",
    textTransform: "capitalize"
}

const btn = {
    letterSpacing: "1px",
    width: '100%',
    marginTop: '20px',
    marginBottom: '10px',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
    height: '50px',
    padding: '0px',
    font: 'normal normal normal 17px/26px Roboto',
    borderRadius: "50px",
    boxShadow: "none",
    fontWeight: "medium",
    boxShadow: "none",
    borderRadius: "50px",
    fontSize: "15px",
    textTransform: "capitalize"
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 300,
    // height: 300,
    bgcolor: '#FFFFFF',
    outline: "none",
    boxShadow: 0,
    p: 4,
    borderRadius: 5
};

const btncreate = {
    width: '100%',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
    height: '50px',
    padding: '0px',
    fontFamily: 'bold',
    fontWeight: "bold"
}

function TabPanel(props) {


    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TabsStyle = {
    color: '#9a9cab',
    fontWeight: '700'

}
const Team = () => {

    const navigate = useNavigate();

    const [isloading, setIsloading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ marginBottom: "5px" }} >
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                {/* <GridToolbarExport /> */}

            </GridToolbarContainer>
        );
    }

    const [opendelmodal, setOpendelmodal] = useState(false);
    const handleOpendelmodal = () => {
        setOpendelmodal(true);
        setAnchorEl(null);
    };
    const handleClosedelmodal = () => setOpendelmodal(false);


    const [openaddmodal, setOpenaddmodal] = useState(false);
    const handleOpenaddmodal = () => {
        setOpenaddmodal(true);
    };
    const handleCloseaddmodal = () => setOpendelmodal(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [showtable, setShowtable] = useState(true);

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: <span style={{ color: "black", fontWeight: 600 }}>Title</span>, flex: 1 },
        { field: 'time', headerName: <span style={{ color: "black", fontWeight: 600 }}>Time</span>, flex: 1 },
        {
            field: 'level',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Level</span>,
            flex: 1,
        },
        {
            field: 'type',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Type</span>,
            flex: 1,
        },
        {
            field: 'totalexercises',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Total Exercises</span>,
            flex: 1,
        },
        {
            field: 'id',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
            flex: 1,
            renderCell: (row) => {
                return (
                    <>
                        <div>
                            <IconButton  >
                                <Tooltip title="view" >
                                    <Visibility sx={{ color: "#3FC0FF" }} onClick={() => navigate("/exercisedetail")} />
                                </Tooltip>
                            </IconButton>

                            <IconButton  >
                                <Tooltip title="edit" >
                                    <Edit sx={{ color: "#40E0D0" }} onClick={() => navigate("/updateexercise")} />
                                </Tooltip>
                            </IconButton>

                            <IconButton >
                                <Tooltip title="Delete">
                                    <Delete sx={{ color: "#E10006" }} onClick={() => handleOpendelmodal()} />
                                </Tooltip>
                            </IconButton>
                        </div>
                    </>
                );
            },
        },
    ];

    const rows = [
        { id: 1, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 35 },
        { id: 2, level: "Advance", type: "Free", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 42 },
        { id: 3, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 45 },
        { id: 4, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 16 },
        { id: 5, level: "Intermediate", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 20 },
        { id: 6, level: "Advance", type: "Free", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 150 },
        { id: 7, level: "Intermediate", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 44 },
        { id: 8, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 36 },
        { id: 9, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 65 },
    ];

    return (
        <>
            <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
                    <Grid item xs={12} align="" pt={2} >
                        <Breadcrumbs separator=">" >
                            <Typography variant="h5" fontWeight={550} pl={2} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
                                Workout Plans
                            </Typography>

                            <Typography variant="h5" fontWeight={550} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
                                Add Workout Plan
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                Add Exercises
                            </Typography>
                        </Breadcrumbs>
                    </Grid>
                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Box pt={2}>
                    <Grid container spacing={0} pl={3} pr={3} >
                        <Grid item xs={6} align="" pt={2} >
                            <Typography variant="pragraph" sx={{ font: "normal normal bold 20px/32px Roboto", letterSpacing: "1px", fontWeight: 600, fontSize: "17px" }} color="#404040">
                                Add Daiy Exercise
                            </Typography>
                        </Grid>

                        <Grid item xs={3} align="center">

                        </Grid>

                        <Grid item xs={1.5} align="center">
                            <div>
                                <Box sx={{ width: { lg: "11vh", xl: "7vh" }, borderRadius: "5px", border: "1px solid #D8D8D8" }}>
                                    <Box >
                                        <div style={{ padding: "5px", paddingBottom: "0px", display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                                            {
                                                showtable ?
                                                    <>
                                                        <Box sx={{ pl: 1 }}>
                                                            <List fontSize="large" sx={{ color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} onClick={() => { setShowtable(true) }} />
                                                        </Box>
                                                        <Box sx={{ pr: 1 }}>
                                                            <Apps fontSize="large" sx={{ color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
                                                        </Box>
                                                    </>
                                                    :
                                                    <>
                                                        <Box sx={{ pl: 1 }}>
                                                            <List fontSize="large" sx={{ color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(true)} />
                                                        </Box>
                                                        <Box sx={{ pr: 1 }}>
                                                            <Apps fontSize="large" sx={{ color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
                                                        </Box>
                                                    </>
                                            }
                                        </div>
                                    </Box>
                                </Box>
                            </div>
                        </Grid>

                        <Grid item xs={1.5} align="center">
                            <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "30px" }}>
                                <div>
                                    <button onClick={() => navigate("/addexercise")} style={{ marginTop: "2%", padding: "10px", display: "flex", justifyContent: "center", alignContent: "center", alignSelf: "center", border: "none", borderRadius: "50px", backgroundColor: "#B5030B", color: "white" }}>
                                        <Stack direction="row" sx={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "3px" }}>
                                            <div>
                                                <Stack sx={{ paddingLeft: "20px" }}>
                                                    <Add sx={{ fontWeight: 600, width: "24dpi" }} />
                                                </Stack>
                                            </div>

                                            <div>
                                                <Stack sx={{ marginLeft: "2vh", paddingTop: "0.5vh", paddingRight: "25px", fontWeight: "bold" }}>Add</Stack>
                                            </div>
                                        </Stack>

                                    </button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>

                <Grid container spacing={0} pt={2}>
                    {
                        showtable ?
                            <Grid xs={12} p={1} align="center">
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        // checkboxSelection
                                        components={{
                                            Checkbox: ({ value }) => (
                                                <Checkbox style={{ color: 'red' }} checked={value} />
                                            ),
                                        }}
                                    />
                                </div>
                            </Grid>
                            :
                            <Grid xs={12} md={4} lg={4} xl={4} p={1} align="center" onClick={handleOpenaddmodal}>
                                <Box sx={{ backgroundColor: "darkgray", width: "95%", borderRadius: "10px" }} >
                                    <Stack sx={{
                                        backgroundImage: `url(${workout1})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover", height: "20vh"
                                    }}>
                                        <Box height="20vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.3)" }}>
                                            <Grid container spacing={0} pt={1}>

                                            </Grid>
                                        </Box>
                                    </Stack>

                                    <Stack mt={1} pb={2} pl={1}  >
                                        <Grid container spacing={0}>
                                            <Grid xs={6}>
                                                <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ fontFamily: "normal normal normal 9px/32px Arial", letterSpacing: "1px" }} color="#B5030B">
                                                    Title Here
                                                </Typography>
                                            </Grid>

                                            <Grid xs={6} align="right" pr={1}>
                                                <div>
                                                    <Box sx={{ width: "fit-content", backgroundColor: "#B5030B", borderRadius: "50px", }}>
                                                        <Typography variant="h5" fontWeight={750} align="" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} p={0.5} pl={2} pr={2} sx={{ fontFamily: "normal normal normal 9px/32px Arial", letterSpacing: "1px" }} color="white">
                                                            Intermediate
                                                        </Typography>
                                                    </Box>
                                                </div>
                                            </Grid>
                                        </Grid>

                                    </Stack>
                                </Box>
                            </Grid>
                    }
                </Grid>

                <Modal
                    open={opendelmodal}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                        <Grid container spacing={0}>
                            <Grid xs={12} align="right">
                                <Close onClick={() => setOpendelmodal(false)} />
                            </Grid>

                            <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#B5030B">Confirmation</Typography>

                                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Exercise ?</Typography>  </Grid>
                        </Grid>

                        <Grid container spacing={0} pt={7}>
                            <Grid xs={6} align="">
                                <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodal(false) }}>Cancel</Button>
                            </Grid>

                            <Grid xs={6} align="right">
                                <Button variant="contained" style={btndel} onClick={() => { setOpendelmodal(false) }}>Delete</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>

                {/* add */}
                <Modal
                    open={openaddmodal}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                        <Grid container spacing={0}>
                            <Grid xs={12} align="right">
                                <Close onClick={() => setOpenaddmodal(false)} />
                            </Grid>

                            <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>
                                <FormControl fullWidth>
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography variant="paragraph" align="left" pl={1} pb={1} sx={{ fontWeight: "medium", fontSize: "12px", letterSpacing: "1px", font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                                            Exercise Title
                                        </Typography>
                                        <OutlinedInput
                                            id="input-with-icon-adornment"
                                            sx={{
                                                padding: "0px",
                                                borderRadius: "50px",
                                                backgroundColor: "darkgray",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />
                                        <Typography variant="paragraph" align="left" pl={1} pb={1} sx={{ fontWeight: "medium", fontSize: "12px", letterSpacing: "1px", font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                                            Time/Reps
                                        </Typography>
                                        <OutlinedInput
                                            id="input-with-icon-adornment"
                                            sx={{
                                                padding: "0px",
                                                borderRadius: "50px",
                                                backgroundColor: "darkgray",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />
                                        <Button variant="contained" style={btn} onClick={() => navigate("/workoutplans")}>Add</Button>

                                    </Stack>

                                </FormControl>
                            </Grid>
                        </Grid>



                    </Box>
                </Modal>

            </Box>
        </>
    );
};

export default Team;
