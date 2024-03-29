import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
import url from "../url"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';

const btn = {
    letterSpacing: "1px",
    width: '50%',
    marginTop: '40px',
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
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
    const location = useLocation();

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Screens, setScreens] = useState([]);
    useEffect(() => {
        getAllScreens();
    }, [])

    const handleAdd = async () => {
        var InsertAPIURL = `${url}logos/update_logos`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "logo_id":location.state.id,
            "link": Link,
            "screen_id": Screen,
            "active_status":Status
        };
        await fetch(InsertAPIURL, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(async response => {
                console.log(response);
                if (response.message == `Logo Updated Successfully!`) {
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


                           
                            console.log(response.data);
                            if (response.data.message == `Logo Image added Successfully!`) {
                                navigate("/ManageLogos")
                            } else {
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
                        navigate("/ManageLogos")
                    }
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
    const [Screen, setScreen] = React.useState('');
    const [Link, setLink] = React.useState('');

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
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
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
                                    <Box sx={{ pt: 2, width: "50%", height: "25vh", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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

                                        {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "350px", height: "230px" }} />}
                                    </Box>

                                    {
                                        hidecrossicon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{ padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px", color: "white", ml: 38, mt: -22 }} onClick={() => clearpreviewimage()} />
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
                                            link
                                        </Typography>
                                        <OutlinedInput
                                            onChange={(event) => {
                                                setLink(event.target.value);
                                            }}
                                            id="input-with-icon-adornment"
                                            placeholder={location.state.link}
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "darkgray",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Screen
                                        </Typography>
                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "darkgray",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            placeholder={location.state.Screen}
                                            onChange={handleChangeScreen}
                                        >
                                            <MenuItem value="Image Aspects " disabled>
                                                <em>select Screen</em>
                                            </MenuItem>

                                            {Screens.map((data) => (
                                                <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                                            ))}
                                        </Select>

                                    </Stack>

                                </FormControl>

                            </Grid>

                            <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right" >

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
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            placeholder={location.state.status}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={'active'}>Active</MenuItem>
                                            <MenuItem value={'inactive'}>InActive</MenuItem>
                                        </Select>
                                        <br />
                                        <br />

                                    </Stack>

                                </FormControl>

                            </Grid>

                            <Grid xs={12} align="center">
                                <Button variant="contained" style={btn} onClick={() => { handleAdd() }} >Add</Button>
                            </Grid>

                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team
// import { Subscriptions, Notifications, Settings, Person, Close, Upload, Email } from '@mui/icons-material';
// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";

// const btn = {
//     letterSpacing: "1px",
//     width: '50%',
//     marginTop: '40px',
//     marginBottom: '40px',
//     color: 'white',
//     backgroundColor: '#B5030B',
//     borderColor: '#B5030B',
//     height: '50px',
//     padding: '0px',
//     font: 'normal normal normal 17px/26px Roboto',
//     borderRadius: "50px",
//     boxShadow: "none",
//     fontWeight: "medium",
//     boxShadow: "none",
//     borderRadius: "50px",
//     fontSize: "15px",
//     textTransform: "capitalize"
// }

// const Team = () => {
//     const navigate = useNavigate();
//     return (
//         <>
//             <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
//                 <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
//                     <Grid item xs={6} align="" pt={3} >
//                         <Breadcrumbs separator=">" >
//                             <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/dietplan")} >
//                                 Diet Plan
//                             </Typography>

//                             <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
//                                 Update Diet Plan
//                             </Typography>
//                         </Breadcrumbs>
//                     </Grid>
//                 </Grid>

//                 <Divider sx={{ pb: 2 }} />

//                 <Box pl={4} pr={4}>
//                     <Grid container spacing={0}>
//                         <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >
//                             <FormControl sx={{ width: "90%" }} align="left">
//                                 <Stack direction="column" spacing={0} pt={4}>
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Food Name
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         defaultValue="Food Name"
//                                         sx={{
//                                             backgroundColor: "darkgray", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Measures
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         defaultValue="Measures"
//                                         sx={{
//                                             backgroundColor: "darkgray", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Protein
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         defaultValue="Protein"
//                                         sx={{
//                                             backgroundColor: "darkgray", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Fat
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         defaultValue="Fat"
//                                         sx={{
//                                             backgroundColor: "darkgray", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                 </Stack>

//                             </FormControl>

//                         </Grid>

//                         <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >
//                             <FormControl sx={{ width: "90%" }} align="left">
//                                 <Stack direction="column" spacing={0} pt={4}>
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Energy
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         defaultValue="Energy"
//                                         sx={{
//                                             backgroundColor: "darkgray", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Units
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         defaultValue="Units"
//                                         sx={{
//                                             backgroundColor: "darkgray", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Carbs
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         defaultValue="Carbs"
//                                         sx={{
//                                             backgroundColor: "darkgray", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                 </Stack>

//                             </FormControl>

//                         </Grid>
//                     </Grid>
//                 </Box>

//                 <Box pl={2} pr={2}>
//                     <Typography variant="h5" fontWeight={750} pt={3} fontSize="17px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
//                         Other Nutrients<span style={{ fontSize: "16px", color: "#808080", fontWeight: 550 }}>(optional)</span>
//                     </Typography>

//                     <Box pl={2} pr={2}>
//                         <Grid container spacing={0}>
//                             <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

//                                 <FormControl sx={{ width: "90%" }} align="left">
//                                     <Stack direction="column" spacing={0} pt={4}>
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Monosaturated Fats
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue=" Monosaturated Fats"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Sugar
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Sugar"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Sodium
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Sodium"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Iron
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Iron"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Vitamin C
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Vitamin C"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                     </Stack>

//                                 </FormControl>

//                             </Grid>

//                             <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

//                                 <FormControl sx={{ width: "90%" }} align="left">
//                                     <Stack direction="column" spacing={0} pt={4}>
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Saturated Fats
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Saturated Fats"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Fiber
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Fiber"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Calcium
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Calcium"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Vitamin A
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Vitamin A"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Cholestrol
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             defaultValue="Cholestrol"
//                                             sx={{
//                                                 backgroundColor: "darkgray", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                     </Stack>

//                                 </FormControl>

//                             </Grid>

//                             <Grid xs={12} align="center">
//                                 <Button variant="contained" style={btn} onClick={() => navigate("/dietplan")} >Update</Button>
//                             </Grid>

//                         </Grid>
//                     </Box>
//                 </Box>

//             </Box>
//         </>
//     )
// }

// export default Team