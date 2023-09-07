import {
    Box, Typography, Grid, Autocomplete, Stack, Divider, Container
    , FormControl, TextField, Breadcrumbs
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Close, Upload } from '@mui/icons-material';
import url from "../url"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import CustomTextField from '../../components/CustomTextField.js'
import ConditionalButton from '../../components/ConditionalButton.js'
import axios from 'axios';

const Team = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [Name, setName] = useState('');
    const [Price, setPrice] = useState(location.state.price);
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
                if (response.status === true) {
                    setData(response.result);
                } else {
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        confirmButtonColor: "#B5030B",
                        text: 'Server Error, Load Again!'
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    confirmButtonColor: "#B5030B",
                    text: "Server Down!"
                })
            });
    }

    function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

    const handleAdd = async (e) => {
        console.log("Data")
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        Object.values(files).forEach(file => {
            formData.append("images", file);
        });
        console.log("Data1")
        var InsertAPIURL = `${url}merchandise/update_merchandise`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        console.log("Data3")
        if (!isNumber(Price)) {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'Oops',
                confirmButtonColor: "#B5030B",
                text: 'Price must be a number'
            })
        } else {
            var Data = {
                "Merchandise_ID": location.state.id,
                "name": Name,
                "price": Price,
                "category_id": Category_id.id,
                "description": Description,
                "location": Location
            };
            console.log("Data4")
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
                    if (response.status === true) {
                        setIsloading(false);
                        console.log("Data5")
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            confirmButtonColor: "#B5030B",
                            text: 'Merchandise Updated Successfully!',
                        })
                        setIsloading(false);
                        navigate("/users")
                    } else {
                        console.log("Data6")
                        setIsloading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            confirmButtonColor: "#B5030B",
                            text: 'Server Error, Try Again'
                        })
                    }
                }
                )
                .catch(error => {
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        confirmButtonColor: "#B5030B",
                        text: "Server Down!"
                    })
                });
        }
    }

    const uploadImage = async (e, num) => {
        console.log("uploadImage");
        console.log(e);
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        console.log(e.target.files[0])
        if (e.target.files[0] !== null && e.target.files[0] !== undefined) {
            formData.append("id", location.state.id)
            formData.append("location", num)

            await axios.put(url + "merchandise/edit_merchandise_image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((response) => {
                setIsloading(false);
                console.log(response.data);
                if (response.data.status === true) {
                    setIsloading(false);
                } else {
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        confirmButtonColor: "#B5030B",
                        text: 'Server Error'
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

    const getAllScreens = async () => {
        if (location.state.images[0] !== undefined && location.state.images[0] !== null && location.state.images[0] !== '') {
            setHidelabel(true)
        }
        if (location.state.images[1] !== undefined && location.state.images[1] !== null && location.state.images[1] !== '') {
            setHidelabel1(true)
        }
        if (location.state.images[2] !== undefined && location.state.images[2] !== null && location.state.images[2] !== '') {
            console.log(location.state.images[2]);
            setHidelabel2(true)
        }
        if (location.state.images[3] !== undefined && location.state.images[3] !== null && location.state.images[3] !== '') {
            console.log(location.state.images[3]);
            setHidelabel3(true)
        }
        if (location.state.images[4] !== undefined && location.state.images[4] !== null && location.state.images[4] !== '') {
            console.log(location.state.images[4]);
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
                if (response.status === true) {
                    // setLogos(response.count);
                    setScreens(response.result);
                }
            }
            )
            .catch(error => {
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

    const clearpreviewimage = (e, num) => {
        location.state.images[num] = null
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




    const handleChangeScreen = (event, newValue) => {
        console.log(newValue)
        setCategory_id(newValue);
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
                                Edit Merchandise
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

                                        location.state.images[0] &&
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                            <img src={`${url}${location.state.images[0]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>
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
                                            location.state.images[0] ?
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
                                        location.state.images[1] &&
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                            <img src={`${url}${location.state.images[1]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>

                                    }

                                    {
                                        hidecrossicon1 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 1)} />
                                            </Box>
                                            :
                                            location.state.images[1] ?
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
                                        location.state.images[2] &&
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                            <img src={`${url}${location.state.images[2]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>
                                    }

                                    {
                                        hidecrossicon2 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 2)} />
                                            </Box>
                                            :
                                            location.state.images[2] ?
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
                                        location.state.images[3] &&
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                            <img src={`${url}${location.state.images[3]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>

                                    }

                                    {
                                        hidecrossicon3 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 3)} />
                                            </Box>
                                            :
                                            location.state.images[3] ?
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
                                        location.state.images[4] &&
                                        <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                            <img src={`${url}${location.state.images[4]}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
                                        </Box>

                                    }

                                    {
                                        hidecrossicon4 ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 22, mt: -24
                                                }} onClick={(e) => clearpreviewimage(e, 4)} />
                                            </Box>
                                            :
                                            location.state.images[4] ?
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
                                            <CustomTextField
                                                label="Name"
                                                defaultValue={location.state.name}
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                }}
                                            />
                                            <br />
                                            <CustomTextField
                                                label="Price"
                                                defaultValue={location.state.price}
                                                onChange={(event) => {
                                                    setPrice(event.target.value);
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
                                                        defaultValue={location.state.catagory_name}
                                                        placeholder={location.state.catagory_name}
                                                    />
                                                )}
                                            />



                                            <br />
                                            <CustomTextField
                                                label="Location"
                                                defaultValue={location.state.location}
                                                onChange={(event) => {
                                                    setLocation(event.target.value);
                                                }}
                                            />
                                        </Stack>

                                    </FormControl>

                                </Grid>


                                <Grid sx={{mt:'20px'}} xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                    <FormControl sx={{ width: "90%" }} align="left">

                                        <Stack direction="column" spacing={0} pt={2}>

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
                                <ConditionalButton Title="update Merchandise" isloading={isloading} handleAdd={handleAdd} />

                            </Grid>
                        </form>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team