import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
import url from "../url"
import { useLocation, useNavigate } from "react-router-dom"
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
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [catagory_name, setCatagory_name] = useState('');
    const [Category_id, setCategory_id] = useState('');
    const [Description, setDescription] = useState('');
    const [Location, setLocation] = useState('');
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

    // let selectedFile = [];
    const [files, setFiles] = useState([]);
    const onChange = e => {
        console.log(e.target.files);
        setFiles(e.target.files)
    };
    const [ID, setID] = useState('');
    const [Screens, setScreens] = useState([]);
    const [Data, setData] = useState([]);
    useEffect(() => {
        getAllScreens();
        getData();
    }, [])
    const [isloading, setIsloading] = useState(false);

    const getData = async () => {
        var InsertAPIURL = `${url}merchandise/get_merchandise`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "Merchandise_ID": location.state.id,
        };
        console.log(Data)
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(async response => {
                if (response.message == `merchandise data`) {
                    setData(response.result);
                } else {
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops',
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




    const handleAdd = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        Object.values(files).forEach(file => {
            formData.append("images", file);
        });
        var InsertAPIURL = `${url}merchandise/add_merchandise`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        if (!isNumber(Price)) {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'Price must be a number'
            })
        } else if (Category_id === '') {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'Please Select a Category'
            })
        }
        else if (Name === '') {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'Please Enter Name'
            })
        }
        else if (Description === '') {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'Please Enter Description'
            })
        }
        else if (Location === '') {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'Oops',
                confirmButtonColor: "#B5030B",
                text: 'Please Enter Location'
            })
        } else {
            var Data = {
                "adminID": localStorage.getItem("adminID"),
                "name": Name,
                "price": Price,
                "category_id": Category_id,
                "description": Description,
                "location": Location
            };
            console.log(Data)
            await fetch(InsertAPIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(async response => {
                    console.log(response)
                    if (response.status === true) {
                        if (selectedFile !== null && selectedFile !== undefined) {
                            formData.append("images", selectedFile)
                            if (selectedFile1 !== null && selectedFile1 !== undefined) {
                                formData.append("images", selectedFile1)
                            }
                            if (selectedFile2 !== null && selectedFile2 !== undefined) {
                                formData.append("images", selectedFile2)
                            }
                            if (selectedFile3 !== null && selectedFile3 !== undefined) {
                                formData.append("images", selectedFile3)
                            }
                            if (selectedFile4 !== null && selectedFile4 !== undefined) {
                                formData.append("images", selectedFile4)
                            }
                            formData.append("id", response.result[0].id);
                            console.log(response.result[0].id);
                            console.log(formData)

                            await axios.put(url + "merchandise/add_merchandise_images", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((response) => {
                                if (response.data.message == `Merchandise Images added Successfully!`) {
                                    navigate("/users")
                                    setIsloading(false);
                                } else {
                                    setIsloading(false);
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        confirmButtonColor: "#B5030B",
                                        text: 'Try Again'
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
                                        text: "Server Issue! Try again"
                                    })
                                });
                        } else {
                            setIsloading(false);
                            navigate("/users")
                        }
                        setIsloading(false);
                        navigate("/users")
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            confirmButtonColor: "#B5030B",
                            text: 'Merchandise Added Successfully!',
                        })

                    } else if(response.message === 'Entered Admin ID is not present'){
                        setIsloading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops',
                            confirmButtonColor: "#B5030B",
                            text: 'Session Expired, Login Again!'
                        })
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops',
                            confirmButtonColor: "#B5030B",
                            text: response.message
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

    const uploadImage = async (e, num) => {
        if (ID === '') {
            var InsertAPIURL = `${url}merchandise/add_merchandise`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            var Data = {
                "adminID": localStorage.getItem('adminID'),
                "name": '1',
                "price": '1',
                "category_id": '1',
                "description": '1',
                "location": '1'
            };
            console.log(Data)
            await fetch(InsertAPIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(async response => {
                    if (response.message == `Merchandise added Successfully!`) {
                        console.log(response)
                        setID(response.result.id);
                        e.preventDefault();
                        setIsloading(true);
                        const formData = new FormData();
                        formData.append("image", e.target.files[0]);
                        console.log(e.target.files[0])
                        if (e.target.files[0] !== null && e.target.files[0] !== undefined) {
                            var Data = {
                                "id": response.result.id,
                                "image": selectedFile,
                            };
                            formData.append("id", ID)
                            formData.append("location", num)

                            await axios.put(url + "merchandise/edit_merchandise_image", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((response) => {
                                setIsloading(false);
                                console.log(response.data);
                                if (response.data.message == `merchandise Images Updated Successfully!`) {
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
                });
        } else {
            e.preventDefault();
            setIsloading(true);
            const formData = new FormData();
            formData.append("image", e.target.files[0]);
            if (e.target.files[0] !== null && e.target.files[0] !== undefined) {
                var Data = {
                    "id": ID,
                    "image": selectedFile,
                };
                formData.append("id", ID)
                formData.append("location", num)

                await axios.put(url + "merchandise/edit_merchandise_image", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }).then((response) => {
                    setIsloading(false);
                    console.log(response.data);
                    if (response.data.message == `merchandise Images Updated Successfully!`) {
                        setIsloading(false);
                        console.log(response)
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
    }



    const getAllScreens = async () => {
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

    const handleImageChange = (e, num) => {
        if (num === 0) {
            setSelectedFile(e.target.files[0]);
            setHidecrossicon(true);
            setHidelabel(true);
            // uploadImage(e, num);
        } else if (num === 1) {
            setSelectedFile1(e.target.files[0]);
            setHidecrossicon1(true);
            setHidelabel1(true);
            // uploadImage(e, num);
        } else if (num === 2) {
            setSelectedFile2(e.target.files[0]);
            setHidecrossicon2(true);
            setHidelabel2(true);
            // uploadImage(e, num);
        } else if (num === 3) {
            setSelectedFile3(e.target.files[0]);
            setHidecrossicon3(true);
            setHidelabel3(true);
            // uploadImage(e, num);
        } else if (num === 4) {
            setSelectedFile4(e.target.files[0]);
            setHidecrossicon4(true);
            setHidelabel4(true);
            // uploadImage(e, num);
        }

    };

    const clearpreviewimage = (e, num) => {
        if (num === 0) {
            setSelectedFile(null);
            setHidecrossicon(false);
            setHidelabel(false);
            // DeleteImage( num);

        } else if (num === 1) {
            setSelectedFile1(null);
            setHidecrossicon1(false);
            setHidelabel1(false);
            // DeleteImage( num);

        }
        else if (num === 2) {
            setSelectedFile2(null);
            setHidecrossicon2(false);
            setHidelabel2(false);
            // DeleteImage(num);

        }
        else if (num === 3) {
            setSelectedFile3(null);
            setHidecrossicon3(false);
            setHidelabel3(false);
            // DeleteImage( num);

        }
        else if (num === 4) {
            setSelectedFile4(null);
            setHidecrossicon4(false);
            setHidelabel4(false);
            // DeleteImage( num);

        }

    }

    const [Status, setStatus] = React.useState('');
    const [Screen, setScreen] = React.useState('');
    const [Link, setLink] = React.useState('');

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
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/users")} >
                                Merchandise
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                Add Merchandise
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

                                    {hidelabel ?
                                        null
                                        :
                                        hidelabel || hidelabel1 || hidelabel2 || hidelabel3 ?
                                            <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                                                multiple
                                                                onChange={(e) => { handleImageChange(e, 0) }}
                                                                accept="image/*"
                                                            />
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                            :
                                            <Box sx={{ ml: '400px', pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                            </Box>

                                    }

                                    {selectedFile ?
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                            <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>
                                        :
                                        null
                                    }

                                    {
                                        hidecrossicon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 0)} />
                                            </Box>
                                            :
                                            selectedFile ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 22, mt: -24
                                                    }} onClick={(e) => clearpreviewimage(e, 0)} />
                                                </Box>
                                                : null
                                    }
                                </Grid>


                                <Grid pt={2} pb={2}>
                                    {hidelabel ?
                                        hidelabel1 ?
                                            null
                                            :
                                            <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                            </Box>
                                        :
                                        null
                                    }

                                    {selectedFile1 ?
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                            <img src={URL.createObjectURL(selectedFile1)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>
                                        :
                                        null
                                    }

                                    {
                                        hidecrossicon1 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 1)} />
                                            </Box>
                                            : null
                                    }
                                </Grid>


                                <Grid pt={2} pb={2}>
                                    {hidelabel && hidelabel1 ?
                                        hidelabel2 ?
                                            null
                                            :
                                            <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                            </Box>
                                        :
                                        null
                                    }

                                    {selectedFile2 ?
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                            <img src={URL.createObjectURL(selectedFile2)} alt="Preview" style={{ width: "200px", height: "200px" }} />

                                        </Box>
                                        :
                                        null
                                    }

                                    {
                                        hidecrossicon2 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 2)} />
                                            </Box>
                                            : null
                                    }
                                </Grid>

                                <Grid pt={2} pb={2}>
                                    {hidelabel && hidelabel1 && hidelabel2 ?
                                        hidelabel3 ?
                                            null
                                            :
                                            <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                            </Box>

                                        :
                                        null
                                    }

                                    {selectedFile3 ?
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                            <img src={URL.createObjectURL(selectedFile3)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>

                                        :
                                        null
                                    }

                                    {
                                        hidecrossicon3 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 3)} />
                                            </Box>
                                            : null
                                    }
                                </Grid>

                                <Grid pt={2} pb={2}>
                                    {hidelabel && hidelabel1 && hidelabel2 && hidelabel3 ?
                                        hidelabel4 ?
                                            null
                                            :
                                            <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                            </Box>
                                        : null
                                    }

                                    {selectedFile4 ?
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                            <img src={URL.createObjectURL(selectedFile4)} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>
                                        :
                                        null
                                    }

                                    {
                                        hidecrossicon4 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 4)} />
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

                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right" >

                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Category
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
                                                    <em>select Category</em>
                                                </MenuItem>

                                                {Screens.map((data) => (
                                                    <MenuItem key={data.id} value={data.id}>{`${data.name}`}</MenuItem>
                                                ))}
                                            </Select>
                                            <br />
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                location
                                            </Typography>
                                            <OutlinedInput
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

                                        </Stack>

                                    </FormControl>

                                </Grid>

                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="">
                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Description
                                            </Typography>
                                            <OutlinedInput
                                                multiline
                                                onChange={(event) => {
                                                    setDescription(event.target.value);
                                                }}
                                                id="input-with-icon-adornment"
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#EEEEEE",
                                                    "& fieldset": { border: 'none' },
                                                    resize: 'none',
                                                    overflow: 'hidden',
                                                    transition: 'height 0.2s',
                                                    height: 'auto',
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
                                        <Button type='submit' value='Upload'
                                            variant="contained" style={btn} onClick={() => { handleAdd() }} >Add</Button>
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
