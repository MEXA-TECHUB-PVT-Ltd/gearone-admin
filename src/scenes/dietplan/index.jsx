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
        { field: 'name', headerName: <span style={{ color: "black", fontWeight: 600 }}>Name</span>, flex: 1 },
        { field: 'price', headerName: <span style={{ color: "black", fontWeight: 600 }}>Price</span>, flex: 1 },
        {
            field: 'location',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Location</span>,
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
            field: 'added_by',
            headerName: <span style={{ color: "black", fontWeight: 600 }}>Added_by</span>,
            flex: 1,
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


                            {/* {row.row.added_by === 'admin' ?
                                <>
                                    <IconButton onClick={() => {
                                        console.log(row.row);
                                        navigate('/updatedietplan', {
                                            state: {
                                                id: row.row.id,
                                                images: row.row.images,
                                                name: row.row.name,
                                                price: row.row.price,
                                                category_id: row.row.category_id,

                                                description: row.row.description,
                                                locations: row.row.location,
                                                promoted: row.row.promoted,
                                                start_date: row.row.start_date,
                                                end_date: row.row.end_date,
                                                added_by: row.row.added_by,


                                            }
                                        })
                                    }
                                    }>
                                        < Tooltip title="edit" >
                                            <Edit sx={{ color: "#40E0D0" }} onClick={() => {
                                                console.log(row.row);
                                                navigate('/updatedietplan', {
                                                    state: {
                                                        id: row.row.id,
                                                        images: row.row.images,
                                                        name: row.row.name,
                                                        price: row.row.price,
                                                        category_id: row.row.category_id,

                                                        description: row.row.description,
                                                        locations: row.row.location,
                                                        promoted: row.row.promoted,
                                                        start_date: row.row.start_date,
                                                        end_date: row.row.end_date,
                                                        added_by: row.row.added_by,


                                                    }
                                                })
                                            }
                                            }
                                            />
                                        </Tooltip>
                                    </IconButton>

                                    <IconButton onClick={() => {
                                        setDeleteID(row.row.id);
                                        handleOpendelmodal();
                                    }} >
                                        <Tooltip title="Delete">
                                            <Delete sx={{ color: "#E10006" }} onClick={() => {
                                                setDeleteID(row.row.id);
                                                handleOpendelmodal();
                                            }} />
                                        </Tooltip>
                                    </IconButton>
                                </>
                                :
                                <>
                                    <IconButton disabled  >
                                        <Edit disabled />
                                    </IconButton>
                                    <IconButton disabled >
                                        <Delete disabled />
                                    </IconButton>
                                </>

                            }
 */}
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
        var InsertAPIURL = `${url}items/get_all_items_admin`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        // var Data = {
        //     "page": '1'        };

        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            // body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == `User's items data`) {
                    // setLogos(response.count);
                    console.log(response.result);
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
                        {/* <Stack direction="row" spacing={0}>
              <div>
                <Box sx={{ width: "100%", border: "1px solid lightgray", borderRadius: "50px" }}>
                  <Stack p={0.5}>
                    <Grid container spacing={0} >
                      <Grid xs={2} md={2} lg={2} sx={{ pl: 1 }}>
                        <Search sx={{ color: "lightgray" }} />
                      </Grid>

                      <Grid xs={10} md={10} lg={10} sx={{ pr: 1 }}>
                        <Typography variant="paragraph" fontWeight={500} fontSize="13px" color="lightgray">
                          Search Here
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </div>

            </Stack> */}
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

                    {/* <Grid item xs={1.5} align="center">
                        <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "30px" }}>
                            <div>
                                <button onClick={() => navigate("/addfood")} style={{ marginTop: "2%", padding: "10px", display: "flex", justifyContent: "center", alignContent: "center", alignSelf: "center", border: "none", borderRadius: "50px", backgroundColor: "#FF6700", color: "white" }}>
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
                    </Grid> */}
                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Grid container spacing={0} pt={2} >
                    {
                        showtable ?
                            <Grid xs={12} p={1} align="center">
                                <div style={{ height: 600, width: '100%' }}>
                                    <DataGrid
                                        rows={Logos}
                                        getRowId={Logos.id}
                                        id={Logos.id}
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
                                                    <Grid sx={{ width: '100px', height: '50px' }} xs={6} align="left" onClick={() => { setViewImage(item.images); setViewData(item); handleOpenmodal(); }}>
                                                        <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" color="#FF6700">
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>


                                                    <Grid xs={6} align="right">
                                                        {/* <div>
                                                            <MoreVert
                                                                id="basic-button"
                                                                aria-controls={open ? 'basic-menu' : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={open ? 'true' : undefined}
                                                                // onClick={handleClick} 
                                                                onClick={(event) => {
                                                                    setIdData(item)
                                                                    setAnchorEl(event.currentTarget)
                                                                }}
                                                            />
                                                        </div> */}
                                                        <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                            PaperProps={{

                                                                sx: {
                                                                    mt: 1.5,
                                                                    '& .MuiAvatar-root': {
                                                                        width: 32,
                                                                        height: 32,
                                                                        ml: -0.5,
                                                                        mr: 1,
                                                                    },
                                                                    '&:before': {
                                                                        content: '""',
                                                                        display: 'block',
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        right: 5,
                                                                        width: 10,
                                                                        height: 10,
                                                                        bgcolor: 'background.paper',
                                                                        transform: 'translateY(-50%) rotate(45deg)',
                                                                        zIndex: 0,
                                                                    },
                                                                },
                                                            }}
                                                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                        >
                                                            <MenuItem
                                                                onClick={() => {
                                                                    setActionData(idData);
                                                                    // if (idData.image !== null) {
                                                                    //   setHidelabelUpload(true);
                                                                    // }
                                                                    navigate('/updatedietplan', {
                                                                        state: {
                                                                            id: idData.id,
                                                                            images: idData.images,
                                                                            name: idData.name,
                                                                            price: idData.price,
                                                                            category_id: idData.category_id,

                                                                            description: idData.description,
                                                                            locations: idData.location,
                                                                            promoted: idData.promoted,
                                                                            start_date: idData.start_date,
                                                                            end_date: idData.end_date,
                                                                            added_by: idData.added_by,

                                                                        }
                                                                    })

                                                                }
                                                                }
                                                            >
                                                                <Edit sx={{ color: "#40E0D0" }} /><span style={{ marginLeft: 10 }}>Update</span>
                                                            </MenuItem>
                                                            <Grid container spacing={0}>
                                                                <Grid xs={12} align="center">
                                                                    <Divider sx={{ width: "80%" }} />
                                                                </Grid>
                                                            </Grid>
                                                            <MenuItem onClick={() => {
                                                                setDeleteID(idData.id);
                                                                handleOpendelmodal();
                                                            }}>
                                                                <Delete sx={{ color: "#E10006" }} /><span style={{ marginLeft: 10 }}>Delete</span>
                                                            </MenuItem>
                                                        </Menu>

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
                                                            Price :
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
                                                        <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                                            {item.price}
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
                                                            Location :
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
                                                        <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                                            {item.location}
                                                        </Typography>
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
                                // <ImageList
                                //   align="center" sx={{
                                //     ml: '20px', mr: "20px",
                                //     width: 'auto', height: "200px"
                                //   }}
                                //   cols={5} rowHeight={"200px"}>
                                <PerfectScrollbar position="flex" >
                                    <Grid container sx={{ width: `${ImgsWidth}px`, mt: '10px', ml: '10px', mr: '10px', height: '200px' }}>
                                        {viewImage.length > 0 &&
                                            <ImageListItem key={viewImage.name}>
                                                <img src={`${url}${viewImage[0]}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                                                </img>
                                            </ImageListItem>
                                        }
                                        {viewImage.length > 1 &&
                                            <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                                                <img src={`${url}${viewImage[1]}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                                                </img>
                                            </ImageListItem>
                                        }
                                        {viewImage.length > 2 &&
                                            <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                                                <img src={`${url}${viewImage[2]}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                                                </img>
                                            </ImageListItem>

                                        }
                                        {viewImage.length > 3 &&
                                            <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                                                <img src={`${url}${viewImage[3]}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                                                </img>
                                            </ImageListItem>
                                        }
                                        {viewImage.length > 4 &&
                                            <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                                                <img src={`${url}${viewImage[4]}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                                                </img>
                                            </ImageListItem>
                                        }
                                    </Grid>
                                </PerfectScrollbar>
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
                                    Price :
                                </Typography>
                                {/* <Button variant="contained" style={btn} onClick={() => { navigate("/setnewpassword") }}>Reset Password</Button> */}
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
                                    Remaining Time :
                                </Typography>
                            </Grid>

                            <Grid xs={6} align="right" p={0.5}>

                                {/* {StartDate ==  '0' ? <>Not Yet</> */}
                                {/* : */}
                                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                    <Countdown date={Timer} renderer={renderer} />
                                </Typography>
                                {/* 
                                } */}

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

                            <Grid xs={12} align="center" pt={0}>
                                {viewData.video_link !== null ?
                            //       <VideoPlayer
                            //       src={`http://localhost:3006/${viewData.video_link}`}
                            //       width="720"
                            //       height="420"
                            //   />
                                    <iframe src={`${url}${viewData.video_link}`}
                                     style={{maxHeight:'200px', maxWidth:'400px', bgcolor: "#FF6700", width: '400px', height: '200px' }}>
                                    </iframe>
                                    :
                                    <div>No video here</div>
                                }
                            </Grid>


                        </Grid>
                    </Box>
                </Modal>

                {/* del */}
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
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Confirmation</Typography>

                                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Item ?</Typography>  </Grid>
                        </Grid>

                        <Grid container spacing={0} pt={7}>
                            <Grid xs={6} align="">
                                <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodal(false) }}>Cancel</Button>
                            </Grid>

                            <Grid xs={6} align="right">
                                <Button variant="contained" style={btn} onClick={() => { handleDelete() }}>Delete</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>

            </Box>
        </>
    );
};

export default Team;
