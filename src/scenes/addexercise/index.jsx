import { Box, Typography, Grid, Stack, Divider, Container, FormControl, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Close } from '@mui/icons-material';
import url from "../url"
import CustomTextField from '../../components/CustomTextField.js'
import CustomAutocomplete from '../../components/CustomAutocomplete.js'
import CustomImageUpload from '../../components/CustomImageUpload.js'
import ConditionalButton from '../../components/ConditionalButton.js'

import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';


const Team = () => {

    const navigate = useNavigate();

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Screens, setScreens] = useState([]);
    useEffect(() => {
        getAllScreens();
    }, [])
    const [isloading, setIsloading] = useState(false);

    const handleAdd = async () => {
        setIsloading(true)
        var InsertAPIURL = `${url}ads/add_ad`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        if (Link === '' || Screen === "" || Screen === null || selectedFile === null || selectedFile === undefined) {
            setIsloading(false)
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'All Fields Required',
            })
        }
        else if (!urlPattern.test(Link)) {
            setIsloading(false)
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'Enter Valid Link',
            })
        } else {

            var Data = {
                "link": Link,
                "screen_id": Screen.id,
            };
            if (Screen === '') {
                setIsloading(false);
                Swal.fire({
                    icon: 'warning',
                    title: 'Oops...',
                    confirmButtonColor: "#B5030B",
                    text: 'Please Select Screen '
                })
            } else {
                await fetch(InsertAPIURL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(Data),
                })
                    .then(response => response.json())
                    .then(async response => {
                        console.log(response);
                        if (response.message == `Ad's added Successfully!`) {
                            if (selectedFile !== null && selectedFile !== undefined) {
                                var Data = {
                                    "id": response.result[0].id,
                                    "image": selectedFile,
                                };

                                await axios.put(url + "ads/add_ad_image", Data, {
                                    headers: {
                                        "Content-Type": "multipart/form-data"
                                    }
                                }).then((response) => {
                                    setIsloading(false)

                                    console.log(response.data);
                                    if (response.data.message == `Ad Image added Successfully!`) {
                                        navigate("/manage_banners_ads")
                                        setIsloading(false)
                                        Swal.fire({
                                            icon: 'success',
                                            title: 'Success!',
                                            confirmButtonColor: "#B5030B",
                                            text: 'Banner Added Successfully!',
                                        })
                                    } else {
                                        setIsloading(false)
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            confirmButtonColor: "#B5030B",
                                            text: 'Image Size too Big'
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
                                            text: "Image Size too Large"
                                        })
                                    });
                            } else {
                                setIsloading(false)
                                navigate("/manage_banners_ads")
                            }
                        } else {
                            setIsloading(false)
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
                            text: "server  error"
                        })
                    });
            }
        }
    }


    const getAllScreens = async () => {
        var InsertAPIURL = `${url}screen/get_all_screen`
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
                if (response.message == `All screens Details`) {
                    // setLogos(response.count);
                    setScreens(response.result);
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
                    text: "Server Down!"
                })
            });
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
    const [Screen, setScreen] = React.useState(null);
    const [Link, setLink] = React.useState('');

    const handleChangeScreen = (newValue) => {
        setScreen(newValue);
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
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/manage_banners_ads")} >
                                Banner
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                Add Banner
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
                                            <CustomImageUpload handleImageChange={handleImageChange} />
                                        }

                                        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "300px", height: "200px" }} />}
                                    </Box>
                                    {
                                        hidecrossicon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
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
                                        <CustomTextField
                                            label="Link"
                                            value={Link}
                                            onChange={(event) => {
                                                setLink(event.target.value);
                                            }}
                                        />
                                    </Stack>
                                </FormControl>
                            </Grid>

                            <Grid sx={{mb:'30px'}} xs={12} md={6} lg={6} xl={6} p={1} align="right" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <CustomAutocomplete
                                            label="Screen"
                                            options={Screens}
                                            value={Screen}
                                            onChange={(event, newValue) => handleChangeScreen(newValue)}
                                        />
                                    </Stack>
                                </FormControl>
                            </Grid>
                                <ConditionalButton isloading={isloading} handleAdd={handleAdd} />

                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team