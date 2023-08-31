import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
import url from "../url"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
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
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const onChange = e => {
        console.log(e.target.files);
        setFiles(e.target.files)
    };


    const [startTime, onChange1] = useState(new Date());
    const [endTime, onChange2] = useState(new Date());

    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Category_id, setCategory_id] = useState('');
    const [Description, setDescription] = useState('');
    const [promoted, setPromoted] = useState('');
    const [Locations, setLocation] = useState('');

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    const [selectedFile4, setSelectedFile4] = useState(null);

    const [hidelabel, setHidelabel] = useState(false);
    const [hidelabel1, setHidelabel1] = useState(false);
    const [hidelabel2, setHidelabel2] = useState(false);
    const [hidelabel3, setHidelabel3] = useState(false);
    const [hidelabel4, setHidelabel4] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [hidecrossicon1, setHidecrossicon1] = useState(false);
    const [hidecrossicon2, setHidecrossicon2] = useState(false);
    const [hidecrossicon3, setHidecrossicon3] = useState(false);
    const [hidecrossicon4, setHidecrossicon4] = useState(false);


    const [Screens, setScreens] = useState([]);
    useEffect(() => {
        getAllScreens();
    }, [])
    const [isloading, setIsloading] = useState(false);

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        Object.values(files).forEach(file => {
            formData.append("images", file);
        });

        var InsertAPIURL = `${url}items/update_items`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "Item_ID": location.state.id,
            "user_ID": localStorage.getItem('adminID'),
            "name": Name,
            "price": Price,
            "category_id": Category_id,
            "description": Description,
            "location": Locations,
            "promoted": promoted,
            "start_date": startTime,
            "end_date": endTime,
            "added_by": 'admin'
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
                console.log(selectedFile)
                if (response.message == `Item Updated Successfully!`) {
                    setIsloading(false);
                    navigate("/dietplan")
                } else {
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops',
                        confirmButtonColor: "#B5030B",
                        text: `${response.data.message}`
                    })
                }
            }
            )
    }



    const uploadImage = async (e, num) => {
        console.log("uploadImage");
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        console.log(e.target.files[0])
        if (e.target.files[0] !== null && e.target.files[0] !== undefined) {
            var Data = {
                "id": location.state.id,
                "image": selectedFile,
            };
            formData.append("id", location.state.id)
            formData.append("location", num)

            await axios.put(url + "items/edit_item_image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                setIsloading(false);
                console.log(response.data);
                if (response.data.message == `Image Images Updated Successfully!`) {
                    setIsloading(false);
                } else {
                    setIsloading(false);
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
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#B5030B",
                        text: "Server Down!"
                    })
                });
        }
    }

    const [catagory_name, setCatagory_name] = useState('');


    const getAllScreens = async () => {
        if (location.state.images[0] !== undefined && location.state.images[0] !== null && location.state.images[0] !== '') {
            setHidelabel(true)
        }
        if (location.state.images[1] !== undefined && location.state.images[1] !== null && location.state.images[1] !== '') {
            setHidelabel1(true)
        }
        if (location.state.images[2] !== undefined && location.state.images[2] !== null && location.state.images[2] !== '') {
            setHidelabel2(true)
        }
        if (location.state.images[3] !== undefined && location.state.images[3] !== null && location.state.images[3] !== '') {
            setHidelabel3(true)
        }
        if (location.state.images[4] !== undefined && location.state.images[4] !== null && location.state.images[4] !== '') {
            setHidelabel4(true)
        }
        var InsertAPIURL = `${url}category/GetAll_only_Categories`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == `categories Details`) {
                    // setLogos(response.count);
                    setScreens(response.result);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops..',
                        confirmButtonColor: "#B5030B",
                        text: `${response.data.message}`
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

    const handleImageChange = (e, num) => {
        if (num === 0) {
            setSelectedFile(e.target.files[0]);
            setHidecrossicon(true);
            setHidelabel(true);
            uploadImage(e, num);
        } else if (num === 1) {
            setSelectedFile1(e.target.files[0]);
            setHidecrossicon1(true);
            setHidelabel1(true);
            uploadImage(e, num);
        } else if (num === 2) {
            setSelectedFile2(e.target.files[0]);
            setHidecrossicon2(true);
            setHidelabel2(true);
            uploadImage(e, num);
        } else if (num === 3) {
            setSelectedFile3(e.target.files[0]);
            setHidecrossicon3(true);
            setHidelabel3(true);
            uploadImage(e, num);
        } else if (num === 4) {
            setSelectedFile4(e.target.files[0]);
            setHidecrossicon4(true);
            setHidelabel4(true);
            uploadImage(e, num);
        }

    };

    const clearpreviewimage = (num) => {
        location.state.images[num] = null
        if (num === 0) {
            setSelectedFile(null);
            setHidecrossicon(false);
            setHidelabel(false);

        } else if (num === 1) {
            setSelectedFile1(null);
            setHidecrossicon1(false);
            setHidelabel1(false);

        }
        else if (num === 2) {
            setSelectedFile2(null);
            setHidecrossicon2(false);
            setHidelabel2(false);

        }
        else if (num === 3) {
            setSelectedFile3(null);
            setHidecrossicon3(false);
            setHidelabel3(false);

        }
        else if (num === 4) {
            setSelectedFile4(null);
            setHidecrossicon4(false);
            setHidelabel4(false);

        }

    }

    const [Status, setStatus] = React.useState('');
    const [Screen, setScreen] = React.useState('');
    const [Link, setLink] = React.useState('');
    const [PromotedStatus, setPromotedStatus] = React.useState(false);

    const handleChangePromoted = (event) => {
        if (event.target.value === true) {
            setPromotedStatus(true);
        } else {
            setPromotedStatus(false);
        }

        setPromoted(event.target.value);
    };

    const handleChangeScreen = (event) => {
        setCategory_id(event.target.value);
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
                                Items
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                Edit Items
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Container>
                    <Container>
                        <form onSubmit={handleAdd}>

                            <Grid style={{
                                display: 'flex',
                                align: 'left',
                                justifyContent: 'left',

                            }}
                                p={1}>
                                <Grid pt={2} pb={2}>
                                    <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                                            onChange={(e) => { handleImageChange(e, 0) }}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                            :
                                            location.state.images[0] && <img src={`https://staging-gearone-be.mtechub.com/${location.state.images[0]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossicon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={() => clearpreviewimage(0)} />
                                            </Box>
                                            :
                                            location.state.images[0] ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 22, mt: -24
                                                    }} onClick={() => clearpreviewimage(0)} />
                                                </Box>
                                                :
                                                selectedFile ?
                                                    <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                        <Close sx={{
                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                            color: "white", ml: 22, mt: -24
                                                        }} onClick={() => clearpreviewimage(0)} />
                                                    </Box>
                                                    : null
                                    }
                                </Grid>


                                <Grid pt={2} pb={2}>
                                    <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabel1 ?
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
                                                            onChange={(e) => { handleImageChange(e, 1) }}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFile1 ? <img src={URL.createObjectURL(selectedFile1)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                            :
                                            location.state.images[1] && <img src={`https://staging-gearone-be.mtechub.com/${location.state.images[1]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossicon1 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={() => clearpreviewimage(1)} />
                                            </Box>
                                            :
                                            location.state.images[1] ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 22, mt: -24
                                                    }} onClick={() => clearpreviewimage(1)} />
                                                </Box>
                                                : null
                                    }
                                </Grid>


                                <Grid pt={2} pb={2}>
                                    <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabel2 ?
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
                                                            onChange={(e) => { handleImageChange(e, 2) }}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFile2 ? <img src={URL.createObjectURL(selectedFile2)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                            :
                                            location.state.images[2] && <img src={`https://staging-gearone-be.mtechub.com/${location.state.images[2]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossicon2 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={() => clearpreviewimage(2)} />
                                            </Box>
                                            :
                                            location.state.images[2] ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 22, mt: -24
                                                    }} onClick={() => clearpreviewimage(2)} />
                                                </Box>
                                                : null
                                    }
                                </Grid>

                                <Grid pt={2} pb={2}>
                                    <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabel3 ?
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
                                                            onChange={(e) => { handleImageChange(e, 3) }}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFile3 ? <img src={URL.createObjectURL(selectedFile3)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                            :
                                            location.state.images[3] && <img src={`https://staging-gearone-be.mtechub.com/${location.state.images[3]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossicon3 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={() => clearpreviewimage(3)} />
                                            </Box>
                                            :
                                            location.state.images[3] ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 22, mt: -24
                                                    }} onClick={() => clearpreviewimage(3)} />
                                                </Box>
                                                : null
                                    }
                                </Grid>

                                <Grid pt={2} pb={2}>
                                    <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabel4 ?
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
                                                            onChange={(e) => { handleImageChange(e, 4) }}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFile4 ? <img src={URL.createObjectURL(selectedFile4)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                            :
                                            location.state.images[4] && <img src={`https://staging-gearone-be.mtechub.com/${location.state.images[4]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossicon4 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={() => clearpreviewimage(4)} />
                                            </Box>
                                            :
                                            location.state.images[4] ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 22, mt: -24
                                                    }} onClick={() => clearpreviewimage(4)} />
                                                </Box>
                                                : null
                                    }
                                </Grid>




                            </Grid>


                            <Grid container spacing={0}>

                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Name
                                            </Typography>
                                            <OutlinedInput
                                                placeholder={location.state.name}
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                }}
                                                id="input-with-icon-adornment"
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#EEEEEE",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                            />
                                            <br />
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Price
                                            </Typography>
                                            <OutlinedInput
                                                placeholder={location.state.price}
                                                onChange={(event) => {

                                                    setPrice(event.target.value);
                                                }}
                                                id="input-with-icon-adornment"
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#EEEEEE",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                            />

                                        </Stack>

                                    </FormControl>

                                </Grid>

                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Category
                                            </Typography>
                                            <Select
                                                placeholder={location.state.category_name}
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#EEEEEE",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // label={Screen}
                                                onChange={handleChangeScreen}
                                                displayEmpty
                                                defaultValue={catagory_name}
                                            >

                                                <MenuItem value="" >
                                                    <em>{location.state.category_name}</em>
                                                </MenuItem>

                                                {Screens.map((data) => (
                                                    <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                                                ))}
                                            </Select>
                                            {/* <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            placeholder={Screen}
                                            label={Screen}
                                            onChange={(event) => {
                                                setCategory_id(event.target.value);
                                            }}

                                        // onChange={handleChangeScreen}
                                        >
                                            <MenuItem value="Image Aspects " disabled>
                                                <em>select Category</em>
                                            </MenuItem>

                                            {Screens.map((data) => (
                                                <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                                            ))}
                                        </Select> */}

                                            {/* <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Status
                                        </Typography>
                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={Status}
                                            label="status"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={true}>True</MenuItem>
                                            <MenuItem value={false}>False</MenuItem>
                                        </Select> */}
                                            <br />
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Description
                                            </Typography>
                                            <OutlinedInput
                                                multiline
                                                maxRows={6}
                                                placeholder={location.state.description}
                                                onChange={(event) => {
                                                    setDescription(event.target.value);
                                                }}
                                                id="input-with-icon-adornment"
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#EEEEEE",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                            />
                                            <br />

                                        </Stack>

                                    </FormControl>

                                </Grid>



                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Location
                                            </Typography>
                                            <OutlinedInput
                                                placeholder={location.state.locations}
                                                onChange={(event) => {
                                                    setLocation(event.target.value);
                                                }}
                                                id="input-with-icon-adornment"
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#EEEEEE",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                            />
                                            <br />
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Promoted
                                            </Typography>
                                            <Select
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#EEEEEE",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                placeholder={location.state.promoted}
                                                label={promoted}
                                                onChange={handleChangePromoted}
                                                displayEmpty
                                                defaultValue={location.state.promoted}
                                            >

                                                <MenuItem value="" >
                                                    <em>{location.state.promoted}</em>
                                                </MenuItem>
                                                <MenuItem key={true} value={true}>True</MenuItem>

                                                <MenuItem key={false} value={false}>False</MenuItem>
                                            </Select>
                                        </Stack>

                                    </FormControl>

                                </Grid>

                                <br />
                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Start Date
                                            </Typography>
                                            {PromotedStatus === true ?
                                                <DateTimePicker
                                                    placeholder={location.state.start_date}
                                                    onChange={onChange1} value={startTime} />
                                                :
                                                <DateTimePicker
                                                    disabled
                                                    onChange={onChange1} value={startTime} />
                                            }
                                            <br />
                                            <br />
                                            <br />

                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                End Date
                                            </Typography>
                                            {PromotedStatus === true ?
                                                <DateTimePicker
                                                    placeholder={location.state.end_date}
                                                    onChange={onChange2} value={endTime} />
                                                :
                                                <DateTimePicker
                                                    disabled
                                                    onChange={onChange2} value={endTime} />
                                            }

                                            {/* <OutlinedInput
                                            onChange={(event) => {
                                                setPrice(event.target.value);
                                            }}
                                            id="input-with-icon-adornment"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        /> */}
                                            {/* <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Screen
                                        </Typography>
                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            placeholder={Screen}
                                            label={Screen}
                                            onChange={handleChangeScreen}
                                        >
                                            <MenuItem value="Image Aspects " disabled>
                                                <em>select Screen</em>
                                            </MenuItem>

                                            {Screens.map((data) => (
                                                <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                                            ))}
                                        </Select> */}

                                            {/* <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            sx={{
                                                borderRadius: "20px",
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        /> */}

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
                                        <Button type='submit' value='Upload'
                                            variant="contained" style={btn} onClick={() => { handleAdd() }} >Update</Button>
                                    </Grid>
                                }

                            </Grid>
                        </form>

                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team