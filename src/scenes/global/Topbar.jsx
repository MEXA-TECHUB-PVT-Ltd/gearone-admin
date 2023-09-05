import React, { useState, useEffect } from "react";
import { Avatar, Tooltip, Box, Button, Grid, Modal, IconButton, Menu, MenuItem, Divider, Stack, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Search, Lock, Settings, Logout, FormatBold, FormatItalic, Close } from "@mui/icons-material";
import url from "../url"
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Swal from 'sweetalert2'
import img from '../../components/Images/barber.jpg'
import ClipLoader from "react-spinners/ClipLoader";
import VpnKeyOffIcon from '@mui/icons-material/VpnKeyOff';
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

const override = {
  display: ' block',
  margin: '0 auto',
  borderColor: 'red',
}

const btn = {
  width: '100%',
  marginTop: '0px',
  marginBottom: '0px',
  color: 'white',
  backgroundColor: '#B5030B',
  borderColor: '#B5030B',
  height: '50px',
  padding: '0px',
  fontFamily: 'bold',
  fontWeight: "bold"
}

const btnpassword = {
  width: '23vh',
  marginTop: '0px',
  marginBottom: '0px',
  color: 'white',
  backgroundColor: '#B5030B',
  borderColor: '#B5030B',
  height: '50px',
  padding: '0px',
  fontFamily: 'bold',
  fontWeight: "bold"
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 300,
  // height: 300,
  bgcolor: '#FFFFFF',
  outline: "none",
  boxShadow: 0,
  p: 4,
  borderRadius: 5
};

const Topbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [oldpassword, setOldpassword] = useState('');
  const [retrievepassword, setRetrievepassword] = useState('');
  const [newpassword, setNewpassword] = useState('');

  const [adminimage, setAdminimage] = useState([]);
  const [adminname, setAdminname] = useState([]);
  const [isloading, setIsloading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [opendelmodalStatus, setOpendelmodalStatus] = useState(false);
  const [Data, setData] = React.useState([]);
  const [Status, setStatus] = useState('');
  const [id, setId] = useState([]);
  const [AnchorElStatus, setAnchorElStatus] = React.useState(null);

  const handleOpendelmodalStatus = (row) => {
    setData(row);
    setStatus(row.status);
    setId(row.id);
    setOpendelmodalStatus(true);
    setAnchorElStatus(null);
  };
  const handleClosedelmodalStatus = () => setOpendelmodalStatus(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [updatepassword, setUpdatePassword] = useState(false);
  const handleOpenupdatepassword = () => {
    setAnchorEl(null);;
    setUpdatePassword(true);
  }
  const handleCloseupdatepassword = () => setUpdatePassword(false);
  const [two_factor, setTwo_factor] = useState(false);
  const [changeStatus, setChangeStatus] = useState('');

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const [jwtoken, setJwtoken] = useState('');
  const [currentuserID, setCurrentuserID] = useState('');
  useEffect(() => {

    const two_factor = JSON.parse(localStorage.getItem('two_factor'));
    if (two_factor) {
      setTwo_factor(two_factor);
    }


    const adminemail = JSON.parse(localStorage.getItem('adminemail'));
    if (adminemail) {
      setEmail(adminemail);
    }
    const pass = JSON.parse(localStorage.getItem('password'));
    if (pass) {
      setRetrievepassword(pass);
    }

    const jwttoken = JSON.parse(localStorage.getItem('jwtoken'));
    if (jwttoken) {
      setJwtoken(jwttoken);
    }

    const ID = JSON.parse(localStorage.getItem('adminID'));
    if (ID) {
      setCurrentuserID(ID);
    }

  }, [])
  const [opendelmodal, setOpendelmodal] = useState(false);
  const handleOpendelmodal = () => {
    setOpendelmodal(true);
    setAnchorEl(null);
  };
  const handleClosedelmodal = () => setOpendelmodal(false);

  const [hide, setHide] = useState(true);

  const handleLogout = () => {
    window.localStorage.clear();
    // window.History.replace('/')
    navigate('/');

    // window.location.reload();
  }

  const ChangeTwoFactorStatus = async () => {
    setIsloading(true);
    var InsertAPIURL = `${url}admin/change_two_factor`
    var headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    var DataFinal = {
      "id": localStorage.getItem('adminID'),
      "two_factor": changeStatus
    };
    await fetch(InsertAPIURL, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(DataFinal),
    })
      .then(response => response.json())
      .then(response => {
        if (response.status === true) {
          setIsloading(false);
          console.log(response.result[0].status);
          setTwo_factor(changeStatus);
          setOpendelmodal(false);
          localStorage.setItem('two_factor', changeStatus)
          // setBlockStatus(response.result[0].status);
          // handleClosedelmodalStatus();
          if (changeStatus === true) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              confirmButtonColor: "#B5030B",
              text: 'Two Factor Enabled Successfully',
            })
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              confirmButtonColor: "#B5030B",
              text: 'Two Factor Disabled Successfully'
            })

          }
          // setOpendelmodal(false);
          //   console.log(response.result);
          //   setCatagory(response.result);
        } else {
          setOpendelmodal(false);
          setIsloading(false);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#B5030B",
            text: 'Try Again'
          })
        }
      }
      )
      .catch(error => {
        setOpendelmodal(false);
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
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "5px" }}>
        {
          hide ?
            <Box pt={2} width="97%">
              <Box sx={{ borderRadius: "20px", backgroundColor: "#B5030B" }}>
                <Stack sx={{ p: 2 }}>
                  <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} >
                    <Grid item xs={7} lg={10} xl={10} align="right">
                      <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "8px" }}>
                        {/* <Search sx={{ color: "white" }} onClick={() => setHide(false)} /> */}
                        {/* <Settings sx={{ color: "white" }} onClick={() => navigate("/settings")} /> */}
                        {isloading ?

                          <ClipLoader loading={isloading}
                            css={override}
                            sx={{ color: "white" }}
                            size={20}
                          />

                          :
                          two_factor ?
                            <Tooltip title="Two Factor">
                              <VpnKeyIcon sx={{cursor:'pointer', color: "white" }} onClick={() => { setChangeStatus(false); setOpendelmodal(true); }} />
                            </Tooltip>
                            :
                            <Tooltip title="Two Factor">
                              <VpnKeyOffIcon sx={{cursor:'pointer', color: "white" }} onClick={() => { setChangeStatus(true); setOpendelmodal(true); }} />
                            </Tooltip>
                        }
                        <Tooltip title="Password Change">
                          <Lock sx={{cursor:'pointer', color: "white" }} onClick={() => navigate("/updatepassword")} />
                        </Tooltip>
                        <Tooltip title="Logout">
                          <Logout onClick={() => { handleLogout(); }} sx={{ cursor:'pointer',color: "white" }} />
                        </Tooltip>

                      </div>
                    </Grid>

                    <Grid item xs={1} lg={0.5} xl={0.5} align="center">
                      <Box>
                        <Divider orientation="vertical" flexItem sx={{ height: "100vh", backgroundColor: "white", display: "inline" }} />
                      </Box>
                    </Grid>

                    <Grid item xs={4} lg={1.5} xl={1.5} align="">
                      <Typography color="white" sx={{ fontWeight: "bold", fontSize: "11px" }} >{email}</Typography>
                    </Grid>
                  </Grid>
                </Stack>
              </Box>
            </Box>
            :
            <>
              {/* search bar */}
              <Box pt={2} width="97%">
                <Box sx={{ borderRadius: "20px", border: "1px solid lightgray", backgroundColor: "white" }}>
                  <Stack sx={{ p: 2 }}>
                    <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} >
                      <Grid item xs={6} lg={6} xl={6} align="">
                        <Typography variant="paragraph" pl={1} fontWeight={500} fontSize="13px" color="lightgray">
                          Search Here
                        </Typography>
                      </Grid>

                      <Grid item xs={6} lg={6} xl={6} align="right">
                        <Close sx={{ color: "lightgray", pr: 1 }} onClick={() => setHide(true)} />
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </Box>
            </>
        }

      </div>

      {/* Ask Before Change */}
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
              {changeStatus ?
                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want Enable Two Factor?</Typography>
                :
                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want  Disable  Two Factor?</Typography>
              }
            </Grid>
          </Grid>

          <Grid container spacing={0} pt={7}>
            <Grid xs={6} align="">
              <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodal(false) }}>Cancel</Button>
            </Grid>

            <Grid xs={6} align="right">
              {changeStatus ?

                <Button variant="contained" style={btn} onClick={() => { ChangeTwoFactorStatus() }}>Enable</Button>
                :
                <Button variant="contained" style={btn} onClick={() => { ChangeTwoFactorStatus() }}>Disable</Button>

              }

            </Grid>
          </Grid>

        </Box>
      </Modal>


    </>
  );
};

export default Topbar;
