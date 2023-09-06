import {
    Box, Autocomplete, Typography, Grid, Stack, Divider
    , Container, FormControl, Select, MenuItem, TextField, Breadcrumbs
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Close } from '@mui/icons-material';
import url from "../url"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';
import CustomTextField from '../../components/CustomTextField.js'
import CustomImageUpload from '../../components/CustomImageUpload.js'
import ConditionalButton from '../../components/ConditionalButton.js'



const Team = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
        var InsertAPIURL = `${url}logos/update_logos`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        if (Link !== '' && !urlPattern.test(Link)) {
            setIsloading(false)
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'Enter Valid Link',
            })
        } else {
            let status = Status
            if (status === '') {
                status = location.state.status
            }
            let link = Link
            if (link === '') {
                link = location.state.link
            }
            let screen = Screen
            if (screen === '') {
                screen = location.state.screen
            }
            console.log(screen);
            var Data = {
                "logo_id": location.state.id,
                "link": link,
                "screen_id": screen.id,
                "active_status": status
            };
            console.log(Data)
            await fetch(InsertAPIURL, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(async response => {
                    console.log(response);
                    if (response.message == `Logo Updated Successfully!`) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            confirmButtonColor: "#B5030B",
                            text: 'Logo Updated Successfully!',
                        })
                        if (selectedFile !== null && selectedFile !== undefined) {
                            var Data = {
                                "id": response.result[0].id,
                                "image": selectedFile,
                            };

                            await axios.put(url + "logos/add_logos_image", Data, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((response) => {
                                setIsloading(false)
                                console.log(response.data);
                                if (response.data.message == `Logo Image added Successfully!`) {
                                    navigate("/ManageLogos")
                                    setIsloading(false)
                                } else {
                                    setIsloading(false)
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops2...',
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
                                        text: response.message
                                    })
                                });
                        } else {
                            setIsloading(false)
                            navigate("/ManageLogos")
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
                        text: "Server Down!"
                    })
                });
        }
    }


    const getAllScreens = async () => {
        if (location.state.image !== undefined && location.state.image !== null && location.state.image !== '') {
            setHidelabel(true)
        }
        // setScreen(location.state.screen)

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
                if (response.status === true) {
                    console.log(response.result);
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
        location.state.image = null
        setSelectedFile(null);
        setHidecrossicon(false);
        setHidelabel(false);
    }


    const [Screen, setScreen] = useState(location.state.screen || '');

    const [Status, setStatus] = React.useState('');
    const [Link, setLink] = React.useState('');



    const handleChangeScreen = (event, newValue) => {
        console.log(newValue)
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
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/ManageLogos")} >
                                Logo
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                update Logo
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
                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabel ?
                                            null
                                            :
                                            <CustomImageUpload handleImageChange={handleImageChange} />

                                        }

                                        {selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                            :
                                            location.state.image && <img src={`${url}${location.state.image}`} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                        }
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
                                            location.state.image ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 32, mt: -24
                                                    }} onClick={() => clearpreviewimage()} />
                                                </Box>
                                                : null
                                    }
                                </Box>
                            </Grid>

                            <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <CustomTextField
                                            label="link"
                                            defaultValue={location.state.link}
                                            onChange={(event) => {
                                                setLink(event.target.value);
                                            }}
                                        />

                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Screen
                                        </Typography>
                                        <Autocomplete
                                            sx={{
                                                borderRadius: '50px',
                                                backgroundColor: 'darkgray',
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none', // Remove the border
                                                },
                                            }}
                                            id="demo-simple-select"
                                            options={Screens}
                                            getOptionLabel={(option) => option.name}
                                            onChange={handleChangeScreen}
                                            displayEmpty
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    displayEmpty
                                                    defaultValue={location.state.screen}
                                                    placeholder={location.state.screen}
                                                />
                                            )}
                                        />



                                    </Stack>

                                </FormControl>

                            </Grid>

                            <Grid sx={{mt:'20px'}} xs={12} md={6} lg={6} xl={6} p={1} align="right" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Status
                                        </Typography>

                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "darkgray",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            id="input-with-icon-adornment"
                                            placeholder={location.state.status}
                                            onChange={(event) => { setStatus(event.target.value); }}
                                            displayEmpty
                                            defaultValue={location.state.status}
                                        >


                                            <MenuItem value={'active'}>Active</MenuItem>
                                            <MenuItem value={'inactive'}>InActive</MenuItem>
                                        </Select>
                                        <br />
                                        <br />

                                    </Stack>

                                </FormControl>

                            </Grid>
                                <ConditionalButton Title="update Logo" isloading={isloading} handleAdd={handleAdd} />
                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team