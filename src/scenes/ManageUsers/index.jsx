import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Chip from '@mui/material/Chip';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Link from '@mui/material/Link';
import Swal from 'sweetalert2'
import url from "../url"

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img from '../../components/Images/hairstyleimage.jpg'
import { tokens } from "../../theme";
import { Settings, Person, Add, List, Apps, MoreVert, People, Lock, Search } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import {
  DataGrid,
} from '@mui/x-data-grid';
import { Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";


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
const Team = () => {

  const navigate = useNavigate();

  const [viewData, setViewData] = useState([]);
  const [DeleteData, setDeleteData] = useState([]);



  const theme = useTheme();

  const [AnchorElStatus, setAnchorElStatus] = React.useState(null);
  const [Data, setData] = React.useState([]);

  const [opendelmodalStatus, setOpendelmodalStatus] = useState(false);
  const handleOpendelmodalStatus = (row) => {
    setData(row);
    setOpendelmodalStatus(true);
    setAnchorElStatus(null);
  };
  const handleClosedelmodalStatus = () => setOpendelmodalStatus(false);


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
  const [idData, setIdData] = useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showtable, setShowtable] = useState(true);

  const changeStatus = async () => {
    var InsertAPIURL = `${url}admin/block_unblock_user`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var DataFinal = {
      "id": Data.id,
    };
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(DataFinal),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `User Updated Successfully!`) {
          handleClose();


          handleClosedelmodalStatus();
          getAllLogos();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            confirmButtonColor: "#FF6700",
            text: 'Status change successfully'
          })

          // setOpendelmodal(false);
          //   console.log(response.result);
          //   setCatagory(response.result);
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
          // setLogos(response.count);
          getAllLogos();
          setOpendelmodal(false);
          //   console.log(response.result);
          //   setCatagory(response.result);
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



  const columns = [
    { field: 'username', headerName: <span style={{ color: "black", fontWeight: 600 }}>Username</span>, flex: 1 },
    {
      field: 'image', headerName: <span style={{ color: "black", fontWeight: 600 }}>Profile</span>,
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            {row.row.image !== null ?
              <Avatar src={`https://staging-gearone-be.mtechub.com/${row.row.image}`} style={{ bgcolor: "#FF6700", width: '45px', height: '45px' }}>
              </Avatar>
              :
              <Avatar sx={{ width: '45px', height: '45px' }}>
              </Avatar>

            }
          </>

        );
      },

    },
    { field: 'email', headerName: <span style={{ color: "black", fontWeight: 600 }}>Email</span>, flex: 1 },

    { field: 'country_code', headerName: <span style={{ color: "black", fontWeight: 600 }}>Code</span>, flex: 1 },
    { field: 'phone', headerName: <span style={{ color: "black", fontWeight: 600 }}>Phone</span>, flex: 1 },
    { field: 'address', headerName: <span style={{ color: "black", fontWeight: 600 }}>Address</span>, flex: 1 },
    {
      field: `status`,
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Status</span>,
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            {row.row.status === 'unblock' ?
              < Chip onClick={() => { handleOpendelmodalStatus(row.row); setDeleteData(row.row); }} sx={{ cursor: 'pointer' }} label={row.row.status} color="success" variant="outlined" />
              :
              row.row.status === null ?
                < Chip onClick={() => { handleOpendelmodalStatus(row.row); setDeleteData(row.row); }} sx={{ cursor: 'pointer' }} label='unblock' color="success" variant="outlined" />
                :
                <Chip onClick={() => { handleOpendelmodalStatus(row.row); setDeleteData(row.row); }} sx={{ cursor: 'pointer' }} label={row.row.status} color="primary" variant="outlined" />

            }
          </>

        );
      },
    },

    {
      field: 'id',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
      flex: 1,
      renderCell: (row) => {
        return (
          <IconButton style={{ cursor: 'pointer' }} onClick={() => {
            navigate('/UserDetails', {
              state: {
                id: row.row.id,
              }
            })
          }}>
            <Tooltip title="view" >
              <Visibility sx={{ color: "#3FC0FF" }} />
            </Tooltip>
          </IconButton>
        );
      },
    },
  ];
  const [Logos, setLogos] = useState([]);
  useEffect(() => {
    getAllLogos();
  }, [])

  const getAllLogos = async () => {
    var InsertAPIURL = `${url}auth/all_users`
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
        if (response.message == `All User Details`) {
          // setLogos(response.count);
          console.log(response.result);
          setLogos(response.result);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: `${response.message}`
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
              Users
            </Typography>
          </Grid>

          <Grid item xs={3} align="center">

          </Grid>

          <Grid item xs={3} align="right">
            <div >
              <Box sx={{ width: '90px', borderRadius: "5px", border: "1px solid #D8D8D8" }}>
                <Box >
                  <div style={{
                    padding: "5px", paddingBottom: "0px",
                    display: "flex", justifyContent: "center", alignContent: "center", gap: "3px"
                  }}>
                    {
                      showtable ?
                        <>
                          <Box sx={{ pl: 1 }}>
                            <List fontSize="large" sx={{ lg: "13vh", xl: "7vh", color: "white", backgroundColor: "#FF6700", borderRadius: "5px" }} onClick={() => { setShowtable(true) }} />
                          </Box>
                          <Box sx={{ pr: 1 }}>
                            <Apps fontSize="large" sx={{ lg: "13vh", xl: "7vh", color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
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

        <Grid sx={{ mb: '15px' }} container spacing={0} pt={2} >
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
                        paginationModel: { page: 0, pageSize: 10 },
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
                          <Grid xs={6} align="center" onClick={() => { setViewData(item); handleOpenmodal(); }}>
                            <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#FF6700">
                              {item.username}
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
                                sx={{ color: "#1F1F1F" }} />
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
                                  navigate('/UserDetails', {
                                    state: {
                                      id: idData.id,
                                    }
                                  })
                                }
                                }

                              // onClick={() => updatefood(idData.food_id)}
                              >
                                <Visibility sx={{ color: "#40E0D0" }} /><span style={{ marginLeft: 10 }}>View</span>
                              </MenuItem>
                              <Grid container spacing={0}>
                                <Grid xs={12} align="center">
                                  <Divider sx={{ width: "80%" }} />
                                </Grid>
                              </Grid>
                              <MenuItem

                                onClick={() => {
                                  handleOpendelmodalStatus(idData); setDeleteData(idData);
                                }}>
                                <AutorenewIcon sx={{ color: "#E10006" }} /><span style={{ marginLeft: 10 }}>Change Status</span>
                              </MenuItem>
                            </Menu>

                          </Grid>

                          <Grid onClick={() => {
                            navigate('/UserDetails', {
                              state: {
                                id: item.id,
                              }
                            })
                          }
                          } xs={6} sx={{ mt: '4%', pb: 1 }} align="left" >
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                              email :
                            </Typography>
                          </Grid>

                          <Grid onClick={() => {
                            navigate('/UserDetails', {
                              state: {
                                id: item.id,
                              }
                            })
                          }
                          } xs={6} sx={{ mt: '4%', pb: 1 }} align="left" >
                            <PerfectScrollbar  >
                              <Typography variant="h6" fontWeight={600} pb={1} fontSize="12px" sx={{ letterSpacing: "1px" }} color="#808080">
                                {item.email}
                              </Typography>
                            </PerfectScrollbar  >
                          </Grid>
                          <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={() => {
                            navigate('/UserDetails', {
                              state: {
                                id: item.id,
                              }
                            })
                          }
                          }>
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                              Type :
                            </Typography>
                          </Grid>

                          <Grid sx={{ pb: 1, width: '100%', height: '50px' }} xs={6} align="left" onClick={() => {
                            navigate('/UserDetails', {
                              state: {
                                id: item.id,
                              }
                            })
                          }
                          } >
                            <PerfectScrollbar  >
                              <Typography variant="h6" fontWeight={600} pb={1} fontSize="12px" sx={{ letterSpacing: "1px" }} color="#808080">
                                {item.type}
                              </Typography>
                            </PerfectScrollbar  >
                          </Grid>

                          <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={() => {
                            navigate('/UserDetails', {
                              state: {
                                id: item.id,
                              }
                            })
                          }
                          } >
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                              status :
                            </Typography>
                          </Grid>

                          <Grid sx={{ cursor: 'pointer', pb: 1, width: '100%', height: '50px' }} xs={6} align="left" onClick={() => { handleOpendelmodalStatus(item); setDeleteData(item); }} >
                            <PerfectScrollbar  >
                              {item.status === 'block'
                                ?
                                <Chip
                                  onClick={() => { handleOpendelmodalStatus(item); setDeleteData(item); }} sx={{ cursor: 'pointer' }}
                                  label={item.status} color="success" variant="outlined" />
                                :
                                <Chip
                                  onClick={() => { handleOpendelmodalStatus(item); setDeleteData(item); }} sx={{ cursor: 'pointer' }}
                                  label={item.status} color='secondary' variant="outlined" />
                              }
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


        <Grid sx={{ mb: '13px' }} container spacing={0} pt={2} pl={2} pr={2} >
        </Grid>

        {/* view */}
        <Modal
          open={openmodal}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box width={{ xs: 400, md: 500, lg: 600, xl: 650 }} height="auto" sx={styleview}>
            <Box sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#FF6700", width: "100%", height: "70px" }}>
              <Box xs={12} align="right" pt={0.1} pr={1}>
                <Close sx={{ color: "white" }} onClick={() => setOpenmodal(false)} />
              </Box>
              <Box xs={12} sx={{ mb: '20px' }} align="center">
                <Typography align="center" sx={{ mb: '20px', fontWeight: 600, fontSize: "24px" }} color="white">
                  {viewData.username}
                </Typography>
              </Box>
            </Box>
            <Grid xs={12} align="center" pt={3}>
              {viewData.image !== null ?
                viewData.image !== undefined ?
                  <img src={`https://staging-gearone-be.mtechub.com/${viewData.image}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                  </img>
                  :
                  <Avatar sx={{ bgcolor: "#FF6700", width: 75, height: 75 }}>
                  </Avatar>
                :
                <Avatar sx={{ bgcolor: "#FF6700", width: 75, height: 75 }}>
                </Avatar>

              }
            </Grid>


            <Grid container spacing={0} p={2}>
              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Email :
                </Typography>
                {/* <Button variant="contained" style={btn} onClick={() => { navigate("/setnewpassword") }}>Reset Password</Button> */}
              </Grid>

              <Grid xs={6} align="right" p={0.5}>
                <a href={viewData.link} sx={{ cursor: 'pointer' }} variant="h6" fontWeight={300} pb={1} fontSize="12px" color='#007FFF'>
                  {viewData.email}
                </a>
              </Grid>

              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Phone :
                </Typography>
              </Grid>

              <Grid xs={6} align="right" p={0.5}>
                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                  {`${viewData.country_code}:${viewData.phone}`}
                </Typography>
              </Grid>

              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Address :
                </Typography>
                {/* <Button variant="contained" style={btn} onClick={() => { navigate("/setnewpassword") }}>Reset Password</Button> */}
              </Grid>

              <Grid xs={6} align="right" p={0.5}>
                <a href={viewData.link} sx={{ cursor: 'pointer' }} variant="h6" fontWeight={300} pb={1} fontSize="12px" color='#007FFF'>
                  {viewData.address}
                </a>
              </Grid>


              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Status :
                </Typography>
                {/* <Button variant="contained" style={btn} onClick={() => { navigate("/setnewpassword") }}>Reset Password</Button> */}
              </Grid>

              <Grid xs={6} align="right" p={0.5}>
                <a href={viewData.link} sx={{ cursor: 'pointer' }} variant="h6" fontWeight={300} pb={1} fontSize="12px" color='#007FFF'>
                  {viewData.status}
                </a>
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
                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Confirmation</Typography>
                {DeleteData.status === 'block' ?
                  <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7}
                    pb={0} fontWeight={600} color="#1F1F1F">{`Do you want to unblock user?`}
                  </Typography>
                  :
                  <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7}
                    pb={0} fontWeight={600} color="#1F1F1F">{`Do you want to block user?`}
                  </Typography>

                }
              </Grid>
            </Grid>

            <Grid container spacing={0} pt={7}>
              <Grid xs={6} align="">
                <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodalStatus(false) }}>Cancel</Button>
              </Grid>

              <Grid xs={6} align="right">
                {DeleteData.status === 'block' ?
                  <Button variant="contained" style={btn} onClick={() => { changeStatus() }}>unblock</Button>
                  :
                  <Button variant="contained" style={btn} onClick={() => { changeStatus() }}>block</Button>
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

                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Diet Plan ?</Typography>  </Grid>
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