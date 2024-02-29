import { Box, Tooltip, Select, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
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

import { useNavigate, useLocation } from 'react-router-dom';
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
import './index.css'
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

const btn = {
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
    const location = useLocation();

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
    const changeStatus = async (statusChange, order_id) => {
        setIsloading(true);
        var InsertAPIURL = `${url}orders/update_orders_status`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "Order_ID": order_id,
            "status": statusChange
        };
        console.log(JSON.stringify(Data));
        await fetch(InsertAPIURL, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.status == true) {
                    setIsloading(false);
                    CallData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        confirmButtonColor: "#B5030B",
                        text: "Status Change Successfully"
                    })
                } else {
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#B5030B",
                        text: response.message
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#B5030B",
                    text: 'Server Down!'
                })
            });
    }


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
    const [id, setId] = useState([]);

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



    const columns = [
        {
            field: 'username',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Order By</span>,
            minWidth:150,
            renderCell: (row) => {
                return (
                    < Button sx={{ border: 'none', cursor: 'pointer' }}
                        color="success"
                        onClick={() => {
                            navigate('/UserDetails', {
                                state: {
                                    id: row.row.id,
                                }
                            })
                        }
                        }
                        variant="outlined">
                        {row.row.username}
                    </Button>
                );
            },

        },

        {
            field: 'phone',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Phone</span>,
            minWidth:150,
        },
        {
            field: 'ordered_at',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Location</span>,
            minWidth:150 , flex:1,
        },

        {
            field: 'merchandise_name',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Merchandise</span>,
            minWidth:150,
        },

        {
            field: `status`,
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Status</span>,
            minWidth:150,
            renderCell: (row) => {
                return (
                    <>
                        <Select
                            sx={{
                                width: "100%",
                                backgroundColor: "darkgray",
                                "& fieldset": { border: 'none' },
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            displayEmpty
                            defaultValue={row.row.status}
                            onChange={(event) => {
                                setId(row.row.id);
                                changeStatus(event.target.value, row.row.id);
                            }}
                        >
                            <MenuItem value="" disabled>
                                <em>select Status</em>
                            </MenuItem>

                            <MenuItem key='pending' value='pending'>pending</MenuItem>
                            <MenuItem key='in-progress' value='in-progress'>in-progress</MenuItem>
                            <MenuItem key='confirmed' value='confirmed'>confirmed</MenuItem>
                            <MenuItem key='completed' value='completed'>completed</MenuItem>

                        </Select>

                    </>

                );
            },
        },
        {
            field: 'price',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Price</span>,
            minWidth:100,
        },

        {
            field: 'createdat',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Order On</span>,
            minWidth:150,
            renderCell: (row) => {
                return (
                    <>
                        {moment(row.createdat).format("Do-MM-YYYY")}
                    </>

                );
            },
        },

        {
            field: 'id',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
            minWidth:100,
            renderCell: (row) => {
                return (
                    <>

                        <div>
                            <IconButton onClick={() => {
                                navigate('/OrderDetails', {
                                    state: {
                                        id: row.row.id,
                                        row: row.row,
                                    }
                                })
                            }

                            } >
                                <Tooltip title="view" >
                                    <Visibility sx={{ color: "#3FC0FF" }} />
                                </Tooltip>
                            </IconButton>
                        </div>
                    </>

                );
            },
        },
    ];
    const [Logos, setLogos] = useState([]);
    const CallData = () => {
        if (location !== null) {
            if (location.state !== null) {
                if (location.state.id) {
                    getSpecificOrder();
                } else {
                    getAllOrders();
                }
            } else {
                getAllOrders();
            }
        } else {
            getAllOrders();
        }
    }

    useEffect(() => {
        CallData();
    }, [])

    const getSpecificOrder = async () => {
        setIsloading(true)
        var InsertAPIURL = `${url}orders/get_orders_by_marchandise_id`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const Data = {
            merchandise_id: location.state.id
        }
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.status === true) {
                    setIsloading(false)
                    setLogos(response.result);
                } else {
                    setIsloading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        confirmButtonColor: "#B5030B",
                        text: response.message
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    confirmButtonColor: "#B5030B",
                    text: "Server Down!"
                })
            });
    }


    const getAllOrders = async () => {
        setIsloading(true)
        var InsertAPIURL = `${url}orders/get_all_orders`
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
                    setIsloading(false)
                    setLogos(response.result);
                } else {
                    setIsloading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#B5030B",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#B5030B",
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
                            All Orders
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
                                                        <List fontSize="large" sx={{ cursor: 'pointer', color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} onClick={() => { setShowtable(true) }} />
                                                    </Box>
                                                    <Box sx={{ pr: 1 }}>
                                                        <Apps fontSize="large" sx={{ cursor: 'pointer', color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
                                                    </Box>
                                                </>
                                                :
                                                <>
                                                    <Box sx={{ pl: 1 }}>
                                                        <List fontSize="large" sx={{ cursor: 'pointer', color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(true)} />
                                                    </Box>
                                                    <Box sx={{ pr: 1 }}>
                                                        <Apps fontSize="large" sx={{ cursor: 'pointer', color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
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
                {isloading ?
                    <Grid sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: "center",
                        alignItems: 'center',
                        height: "100%", width: "100%"
                        // backgroundColor:'red'

                    }} >
                        <div className="loader">
                        </div>
                    </Grid>

                    :
                    <Grid mb='6%' container spacing={0} pt={2} >
                        {
                            showtable ?
                                <Grid xs={12} p={1} align="center">
                  <div style={{ height: '76vh', width: '100%', overflowX: 'auto', maxWidth: '100%' }}>
                                        <DataGrid
                                            rows={Logos}
                                            getRowId={Logos.id}
                                            id={Logos.id}
                                            columns={columns}
                                            getRowClassName={(params) => {
                                                return 'unblock-row'
                                            }}
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
                                        <Grid sx={{ cursor: 'pointer', mb: '20px' }} xs={12} md={3} lg={3} align="center" p={1}>
                                            <Card
                                                width="100%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                                                <CardContent>
                                                    <Grid container spacing={0} >
                                                        <Grid sx={{ width: '100px', height: '50px' }} xs={12} align="center" onClick={() => { setViewImage(item.images); setViewData(item); handleOpenmodal(); }}>
                                                            <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" color="#B5030B">
                                                                {item.name}
                                                            </Typography>
                                                        </Grid>


                                                        <Grid xs={6} sx={{ pb: 1 }} align="left"
                                                            onClick={() => {
                                                                navigate('/UserDetails', {
                                                                    state: {
                                                                        id: item.id,
                                                                    }
                                                                })
                                                            }
                                                            }>
                                                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                                User Name :
                                                            </Typography>
                                                        </Grid>

                                                        <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="right">
                                                            <Typography
                                                                onClick={() => {
                                                                    navigate('/OrderDetails', {
                                                                        state: {
                                                                            id: item.id,
                                                                            row: item,
                                                                        }
                                                                    })
                                                                }
                                                                }
                                                                variant="h6" fontWeight={600} pb={1} fontSize="16px"
                                                                sx={{ cursor: 'pointer', letterSpacing: "0px" }} color="#808080">
                                                                {item.username}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid onClick={() => {
                                                            navigate('/OrderDetails', {
                                                                state: {
                                                                    id: item.id,
                                                                    row: item,
                                                                }
                                                            })
                                                        }
                                                        } xs={6} sx={{ pb: 1 }} align="left" >
                                                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                                email :
                                                            </Typography>
                                                        </Grid>

                                                        <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="right" >
                                                            <PerfectScrollbar  >

                                                                <Typography variant="h6" fontWeight={300} pb={1} fontSize="12px" sx={{ letterSpacing: "2px" }} color="#808080">
                                                                    {item.email}
                                                                </Typography>
                                                            </PerfectScrollbar  >

                                                        </Grid>


                                                        <Grid xs={6} sx={{ pb: 1 }} align="left" >
                                                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                                status :
                                                            </Typography>
                                                        </Grid>

                                                        <Grid sx={{ pb: 1, mt:'-5%', width: '100px', height: '50px' }} xs={6} align="right" >
                                                            <Select
                                                                sx={{
                                                                    width: "100%",
                                                                    backgroundColor: "darkgray",
                                                                    "& fieldset": { border: 'none' },
                                                                }}
                                                                labelId="demo-simple-select-label"
                                                                id="demo-simple-select"
                                                                displayEmpty
                                                                defaultValue={item.status}
                                                                onChange={(event) => {
                                                                    setId(item.id);
                                                                    changeStatus(event.target.value, item.id);
                                                                }}
                                                            >
                                                                <MenuItem value="" disabled>
                                                                    <em>select Status</em>
                                                                </MenuItem>

                                                                <MenuItem key='pending' value='pending'>pending</MenuItem>
                                                                <MenuItem key='in-progress' value='in-progress'>in-progress</MenuItem>
                                                                <MenuItem key='confirmed' value='confirmed'>confirmed</MenuItem>
                                                                <MenuItem key='completed' value='completed'>completed</MenuItem>

                                                            </Select>
                                                        </Grid>


                                                        <Grid onClick={() => {
                                                            navigate('/OrderDetails', {
                                                                state: {
                                                                    id: item.id,
                                                                    row: item,
                                                                }
                                                            })
                                                        }
                                                        } xs={6} sx={{ pb: 1 }} align="left" >
                                                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                                Location :
                                                            </Typography>
                                                        </Grid>

                                                        <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6}
                                                            align="right" >
                                                            <PerfectScrollbar  >
                                                                <Typography variant="h6" fontWeight={300} pb={1} fontSize="12px" sx={{ letterSpacing: "2px" }} color="#808080">
                                                                    {item.ordered_at}
                                                                </Typography>
                                                            </PerfectScrollbar  >

                                                        </Grid>


                                                        <Grid onClick={() => {
                                                            navigate('/OrderDetails', {
                                                                state: {
                                                                    id: item.id,
                                                                    row: item,
                                                                }
                                                            })
                                                        }
                                                        } xs={6} sx={{ pb: 1 }} align="left" >
                                                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                                                Merchandise
                                                            </Typography>
                                                        </Grid>

                                                        <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6}
                                                            align="right" >
                                                            <PerfectScrollbar  >
                                                                <Typography variant="h6" fontWeight={300} pb={1} fontSize="12px" sx={{ letterSpacing: "2px" }} color="#808080">
                                                                    {item.merchandise_name}
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
                }
                {/* view */}
                <Modal
                    open={openmodal}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 600, xl: 650 }} height="auto" sx={styleview}>
                        <Box sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#B5030B", width: "100%", height: "80px" }}>
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
                                    <Avatar sx={{ bgcolor: "#B5030B", width: 75, height: 75 }}>
                                        <img src={`${url}${viewImage[0]}`} style={{ bgcolor: "#B5030B", width: '175px', height: '175px' }}>
                                        </img>

                                    </Avatar>
                                </Grid>
                                :
                                <Grid xs={12} align="center" pt={3}>
                                    <Avatar sx={{ bgcolor: "#B5030B", width: 75, height: 75 }}>
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
