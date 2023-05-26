import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Chip from '@mui/material/Chip';

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

  const [isloading, setIsloading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [viewData, setViewData] = useState([]);

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
        <GridToolbarExport />

      </GridToolbarContainer>
    );
  }

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


  const changeStatus = async (data) => {
    Swal.fire({
      icon: 'wait',
      title: 'Wait...',
      confirmButtonColor: "#FF6700",
      text: 'please wait...',
    })

    var InsertAPIURL = `${url}ads/update_status`
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
      "adID": data.id,
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
        if (response.message == `ad status Updated Successfully!`) {
          // setLogos(response.count);
          getAllLogos();
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
            text:  "Server Down!"
          })
      });
  }


  const [showtable, setShowtable] = useState(true);


  const handleDelete = async () => {
    var InsertAPIURL = `${url}ads/delete_ad`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      "adID": DeleteID,
    };
    await fetch(InsertAPIURL, {
      method: 'DELETE',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `Ad's Deleted Successfully!`) {
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
            text:  "Server Down!"
          })
      });
  }



  const columns = [
    { field: 'screen_name', headerName: <span style={{ color: "black", fontWeight: 600 }}>Screen</span>, flex: 1 },
    { field: 'link', headerName: <span style={{ color: "black", fontWeight: 600 }}>Link</span>, flex: 1 },
    {
      field: 'active_status',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Status</span>,
      flex: 1,
      renderCell: (row) => {
        return (
          <>
            {row.row.active_status === 'active' ?
              < Chip onClick={() => { changeStatus(row.row) }} sx={{ cursor: 'pointer' }} label={row.row.active_status} color="success" variant="outlined" />
              :
              <Chip onClick={() => { changeStatus(row.row) }} sx={{ cursor: 'pointer' }} label={row.row.active_status} color="primary" variant="outlined" />

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
          <>
            <div>
              <IconButton  >
                <Tooltip title="view" >
                  <Visibility sx={{ color: "#3FC0FF" }} onClick={() => {
                    setViewData(row.row); console.log(row.row);
                    handleOpenmodal()
                  }} />
                </Tooltip>
              </IconButton>

              <IconButton  >
                <Tooltip title="edit" >
                  <Edit sx={{ color: "#40E0D0" }} onClick={() => {
                    console.log(row.row);
                    navigate('/updateexercise', {
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

              <IconButton >
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
    var InsertAPIURL = `${url}ads/get_all_ads`
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
        if (response.message == `Ad's Data`) {
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
            text:  "Server Down!"
          })
      });
  }

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
        <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
          <Grid item xs={6} align="" pt={1} >
            <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
              Banners
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

          <Grid item xs={1.5} align="center">
            <div>
              <Box sx={{ width: { lg: "13vh", xl: "7vh" }, borderRadius: "5px", border: "1px solid #D8D8D8" }}>
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

          <Grid item xs={1.5} align="center">
            <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "30px" }}>
              <div>
                <button onClick={() => navigate("/addexercise")} style={{ marginTop: "2%", padding: "10px", display: "flex", justifyContent: "center", alignContent: "center", alignSelf: "center", border: "none", borderRadius: "50px", backgroundColor: "#FF6700", color: "white" }}>
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

        <Divider sx={{ pb: 2 }} />

        <Grid container spacing={0} pt={2}  >
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
                  <Grid xs={12} md={3} lg={3} align="center" p={1}>
                    <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                      <CardContent>
                        <Grid onClick={() => { setViewData(item); handleOpenmodal(); }} container spacing={0} >
                          <Grid xs={6} align="left" onClick={() => { setViewData(item); handleOpenmodal(); }}>
                            <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#FF6700">
                              {item.screen_name}
                            </Typography>
                          </Grid>

                          <Grid xs={6} align="right">
                            <div>
                              {/* <MoreVert
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} sx={{ color: "#1F1F1F" }} /> */}
                            </div>

                            {/* <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                'aria-labelledby': 'basic-button',
                              }}
                              PaperProps={{

                                sx: {
                                  overflow: 'visible',
                                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.22))',
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
                                    right: 23,
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
                              <MenuItem onClick={() => navigate("/updatedietplan")}>
                                <Edit sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Edit Diet Plan</span>
                              </MenuItem>
                              <MenuItem onClick={() => handleOpendelmodal()}>
                                <Delete sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Delete Diet Plan</span>
                              </MenuItem>
                            </Menu> */}
                          </Grid>

                          <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                              Status :
                            </Typography>
                          </Grid>

                          <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                              {item.active_status}
                            </Typography>
                          </Grid>


                          <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                            <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                              Link :
                            </Typography>
                          </Grid>

                          <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="left" onClick={handleOpenmodal}>
                            <Link style={{ width: '30px', height: '10px' }} variant="h6" fontWeight={300} fontSize="12px" color='#007FFF'>
                              {item.link}
                            </Link>
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
                <Close  sx={{marginRight:'10px', marginTop:"5px", color: "white" }} onClick={() => setOpenmodal(false)} />
              </div>
              <Box xs={12} sx={{ mb: '20px' }} align="center">
                <Typography align="center" sx={{ mb: '20px', fontWeight: 600, fontSize: "24px" }} color="white">
                  {viewData.screen_name}
                </Typography>
              </Box>
            </Box>
            <Grid xs={12} align="center" pt={3}>
              {viewData.image !== null ?
                <img src={`https://staging-gearone-be.mtechub.com/${viewData.image}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                </img>
                :
                <Avatar sx={{ bgcolor: "#FF6700", width: 75, height: 75 }}>
                </Avatar>
              }
            </Grid>


            <Grid container spacing={0} p={2}>
              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Link :
                </Typography>
                {/* <Button variant="contained" style={btn} onClick={() => { navigate("/setnewpassword") }}>Reset Password</Button> */}
              </Grid>

              <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="left" onClick={handleOpenmodal}>
                <a href={viewData.link} sx={{ cursor: 'pointer' }} variant="h6" fontWeight={300} pb={1} fontSize="12px" color='#007FFF'>
                  {viewData.link}
                </a>
              </Grid>

              <Grid xs={6} align="" p={0.5}>
                <Typography variant="h5" fontWeight={700} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                  Status :
                </Typography>
              </Grid>

              <Grid xs={6} align="left" p={0.5}>
                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
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
                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Confirmation</Typography>

                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Ad ?</Typography>  </Grid>
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




// import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";

// import Header from "../../components/Header";
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Link from '@mui/material/Link';
// import HomeIcon from '@mui/icons-material/Home';
// import Swal from 'sweetalert2'
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import url from "../url"
// import img from '../../components/Images/hairstyleimage.jpg'
// import { tokens } from "../../theme";
// import workout1 from '../../components/Images/workout1.png'
// import workout2 from '../../components/Images/workout2.png'
// import workout3 from '../../components/Images/workout3.png'
// import workout4 from '../../components/Images/workout4.png'
// import workout5 from '../../components/Images/workout5.png'
// import workout6 from '../../components/Images/workout6.png'
// import workout7 from '../../components/Images/workout7.png'
// import workout8 from '../../components/Images/workout8.png'
// import { Subscriptions, Notifications, Settings, Person, Add, List, Apps, MoreVert, People, Lock, Search } from '@mui/icons-material';
// import React, { useState, useEffect } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
// import { Checkbox } from '@mui/material';
// import {
//   DataGrid,
//   GridToolbarContainer,
//   GridToolbarColumnsButton,
//   GridToolbarFilterButton,
//   GridToolbarExport,
//   GridToolbarDensitySelector,
// } from '@mui/x-data-grid';
// import { ImageGroup, Image } from "react-fullscreen-image";
// import { Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";
// // import "./index.css";

// const override = {
//   display: ' block',
//   margin: '0 auto',
//   borderColor: 'red',
// }

// const btncancel = {
//   width: '90%',
//   letterSpacing: "2px",
//   marginBottom: '40px',
//   color: '#FF6700',
//   backgroundColor: '#ffffff',
//   border: '1px solid #FF6700',
//   height: '50px',
//   padding: '0px',
//   fontFamily: '',
//   fontWeight: 510,
//   boxShadow: "none",
//   fontSize: "large",
//   textTransform: "capitalize"
// }

// const btn = {
//   width: '90%',
//   letterSpacing: "2px",
//   marginBottom: '40px',
//   color: 'white',
//   backgroundColor: '#FF6700',
//   borderColor: '#FF6700',
//   height: '50px',
//   padding: '0px',
//   fontFamily: '',
//   fontWeight: 510,
//   boxShadow: "none",
//   fontSize: "large",
//   textTransform: "capitalize"
// }

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   // width: 300,
//   // height: 300,
//   bgcolor: '#FFFFFF',
//   outline: "none",
//   boxShadow: 0,
//   p: 4,
//   borderRadius: 5
// };

// const btncreate = {
//   width: '100%',
//   color: 'white',
//   backgroundColor: '#FF6700',
//   borderColor: '#FF6700',
//   height: '50px',
//   padding: '0px',
//   fontFamily: 'bold',
//   fontWeight: "bold"
// }

// function TabPanel(props) {


//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }
// const TabsStyle = {
//   color: '#9a9cab',
//   fontWeight: '700'

// }
// const Team = () => {

//   const navigate = useNavigate();

//   const [isloading, setIsloading] = useState(false);
//   let [loading, setLoading] = useState(true);
//   let [color, setColor] = useState("#ffffff");

//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);

//   function CustomToolbar() {
//     return (
//       <GridToolbarContainer sx={{ marginBottom: "5px" }} >
//         <GridToolbarColumnsButton />
//         <GridToolbarFilterButton />
//         <GridToolbarDensitySelector />
//         {/* <GridToolbarExport /> */}

//       </GridToolbarContainer>
//     );
//   }

//   const [opendelmodal, setOpendelmodal] = useState(false);
//   const handleOpendelmodal = () => {
//     setOpendelmodal(true);
//     setAnchorEl(null);
//   };
//   const handleClosedelmodal = () => setOpendelmodal(false);

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const [showtable, setShowtable] = useState(true);

//   const columns = [
//     // { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'title', headerName: <span style={{ color: "black", fontWeight: 600 }}>Title</span>, flex: 1 },
//     { field: 'time', headerName: <span style={{ color: "black", fontWeight: 600 }}>Time</span>, flex: 1 },
//     {
//       field: 'level',
//       headerName: <span style={{ color: "black", fontWeight: 600 }}>Level</span>,
//       flex: 1,
//     },
//     {
//       field: 'type',
//       headerName: <span style={{ color: "black", fontWeight: 600 }}>Type</span>,
//       flex: 1,
//     },
//     {
//       field: 'totalexercises',
//       headerName: <span style={{ color: "black", fontWeight: 600 }}>Total Exercises</span>,
//       flex: 1,
//     },
//     {
//       field: 'id',
//       headerName: <span style={{ color: "black", fontWeight: 600 }}>Actions</span>,
//       flex: 1,
//       renderCell: (row) => {
//         return (
//           <>
//             <div>
//               <IconButton  >
//                 <Tooltip title="view" >
//                   <Visibility sx={{ color: "#3FC0FF" }} onClick={() => navigate("/exercisedetail")} />
//                 </Tooltip>
//               </IconButton>

//               <IconButton  >
//                 <Tooltip title="edit" >
//                   <Edit sx={{ color: "#40E0D0" }} onClick={() => navigate("/updateexercise")} />
//                 </Tooltip>
//               </IconButton>

//               <IconButton >
//                 <Tooltip title="Delete">
//                   <Delete sx={{ color: "#E10006" }} onClick={() => handleOpendelmodal()} />
//                 </Tooltip>
//               </IconButton>
//             </div>
//           </>
//         );
//       },
//     },
//   ];

//   const rows = [
//     { id: 1, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 35 },
//     { id: 2, level: "Advance", type: "Free", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 42 },
//     { id: 3, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 45 },
//     { id: 4, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 16 },
//     { id: 5, level: "Intermediate", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 20 },
//     { id: 6, level: "Advance", type: "Free", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 150 },
//     { id: 7, level: "Intermediate", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 44 },
//     { id: 8, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 36 },
//     { id: 9, level: "Advance", type: "Paid", title: 'Title Here', time: '2 hrs 30 mins', totalexercises: 65 },
//   ];

//   return (
//     <>
//       <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
//         <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
//           <Grid item xs={6} align="" pt={1} >
//             <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
//               Banner Ads
//             </Typography>
//           </Grid>

//           <Grid item xs={3} align="center">
//             {/* <Stack direction="row" spacing={0}>
//               <div>
//                 <Box sx={{ width: "100%", border: "1px solid lightgray", borderRadius: "50px" }}>
//                   <Stack p={0.5}>
//                     <Grid container spacing={0} >
//                       <Grid xs={2} md={2} lg={2} sx={{ pl: 1 }}>
//                         <Search sx={{ color: "lightgray" }} />
//                       </Grid>

//                       <Grid xs={10} md={10} lg={10} sx={{ pr: 1 }}>
//                         <Typography variant="paragraph" fontWeight={500} fontSize="13px" color="lightgray">
//                           Search Here
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </Stack>
//                 </Box>
//               </div>

//             </Stack> */}
//           </Grid>

//           <Grid item xs={1.5} align="center">
//             <div>
//               <Box sx={{ width: { lg: "11vh", xl: "7vh" }, borderRadius: "5px", border: "1px solid #D8D8D8" }}>
//                 <Box >
//                   <div style={{ padding: "5px", paddingBottom: "0px", display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
//                     {
//                       showtable ?
//                         <>
//                           <Box sx={{ pl: 1 }}>
//                             <List fontSize="large" sx={{ color: "white", backgroundColor: "#FF6700", borderRadius: "5px" }} onClick={() => { setShowtable(true) }} />
//                           </Box>
//                           <Box sx={{ pr: 1 }}>
//                             <Apps fontSize="large" sx={{ color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
//                           </Box>
//                         </>
//                         :
//                         <>
//                           <Box sx={{ pl: 1 }}>
//                             <List fontSize="large" sx={{ color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(true)} />
//                           </Box>
//                           <Box sx={{ pr: 1 }}>
//                             <Apps fontSize="large" sx={{ color: "white", backgroundColor: "#FF6700", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
//                           </Box>
//                         </>
//                     }
//                   </div>
//                 </Box>
//               </Box>
//             </div>
//           </Grid>

//           <Grid item xs={1.5} align="center">
//             <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "30px" }}>
//               <div>
//                 <button onClick={() => navigate("/addexercise")} style={{ marginTop: "2%", padding: "10px", display: "flex", justifyContent: "center", alignContent: "center", alignSelf: "center", border: "none", borderRadius: "50px", backgroundColor: "#FF6700", color: "white" }}>
//                   <Stack direction="row" sx={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "3px" }}>
//                     <div>
//                       <Stack sx={{ paddingLeft: "20px" }}>
//                         <Add sx={{ fontWeight: 600, width: "24dpi" }} />
//                       </Stack>
//                     </div>

//                     <div>
//                       <Stack sx={{ marginLeft: "2vh", paddingTop: "0.5vh", paddingRight: "25px", fontWeight: "bold" }}>Add</Stack>
//                     </div>
//                   </Stack>

//                 </button>
//               </div>
//             </div>
//           </Grid>
//         </Grid>

//         <Divider sx={{ pb: 2 }} />

//         <Grid container spacing={0} pt={2} pl={2} pr={2} >
//           {
//             showtable ?
//               <Grid xs={12} p={1} align="center">
//                 <div style={{ height: 400, width: '100%' }}>
//                   <DataGrid
//                     rows={rows}
//                     columns={columns}
//                     initialState={{
//                       pagination: {
//                         paginationModel: { page: 0, pageSize: 5 },
//                       },
//                     }}
//                     pageSizeOptions={[5, 10]}
//                     // checkboxSelection
//                     components={{
//                       Checkbox: ({ value }) => (
//                         <Checkbox style={{ color: 'red' }} checked={value} />
//                       ),
//                     }}
//                   />
//                 </div>
//               </Grid>
//               :
//               <Grid xs={12} md={4} lg={4} xl={4} p={1} align="center">
//                 <Box sx={{ backgroundColor: "#EEEEEE", width: "95%", borderRadius: "10px" }} >
//                   <Stack sx={{
//                     backgroundImage: `url(${workout1})`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "cover", height: "20vh"
//                   }}>
//                     <Box height="20vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.3)" }}>
//                       <Grid container spacing={0} pt={1}>
//                         <Grid xs={11.9} align="right">
//                           <div>
//                             <MoreVert
//                               id="basic-button"
//                               aria-controls={open ? 'basic-menu' : undefined}
//                               aria-haspopup="true"
//                               aria-expanded={open ? 'true' : undefined}
//                               onClick={handleClick} sx={{ color: "white" }} />
//                           </div>

//                           <Menu
//                             id="basic-menu"
//                             anchorEl={anchorEl}
//                             open={open}
//                             onClose={handleClose}
//                             MenuListProps={{
//                               'aria-labelledby': 'basic-button',
//                             }}
//                             PaperProps={{

//                               sx: {
//                                 overflow: 'visible',
//                                 filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.22))',
//                                 mt: 1.5,
//                                 '& .MuiAvatar-root': {
//                                   width: 32,
//                                   height: 32,
//                                   ml: -0.5,
//                                   mr: 1,
//                                 },
//                                 '&:before': {
//                                   content: '""',
//                                   display: 'block',
//                                   position: 'absolute',
//                                   top: 0,
//                                   right: 23,
//                                   width: 10,
//                                   height: 10,
//                                   bgcolor: 'background.paper',
//                                   transform: 'translateY(-50%) rotate(45deg)',
//                                   zIndex: 0,
//                                 },
//                               },
//                             }}
//                             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//                             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//                           >
//                             <MenuItem onClick={() => navigate("/updateexercise")}>
//                               <Edit sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Edit Exercise</span>
//                             </MenuItem>
//                             <MenuItem onClick={() => handleOpendelmodal()}>
//                               <Delete sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Delete Exercise</span>
//                             </MenuItem>
//                           </Menu>
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   </Stack>

//                   <Stack mt={1} pb={2} pl={1} onClick={() => navigate("/exercisedetail")} >
//                     <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#FF6700">
//                       Title Here
//                     </Typography>
//                   </Stack>
//                 </Box>
//               </Grid>
//           }

//         </Grid>

//         <Modal
//           open={opendelmodal}
//           // onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
//             <Grid container spacing={0}>
//               <Grid xs={12} align="right">
//                 <Close onClick={() => setOpendelmodal(false)} />
//               </Grid>

//               <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>
//                 <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Confirmation</Typography>

//                 <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Exercise ?</Typography>  </Grid>
//             </Grid>

//             <Grid container spacing={0} pt={7}>
//               <Grid xs={6} align="">
//                 <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodal(false) }}>Cancel</Button>
//               </Grid>

//               <Grid xs={6} align="right">
//                 <Button variant="contained" style={btn} onClick={() => { setOpendelmodal(false) }}>Delete</Button>
//               </Grid>
//             </Grid>

//           </Box>
//         </Modal>

//       </Box>
//     </>
//   );
// };

// export default Team;
