import { Box, Tooltip, FormControl, OutlinedInput, Typography, Select, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Chip from '@mui/material/Chip';
import ProfileCard from './profileCard';
import UserDetails from './UserDetails';
import './loader.css'
import Header from "../../components/Header";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import moment from 'moment'
import Countdown from "react-countdown";
import { useLocation, useNavigate } from 'react-router-dom';
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
import { Close, Delete, Autorenew, Edit, Upload, Visibility } from "@mui/icons-material";

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
  const [Status, setStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [openmodal, setOpenmodal] = useState(false);
  const handleOpenmodal = () => setOpenmodal(true);
  const handleClosemodal = () => setOpenmodal(false);
  const [viewImage, setViewImage] = useState([]);
  const [Timer, setTimer] = useState('');
  const [StartDate, setStartDate] = useState('');
  const [ID, setID] = React.useState('');

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
  const [AnchorElStatus, setAnchorElStatus] = React.useState(null);
  const [Data, setData] = React.useState([]);
  const [promoted_status, setPromoted_status] = React.useState('');

  const [opendelmodalStatus, setOpendelmodalStatus] = useState(false);
  const handleOpendelmodalStatus = (row) => {
    setData(row);
    setStatus(row.status);
    setId(row.id);
    setOpendelmodalStatus(true);
    setAnchorElStatus(null);
  };
  const handleClosedelmodalStatus = () => setOpendelmodalStatus(false);

  const [DeleteID, setDeleteID] = React.useState('');

  const [opendelmodal, setOpendelmodal] = useState(false);
  const handleOpendelmodal = () => {
    setOpendelmodal(true);
    setAnchorEl(null);
  };
  const handleClosedelmodal = () => setOpendelmodal(false);
  const [openaddsuccess, setOpenaddsuccess] = useState(false);
  const handleOpenaddsuccess = () => setOpenaddsuccess(true);
  const handleCloseaddsuccess = () => setOpenaddsuccess(false);

  const [openaddmodal, setOpenaddmodal] = useState(false);
  const handleOpenadd = () => setOpenaddmodal(true);
  const handleCloseadd = () => {
    setOpenaddmodal(false);
    setOpenaddsuccess(true)
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [OrderCount, setOrderCount] = useState('');
  const [ItemsCount, setItemsCount] = useState('');
  const [Items, setItems] = useState([]);
  const [Orders, setOrders] = useState([]);
  const [id, setId] = useState([]);
  const [start_date, setStart_date] = React.useState('');
  const [end_date, setEnd_date] = React.useState('');

  const [showtable, setShowtable] = useState(true);

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
    await fetch(InsertAPIURL, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status === true) {
          setIsloading(false);
          getItems();
          getOrders();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            confirmButtonColor: "#B5030B",
            text: "Status Change Successfully"
          })

          setOpendelmodalStatus(false);
          //   console.log(response.result);
          //   setCatagory(response.result);
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

  const OrdersColomns = [
    { field: 'username', headerName: <span style={{ color: "black", fontWeight: 600 }}>Name</span>, flex: 1 },
    { field: 'merchandise_name', headerName: <span style={{ color: "black", fontWeight: 600 }}>Item</span>, flex: 1 },
    {
      field: 'price',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>price</span>,
      flex: 1,
    },
    {
      field: 'merchandise_description',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>description</span>,
      flex: 1,
    },
    {
      field: `status`,
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Status</span>,
      flex: 1,
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

              value={row.row.status}
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
      field: 'ordered_at',
      headerName: <span style={{ color: "black", fontWeight: 600 }}>Location</span>,
      flex: 1,
    },


  ];

  const ItemColomns = [
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
              < Chip label={row.row.promoted} color="success" variant="outlined" />
              :
              <Chip label={row.row.promoted} color="primary" />

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
              <IconButton style={{ cursor: 'pointer' }} onClick={() => {
                setID(row.row.id)
                setPromoted_status(row.row.promoted)
                handleOpenadd();
              }}>
                <Tooltip title="Change Status" >
                  <Autorenew sx={{ color: "green" }} />
                </Tooltip>
              </IconButton>

              <IconButton  >
                <Tooltip title="view" >
                  <Visibility sx={{ color: "#3FC0FF" }} onClick={() => {
                    setViewData(row.row); setViewImage(row.row.images[0]); console.log(row.row);
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
          text: 'Server Down!'
        })
      });
  }
  useEffect(() => {
    getAllLogos();
    getItems();
    getOrders();
  }, [])
  const [Logos, setLogos] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowing] = useState(0);

  const [items, setitems] = useState(0);
  const [likedItems, setlikedItems] = useState(0);
  const [social_media, setsocial_media] = useState(0);

  const [reported_items, setreported_items] = useState(0);
  const [saved_items, setsaved_items] = useState(0);
  const [shared_items, setshared_items] = useState(0);
  const [report_ads, setreport_ads] = useState(0);

  const getAllLogos = async () => {
    setIsloading(true)
    var InsertAPIURL = `${url}auth/specific_user`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      "logged_in_user": location.state.id,
      "Viewing_user": location.state.id
    }
    console.log(Data);
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
      .then(response => response.json())
      .then(response => {
        setIsloading(false)
        console.log(response);
        if (response.status === true) {

          setreported_items(response.reported_items);
          setsaved_items(response.saved_items);
          setshared_items(response.shared_items);
          setreport_ads(response.report_ads);


          setFollowers(response.followers);
          setFollowing(response.followings);
          setitems(response.items);
          setlikedItems(response.likedItems);
          if (response.social_media) {
            setsocial_media(response.social_media);
          } else {
            setsocial_media({
              facebook: '',
              twitter: '',
              instagram: '',
              youtube: '',
            });

          }

          console.log(response);
          setLogos(response.result);
        } else {
          setIsloading(false)
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#B5030B",
            text: `${response.message}`
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
          text: 'Server Down!'
        })
      });
  }

  const getOrders = async () => {
    var InsertAPIURL = `${url}orders/get_orders_by_user_id`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      "user_id": location.state.id
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
          setOrderCount(response.count);
          console.log(response.result);
          setOrders(response.result);
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
          text: 'Server Down!'
        })
      });
  }



  const getItems = async () => {
    var InsertAPIURL = `${url}items/get_items_by_user`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      "user_ID": location.state.id
    }
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),

    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.message == `User's items data`) {
          // setLogos(response.count);
          setItemsCount(response.count);
          setItems(response.result);
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
          text: 'Server Down!'
        })
      });
  }

  const userList = [
    {
      name: 'John Doe',
      avatarSrc: '/static/images/avatar/1.jpg',
      primaryText: 'Brunch this weekend?',
      secondaryText: 'Ali Connors — I\'ll be in your neighborhood doing errands this…',
      additionalText: '',
    },
  ];

  const handleAdd = async () => {
    setIsloading(true);
    var InsertAPIURL = `${url}items/update_items`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var Data = {
      "Item_ID": ID,
      "promoted": promoted_status,
      "start_date": start_date,
      "end_date": end_date,
    };
    await fetch(InsertAPIURL, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(Data),
    })
      .then(response => response.json())
      .then(async response => {
        console.log(response);
        if (response.status == true) {
          setIsloading(false);
          getItems();

          setOpenaddmodal(false);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            confirmButtonColor: "#B5030B",
            text: 'Status Updated Successfully',
          })

        } else if (response.message == `Please Enter Category name`) {
          setOpenaddmodal(false);
          setIsloading(false);
          Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            confirmButtonColor: "#B5030B",
            text: 'Please Enter Name'
          })
        } else {
          setIsloading(false);
          setOpenaddmodal(false);
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
        setIsloading(false);
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
              <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#B5030B">Change Status</Typography>

              <Select
                sx={{
                  mt: '10%',
                  width: "80%",
                  borderRadius: "50px",
                  backgroundColor: "darkgray",
                  "& fieldset": { border: 'none' },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                displayEmpty
                defaultValue={Data.status}
                onChange={(event) => {
                  setStatus(event.target.value);
                }}
              >
                <MenuItem value="Image Aspects" disabled>
                  <em>select Status</em>
                </MenuItem>

                <MenuItem key='Pending' value='Pending'>Pending</MenuItem>
                <MenuItem key='in-progress' value='in-progress'>in-progress</MenuItem>
                <MenuItem key='Confirmed' value='Confirmed'>Confirmed</MenuItem>
                <MenuItem key='Completed' value='Completed'>Completed</MenuItem>

              </Select>
            </Grid>
          </Grid>

          <Grid container spacing={0} pt={5}>
            <Grid xs={6} align="">
              <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodalStatus(false) }}>Cancel</Button>
            </Grid>

            <Grid xs={6} align="right">
              {isloading ?
                <Grid xs={12} align="center">
                  <Button variant="contained" style={btn}>
                    <ClipLoader loading={isloading}
                      css={override}
                      size={10}
                    />
                  </Button>
                </Grid>
                :
                <Grid xs={12} align="center">
                  <Button variant="contained" style={btn} onClick={() => { changeStatus() }} >Change</Button>
                </Grid>
              }
            </Grid>
          </Grid>

        </Box>
      </Modal>

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

        <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
          <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
            <Grid item xs={6} align="" pt={1} >
              <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
                User Details
              </Typography>
            </Grid>

            <Grid item xs={3} align="center">

            </Grid>


          </Grid>

          <Divider sx={{ pb: 2 }} />

          <Grid maxHeight={'90vh'} container>

            <Grid paddingTop={3} paddingRight={2} paddingLeft={3} item md={5} xs={10} className="admin-panel">
              <ProfileCard
                key={1}

                name={Logos.length > 0 && Logos[0].username}
                // role='admin'
                address={Logos.length > 0 && Logos[0].address}
                imageUrl={Logos.length > 0 && `${url}${Logos[0].image}`}
                email={Logos.length > 0 && Logos[0].email}
                createdat={Logos.length > 0 && Logos[0].createdat}
                // gender={Logos[0].email}
                blockType={Logos.length > 0 && Logos[0].status}
                accountType={Logos.length > 0 && Logos[0].type}
                phoneNumber={Logos.length > 0 && `${Logos[0].country_code}${Logos[0].phone}`}
              />

            </Grid>

            <Grid  paddingTop={3} paddingRight={3}
              item md={7} xs={14} >
              <UserDetails
                id={Logos.length > 0 && Logos[0].id}
                block={Logos.length > 0 && Logos[0].status}
                all_items={items}
                liked_items={likedItems}
                reported_items={reported_items}
                saved_items={saved_items}
                shared_items={shared_items}
                report_ads={report_ads}
                followers={followers}
                followings={followings}
                total_orders={OrderCount}
                facebook={social_media.facebook}
                twitter={social_media.twitter}
                linked_in={social_media.linkedin}
                instagram={social_media.insta}

              />

            </Grid>
          </Grid>

          <Divider sx={{mt:{xs:'140%', md:'0', xl:'0'}, pb: 2 }} />


          <Grid sx={{ mb: '23px' }} container spacing={0} pt={2} pl={2} pr={2} >
            <Typography sx={{ ml: '10px' }} variant="h5" fontWeight={750} fontSize="20px" color="#404040">
              Items {ItemsCount}
            </Typography>

            {
              showtable ?
                <>
                  <Grid xs={12} p={1} align="center">
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={Items}
                        getRowClassName={(params) => {
                          return 'unblock-row'
                        }}
                        getRowId={Items.id}
                        id={Items.id}
                        columns={ItemColomns}
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
                  <Typography sx={{ ml: '10px' }} variant="h5" fontWeight={750} fontSize="20px" color="#404040">
                    {`Orders       ${Orders.length}`}
                  </Typography>
                  <Grid xs={12} p={1} align="center">
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={Orders}
                        getRowClassName={(params) => {
                          return 'unblock-row'
                        }}
                        getRowId={Orders.id}
                        id={Orders.id}
                        columns={OrdersColomns}
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

                </>
                :
                <>
                  {Logos.map((item, index) => (
                    <Grid xs={12} md={3} lg={3} align="center" p={1}>
                      <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                        <CardContent>
                          <Grid onClick={() => { setViewData(item); handleOpenmodal(); }} container spacing={0} >
                            <Grid xs={6} align="left" onClick={() => { setViewData(item); handleOpenmodal(); }}>
                              <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#B5030B">
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
                                Name :
                              </Typography>
                            </Grid>

                            <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                              <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#808080">
                                {item.username}
                              </Typography>
                            </Grid>


                            <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                              <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                email
                              </Typography>
                            </Grid>

                            <Grid sx={{ pb: 1, width: '100px', height: '50px' }} xs={6} align="left" onClick={handleOpenmodal}>
                              <Link style={{ width: '30px', height: '10px' }} variant="h6" fontWeight={300} fontSize="12px" color='#007FFF'>
                                {item.email}
                              </Link>
                            </Grid>

                            <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                              <Typography variant="h5" fontWeight={600} pb={1} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                Phone
                              </Typography>
                            </Grid>

                            <Grid xs={6} sx={{ pb: 1 }} align="left" onClick={handleOpenmodal}>
                              <Typography variant="h5" fontWeight={600} pb={1} fontSize="12px" sx={{}} color="#808080">
                                {`${item.country_code}:${item.phone}`}
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
              <Box sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#B5030B", width: "100%", height: "80px" }}>
                <Box xs={12} align="right" pt={0.1} pr={1}>
                  <Close sx={{ color: "white" }} onClick={() => setOpenmodal(false)} />
                </Box>
                <Box xs={12} sx={{ mb: '20px' }} align="center">
                  <Typography align="center" sx={{ mb: '20px', fontWeight: 600, fontSize: "24px" }} color="white">
                    {viewData.name}
                  </Typography>
                </Box>
              </Box>

              {viewImage !== null ?
                viewImage !== undefined ?
                  <Grid xs={12} align="center" pt={3}>
                    <img src={`https://staging-gearone-be.mtechub.com/${viewImage}`} style={{ bgcolor: "#B5030B", width: '175px', height: '175px' }}>
                      {/* <img src={`https://staging-gearone-be.mtechub.com/${viewImage}`} style={{ bgcolor: "#B5030B", width: '175px', height: '175px' }}> */}
                    </img>
                  </Grid>
                  :
                  <Grid xs={12} align="center" pt={3}>
                    <Avatar sx={{ bgcolor: "#B5030B", width: 75, height: 75 }}>
                    </Avatar>
                  </Grid>

                :
                <Grid xs={12} align="center" pt={3}>
                  <Avatar sx={{ width: 75, height: 75 }}>
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
                  <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#B5030B">Confirmation</Typography>

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
      }
      {/* addmodal */}
      <Modal
        open={openaddmodal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
          <Grid container spacing={0}>
            <Grid xs={6} align="left" >
              <Typography variant="h4" sx={{ letterSpacing: "1px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Change Promoted Status</Typography>
            </Grid>

            <Grid xs={6} align="right">
              <Close onClick={() => setOpenaddmodal(false)} />
            </Grid>
            <Grid xs={12} align="left" pt={7}>
              <FormControl fullWidth>
                <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                  Promoted Status
                </Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  displayEmpty
                  defaultValue={promoted_status}
                  // input={<Input name="circle" id="demo-simple-select" />}
                  onChange={(e) => { setPromoted_status(e.target.value) }}
                  sx={{
                    borderRadius: "50px",
                    backgroundColor: "darkgray", height: "35px",
                    "& fieldset": { border: 'none' },
                  }}
                >
                  <MenuItem value="" disabled >
                    <em>{"Select Type"}</em>
                  </MenuItem>

                  <MenuItem key='true' value='true'>True</MenuItem>
                  <MenuItem key='false' value='false'>False</MenuItem>

                </Select>
              </FormControl>
            </Grid>

            <Grid xs={12} align="left" pt={1}>
              <FormControl fullWidth>
                <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                  Start Date
                </Typography>
                <OutlinedInput
                  id="input-with-icon-adornment"
                  disabled={promoted_status === 'false' ? true : false}
                  onChange={(event) => {
                    setStart_date(event.target.value);
                  }}
                  type="datetime-local"
                  sx={{
                    backgroundColor: "darkgray",
                    "& fieldset": { border: 'none' },
                    "& ::placeholder": { ml: 1, fontWeight: 600, color: "white" }
                  }}
                />
              </FormControl>
            </Grid>
            <Grid xs={12} align="left" pt={1}>
              <FormControl fullWidth>
                <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                  End Date
                </Typography>

                <OutlinedInput
                  id="input-with-icon-adornment"
                  onChange={(event) => {
                    setEnd_date(event.target.value);
                  }}
                  disabled={promoted_status === 'false' ? true : false}
                  type="datetime-local"
                  sx={{
                    backgroundColor: "darkgray",
                    "& fieldset": { border: 'none' },
                    "& ::placeholder": { ml: 1, fontWeight: 600, color: "white" }
                  }}
                />
              </FormControl>
            </Grid>

          </Grid>

          <Grid container spacing={0} pt={7}>

            {isloading ?
              <Grid xs={12} align="center">
                <Button variant="contained" style={btn}>
                  <ClipLoader loading={isloading}
                    css={override}
                    size={10}
                  />
                </Button>
              </Grid>

              :

              <Grid xs={12} align="center">
                <Button variant="contained" style={btn} onClick={handleAdd}>Change</Button>
              </Grid>
            }
          </Grid>

        </Box>
      </Modal>

    </>
  );
};

export default Team;