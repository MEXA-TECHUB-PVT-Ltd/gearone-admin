import {
    Box, Typography, Grid, Stack, Divider, Container
    , FormControl, Select, MenuItem
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
        setIsloading(true);
        var InsertAPIURL = `${url}dailydeals/update_daily_deals`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var date = new Date(Date.now() + (3600 * 1000 * 24))

        var Data = {
            "DailyDeal_ID": location.state.id,
            "description": Description,
            "title": Title,
            "ends_at": date,
            "status": Status
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
                if (response.status === true) {
                    if (selectedFile !== null && selectedFile !== undefined) {
                        var Data = {
                            "id": location.state.id,
                            "image": selectedFile,
                        };

                        await axios.put(url + "dailydeals/add_dailydeals_image", Data, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }).then((response) => {
                            setIsloading(false);
                            console.log(response.data);
                            if (response.data.status === true) {
                                navigate("/subscription")
                                setIsloading(false);
                            } else {
                                setIsloading(false);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error...',
                                    confirmButtonColor: "#B5030B",
                                    text: 'Server Error! Try Again.'
                                })
                            }
                        }
                        )
                            .catch(error => {
                                setIsloading(false);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    confirmButtonColor: "#B5030B",
                                    text: "Server Down!",
                                })
                            });
                    } else {
                        setIsloading(false);
                        navigate("/subscription")
                    }
                    setIsloading(false);
                    navigate("/subscription")
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        confirmButtonColor: "#B5030B",
                        text: 'Daily Deal Updated Successfully!',
                    })

                } else {
                    setIsloading(false);
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
                setIsloading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#B5030B",
                    text: "Srever Error"
                })
            });
    }


    const getAllScreens = async () => {
        if (location.state.image !== undefined && location.state.image !== null && location.state.image !== '') {
            setHidelabel(true)
        }
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
        location.state.image = null
        setSelectedFile(null);
        setHidecrossicon(false);
        setHidelabel(false);
    }

    const [Status, setStatus] = React.useState('');
    const [Title, setTitle] = React.useState('');
    const [Description, setDescription] = React.useState('');

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <>
            <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
                    <Grid item xs={6} align="" pt={3} >
                        <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
                            update Daily Deal
                        </Typography>
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
                                            location.state.image && <img src={`https://staging-gearone-be.mtechub.com/${location.state.image}`} alt="Preview" style={{ width: "300px", height: "200px" }} />
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
                                            label="Title"
                                            defaultValue={location.state.title}
                                            onChange={(event) => {
                                                setTitle(event.target.value);
                                            }}
                                        />
                                        <br />
                                        <CustomTextField
                                            label="Description"
                                            defaultValue={location.state.description}
                                            onChange={(event) => {
                                                setDescription(event.target.value);
                                            }}
                                        />
                                    </Stack>
                                </FormControl>
                            </Grid>
                            <Grid sx={{ mt: '20px' }} xs={12} md={6} lg={6} xl={6} p={1} align="right" >

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
                            <ConditionalButton Title="update Deal" isloading={isloading} handleAdd={handleAdd} />

                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team