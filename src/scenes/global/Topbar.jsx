import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Grid, IconButton, Menu, MenuItem, Divider, Stack, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { Search, Lock, Settings, Logout, FormatBold, FormatItalic, Close } from "@mui/icons-material";
import url from "../url"

import Swal from 'sweetalert2'
import img from '../../components/Images/barber.jpg'
import ClipLoader from "react-spinners/ClipLoader";

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
  backgroundColor: '#789040',
  borderColor: '#789040',
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
  backgroundColor: '#789040',
  borderColor: '#789040',
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

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [updatepassword, setUpdatePassword] = useState(false);
  const handleOpenupdatepassword = () => {
    setAnchorEl(null);;
    setUpdatePassword(true);
  }
  const handleCloseupdatepassword = () => setUpdatePassword(false);

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

  const [hide, setHide] = useState(true);

  const handleLogout = () => {
    window.localStorage.clear();
    window.History.replace('/')
    navigate('/');

    // window.location.reload();
  }


  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "5px" }}>
        {
          hide ?
            <Box pt={2} width="97%">
              <Box sx={{ borderRadius: "20px", backgroundColor: "#FF6700" }}>
                <Stack sx={{ p: 2 }}>
                  <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} >
                    <Grid item xs={7} lg={10} xl={10} align="right">
                      <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "8px" }}>
                        {/* <Search sx={{ color: "white" }} onClick={() => setHide(false)} /> */}
                        {/* <Settings sx={{ color: "white" }} onClick={() => navigate("/settings")} /> */}
                        <Lock sx={{ color: "white" }} onClick={() => navigate("/updatepassword")} />
                        <Logout onClick={() => {handleLogout();}} sx={{ color: "white" }} />
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
    </>
  );
};

export default Topbar;
