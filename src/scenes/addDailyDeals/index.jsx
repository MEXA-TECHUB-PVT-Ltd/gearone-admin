import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
import url from "../url"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}

const btn = {
    letterSpacing: "1px",
    width: '50%',
    marginTop: '40px',
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
    height: '50px',
    padding: '0px',
    font: 'normal normal normal 17px/26px Roboto',
    borderRadius: "50px",
    boxShadow: "none",
    fontWeight: "medium",
    boxShadow: "none",
    borderRadius: "50px",
    fontSize: "15px",
    textTransform: "capitalize"
}

const Team = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Screens, setScreens] = useState([]);
    const [isloading, setIsloading] = useState(false);

    const handleAdd = async () => {
        setIsloading(true);
        var InsertAPIURL = `${url}dailydeals/add_daily_deals`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var date = new Date(Date.now() + (3600 * 1000 * 24))
        if(Description === '' || Title === '' || selectedFile === null || selectedFile === undefined){
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'Success',
                confirmButtonColor: "#FF6700",
                text: 'All Fields Required'
            })
        }else{
        var Data = {
            "description": Description,
            "title": Title,
            "ends_at": date,
            "status": 'active',
        };
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(async response => {
                console.log(response);
                if (response.message == `Daily Deal added Successfully!`) {
                    if (selectedFile !== null && selectedFile !== undefined) {
                        var Data = {
                            "id": response.result[0].id,
                            "image": selectedFile,
                        };

                        await axios.put(url + "dailydeals/add_dailydeals_image", Data, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }).then((response) => {


                            console.log(response.data);
                            if (response.data.message == `Deal Image Added Successfully!`) {
                                navigate("/subscription")
                            } else {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops2...',
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
                                    text: response.message
                                })
                            });
                    } else {
                        navigate("/subscription")
                    }
                    navigate("/subscription")
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        confirmButtonColor: "#FF6700",
                        text: 'Daily Deal Added Successfully!',
                    })

                } else if (response.message == "Please Enter description") {
                    setIsloading(false);
                    Swal.fire({

                        icon: 'warning',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: 'please enter description'
                    })
                } else {
                    setIsloading(false);
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
                setIsloading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#FF6700",
                    text: 'Server Down!'
                })
            });
        }
    }

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setHidecrossicon(true);
        setHidelabel(true);
    };

    const clearpreviewimage = () => {
        setSelectedFile(null);
        setHidecrossicon(false);
        setHidelabel(false);
    }

    const [Status, setStatus] = React.useState('');
    const [Screen, setScreen] = React.useState('');
    const [Title, setTitle] = React.useState('');
    const [Description, setDescription] = React.useState('');

    const handleChangeScreen = (event) => {
        setScreen(event.target.value);
    };

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <>
            <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
                    <Grid item xs={6} align="" pt={3} >
                        <Breadcrumbs separator=">" >
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/subscription")} >
                                Daily Deal
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                Add Daily Deal
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Container>
                    <Container>
                        <Grid container spacing={0}>
                            <Grid xs={12} align="center" p={1}>
                                <Box pt={2} pb={2}>
                                    <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabel ?
                                            null
                                            :

                                            <Grid container spacing={0} pt={5}>
                                                <Grid xs={12} align="">
                                                    <Stack align="">
                                                        <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                                                            <Stack direction="column" spacing={1} >
                                                                <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
                                                                <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
                                                            </Stack>
                                                        </label>
                                                        <input
                                                            style={{ display: "none" }}
                                                            id="fileInput"
                                                            type="file"
                                                            onChange={handleImageChange}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "300px", height: "200px" }} />}
                                    </Box>

                                    {
                                        hidecrossicon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px",
                                                    color: "white", ml: 32, mt: -24
                                                }} onClick={() => clearpreviewimage()} />
                                            </Box>
                                            :
                                            null
                                    }
                                </Box>
                            </Grid>

                            <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            title
                                        </Typography>
                                        <OutlinedInput
                                            onChange={(event) => {
                                                setTitle(event.target.value);
                                            }}
                                            id="input-with-icon-adornment"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />


                                    </Stack>

                                </FormControl>

                            </Grid>

                            <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Description
                                        </Typography>
                                        <OutlinedInput
                                            onChange={(event) => {
                                                setDescription(event.target.value);
                                            }}
                                            id="input-with-icon-adornment"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />


                                    </Stack>

                                </FormControl>

                            </Grid>
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
                                    <Button variant="contained" style={btn} onClick={() => { handleAdd() }} >Add</Button>
                                </Grid>
                            }
                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team