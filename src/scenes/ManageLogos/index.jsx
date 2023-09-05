import { Box, Autocomplete, Tooltip, Select, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Chip from '@mui/material/Chip';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

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
import { Subscriptions, InsertLink, Autorenew, Notifications, Settings, Person, Add, List, Apps, MoreVert, People, Lock, Search } from '@mui/icons-material';
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
import { Close, Cancel, Delete, Edit, Upload, Visibility } from "@mui/icons-material";
import "./index.css";

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
  const [AnchorElStatus, setAnchorElStatus] = React.useState(null);
  const [Data, setData] = React.useState([]);

  const [isloading, setIsloading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [viewData, setViewData] = useState([]);
  const [opendelmodalStatus, setOpendelmodalStatus] = useState(false);
  const handleOpendelmodalStatus = (row) => {
    setData(row);
    setOpendelmodalStatus(true);
    setAnchorElStatus(null);
  };
  const handleClosedelmodalStatus = () => setOpendelmodalStatus(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [DeleteData, setDeleteData] = useState([]);
  const [idData, setIdData] = useState([]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


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
  const [Screens, setScreens] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const getAllScreens = async () => {
    var InsertAPIURL = `${url}screen/get_all_screen`
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
        if (response.message == `All screens Details`) {
          // setLogos(response.count);
          const newData = {
            createdat: "2023-08-31T13:39:06.520Z",
            id: 0,
            name: "ALL Screens",
            updatedat: "your_updated_value_here",
          };

          // Assuming you have an existing array called response.result
          response.result.unshift(newData);
          setScreens(response.result);
        } else {
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

  const [showtable, setShowtable] = useState(true);

  const changeStatus = async (data) => {

    var InsertAPIURL = `${url}logos/update_logo_status`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    let status;
    if (data.active_status === 'active') {
      status = 'inactive';
    } else {
      status = 'active';
    }
    var Data = {
      "logo_id": data.id,
      "active_status": status
    };
    await fetch(InsertAPIURL, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `Logo Updated Successfully!`) {
          setOpendelmodalStatus(false);
          getAllLogos();
          Swal.fire({
            icon: 'success',
            title: 'Success...',
            confirmButtonColor: "#B5030B",
            text: 'Change Successfully'
          })
          // setOpendelmodal(false);
          //   console.log(response.result);
          //   setCatagory(response.result);
        } else {
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

  const handleChangeScreen = (newValue) => {
    console.log(newValue)
    if (newValue.name === "ALL Screens") {
      getAllLogos();
    } else {
      getAllLogos_ByScreen(newValue)
    }
    setScreen(newValue);

  };



  const handleDelete = async () => {
    var InsertAPIURL = `${url}logos/delete_logo`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      "logo_id": DeleteID,
    };
    await fetch(InsertAPIURL, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `Logo Deleted Successfully!`) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            confirmButtonColor: "#B5030B",
            text: 'Logo Deleted Successfully!',
          })
          getAllLogos();
          setOpendelmodal(false);
          //   console.log(response.result);
          //   setCatagory(response.result);
        } else {
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
      field: 'screen_name', headerName: <span style={{ color: "black", fontWeight: 600 }}>Screen</span>,
      minWidth: 300
    },
    {
      field: 'active_status',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Status</span>,
      minWidth: 150, flex: 2,
      renderCell: (row) => {
        return (
          <>
            {row.row.active_status === 'active' ?
              < Chip label={row.row.active_status}
                color="success" variant="outlined" />
              :
              <Chip label={row.row.active_status}
                color="primary" variant="outlined" />

            }
          </>

        );
      },
    },

    {
      field: 'id',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
      minWidth: 250,
      renderCell: (row) => {
        return (
          <>
            <div>
              <IconButton style={{ cursor: 'pointer' }} onClick={() => {
                handleOpendelmodalStatus(row.row)
                setDeleteData(row.row);
              }}>
                <Tooltip title="Change Status" >
                  <Autorenew sx={{ color: "green" }} />
                </Tooltip>
              </IconButton>

              <IconButton onClick={() => {
                setViewData(row.row); console.log(row.row);
                handleOpenmodal()
              }} >
                <Tooltip title="view" >
                  <Visibility sx={{ color: "#3FC0FF" }} onClick={() => {
                    setViewData(row.row); console.log(row.row);
                    handleOpenmodal()
                  }} />
                </Tooltip>
              </IconButton>

              <IconButton onClick={() => {
                window.open(row.row.link, '_blank');
              }} >
                <Tooltip title="View Link" >
                  <InsertLink sx={{ color: "#40E0D0" }}
                  />
                </Tooltip>
              </IconButton>


              <IconButton onClick={() => {
                console.log(row.row);
                navigate('/UpdateLogo', {
                  state: {
                    id: row.row.id,
                    image: row.row.image,
                    link: row.row.link,
                    status: row.row.active_status,
                    screen: row.row.screen_name,
                    screen_id: row.row.screen_id

                  }
                })
              }
              } >
                <Tooltip title="edit" >
                  <Edit sx={{ color: "#40E0D0" }} onClick={() => {
                    console.log(row.row);
                    navigate('/UpdateLogo', {
                      state: {
                        id: row.row.id,
                        image: row.row.image,
                        link: row.row.link,
                        status: row.row.active_status,
                        screen: row.row.screen_name,
                        screen_id: row.row.screen_id

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
                <Tooltip title="Delete" >
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
  const [Screen, setScreen] = React.useState({
    createdat: "2023-08-31T13:39:06.520Z",
    id: 0,
    name: "ALL Screens",
    updatedat: "your_updated_value_here", 
  });

  const getAllLogos_ByScreen = async (newValue) => {
    var InsertAPIURL = `${url}logos/get_logos_by_screen`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      "screen_id": newValue.id
    }
    console.log(newValue)
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),
    })

      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status === true) {
          // setLogos(response.count);
          setLogos(response.result);
        } else {
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


  const [Logos, setLogos] = useState([]);
  useEffect(() => {
    getAllScreens();
    getAllLogos();
  }, [])

  const getAllLogos = async () => {
    setIsloading(true)
    var InsertAPIURL = `${url}logos/get_all_logos`
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
        if (response.status == true) {
          // setLogos(response.count);
          setIsloading(false)
          console.log(response.result);
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
        <Grid container pt={{ lg: 2, xl: 1 }} >
          <Grid item md={5.3} xs={12} align="left" pt={1}>
            <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ ml: '2%', letterSpacing: "2px" }} color="#404040">
              Manage Logo
            </Typography>
          </Grid>

          <Grid item md={4} xs={12} align="right" pt={0} sx={{ mr: { xs: '3%', md: '0%' }, mb: { xs: '3%', md: '0%' }, height: '22px' }}>

            <Autocomplete
              sx={{ height: '100%' }}
              id="demo-simple-select"
              options={Screens}
              getOptionLabel={(option) => option.name}
              value={Screen} // Set the value to the selectedScreen state
              onChange={(event, newValue) => handleChangeScreen(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={Screen ? Screen.name : ''} // Set the label of the selected option as the placeholder
                />
              )}
            />
          </Grid>

          <Grid sx={{ mt: { md: '0', xs: '10%' } }} item md={2.7} xs={12} align="right">
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

              <button onClick={() => navigate("/AddLogo")} style={{ cursor: 'pointer', marginRight: '3%', padding: "10px", border: "none", borderRadius: "50px", backgroundColor: "#B5030B", color: "white" }}>
                <Stack direction="row" sx={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                  <div>
                    <Stack sx={{ cursor: 'pointer', paddingLeft: "20px" }}>
                      <Add sx={{ cursor: 'pointer', fontWeight: 600, width: "24dpi" }} />
                    </Stack>
                  </div>

                  <div>
                    <Stack sx={{ marginLeft: "2vh", paddingTop: "0.5vh", paddingRight: "25px", fontWeight: "bold" }}>Add</Stack>
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
          <>
            <Grid mb='6%' sx={{ mb: '20px' }} container spacing={0} pt={2} >
              {
                showtable ?
                  <Grid xs={24} p={1} align="center">
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
                        //  checkboxSelection

                        components={
                          <Chip label='active_status' color="success" variant="outlined" />
                        }
                      />
                    </div>
                  </Grid>
                  :
                  <>
                    {Logos.map((item, index) => (
                      <Grid xs={12} md={3} lg={3} align="center" p={1}>
                        <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                          <CardContent>
                            <Grid container spacing={0} >
                              <Grid xs={6} align="left" onClick={() => { setViewData(item); handleOpenmodal(); }}>
                                <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#B5030B">
                                  {item.screen_name}
                                </Typography>
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
                                      navigate('/UpdateLogo', {
                                        state: {
                                          id: idData.id,
                                          image: idData.image,
                                          link: idData.link,
                                          status: idData.active_status,
                                          screen: idData.screen_name,
                                          screen_id: idData.screen_id

                                        }
                                      })
                                    }
                                    }

                                  // onClick={() => updatefood(idData.food_id)}
                                  >
                                    <Edit sx={{ color: "#40E0D0" }} /><span style={{ marginLeft: 10 }}>Update</span>
                                  </MenuItem>
                                  <Grid container spacing={0}>
                                    <Grid xs={12} align="center">
                                      <Divider sx={{ width: "80%" }} />
                                    </Grid>
                                  </Grid>


                                  <MenuItem onClick={() => {
                                    handleOpendelmodalStatus(idData)
                                    setDeleteData(idData);
                                  }}>
                                    <Autorenew sx={{ color: "green" }} /><span style={{ marginLeft: 10 }}>Status Change</span>
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

                              <Grid onClick={() => { setViewData(item); handleOpenmodal(); }} xs={6} sx={{ pb: 1 }} align="left" >
                                <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                  Status :
                                </Typography>
                              </Grid>

                              <Grid onClick={() => { setViewData(item); handleOpenmodal(); }} xs={6} sx={{ pb: 1 }} align="right" >
                                <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                  {item.active_status}
                                </Typography>
                              </Grid>


                              <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={() => { setViewData(item); handleOpenmodal(); }}>
                                <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                  Link :
                                </Typography>
                              </Grid>

                              <Grid sx={{ pb: 1, width: '100%', height: '50px' }} xs={6} align="right" onClick={() => { setViewData(item); handleOpenmodal(); }}>
                                <Button
                                  variant="text"
                                  style={{
                                    width: '100px',
                                    height: '20px',
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#007FFF',
                                    textTransform: 'none',
                                    padding: 0,
                                    lineHeight: 'normal',
                                  }}
                                  onClick={() => {
                                    window.open(item.link, '_blank');
                                  }}
                                >
                                  Open Link
                                </Button>



                              </Grid>



                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}

                  </>
              }
            </Grid>


            <Grid sx={{ mb: '13px' }} container spacing={0} pt={2} pl={2} pr={2} >
            </Grid>
          </>
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
                <Cancel sx={{ marginRight: '10px', marginTop: "10px", color: "white" }} onClick={() => setOpenmodal(false)} />
              </div>
              <Typography align="center" sx={{ mb: '90px', fontWeight: 600, fontSize: "24px" }} color="white">
                {viewData.screen_name}
              </Typography>
            </Box>
            <Grid xs={12} align="center" pt={3}>
              {viewData.image !== null ?
                <img src={`https://staging-gearone-be.mtechub.com/${viewData.image}`} style={{ bgcolor: "#B5030B", width: '175px', height: '175px' }}>
                </img>
                :
                <Avatar sx={{ bgcolor: "#B5030B", width: 75, height: 75 }}>
                </Avatar>
              }
            </Grid>


            <Grid container spacing={0} p={2}>
              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700}
                  fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Link :
                </Typography>
                {/* <Button variant="contained" style={btn} onClick={() => { navigate("/setnewpassword") }}>Reset Password</Button> */}
              </Grid>

              <Grid sx={{ overflow: 'hidden', width: '32px', height: '40px' }} xs={6} align="center">
                <Button
                  variant="text"
                  style={{
                    width: '100px',
                    height: '20px',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: '#007FFF',
                    textTransform: 'none',
                    padding: 0,
                    lineHeight: 'normal',
                  }}
                  onClick={() => {
                    window.open(viewData.link, '_blank');
                  }}
                >
                  Open Link
                </Button>

              </Grid>

              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Status :
                </Typography>
              </Grid>

              <Grid xs={6} align="center" p={0.5}>
                <Typography variant="h5" fontWeight={600} fontSize="16px"
                  sx={{ letterSpacing: "2px" }} color="#808080">
                  {viewData.active_status}
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

                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Logo ?</Typography>  </Grid>
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
        {/* Change */}
        <Modal
          open={opendelmodalStatus}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
            <Grid container spacing={0}>
              <Grid xs={12} align="right">
                <Close onClick={() => setOpendelmodalStatus(false)} />
              </Grid>

              <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>
                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#B5030B">Confirmation</Typography>
                {DeleteData.active_status === 'active' ?
                  <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7}
                    pb={0} fontWeight={600} color="#1F1F1F">{`Do you want to Inactive logo?`}
                  </Typography>
                  :
                  <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7}
                    pb={0} fontWeight={600} color="#1F1F1F">{`Do you want to Active Logo?`}
                  </Typography>

                }
              </Grid>
            </Grid>

            <Grid container spacing={0} pt={7}>
              <Grid xs={6} align="">
                <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodalStatus(false) }}>Cancel</Button>
              </Grid>

              <Grid xs={6} align="right">
                {DeleteData.active_status === 'active' ?
                  <Button variant="contained" style={btn} onClick={() => { changeStatus(DeleteData) }}>Inactive</Button>
                  :
                  <Button variant="contained" style={btn} onClick={() => { changeStatus(DeleteData) }}>Active</Button>
                }
              </Grid>
            </Grid>

          </Box>
        </Modal>


      </Box>

    </>
  );
};

export default Team;


