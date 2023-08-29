import { Box, Tooltip, Typography, Select, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Chip from '@mui/material/Chip';
import ProfileCard from './profileCard';
import UserDetails from './UserDetails';

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
  const [Status, setStatus] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [openmodal, setOpenmodal] = useState(false);
  const handleOpenmodal = () => setOpenmodal(true);
  const handleClosemodal = () => setOpenmodal(false);
  const [viewImage, setViewImage] = useState([]);
  const [Timer, setTimer] = useState('');
  const [StartDate, setStartDate] = useState('');

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [ItemUser, setItemUser] = useState([]);

  const [OrderCount, setOrderCount] = useState('');
  const [ItemsCount, setItemsCount] = useState('');
  const [Items, setItems] = useState([]);
  const [id, setId] = useState([]);



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
          getUser();
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
          text: 'Server Down!'
        })
      });
  }
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
  const [UserID, setUserID] = useState(null);
  useEffect(() => {
    getUser();
    getItems();
  }, [])

  const getUser = async () => {
    setIsloading(true);
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
        console.log(response);
        
        if (response.status === true) {
          setIsloading(false);

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
          setIsloading(false);
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
        setIsloading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          confirmButtonColor: "#FF6700",
          text: 'Server Down!'
        })
      });
  }

  const getItems = async () => {
    var InsertAPIURL = `${url}items/get_item`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      "user_ID": location.state.id,
      "Item_ID": location.state.item_id
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
          getItem_user(response.result[0].userid);
          setItems(response.result);
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
          text: 'Server Down!'
        })
      });
  }

  const getItem_user = async (id) => {
    var InsertAPIURL = `${url}auth/specific_user`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const Data = {
      "logged_in_user": location.state.id,
      "Viewing_user": id,
    }
    console.log(Data)
    await fetch(InsertAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data),

    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        if (response.status === true) {
          setItemUser(response.result);
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
          text: 'Server Down!'
        })
      });
  }




  return (
    <>

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
                Reported item Details
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
                reported_items={reported_items}
                id={Logos.length > 0 && Logos[0].id}
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

            <Grid paddingTop={3} paddingRight={3} item md={7} xs={14} >
              <UserDetails
                id={Items.length > 0 && Items[0].id}
                block={Logos.length > 0 && Logos[0].status}
                name={Items.length > 0 && Items[0].name}
                price={Items.length > 0 && Items[0].price}
                description={Items.length > 0 && Items[0].description}
                location={Items.length > 0 && Items[0].location}
                added_by={Items.length > 0 && Items[0].added_by}
                promoted={Items.length > 0 && Items[0].promoted}
                createdat={Items.length > 0 && Items[0].createdat}

                user={ItemUser.length > 0 && ItemUser[0].username}
                email={ItemUser.length > 0 && ItemUser[0].email}
                phone={ItemUser.length > 0 && ItemUser[0].phone}

              />

            </Grid>
          </Grid>

          <Divider sx={{ pb: 2 }} />

          {/* view */}
          <Modal
            open={openmodal}
            // onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box width={{ xs: 400, md: 500, lg: 600, xl: 650 }} height="auto" sx={styleview}>
              <Box sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#FF6700", width: "100%", height: "80px" }}>
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
                    <img src={`https://staging-gearone-be.mtechub.com/${viewImage}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}>
                      {/* <img src={`https://staging-gearone-be.mtechub.com/${viewImage}`} style={{ bgcolor: "#FF6700", width: '175px', height: '175px' }}> */}
                    </img>
                  </Grid>
                  :
                  <Grid xs={12} align="center" pt={3}>
                    <Avatar sx={{ bgcolor: "#FF6700", width: 75, height: 75 }}>
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
      }
    </>
  );
};

export default Team;