import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";

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
          // setLogos(response.count);
          getAllLogos();
          setOpendelmodal(false);
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
        alert(error);
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
      field: 'catagory_name',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Catagory </span>,
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
              <IconButton  >
                <Tooltip title="view" >
                  <Visibility sx={{ color: "#3FC0FF" }} onClick={() => {
                    setViewData(row.row); setViewImage(row.row.images[0]); console.log(row.row);
                    handleOpenmodal()
                  }} />
                </Tooltip>
              </IconButton>

              <IconButton  >
                <Tooltip title="edit" >
                  <Edit sx={{ color: "#40E0D0" }} onClick={() => {
                    console.log(row.row);
                    navigate('/EditMerchandise', {
                      state: {
                        id: row.row.id,
                        images: row.row.images,
                        name: row.row.name,
                        row: row.row,
                        category_id:row.row.category_id,
                        catagory_name: row.row.catagory_name,
                        price: row.row.price,
                        description: row.row.description,
                        location:row.row.location
                      },
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
        if (response.message == `All Merchandise list`) {
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
        alert(error);
      });
  }

  return (
    <>
      <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
        <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
          <Grid item xs={6} align="" pt={1} >
            <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
              Merchandise
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
              <Box sx={{ width: { lg: "11vh", xl: "7vh" }, borderRadius: "5px", border: "1px solid #D8D8D8" }}>
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
                <button onClick={() => navigate("/AddMerchandise")} style={{ marginTop: "2%", padding: "10px", display: "flex", justifyContent: "center", alignContent: "center", alignSelf: "center", border: "none", borderRadius: "50px", backgroundColor: "#FF6700", color: "white" }}>
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

        <Grid container spacing={0} pt={2} pl={2} pr={2} >
          {
            showtable ?
              <Grid xs={12} p={1} align="center">
                <div style={{ height: 400, width: '100%' }}>
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
                  <Grid sx={{mb:'20px'}} xs={12} md={3} lg={3} align="center" p={1}>
                    <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                      <CardContent>
                        <Grid onClick={() => { setViewData(item); setViewImage(item.images[0]); handleOpenmodal(); }} container spacing={0} >
                          <Grid sx={{  width: '100px', height: '50px' }}  xs={6} align="left" onClick={() => { setViewData(item); handleOpenmodal(); }}>
                            <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#FF6700">
                              {item.name}
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

                          <Grid xs={6} sx={{ pb: 1, width: '100px', height: '50px' }} align="left" onClick={handleOpenmodal}>
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                              Price :
                            </Typography>
                          </Grid>

                          <Grid xs={6} sx={{ pb: 1,width: '100px', height: '50px' }} align="right" onClick={handleOpenmodal}>
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                              {item.price}
                            </Typography>
                          </Grid>

                          <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                              category :
                            </Typography>
                          </Grid>

                          <Grid xs={6} sx={{ pb: 1,width: '100px', height: '50px' }} align="right" onClick={handleOpenmodal}>
                            <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
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

        {/* view */}
        <Modal
          open={openmodal}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box width={{ xs: 400, md: 500, lg: 600, xl: 650 }} height="auto" sx={styleview}>
            <Grid container spacing={0}>
            <Box sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#FF6700", width: "100%", height: "70px" }}>
                <Grid xs={12} align="right" pt={0.8} pr={1}>
                  <Close sx={{ color: "white" }} onClick={() => setOpenmodal(false)} />
                </Grid>

                <Grid xs={12} align="center">
                  <Stack align="center">
                    <Typography variant="paragraph" sx={{ letterSpacing: "1px", fontWeight: 600, fontSize: "30px" }} color="white">
                      {viewData.name}
                    </Typography>
                  </Stack>
                </Grid>
              </Box>
            </Grid>
            {viewImage !== 'undefined' ?
              <Grid xs={12} align="center" pt={3}>
                <img src={`http://localhost:8082/${viewImage}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                </img>
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
                <Typography variant="h5" fontWeight={600} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                  {viewData.description}
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


// import { Box, Tooltip, Typography, useTheme, IconButton, FormControl, OutlinedInput, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";

// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import url from "../url"
// import { tokens } from "../../theme";
// import { Add, List, Apps, MoreVert, } from '@mui/icons-material';
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
// import { Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";
// // import "./index.css";

// const override = {
//   display: ' block',
//   margin: '0 auto',
//   borderColor: 'red',
// }

// const btn = {
//   letterSpacing: "1px",
//   width: '100%',
//   marginTop: '20px',
//   marginBottom: '20px',
//   color: 'white',
//   backgroundColor: '#FF6700',
//   borderColor: '#FF6700',
//   height: '50px',
//   padding: '0px',
//   font: 'normal normal normal 17px/26px Roboto',
//   borderRadius: "50px",
//   boxShadow: "none",
//   fontWeight: "medium",
//   boxShadow: "none",
//   borderRadius: "50px",
//   fontSize: "15px",
//   textTransform: "capitalize"
// }

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: '#FFFFFF',
//   outline: "none",
//   boxShadow: 0,
//   p: 4,
//   borderRadius: 5
// };

// const styleview = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   bgcolor: '#FFFFFF',
//   outline: "none",
//   boxShadow: 0,
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

//   const [openviewmodal, setOpenviewmodal] = useState(false);
//   const handleOpenview = () => {
//     setOpenviewmodal(true);
//     setAnchorEl(null);
//   };
//   const handleCloseview = () => setOpenviewmodal(false);

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
//     {
//       field: 'username', headerName: <Stack sx={{ pl: { xs: 0, md: 13, lg: 15 }, color: "black", fontWeight: 600 }}>User Name</Stack>, flex: 1,
//       renderCell: (row) => {
//         return (
//           <>
//             <Stack pl={15} >
//               <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                 <Typography>User Name Here</Typography>
//               </div>
//             </Stack>
//           </>
//         );
//       },
//     },
//     {
//       field: 'emailaddress', headerName: <Stack sx={{ pl: { xs: 0, md: 13, lg: 15 }, color: "black", fontWeight: 600 }}>Email Address</Stack>, flex: 1,
//       renderCell: (row) => {
//         return (
//           <>
//             <Stack pl={15} >
//               <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                 <Typography>example@gmail.com</Typography>
//               </div>
//             </Stack>
//           </>
//         );
//       },
//     },
//     {
//       field: 'subscriptionstatus', headerName: <Stack sx={{ pl: { xs: 0, md: 13, lg: 15 }, color: "black", fontWeight: 600 }}>Subscription Status</Stack>, flex: 1,
//       renderCell: (row) => {
//         return (
//           <>
//             <Stack pl={15} >
//               <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                 <Typography>Free Trial</Typography>
//               </div>
//             </Stack>
//           </>
//         );
//       },
//     },
//     {
//       field: 'id',
//       headerName: <Stack sx={{ pl: { xs: 0, md: 13, lg: 15 }, color: "black", fontWeight: 600 }}>Actions</Stack>,
//       flex: 1,
//       renderCell: (row) => {
//         return (
//           <>
//             <Stack pl={15} >
//               <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                 <IconButton  >
//                   <Tooltip title="view" >
//                     <Visibility sx={{ color: "#40E0D0" }} onClick={() => handleOpenview()} />
//                   </Tooltip>
//                 </IconButton>
//               </div>
//             </Stack>
//           </>
//         );
//       },
//     },
//   ];

//   const rows = [
//     { id: 1, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 2, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 3, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 4, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 5, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 6, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 7, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 8, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//     { id: 9, username: 'User Name Here', emailaddress: 'example@gmail.com' },
//   ];

//   return (
//     <>
//       <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
//         <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
//           <Grid item xs={6} align="" pt={1} >
//             <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
//               Users
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

//           <Grid item xs={3} align="right">
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
//               <>
//                 <Grid xs={12} md={3} lg={3} align="center" p={1} onClick={() => handleOpenview()} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="#00D22A">subscription paid</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="red">free trial</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="#00D22A">subscription paid</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="red">free trial</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="#00D22A">subscription paid</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="red">free trial</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="#00D22A">subscription paid</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="red">free trial</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="#00D22A">subscription paid</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="red">free trial</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="#00D22A">subscription paid</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>

//                 <Grid xs={12} md={3} lg={3} align="center" p={1} >
//                   <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
//                     <CardContent>
//                       <Grid container spacing={0} >
//                         <Grid xs={12} align="center">
//                           <Avatar sx={{ bgcolor: "#FF6700", width: 50, height: 50 }}>
//                             <Typography variant="h6" sx={{ textTransform: "uppercase" }} fontWeight={600} p={1} fontSize="17px" color="white">uh</Typography>
//                           </Avatar>

//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={650} pt={0.5} fontSize="17px" color="#1F1F1F">username here</Typography>
//                           <Typography variant="h6" sx={{ textTransform: "capitalize", letterSpacing: "1px" }} fontWeight={550} fontSize="14px" color="red">free trial</Typography>
//                           <Typography variant="paragraph" sx={{ textTransform: "", letterSpacing: "0.5px", fontWeight: "medium" }} fontSize="13px" color="#808080">example@gmail.com</Typography>

//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </>
//           }
//         </Grid>

//         {/* view */}
//         <Modal
//           open={openviewmodal}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
//             <Grid container spacing={0}>
//               <Grid xs={6} align="left" >
//                 <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">User Details</Typography>
//               </Grid>

//               <Grid xs={6} align="right">
//                 <Close onClick={() => setOpenviewmodal(false)} />
//               </Grid>

//               <Grid xs={12} align="center" pt={3}>
//                 <Avatar sx={{ bgcolor: "#FF6700", width: 75, height: 75 }}>
//                   <Typography variant="paragraph" sx={{ textTransform: "uppercase", fontSize: "18px", fontWeight: 600 }} p={1} color="white">uh</Typography>
//                 </Avatar>
//               </Grid>

//               <Grid xs={6} align="" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#FF6700">username:</Typography>
//               </Grid>

//               <Grid xs={6} align="right" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#000000">username here</Typography>
//               </Grid>

//               <Grid xs={6} align="" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#FF6700">email address:</Typography>
//               </Grid>

//               <Grid xs={6} align="right" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "", fontSize: "17px", fontWeight: 600 }} p={1} color="#000000">example@gmail.com</Typography>
//               </Grid>

//               <Grid xs={6} align="" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#FF6700">gender:</Typography>
//               </Grid>

//               <Grid xs={6} align="right" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#000000">male</Typography>
//               </Grid>

//               <Grid xs={6} align="" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#FF6700">focused area:</Typography>
//               </Grid>

//               <Grid xs={6} align="right" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#000000">arms</Typography>
//               </Grid>

//               <Grid xs={12} align="" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#000000">Subscription Details:</Typography>
//               </Grid>

//               <Grid xs={6} align="" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#FF6700">status:</Typography>
//               </Grid>

//               <Grid xs={6} align="right" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#000000">subscription paid</Typography>
//               </Grid>

//               <Grid xs={6} align="" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#FF6700">date of subscription:</Typography>
//               </Grid>

//               <Grid xs={6} align="right" pt={1}>
//                 <Typography variant="paragraph" sx={{ textTransform: "capitalize", fontSize: "17px", fontWeight: 600 }} p={1} color="#000000">16/05/2023</Typography>
//               </Grid>

//             </Grid>

//           </Box>
//         </Modal>

//       </Box>
//     </>
//   );
// };

// export default Team;
