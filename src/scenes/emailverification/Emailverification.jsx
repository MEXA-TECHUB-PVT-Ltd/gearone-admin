import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Box, Container, Divider, FormControl, Grid, Modal, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material'
import { Email, Close } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import image from '../../components/Images/logo.svg'
import signinmockup from "../../components/Images/signinmockup.jpeg"
import Avatar from '@mui/material/Avatar';
import url from '../url'
import { NavLink } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 300,
    // height: 220,
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 254,
    p: 2,
    borderRadius: 3
};

const btn = {
    letterSpacing: "1px",
    width: '100%',
    marginTop: '70px',
    // marginBottom: '20px',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
    height: '45px',
    padding: '0px',
    fontWeight: "medium",
    font: "normal normal normal 17px/26px Roboto",
    borderRadius: "50px",
    boxShadow: "none",
    textTransform: "capitalize"
}

function Emailverification() {
    const navigate = useNavigate();

    const [hide, setHide] = useState(false);
    const [emailmessage, setEmailmessage] = useState(false);
    const [email, setEmail] = useState('');
    const [adminid, setAdminid] = useState('');
    const [enteredotp, setEnteredotp] = useState('');
    const [responseemail, setResponseemail] = useState();
    const [responseotp, setResponseotp] = useState();
    const [isloading, setIsloading] = useState(false);
    let [loading, setLoading] = useState(false);
    let [color, setColor] = useState("#ffffff");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [close, setClose] = useState(null);
    const handleclose = () => {
        setClose(null);
    };

    useEffect(() => {
        const ID = JSON.parse(localStorage.getItem('adminID'));
        if (ID) {
            setAdminid(ID)
        }
    }, [])

    const verification = async () => {
        setIsloading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        if (email.length == 0) {
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#FF6700",
                text: 'Email is Required'
            })
        } else if (!isValidEmail) {
            Swal.fire({
                icon: 'error',
                title: 'Warning',
                confirmButtonColor: "#FF6700",
                text: 'Enter Valid Email !'
            })
        } else {
            var InsertAPIURL = `${url}auth/verifyEmail`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            var Data = {
                "email": email,
            };
            Swal.fire({
                title: 'Please Wait...',
                text: 'An Otp is sending on your email',
                icon: "success",
                confirmButtonText: "OK",
                confirmButtonColor: "#FF6700",
            })
            await fetch(InsertAPIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    if (response.message == `Sent a verification email to ${email}`) {
                        // verification();
                        setHide(true);
                        setIsloading(false);
                        // setTimeout(() => {
                        //   localStorage.setItem("jwtoken", JSON.stringify(response.jwt_token));
                        //   localStorage.setItem("adminemail", JSON.stringify(response.result.email));
                        //   localStorage.setItem("adminname", JSON.stringify(response.result.user_name));
                        //   localStorage.setItem("adminimageurl", JSON.stringify(response.result.img));
                        //   localStorage.setItem("adminID", JSON.stringify(response.result.id));
                        //   localStorage.setItem("password", JSON.stringify(password));
                        //   navigate("/dashboard");
                        //   setIsloading(false);
                        // }, 3000)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonColor: "#FF6700",
                            text: 'Email Not Registered',
                        })
                    }
                }
                )
                .catch(error => {
                              Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text:  "Server error"
          })
                });
        }
        // setEmailmessage(true);
        // setIsloading(true);
        // setTimeout(() => {
        //     setOpen(true);
        //     setEmailmessage(false);
        //     setIsloading(false);
        // }, 3000) 
    }

    const verifyotp = async () => {

        if (enteredotp.length == 0) {
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#FF6700",
                text: 'Enter OTP For Verification'
            })
            setOpen(false);
            // setLoading(true);
            // setTimeout(() => {
            //     Swal.fire({
            //         title: "Success",
            //         text: "User Found , OTP Successfully Matched",
            //         confirmButtonColor: "#FF6700",
            //         icon: "success",
            //         confirmButtonText: "OK",
            //     });
            //     setEnteredotp('');
            //     navigate("/setnewpassword");
            //     setOpen(false);
            //     setLoading(false);
            // }, 3000)
        } else {
            var InsertAPIURL = `${url}auth/verifyOTP`
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
                    if (response.message == `OTP verified`) {
                        setIsloading(true);
                        setIsloading(false);
                        handleOpen();
                        //   setTimeout(() => {
                        // localStorage.setItem("jwtoken", JSON.stringify(response.token));
                        localStorage.setItem("verifiedEmail", email);
                        // localStorage.setItem("adminname", 'admin');
                        // localStorage.setItem("adminimageurl", 'admin');
                        // localStorage.setItem("adminID", JSON.stringify(response.result[0].id));
                        // localStorage.setItem("password", JSON.stringify(password));
                        // navigate("/setnewpassword");
                        // setIsloading(false);
                        //   }, 3000)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonColor: "#FF6700",
                            text: 'Wrong OTP!'
                        })
                    }
                }
                )
                .catch(error => {
                              Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text:  "Server error"
          })
                });
        }

    }


    // const verifyotp = async () => {

    //     if (enteredotp.length == 0) {
    //         Swal.fire({
    //             icon: 'warning',
    //             title: 'warning',
    //             confirmButtonColor: "#FF6700",
    //             text: 'Enter OTP For Verification'
    //         })
    //         setOpen(false);
    //     } else if (enteredotp == responseotp) {
    //         setLoading(true);
    //         setTimeout(() => {
    //             Swal.fire({
    //                 title: "Success",
    //                 text: "User Found , OTP Successfully Matched",
    //                 confirmButtonColor: "#FF6700",
    //                 icon: "success",
    //                 confirmButtonText: "OK",
    //             });
    //             setEnteredotp('');
    //             navigate("/setnewpassword");
    //             setOpen(false);
    //             setLoading(false);
    //         }, 3000)
    //     } else {
    //         setLoading(true);
    //         setTimeout(() => {
    //             Swal.fire({
    //                 title: "Error",
    //                 text: "OTP Not Matched",
    //                 confirmButtonColor: "#FF6700",
    //                 icon: "error",
    //                 confirmButtonText: "OK",
    //             });
    //             setOpen(false);
    //             setLoading(false);
    //         }, 3000)
    //     }
    // }

    return (
        <>
            <Grid container spacig={0}>
                <Grid xs={12} md={6} lg={6} xl={6} align="">
                    <Container>
                        <Box sx={{ pt: { xs: 0, sm: 0, md: 0, lg: 12, xl: 30 } }} p={{ lg: 10, xl: 15 }}>
                            <img src={image} sx={{ width: 100, height: 100 }} />

                            {hide ?
                                <Stack pt={5}>
                                    <Typography variant="paragraph" fontSize="20px" sx={{ letterSpacing: "1px", font: "normal normal bold 32px/32px Roboto" }} fontWeight="bold" color="#404040">
                                        Verification
                                    </Typography>

                                    <Typography variant="body1" fontSize="13px" fontWeight="normal" color="#808080">
                                        Enter code that you received on your mail
                                    </Typography>

                                    <FormControl className='form' sx={{ width: { lg: "90%", xl: "80%" } }}>
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
                                                        inputStyle={{ width: "40%", height: "5vh", backgroundColor: "#EEEEEE", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                                                        focusStyle={{ width: "40%", height: "5vh", backgroundColor: "#EEEEEE", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                                                    />
                                                </Stack>
                                            </div>

                                            {isloading ?
                                                <Button variant="contained" style={btn}>
                                                    <ClipLoader color={color} loading={isloading}
                                                        css={override}
                                                        size={10}
                                                    />
                                                </Button>
                                                :
                                                <Button variant="contained" style={btn} onClick={verifyotp}>Verify</Button>
                                            }

                                        </Stack>

                                    </FormControl>

                                </Stack>
                                :
                                <Stack pt={5}>
                                    <Typography variant="paragraph" fontSize="20px" sx={{ letterSpacing: "1px", font: "normal normal bold 32px/32px Roboto" }} fontWeight="bold" color="#404040">
                                        Forget Password
                                    </Typography>

                                    <Typography variant="body1" fontSize="13px" fontWeight="normal" color="#808080">
                                        Enter your email address for verfication code
                                    </Typography>

                                    <FormControl className='form' sx={{ width: { lg: "90%", xl: "80%" } }}>
                                        <Stack direction="column" spacing={0} pt={8} sx={{ pb: 8 }} >
                                            <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1} fontSize="12px" sx={{ font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
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

                                            {isloading ?
                                                <Button variant="contained" style={btn}>
                                                    <ClipLoader color={color} loading={isloading}
                                                        css={override}
                                                        size={10}
                                                    />
                                                </Button>
                                                :
                                                <Button variant="contained" style={btn} onClick={() => verification()}> Send Code</Button>
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
                                        Welcome to Gear One
                                    </Typography>

                                    <Divider sx={{ height: "0.2vh", mt: 3, mb: 3, backgroundColor: "white", width: "15vh" }} />

                                    <Typography variant="body1" fontWeight="normal" fontSize="14px" color="white">
                                        Lorem ipsum dolor sit amet, conset
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

                <Modal
                    open={open}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                        <Grid container spacing={0}>
                            <Grid xs={12} align="right">
                                <Close onClick={() => setOpen(false)} />
                            </Grid>

                            <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 5, xl: 5 }}>
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Success</Typography>

                                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Code Verified Successfully</Typography>

                                <Button variant="contained" style={btn} onClick={() => { navigate("/setnewpassword") }}>Reset Password</Button>

                            </Grid>
                        </Grid>
                    </Box>
                </Modal>

            </Grid>
        </>
    )
}

export default Emailverification
