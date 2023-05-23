import React, { useState, useEffect } from 'react'
import { Box, Container, Divider, FormControl, Modal, Grid, IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import image from '../../components/Images/logo.png'
import signinmockup from "../../components/Images/signinmockup.png"
import Avatar from '@mui/material/Avatar';
import url from '../url'
import { useNavigate, NavLink } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Close, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

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
    bgcolor: 'background.paper',
    border: '2px solid gray',
    boxShadow: 254,
    p: 2,
    borderRadius: 3,
};

const btn = {
    textTransform: "capitalize",
    letterSpacing: "1px",
    width: '99%',
    marginTop: '40px',
    // marginBottom: '20px',
    color: 'white',
    marginTop: '20px',
    marginBottom: '20px',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
    height: '45px',
    padding: '0px',
    borderRadius: "50px",
    boxShadow: "none",
    font: "normal normal normal 17px/26px Roboto",
    fontWeight: "medium",
}

const InputStyle = {
    width: '100%',
}

const headingStyle = {
    fontSize: '16px',
    color: 'black'
}

const ContainerStyle = {
    padding: '30px',
    height: "110vh",
    paddingTop: '180px',
    backgroundColor: '#e8eff9',
    color: 'white'
}

const gridCont = {
    padding: '30px',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-50px',
    backgroundColor: 'white',
    height: '390px'
}

const logoStyle = {
    width: '100%',
    height: '30%'
}

const heading = "Enter New Password"

function Setnewpassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [email, setEmail] = useState("");
    const [isloading, setIsloading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [jwtoken, setJwtoken] = useState('');
    const [currentuserID, setCurrentuserID] = useState('');
    useEffect(() => {

        const verifiedEmail = localStorage.getItem('verifiedEmail');
        if (verifiedEmail) {
            setEmail(verifiedEmail);
        }
        const adminemail = JSON.parse(localStorage.getItem('adminemail'));
        if (adminemail) {
            setEmail(adminemail);
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

    const updatepassword = async () => {
        if (password.length == 0) {
            Swal.fire({
                title: "Warning",
                text: "Password Is Required",
                confirmButtonColor: "#E79628",
                icon: "warning",
                confirmButtonText: "OK",
            });
        } else if (confirmPassword.length == 0) {
            Swal.fire({
                title: "Warning",
                text: "Confirm Password Is Required",
                confirmButtonColor: "#E79628",
                icon: "warning",
                confirmButtonText: "OK",
            });
        }
        else
            if (password !== confirmPassword) {
                Swal.fire({
                    title: "Warning",
                    text: "Password & Confirm Password Should be same",
                    confirmButtonColor: "#E79628",
                    icon: "warning",
                    confirmButtonText: "OK",
                });
            } else {
                var InsertAPIURL = `${url}admin/newPassword`
                var headers = {
                    // 'Authorization': `Bearer ${jwtoken}`,
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
                        if (response.message == "Password changed") {
                            localStorage.setItem("password", JSON.stringify(password));
                            setIsloading(true);
                            handleOpen();
                            setTimeout(() => {
                                Swal.fire({
                                    title: "Success",
                                    text: "Password Updated Succesfully",
                                    confirmButtonColor: "#FF6700",
                                    icon: "success",
                                    confirmButtonText: "OK",
                                });
                                navigate("/");
                                setIsloading(false);
                            }, 3000)
                        } else {
                            setIsloading(true);
                            setTimeout(() => {
                                Swal.fire({
                                    title: "Error",
                                    text: "Password Not Updated",
                                    confirmButtonColor: "#FF6700",
                                    icon: "error",
                                    confirmButtonText: "OK",
                                });
                                setIsloading(false);
                            }, 3000)
                        }
                    }
                    )
                    .catch(error => {

                        alert(error);
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
                        <Box sx={{ pt: { xs: 0, sm: 0, md: 0, lg: 7, xl: 25 } }} p={{ lg: 10, xl: 15 }}>
                            <Avatar src={image} sx={{ width: 100, height: 100 }} />
                            <Stack pt={5}>
                                <Typography variant="paragraph" fontSize="20px" sx={{ letterSpacing: "1px", font: "normal normal bold 32px/32px Roboto" }} fontWeight="bold" color="#404040">
                                    Reset Password
                                </Typography>

                                <Typography variant="body1" fontSize="13px" fontWeight="normal" color="#808080">
                                    Create a strong password
                                </Typography>

                                <FormControl className='form' sx={{ width: { lg: "90", xl: "80%" } }}>
                                    <Stack direction="column" spacing={0} pt={{ lg: 4, xl: 9 }}>
                                        <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1} fontSize="12px" sx={{ font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                                            New Password
                                        </Typography>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            onChange={(event) => {
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
                                        <Typography variant="paragraph" fontWeight="medium" pl={1} pb={1} fontSize="12px" sx={{ font: "normal normal normal 17px/26px Roboto" }} color="#1F1F1F">
                                            Confirm Password
                                        </Typography>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Lock sx={{ color: "#808080" }} />
                                                </InputAdornment>
                                            }
                                            onChange={(event) => {
                                                setConfirmPassword(event.target.value);
                                            }}

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
                                        <div style={{ display: "flex", justifyContent: "right", alignContent: "right" }}>
                                            <Box width={{ lg: "30%", xl: "17vh" }}>
                                                <NavLink to="/emailverification" style={{ color: "transparent", textDecoration: "none", fontWeight: "bold", fontSize: "13px" }}>Forgot Password?</NavLink>
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
                                            <Button variant="contained" style={btn} onClick={updatepassword}>Reset Password</Button>
                                        }

                                    </Stack>

                                </FormControl>

                            </Stack>
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
                                        Welcome to Gym App
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

                            <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={6} fontWeight={600} color="#1F1F1F">Password Reset Successfully</Typography>

                            <Button variant="contained" style={btn} onClick={() => { navigate("/") }}>Go to sign in</Button>

                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    )
}

export default Setnewpassword