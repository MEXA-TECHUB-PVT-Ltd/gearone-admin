import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Chip from '@mui/material/Chip';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import ReactPlayer from 'react-player'
import VideoPlayer from 'react-video-js-player';
import Header from "../../components/Header";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import moment from 'moment'
import PropTypes from 'prop-types';
import Countdown from "react-countdown";

import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import url from "../url"
import img from '../../components/Images/hairstyleimage.jpg'
import { tokens } from "../../theme";
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

const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}

const btncancel = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: '#FF6700',
    backgroundColor: '#ffffff',
    border: '1px solid #FF6700',
    height: '50px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "large",
    textTransform: "capitalize"
}

const btn = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
    height: '50px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "large",
    textTransform: "capitalize"
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    outline: "none",
    boxShadow: 0,
    p: 4,
    borderRadius: 5
};

const styleview = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    outline: "none",
    boxShadow: 0,
    borderRadius: 5
};

const btncreate = {
    width: '100%',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
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
    const [ImgsWidth, setImgsWidth] = useState(900);
    const [isloading, setIsloading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const [viewData, setViewData] = useState([]);
    const [Timer, setTimer] = useState('');
    const [StartDate, setStartDate] = useState('');

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const Completionist = () => <span>InActive</span>;

    // Renderer callback with condition
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a complete state
            return <Completionist />;
        } else {
            // Render a countdown
            return (
                <span>
                    {days}:{hours}:{minutes}:{seconds}
                </span>
            );
        }
    };


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ marginBottom: "5px" }} >
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                <GridToolbarExport />

            </GridToolbarContainer>
        );
    }
    const [viewImage, setViewImage] = useState([]);

    const [openmodal, setOpenmodal] = useState(false);
    const handleOpenmodal = () => setOpenmodal(true);
    const handleClosemodal = () => setOpenmodal(false);
    const [DeleteID, setDeleteID] = React.useState('');

    const [opendelmodal, setOpendelmodal] = useState(false);
    const handleOpendelmodal = () => {
        setOpendelmodal(true);
        setAnchorEl(null);
    };
    const handleClosedelmodal = () => setOpendelmodal(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [idData, setIdData] = useState([]);
    const [ActionData, setActionData] = React.useState({});

    const [showtable, setShowtable] = useState(true);


    const handleDelete = async () => {
        var InsertAPIURL = `${url}items/delete_items`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "Item_ID": DeleteID,
        };
        await fetch(InsertAPIURL, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == `Item Deleted Successfully!`) {
                    // setLogos(response.count);
                    getAllLogos();
                    setOpendelmodal(false);
                    Swal.fire({
                        icon: 'success',
                        title: 'success...',
                        confirmButtonColor: "#FF6700",
                        text: 'Item Deleted Successfully'
                    })
                    //   console.log(response.result);
                    //   setCatagory(response.result);
                } else {
                    setOpendelmodal(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#FF6700",
                    text: 'Server Down!'
                })
            });
    }



    const columns = [
        {
            field: 'user_name',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Reported By</span>,
            flex: 1,
            renderCell: (row) => {
                return (
                    < Button sx={{ border: 'none', cursor: 'pointer' }}
                        color="success"
                        onClick={() => {
                            navigate('/UserDetails', {
                                state: {
                                    id: row.row.user_id,
                                }
                            })
                        }
                        }
                        variant="outlined">
                        {row.row.user_name}
                    </Button>
                );
            },

        },

        { field: 'email', headerName: <span style={{ color: "black", fontWeight: 600 }}>Email</span>, flex: 1 },
        {
            field: 'name',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Item</span>,
            flex: 1,
        },
        {
            field: 'promoted',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Promoted</span>,
            flex: 1,
            renderCell: (row) => {
                return (
                    <>
                        {row.row.promoted === 'true' ?
                            < Chip sx={{ cursor: 'pointer' }} label={row.row.promoted} color="success" variant="outlined" />
                            :
                            <Chip sx={{ cursor: 'pointer' }} label={row.row.promoted} color="primary" />

                        }
                    </>

                );
            },
        },

        {
            field: 'report_create_by',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Reported On</span>,
            flex: 1,
            renderCell: (row) => {
                return (
                    <>
                        {moment(row.row.report_create_by).format("MMMM Do, YYYY/hh:mm A")}
                    </>

                );
            },
        },

        {
            field: 'description',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Description</span>,
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
                            <IconButton onClick={() => {
                                setViewData(row.row);
                                if (row.row.images.length == 5) {
                                    setImgsWidth(900);
                                } else if (row.row.images.length == 4) {
                                    setImgsWidth(800);
                                } else {
                                    setImgsWidth(550);
                                }

                                setViewImage(row.row.images); console.log(row.row);
                                var myDate = new Date(row.row.end_date);
                                var result = myDate.getTime();
                                console.log(result);
                                setTimer(result)

                                var myDate1 = new Date(row.row.start_date);
                                var result1 = myDate1.getTime();
                                console.log(result1);
                                setStartDate(result1)


                                handleOpenmodal();
                            }} >
                                <Tooltip title="view" >
                                    <Visibility sx={{ color: "#3FC0FF" }} onClick={() => {
                                        setViewData(row.row);
                                        if (row.row.images.length == 5) {
                                            setImgsWidth(900);
                                        } else if (row.row.images.length == 4) {
                                            setImgsWidth(800);
                                        } else {
                                            setImgsWidth(550);
                                        }

                                        setViewImage(row.row.images); console.log(row.row);
                                        var myDate = new Date(row.row.end_date);
                                        var result = myDate.getTime();
                                        console.log(result);
                                        setTimer(result)

                                        var myDate1 = new Date(row.row.start_date);
                                        var result1 = myDate1.getTime();
                                        console.log(result1);
                                        setStartDate(result1)


                                        handleOpenmodal();
                                    }} />
                                </Tooltip>
                            </IconButton>



                        </div>
                    </>

                );
            },
        },
    ];
    const [Logos, setLogos] = useState([]);
    useEffect(() => {
        getAllLogos();
    }, [])

    const getAllLogos = async () => {
        var InsertAPIURL = `${url}report_items/get_all_reports`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.status === true) {
                    setLogos(response.result);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#FF6700",
                    text: "Server Down!"
                })
            });
    }

    return (
        <>
            <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
                    <Grid item xs={6} align="" pt={1} >
                        <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
                            Items
                        </Typography>
                    </Grid>

                    <Grid item xs={3} align="center">

                    </Grid>

                    <Grid item xs={3} align="right">
                        <div>
                            <Box sx={{ width: '90px', borderRadius: "5px", border: "1px solid #D8D8D8" }}>
                                <Box >
                                    <div style={{ padding: "5px", paddingBottom: "0px", display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                                        {
                                            showtable ?
                                                <>
                                                    <Box sx={{ pl: 1 }}>
                                                        <List fontSize="large" sx={{ color: "white", backgroundColor: "#FF6700", borderRadius: "5px" }} onClick={() => { setShowtable(true) }} />
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
                                                        <Apps fontSize="large" sx={{ color: "white", backgroundColor: "#FF6700", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
                                                    </Box>
                                                </>
                                        }
                                    </div>
                                </Box>
                            </Box>
                        </div>
                    </Grid>


                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Grid container spacing={0} pt={2} >
                    {
                        showtable ?
                            <Grid xs={12} p={1} align="center">
                                <div style={{ height: 600, width: '100%' }}>
                                    <DataGrid
                                        rows={Logos}
                                        getRowId={Logos.report_id}
                                        id={Logos.report_id}
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
                                                <Checkbox style={{ color: 'red' }} checked={Logos.id} />
                                            ),
                                        }}
                                    />
                                </div>
                            </Grid>
                            :
                            <>
                                {Logos.map((item, index) => (
                                    <Grid sx={{ mb: '20px' }} xs={12} md={3} lg={3} align="center" p={1}>
                                        <Card width="100%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                                            <CardContent>
                                                <Grid container spacing={0} >
                                                    <Grid sx={{ width: '100px', height: '50px' }} xs={12} align="center" onClick={() => { setViewImage(item.images); setViewData(item); handleOpenmodal(); }}>
                                                        <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" color="#FF6700">
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>


                                                    <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={() => {
                                                        if (item.images.length == 5) {
                                                            setImgsWidth(900);
                                                        } else if (item.images.length == 4) {
                                                            setImgsWidth(800);
                                                        } else {
                                                            setImgsWidth(550);
                                                        } setViewImage(item.images); setViewData(item); handleOpenmodal();
                                                    }}>
                                                        <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                            User Name :
                                                        </Typography>
                                                    </Grid>

                                                    <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="right" onClick={() => {
                                                        setViewImage(item.images); if (item.images.length == 5) {
                                                            setImgsWidth(900);
                                                        } else if (item.images.length == 4) {
                                                            setImgsWidth(800);
                                                        } else {
                                                            setImgsWidth(550);
                                                        } setViewData(item); handleOpenmodal();
                                                    }}>
                                                        <Typography
                                                            onClick={() => {
                                                                navigate('/UserDetails', {
                                                                    state: {
                                                                        id: item.id,
                                                                    }
                                                                })
                                                            }
                                                            }
                                                            variant="h5" fontWeight={600} pb={1} fontSize="16px"
                                                            sx={{ cursor: 'pointer', letterSpacing: "2px" }} color="#808080">
                                                            {item.user_name}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={() => {
                                                        setViewImage(item.images); if (item.images.length == 5) {
                                                            setImgsWidth(900);
                                                        } else if (item.images.length == 4) {
                                                            setImgsWidth(800);
                                                        } else {
                                                            setImgsWidth(550);
                                                        } setViewData(item); handleOpenmodal();
                                                    }}>
                                                        <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                            email :
                                                        </Typography>
                                                    </Grid>

                                                    <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="right" onClick={() => {
                                                        setViewImage(item.images); if (item.images.length == 5) {
                                                            setImgsWidth(900);
                                                        } else if (item.images.length == 4) {
                                                            setImgsWidth(800);
                                                        } else {
                                                            setImgsWidth(550);
                                                        } setViewData(item); handleOpenmodal();
                                                    }}>
                                                        <PerfectScrollbar  >

                                                            <Typography variant="h6" fontWeight={300} pb={1} fontSize="12px" sx={{ letterSpacing: "2px" }} color="#808080">
                                                                {item.email}
                                                            </Typography>
                                                        </PerfectScrollbar  >

                                                    </Grid>

                                                    <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={() => {
                                                        setViewImage(item.images); if (item.images.length == 5) {
                                                            setImgsWidth(900);
                                                        } else if (item.images.length == 4) {
                                                            setImgsWidth(800);
                                                        } else {
                                                            setImgsWidth(550);
                                                        } setViewData(item); handleOpenmodal();
                                                    }}>
                                                        <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                            Reported Date :
                                                        </Typography>
                                                    </Grid>

                                                    <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="right" onClick={() => {
                                                        setViewImage(item.images); if (item.images.length == 5) {
                                                            setImgsWidth(900);
                                                        } else if (item.images.length == 4) {
                                                            setImgsWidth(800);
                                                        } else {
                                                            setImgsWidth(550);
                                                        } setViewData(item); handleOpenmodal();
                                                    }}>
                                                        <PerfectScrollbar  >
                                                            <Typography variant="h6" fontWeight={300} pb={1} fontSize="12px" sx={{ letterSpacing: "2px" }} color="#808080">
                                                                {moment(item.start_date).format("MMMM Do, YYYY/hh:mm A")}
                                                            </Typography>
                                                        </PerfectScrollbar  >

                                                    </Grid>


                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}

                            </>
                    }
                </Grid>

                {/* view */}
                <Modal
                    open={openmodal}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 600, xl: 650 }} height="auto" sx={styleview}>
                        <Box sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#FF6700", width: "100%", height: "80px" }}>
                            <div xs={12} align="right" pt={0.6} pr={3}>
                                <Close sx={{ marginRight: '10px', marginTop: "5px", color: "white" }} onClick={() => setOpenmodal(false)} />
                            </div>
                            <Box xs={12} sx={{ mb: '20px' }} align="center">
                                <Typography align="center" sx={{ mb: '20px', fontWeight: 600, fontSize: "24px" }} color="white">
                                    {viewData.name}
                                </Typography>
                            </Box>
                        </Box>

                        {
                            viewImage.length > 0 ?
                                <Grid xs={12} align="center" pt={3}>
                                    <Avatar sx={{ bgcolor: "#FF6700", width: 75, height: 75 }}>
                                        <img src={`${url}${viewImage[0]}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                                        </img>

                                    </Avatar>
                                </Grid>
                                :
                                <Grid xs={12} align="center" pt={3}>
                                    <Avatar sx={{ bgcolor: "#FF6700", width: 75, height: 75 }}>
                                        <Typography variant="paragraph" sx={{ textTransform: "uppercase", fontSize: "18px", fontWeight: 600 }} p={1} color="white">
                                        </Typography>
                                    </Avatar>
                                </Grid>
                        }


                        <Grid container spacing={0} p={2}>

                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    User Name :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography
                                    onClick={() => {
                                        navigate('/UserDetails', {
                                            state: {
                                                id: viewData.id,
                                            }
                                        })
                                    }
                                    } variant="h5" fontWeight={600} fontSize="16px"
                                    sx={{ cursor: 'pointer', letterSpacing: "2px" }} color="#808080">
                                    {viewData.user_name}
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Email :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    {viewData.email}
                                </Typography>
                            </Grid>




                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Price :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    {viewData.price}
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Location :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    {viewData.location}
                                </Typography>
                            </Grid>


                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Promoted :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    {viewData.promoted}
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Start Date :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    {moment(viewData.start_date).format("MMMM Do, YYYY/hh:mm A")}
                                </Typography>
                            </Grid>


                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    End Date :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">

                                    <Countdown date={Date.now() + (Math.abs(viewData.end_date - Date.now()) / 1000)} />
                                    {/* // (moment(viewData.end_date).format("MMMM Do, YYYY/hh:mm A"))} /> */}
                                    {moment(viewData.end_date).format("MMMM Do, YYYY/hh:mm A")}

                                </Typography>
                            </Grid>


                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Reported Date :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>

                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    {moment(viewData.report_create_by).format("MMMM Do, YYYY/hh:mm A")}

                                </Typography>

                            </Grid>


                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Added By :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    {viewData.added_by}
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="" p={0.5}>
                                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                    Description :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>
                                <Typography variant="h5"
                                    fontWeight={600} fontSize="14px" sx={{ overflowX: 'scroll', height: '100px' }}
                                    color="#808080">
                                    <PerfectScrollbar  >
                                        {viewData.description}
                                    </PerfectScrollbar  >
                                </Typography>
                            </Grid>


                        </Grid>
                    </Box>
                </Modal>


            </Box>
        </>
    );
};

export default Team;
