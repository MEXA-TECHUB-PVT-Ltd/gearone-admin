import {
    Box, Typography, Grid, Button, Stack, Divider
    , InputAdornment, OutlinedInput, FormControl, Modal, IconButton
} from "@mui/material";
import { Close, Lock, VisibilityOff, Visibility } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import ClipLoader from "react-spinners/ClipLoader";
import ConditionalButton from '../../components/ConditionalButton.js'

import url from '../url'
import OtpInput from 'react-otp-input';

const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}


const style = {
    position: 'absolute',
    top: '50%',
    left: '57%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    outline: "none",
    boxShadow: 0,
    p: 4,
    borderRadius: 5
};

const btn = {
    letterSpacing: "3px",
    width: '100%',
    marginTop: '20px',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
    height: '45px',
    padding: '0px',
    fontWeight: "bold",
    boxShadow: "none",
    borderRadius: "50px",
    fontSize: "15px",
    font: "normal normal normal 17px/26px Roboto",
    textTransform: "capitalize"
}

const Team = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [isloading, setIsloading] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [enteredotp, setEnteredotp] = useState('');



    const [openeditmodal, setOpeneditmodal] = useState(false);
    const handleOpenedit = () => {
        setOpeneditmodal(true);
        setAnchorEl(null);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleCloseedit = () => setOpeneditmodal(false);
    useEffect(() => {

        const adminemail = JSON.parse(localStorage.getItem('adminemail'));
        if (adminemail) {
            setEmail(adminemail);
        }
    }, [])


    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [showPassword1, setShowPassword1] = React.useState(false);

    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);

    const handleMouseDownPassword1 = (event) => {
        event.preventDefault();
    };


    const [showPassword2, setShowPassword2] = React.useState(false);

    const handleClickShowPassword2 = () => setShowPassword2((show) => !show);

    const handleMouseDownPassword2 = (event) => {
        event.preventDefault();
    };



    const verifyotp = async () => {
        setIsloading(true);
        if (enteredotp.length == 0) {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'Enter OTP For Verification'
            })
            setOpen(false);
        } else {
            var InsertAPIURL = `${url}admin/verify_OTP_change_password`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            var Data = {
                "email": email,
                "otp": enteredotp
            };
            await fetch(InsertAPIURL, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    if (response.message == `Password Changed Successfully`) {
                        setIsloading(false);
                        setEnteredotp('');
                        handleCloseedit();
                        Swal.fire({
                            icon: 'success',
                            title: 'Success...',
                            confirmButtonColor: "#B5030B",
                            text: 'Password Changed Successfully'
                        })
                    } else {
                        setEnteredotp('');
                        handleCloseedit();
                        setIsloading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonColor: "#B5030B",
                            text: 'Wrong OTP!'
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

    }

    const updatepasswordWithoutOTP = async () => {
        setIsloading(true);
        if (oldPassword.length === 0) {
            setIsloading(false);
            Swal.fire({
                title: "Warning",
                text: "Old Password Is Required",
                confirmButtonColor: "#B5030B",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else if (password.length === 0) {
            setIsloading(false);
            Swal.fire({
                title: "Warning",
                text: "Password Is Required",
                confirmButtonColor: "#B5030B",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else if (confirmPassword.length === 0) {
            setIsloading(false);
            Swal.fire({
                title: "Warning",
                text: "Confirm Password Is Required",
                confirmButtonColor: "#B5030B",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        else
            if (password !== confirmPassword) {
                setIsloading(false);
                Swal.fire({
                    title: "Warning",
                    text: "Password & Confirm Password Should be same",
                    confirmButtonColor: "#B5030B",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
            } else {
                var InsertAPIURL = `${url}admin/resetPassword_without_Otp`
                var headers = {
                    // 'Authorization': `Bearer ${jwtoken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                console.log(email);
                var Data = {
                    "email": email,
                    "password": oldPassword,
                    "newPassword": password,
                };
                await fetch(InsertAPIURL, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(Data),
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        if (response.status == true) {
                            localStorage.setItem("password", JSON.stringify(password));
                            setIsloading(false);
                            Swal.fire({
                                title: "Success",
                                text: "Password Change Successfully",
                                confirmButtonColor: "#B5030B",
                                icon: "success",
                                confirmButtonText: "OK",
                            });
                        } else {
                            setIsloading(true);
                            setIsloading(false);
                            setTimeout(() => {
                                Swal.fire({
                                    title: "Error",
                                    text: response.message,
                                    confirmButtonColor: "#B5030B",
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                            }, 3000)
                        }
                    }
                    )
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Password Not Updated",
                            confirmButtonColor: "#B5030B",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    });
            }
    }


    const updatepassword = async () => {
        setIsloading(true);
        if (oldPassword.length === 0) {
            setIsloading(false);
            Swal.fire({
                title: "Warning",
                text: "Old Password Is Required",
                confirmButtonColor: "#B5030B",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else if (password.length === 0) {
            setIsloading(false);
            Swal.fire({
                title: "Warning",
                text: "Password Is Required",
                confirmButtonColor: "#B5030B",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else if (confirmPassword.length === 0) {
            setIsloading(false);
            Swal.fire({
                title: "Warning",
                text: "Confirm Password Is Required",
                confirmButtonColor: "#B5030B",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        else
            if (password !== confirmPassword) {
                setIsloading(false);
                Swal.fire({
                    title: "Warning",
                    text: "Password & Confirm Password Should be same",
                    confirmButtonColor: "#B5030B",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
            } else {
                var InsertAPIURL = `${url}admin/resetPassword`
                var headers = {
                    // 'Authorization': `Bearer ${jwtoken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                };
                console.log(email);
                var Data = {
                    "email": email,
                    "password": oldPassword,
                    "newPassword": password,
                };
                await fetch(InsertAPIURL, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(Data),
                })
                    .then(response => response.json())
                    .then(response => {
                        console.log(response);
                        if (response.message == `Sent a verification email to ${email}`) {
                            localStorage.setItem("password", JSON.stringify(password));
                            setIsloading(false);
                            handleOpenedit(true);
                        } else if (response.message == `Incorrect password`) {
                            setIsloading(true);
                            setIsloading(false);
                            setTimeout(() => {
                                Swal.fire({
                                    title: "Error",
                                    text: "Incorrect Old Password",
                                    confirmButtonColor: "#B5030B",
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                            }, 3000)
                        } else {
                            setIsloading(true);
                            setIsloading(false);
                            setTimeout(() => {
                                Swal.fire({
                                    title: "Error",
                                    text: "not found",
                                    confirmButtonColor: "#B5030B",
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                            }, 3000)
                        }
                    }
                    )
                    .catch(error => {
                        Swal.fire({
                            title: "Error",
                            text: "Password Not Updated",
                            confirmButtonColor: "#B5030B",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    });
            }
    }


    return (
        <>

            {/* edit modal */}
            <Modal
                open={openeditmodal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={6} align="left" >
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800}
                                fontSize="large" color="#1F1F1F">Enter OTP</Typography>
                        </Grid>

                        <Grid xs={6} align="right">
                            <Close onClick={() => setOpeneditmodal(false)} />
                        </Grid>

                        <Grid xs={12} sx={{ ml: '60px' }} align="center" pt={7}>
                            <FormControl fullWidth>
                                <OtpInput
                                    value={enteredotp}
                                    onChange={(e) => { setEnteredotp(e) }}
                                    numInputs={4}
                                    // separator={<span>&nbsp;  
                                    // </span>}
                                    containerStyle={{ align: 'center', width: "100%" }}
                                    inputStyle={{ width: "50%", height: "5vh", backgroundColor: "darkgray", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                                    focusStyle={{ width: "50%", height: "5vh", backgroundColor: "darkgray", borderColor: "lightgray", border: "none", borderRadius: "5px" }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={6}>

                        <Grid xs={12} align="center">
                            <Button variant="contained" style={btn} onClick={verifyotp}>Check</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>

            <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={1} >
                    <Grid item xs={6} align="" pt={2} >
                        <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/dashboard")} >
                            Change  Password
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Grid container spacing={0}>
                    <Grid xs={12} aign="center">
                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                            <FormControl className='form' sx={{ width: { lg: "80%", xl: "70%" } }}>
                                <Stack direction="column" spacing={0} pt={{ lg: 4, xl: 9 }}>

                                    <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1} fontSize="13px" sx={{ font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                                        Old Password
                                    </Typography>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        sx={{
                                            backgroundColor: "darkgray",
                                            borderRadius: "50px",
                                            "& fieldset": { border: 'none' },
                                        }}
                                        onChange={(event) => {
                                            setOldPassword(event.target.value);
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

                                    <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1} fontSize="13px" sx={{ font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                                        New Password
                                    </Typography>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                        sx={{
                                            backgroundColor: "darkgray",
                                            borderRadius: "50px",
                                            "& fieldset": { border: 'none' },
                                        }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: "#808080" }} />
                                            </InputAdornment>
                                        }
                                        type={showPassword1 ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword1}
                                                    onMouseDown={handleMouseDownPassword1}
                                                    edge="end"
                                                >
                                                    {showPassword1 ? <VisibilityOff sx={{ color: "#808080" }} /> : <Visibility sx={{ color: "#808080" }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />

                                    <br />

                                    <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1} fontSize="13px" sx={{ font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                                        Confirm Password
                                    </Typography>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        sx={{
                                            backgroundColor: "darkgray",
                                            borderRadius: "50px",
                                            "& fieldset": { border: 'none' },
                                        }}
                                        onChange={(event) => {
                                            setConfirmPassword(event.target.value);
                                        }}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Lock sx={{ color: "#808080" }} />
                                            </InputAdornment>
                                        }
                                        type={showPassword2 ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword2}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword2 ? <VisibilityOff sx={{ color: "#808080" }} /> : <Visibility sx={{ color: "#808080" }} />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />

                                    <br />

                                    <ConditionalButton Title="Change Password" isloading={isloading} handleAdd={
                                        () => {
                                            if (localStorage.getItem('two_factor') === true) {
                                                updatepassword()
                                            } else {
                                                updatepasswordWithoutOTP()
                                            }
                                        }
                                    }
                                    />

                                </Stack>

                            </FormControl>
                        </div>
                    </Grid>
                </Grid>

            </Box>
        </>
    )
}

export default Team