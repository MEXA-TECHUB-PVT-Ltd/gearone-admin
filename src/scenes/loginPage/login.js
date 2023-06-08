import React, { useState, useEffect } from 'react'
import { Box, Container, Divider, FormControl, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import image from '../../components/Images/logo.svg'
import signinmockup from "../../components/Images/signinmockup.jpeg"
import Avatar from '@mui/material/Avatar';
import url from '../url'
import { NavLink } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import "./login.css"
import OtpInput from 'react-otp-input';

const override = {
  display: ' block',
  margin: '0 auto',
  borderColor: 'red',
}

const btn = {
  letterSpacing: "1px",
  width: '99%',
  marginTop: '20px',
  // marginBottom: '20px',
  color: 'white',
  backgroundColor: '#FF6700',
  borderColor: '#FF6700',
  height: '50px',
  padding: '0px',
  font: 'normal normal normal 17px/26px Roboto',
  fontWeight: "normal",
  borderRadius: "50px",
  boxShadow: "none",
  textTransform: "capitalize"
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isloading, setIsloading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");
  const [hide, setHide] = useState(false);
  const [enteredotp, setEnteredotp] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('jwtoken'));
    // setToken(token);

    if (token == null) {
      navigate("/")
    } else {
      navigate("/dashboard")
    }
  }, [])

  const verification = async () => {
    setHide(true);
  }

  const login = async () => {
    setHide(false);
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [close, setClose] = useState(null);
  const handleclose = () => {
    setClose(null);
  };

  const verifyotp = async () => {
    setIsloading(true);

    if (enteredotp.length == 0) {
      setIsloading(false);
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        confirmButtonColor: "#FF6700",
        text: 'Enter OTP For Verification'
      })
      setOpen(false);
    } else {
      var InsertAPIURL = `${url}admin/verify_OTP_sign_in`
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        "email": email,
        "otp": enteredotp
      };
      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.message == `Login Successful`) {
            setIsloading(false);
            verification();
            setTimeout(() => {
              localStorage.setItem("jwtoken", JSON.stringify(response.token));
              localStorage.setItem("adminemail", JSON.stringify(response.result[0].email));
              localStorage.setItem("adminname", 'admin');
              localStorage.setItem("adminimageurl", 'admin');
              localStorage.setItem("adminID", JSON.stringify(response.result[0].id));
              localStorage.setItem("password", JSON.stringify(password));
              navigate("/dashboard");
            }, 3000)
          } else {
            login();
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              confirmButtonColor: "#FF6700",
              text: 'Incorrect OTP, please try again'
            })
            setIsloading(false);
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
  }



  const loginadmin = async () => {
    setIsloading(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if (email.length == 0 || password.length == 0) {
      setIsloading(false);
      Swal.fire({
        icon: 'warning',
        title: 'warning',
        confirmButtonColor: "#FF6700",
        text: 'All Fields Are Required'
      })
    } else if (!isValidEmail) {
      setIsloading(false);
      Swal.fire({
        icon: 'error',
        title: 'Warning',
        confirmButtonColor: "#FF6700",
        text: 'Enter Valid Email !'
      })
    } else {
      var InsertAPIURL = `${url}admin/sign_in`
      var headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        "email": email,
        "password": password
      };
      await fetch(InsertAPIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if (response.message == `Sent a verification email to ${email}`) {
            setIsloading(false);
            verification();
          } else {
            setIsloading(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              confirmButtonColor: "#FF6700",
              text: 'Email or Password wrong!'
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
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container spacig={0}>
        <Grid xs={12} md={6} lg={6} xl={6} align="">
          <Container>
            <Box sx={{ pt: { xs: 0, sm: 0, md: 0, lg: 7, xl: 25 } }} p={{ lg: 8, xl: 13 }}>
              <img src={image} sx={{ width: 120, height: 120 }} />


              {hide ?
                <Stack pt={5}>
                  <Typography variant="paragraph" fontSize="20px" sx={{ letterSpacing: "1px", font: "normal normal bold 32px/32px Roboto" }} fontWeight="bold" color="#404040">
                    Verification
                  </Typography>

                  <Typography variant="body1" fontSize="13px" fontWeight="normal" color="#808080">
                    Enter code that you received on your mail
                  </Typography>

                  <FormControl  allign='center' className='form' sx={{ width: { lg: "90%", xl: "80%" } }}>
                    <Stack direction="column" spacing="3" pt={8} sx={{ pb: 8 }} >
                      <Stack direction="row" spacing="3" sx={{ display: { xs: "block", sm: "block", md: "block", lg: "block", xl: "none" } }}>
                        <OtpInput
                          value={enteredotp}
                          onChange={(e) => { setEnteredotp(e) }}
                          numInputs={4}
                          separator={<span>&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;
                          </span>}
                          containerStyle={{ width: "100%" }}
                          inputStyle={{ width: "100%", height: "8vh", backgroundColor: "#EEEEEE", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                          focusStyle={{ width: "100%", height: "8vh", backgroundColor: "#EEEEEE", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                        />
                      </Stack>

                      <div style={{ display: "flex", alignContent: "center", justifyContent: "center" }}>
                        <Stack direction="row" spacing={0} align="" sx={{ display: { xs: "none", sm: "none", md: "none", lg: "none", xl: "block" } }}>
                          <OtpInput
                            value={enteredotp}
                            onChange={(e) => { setEnteredotp(e) }}
                            numInputs={4}
                            // separator={<span>&nbsp;  
                            // </span>}
                            containerStyle={{ width: "100%" }}
                            inputStyle={{ width: "50%", height: "5vh", backgroundColor: "#EEEEEE", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                            focusStyle={{ width: "50%", height: "5vh", backgroundColor: "#EEEEEE", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                          />
                        </Stack>
                      </div>

                      {isloading ?
                        <Button variant="contained" style={btn}>
                          <ClipLoader color={color} loading={isloading}
                            css={override}
                            size={10}
                            sx={{ mb: "10px" }}
                          />
                        </Button>
                        :
                        <Button sx={{mb: "10px" ,mr:'300px'}} variant="contained" style={btn} onClick={verifyotp}>Verify</Button>
                      }

                    </Stack>

                  </FormControl>

                </Stack>
                :
                <Stack pt={5}>
                  <Typography variant="paragraph" fontSize="20px" sx={{ letterSpacing: "1px", font: "normal normal bold 32px/32px Roboto" }} fontWeight="bold" color="#404040">
                    Sign In
                  </Typography>

                  <Typography variant="body1" fontSize="13px" fontWeight="normal" color="#808080">
                    Sign In to get started with GEAR One App
                  </Typography>

                  <FormControl className='form' sx={{ width: { lg: "90", xl: "80%" } }}>
                    <Stack direction="column" spacing={0} pt={4}>
                      <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1}
                        fontSize="12px" sx={{ font: "normal normal normal 17px/26px Roboto" }}
                        color="#1F1F1F">
                        Email Address
                      </Typography>
                      <OutlinedInput
                        id="input-with-icon-adornment"
                        sx={{
                          borderRadius: "50px",
                          backgroundColor: "#EEEEEE",
                          "& fieldset": { border: 'none' },
                        }}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <Email sx={{ color: "#808080" }} />
                          </InputAdornment>
                        }
                      />
                      <br />
                      <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1} fontSize="12px" sx={{ font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                        Password
                      </Typography>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        sx={{
                          borderRadius: "50px",
                          backgroundColor: "#EEEEEE",
                          "& fieldset": { border: 'none' },
                        }}
                        onChange={(event) => {
                          console.log(event.target.value);
                          setPassword(event.target.value);
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <Lock sx={{ color: "#808080" }} />
                          </InputAdornment>
                        }
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff sx={{ color: "#808080" }} /> : <Visibility sx={{ color: "#808080" }} />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <br />
                      <div 
                        style={{ display: "flex", justifyContent: "right", alignContent: "right" }}>
                        <Box>
                          <NavLink to="/emailverification"
                            style={{
                              color: "#404040", textDecoration: "none",
                              fontWeight: "bold", fontSize: "13px",
                              font: "normal normal normal 17px/26px Roboto"
                            }}>
                            Forgot Password?</NavLink>
                        </Box>
                      </div>

                      {isloading ?
                        <Button variant="contained" style={btn}>
                          <ClipLoader color={color} loading={isloading}
                            css={override}
                            size={10}
                          />
                        </Button>
                        :
                        <Button variant="contained" style={btn} onClick={() => loginadmin()} >Sign In</Button>
                      }

                    </Stack>

                  </FormControl>

                </Stack>
              }

            </Box>
          </Container>
        </Grid>

        <Grid xs={12} md={6} lg={6} xl={6} align="" p={2}>
          <Box sx={{
            backgroundImage: `url(${signinmockup})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
            height: { lg: "95.5vh", xl: "97vh" }
          }}>
            <Grid container spacing={0}>
              <Grid xs={12} p={10}>
                <Box pt={{ lg: 20, xl: 30 }}>
                  <Typography variant="h5" fontWeight={600} fontSize="30px" color="white">
                    Welcome to Gear One App
                  </Typography>

                  <Divider sx={{ height: "0.2vh", mt: 3, mb: 3, backgroundColor: "white", width: "15vh" }} />

                  <Typography variant="body1" fontWeight="normal" fontSize="14px" color="white">
                    Login to Access the Dashboard
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid >
    </>
  )
}

export default Login
