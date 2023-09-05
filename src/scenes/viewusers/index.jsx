import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

import Header from "../../components/Header";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PropTypes from 'prop-types';
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
import { Cancel, Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";
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

  const navigate = useNavigate();

  const [isloading, setIsloading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [viewData, setViewData] = useState([]);
  const [value, setValue] = React.useState(0);
  const [overflow, setOverflow] = React.useState('hidden');

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
        <GridToolbarExport />

      </GridToolbarContainer>
    );
  }
  const [viewImage, setViewImage] = useState([]);
  const [idData, setIdData] = useState([]);
  const [ActionData, setActionData] = React.useState({});
  const [ImgsWidth, setImgsWidth] = useState(900);

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

  const [showtable, setShowtable] = useState(true);


  const handleDelete = async () => {
    var InsertAPIURL = `${url}merchandise/delete_merchandise`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      "Merchandise_ID": DeleteID,
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
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            confirmButtonColor: "#B5030B",
            text: 'Merchandise Deleted Successfully!',
          })
          getAllLogos();
          setOpendelmodal(false);
          //   console.log(response.result);
          //   setCatagory(response.result);
        } else {
          setOpendelmodal(false);
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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#B5030B",
          text: "Server Down!"
        })
      });
  }



  const columns = [
    {
      field: 'name',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Merchandise</span>,
      minWidth: 250,
      renderCell: (row) => {
        return (
          < Button sx={{ border: 'none', cursor: 'pointer' }}
            color="success"
            onClick={() => {
              navigate('/Orders', {
                state: {
                  id: row.row.id,
                }
              })
            }
            }
            variant="outlined">
            {row.row.name}
          </Button>
        );
      },

    }, { field: 'price', headerName: <span style={{ color: "black", fontWeight: 600 }}>Price</span>, minWidth: 150 },
    {
      field: 'location',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Location</span>,
      minWidth: 150,
    },
    {
      field: 'catagory_name',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Catagory </span>,
      minWidth: 150,
    },

    {
      field: 'description',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Description</span>,
      minWidth: 250 , flex:1,
    },

    {
      field: 'id',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
      minWidth: 150,
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
                  setImgsWidth(600);
                }
                setViewImage(row.row.images)
                  ; console.log(row.row);
                handleOpenmodal()
              }} >
                <Tooltip title="view" >
                  <Visibility sx={{ color: "#3FC0FF" }} onClick={() => {
                    setViewData(row.row); if (row.row.images.length == 5) {
                      setImgsWidth(900);
                    } else if (row.row.images.length == 4) {
                      setImgsWidth(800);
                    } else {
                      setImgsWidth(600);
                    }
                    setViewImage(row.row.images); console.log(row.row);
                    handleOpenmodal()
                  }} />
                </Tooltip>
              </IconButton>

              <IconButton onClick={() => {
                console.log(row.row);
                navigate('/EditMerchandise', {
                  state: {
                    id: row.row.id,
                    images: row.row.images,
                    name: row.row.name,
                    row: row.row,
                    category_id: row.row.category_id,
                    catagory_name: row.row.catagory_name,
                    price: row.row.price,
                    description: row.row.description,
                    location: row.row.location
                  },
                })
              }
              }>
                <Tooltip title="edit" >
                  <Edit sx={{ color: "#40E0D0" }} onClick={() => {
                    console.log(row.row);
                    navigate('/EditMerchandise', {
                      state: {
                        id: row.row.id,
                        images: row.row.images,
                        name: row.row.name,
                        row: row.row,
                        category_id: row.row.category_id,
                        catagory_name: row.row.catagory_name,
                        price: row.row.price,
                        description: row.row.description,
                        location: row.row.location
                      },
                    })
                  }
                  }
                  />
                </Tooltip>
              </IconButton>

              <IconButton onClick={() => {
                setDeleteID(row.row.id);
                handleOpendelmodal();
              }}>
                <Tooltip title="Delete">
                  <Delete sx={{ color: "#E10006" }} onClick={() => {
                    setDeleteID(row.row.id);
                    handleOpendelmodal();
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
    setIsloading(true)
    var InsertAPIURL = `${url}merchandise/get_all_merchandise`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status === true) {
          // setLogos(response.count);
          setIsloading(false)
          console.log(response.result);
          setLogos(response.result);
        } else {
          setIsloading(false)
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            confirmButtonColor: "#B5030B",
            text: response.message,
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
        <Grid container pt={{ lg: 2, xl: 1 }} >
          <Grid item md={6} xs={12} align="left" pt={1}>
            <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ ml: '2%', letterSpacing: "2px" }} color="#404040">
              Merchandise
            </Typography>
          </Grid>

          <Grid item md={6} xs={12} align="right">
            <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', gap: '10px', width: '100%' }}>
              <div style={{ width: '100px', borderRadius: "5px", border: "1px solid #D8D8D8", padding: "5px", paddingBottom: "0px", display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                {
                  showtable ?
                    <>
                      <Box onClick={() => { setShowtable(true) }}>
                        <List fontSize="large" sx={{ cursor: 'pointer', color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} />
                      </Box>
                      <Box onClick={() => setShowtable(false)}>
                        <Apps fontSize="large" sx={{ cursor: 'pointer', color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} />
                      </Box>
                    </>
                    :
                    <>
                      <Box onClick={() => setShowtable(true)}>
                        <List fontSize="large" sx={{ cursor: 'pointer', color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} />
                      </Box>
                      <Box onClick={() => setShowtable(false)}>
                        <Apps fontSize="large" sx={{ cursor: 'pointer', color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} />
                      </Box>
                    </>
                }
              </div>

              <button onClick={() => navigate("/AddMerchandise")} style={{ marginRight: '3%', padding: "10px", border: "none", borderRadius: "50px", backgroundColor: "#B5030B", color: "white" }}>
                <Stack direction="row" sx={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                  <div>
                    <Stack sx={{ paddingLeft: "20px" }}>
                      <Add sx={{ cursor: 'pointer', fontWeight: 600, width: "24dpi" }} />
                    </Stack>
                  </div>

                  <div>
                    <Stack sx={{ cursor: 'pointer', marginLeft: "2vh", paddingTop: "0.5vh", paddingRight: "25px", fontWeight: "bold" }}>Add</Stack>
                  </div>
                </Stack>
              </button>
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
          <Grid mb='6%' container spacing={0} pt={2}  >
            {
              showtable ?
                <Grid xs={12} p={1} align="center">
                                    <div style={{ height: '76vh', width: '100%', overflowX: 'auto', maxWidth: '100%' }}>
                    <DataGrid
                      rows={Logos}
                      getRowId={Logos.id}
                      id={Logos.id}
                      getRowClassName={(params) => {
                        return 'unblock-row'
                      }}
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
                      <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                        <CardContent>
                          <Grid container spacing={0} >
                            <Grid sx={{ width: '100px', height: '50px' }} xs={6} align="left" onClick={() => {
                              if (item.images.length == 5) {
                                setImgsWidth(900);
                              } else if (item.images.length == 4) {
                                setImgsWidth(800);
                              } else {
                                setImgsWidth(550);
                              }
                              setViewImage(item.images); setViewData(item); handleOpenmodal();
                            }}>
                              <PerfectScrollbar>

                                <Typography  onClick={() => {
                                  navigate('/Orders', {
                                    state: {
                                      id: item.id,
                                    }
                                  })
                                }
                                } maxHeight='50px' variant="h5" pb={1} fontWeight={750} fontSize="16px"
                                 sx={{cursor:'pointer', letterSpacing: "2px" }} color="#B5030B">
                                  {item.name}
                                </Typography>
                              </PerfectScrollbar>

                            </Grid>

                            <Grid xs={6} align="right">
                              <div>
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
                                  sx={{ cursor: 'pointer', color: "#1F1F1F" }} />
                              </div>
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
                                    position: 'fixed',
                                    top: '-9999px',
                                    left: '-9999px',
                                    elevation: 0,   
                                    // overflow: 'visible',
                                    // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.22))',
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
                                    console.log(idData);
                                    setActionData(idData);
                                    // if (idData.image !== null) {
                                    //   setHidelabelUpload(true);
                                    // }
                                    navigate('/EditMerchandise', {
                                      state: {
                                        id: idData.id,
                                        images: idData.images,
                                        name: idData.pushname,
                                        row: idData,
                                        category_id: idData.category_id,
                                        catagory_name: idData.catagory_name,
                                        price: idData.price,
                                        description: idData.description,
                                        location: idData.location

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

                            <Grid xs={6} sx={{ pb: 1, width: '100px', height: '50px' }} align="left" onClick={() => {
                              if (item.images.length == 5) {
                                setImgsWidth(900);
                              } else if (item.images.length == 4) {
                                setImgsWidth(800);
                              } else {
                                setImgsWidth(550);
                              }
                              setViewImage(item.images); setViewData(item); handleOpenmodal();
                            }}>
                              <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{}} color="#1F1F1F">
                                Price :
                              </Typography>
                            </Grid>

                            <Grid xs={6} sx={{ pb: 1, width: '100px', height: '50px' }} align="right" onClick={() => {
                              if (item.images.length == 5) {
                                setImgsWidth(900);
                              } else if (item.images.length == 4) {
                                setImgsWidth(800);
                              } else {
                                setImgsWidth(550);
                              }
                              setViewImage(item.images); setViewData(item); handleOpenmodal();
                            }}>
                              <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                {item.price}
                              </Typography>
                            </Grid>

                            <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={() => {
                              if (item.images.length == 5) {
                                setImgsWidth(900);
                              } else if (item.images.length == 4) {
                                setImgsWidth(800);
                              } else {
                                setImgsWidth(550);
                              }
                              setViewImage(item.images); setViewData(item); handleOpenmodal();
                            }}>
                              <Typography variant="h5" fontWeight={550} pb={1} fontSize="16px" color="#1F1F1F">
                                category :
                              </Typography>
                            </Grid>

                            <Grid xs={6} sx={{ pb: 1, width: '100px', height: '50px' }} align="right" onClick={() => {
                              if (item.images.length == 5) {
                                setImgsWidth(900);
                              } else if (item.images.length == 4) {
                                setImgsWidth(800);
                              } else {
                                setImgsWidth(550);
                              }
                              setViewImage(item.images); setViewData(item); handleOpenmodal();
                            }}>
                              <Typography variant="h5" fontWeight={550} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                {item.catagory_name}
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
                <Cancel sx={{ marginRight: '10px', marginTop: "5px", color: "white" }} onClick={() => setOpenmodal(false)} />
              </div>
              <Box xs={12} sx={{ mb: '20px' }} align="center">
                <Typography align="center" sx={{ mb: '20px', fontWeight: 600, fontSize: "24px" }} color="white">
                  {viewData.name}
                </Typography>
              </Box>
            </Box>

            {
              viewImage.length > 0 ?
                <PerfectScrollbar position="flex" >
                  <Grid container sx={{ width: `${ImgsWidth}px`, mt: '10px', ml: '10px', mr: '10px', maxHeight: '200px' }}>
                    {viewImage.length > 0 &&
                      <ImageListItem key={viewImage.name}>
                        <img alt="" src={`${url}${viewImage[0]}`} style={{ bgcolor: "#B5030B", width: '175px', height: 'auto' }}>
                        </img>
                      </ImageListItem>
                    }
                    {viewImage.length > 1 &&
                      <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                        <img alt="" src={`${url}${viewImage[1]}`} style={{ bgcolor: "#B5030B", width: '175px', height: 'auto' }}>
                        </img>
                      </ImageListItem>
                    }
                    {viewImage.length > 2 &&
                      <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                        <img alt="" src={`${url}${viewImage[2]}`} style={{ bgcolor: "#B5030B", width: '175px', height: 'auto' }}>
                        </img>
                      </ImageListItem>

                    }
                    {viewImage.length > 3 &&
                      <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                        <img alt="" src={`${url}${viewImage[3]}`} style={{ bgcolor: "#B5030B", width: '175px', height: 'auto' }}>
                        </img>
                      </ImageListItem>
                    }
                    {viewImage.length > 4 &&
                      <ImageListItem sx={{ ml: '2px' }} key={viewImage.name}>
                        <img alt="" src={`${url}${viewImage[4]}`} style={{ bgcolor: "#B5030B", width: '200px', height: 'auto' }}>
                        </img>
                      </ImageListItem>
                    }
                  </Grid>
                </PerfectScrollbar>
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
                  location :
                </Typography>
              </Grid>

              <Grid xs={6} align="right" p={0.5}>
                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                  {viewData.location}
                </Typography>
              </Grid>

              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Category :
                </Typography>
              </Grid>

              <Grid xs={6} align="right" p={0.5}>
                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                  {viewData.catagory_name}
                </Typography>
              </Grid>

              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Description :
                </Typography>
              </Grid>


              <Grid xs={6} align="right" p={0.5}>
                <Typography variant="h5"
                  fontWeight={600} fontSize="14px" sx={{ height: '100px' }}
                  color="#808080">
                  <PerfectScrollbar>
                    {viewData.description}
                  </PerfectScrollbar>

                </Typography>
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
                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#B5030B">Confirmation</Typography>

                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Merchandise ?</Typography>  </Grid>
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
