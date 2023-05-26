import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
import url from "../url"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
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
    const [Files, setFiles] = useState([]);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const onChange = e => {
        console.log("e.target.Files");
        console.log(e.target.files);
        setFiles(e.target.files)
        setHidecrossicon(true);
        setHidelabel(true);
    };
    const [isloading, setIsloading] = useState(false);


    const [startTime, onChange1] = useState(new Date());
    const [endTime, onChange2] = useState(new Date());

    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Category_id, setCategory_id] = useState('');
    const [Description, setDescription] = useState('');
    const [promoted, setPromoted] = useState('');
    const [location, setLocation] = useState('');

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState([]);
    // let selectedFile = [];
    const [Screens, setScreens] = useState([]);
    useEffect(() => {
        getAllScreens();
    }, [])
    function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }

    const handleAdd = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        Object.values(Files).forEach(file => {
            formData.append("images", file);
        });

        var InsertAPIURL = `${url}items/add_items`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if (!isNumber(Price)) {
            setIsloading(false);
            Swal.fire({
                icon: 'warning',
                title: 'Oops',
                confirmButtonColor: "#FF6700",
                text: 'Price must be a number'
            })
        } else {
            var Data = {
                "user_ID": localStorage.getItem('adminID'),
                "name": Name,
                "price": Price,
                "category_id": Category_id,
                "description": Description,
                "location": location,
                "promoted": promoted,
                "start_date": startTime,
                "end_date": endTime,
                "added_by": 'admin'
            };
            console.log(Data)
            await fetch(InsertAPIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(async response => {
                    console.log(response);
                    console.log(selectedFile)
                    if (response.message == `product added Successfully!`) {
                        if (selectedFile !== null && selectedFile !== undefined) {
                            formData.append("id", response.result[0].id)
                            await axios.put(url + "items/add_item_images", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((response) => {
                                setIsloading(false);

                                console.log(response.data);
                                if (response.data.message == `items Images added Successfully!`) {
                                    navigate("/dietplan")
                                    setIsloading(false);

                                } else {
                                    setIsloading(false);
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
                            setIsloading(false);
                            navigate("/dietplan")
                        }
                    } else {
                        setIsloading(false);
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops',
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
                        text: "Server Down!"
                    })
                });
        }
    }


    const getAllScreens = async () => {
        var InsertAPIURL = `${url}category/get_all_category`
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
                if (response.message == `All categories Details`) {
                    // setLogos(response.count);
                    setScreens(response.result);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops..',
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
                    text: "Server Down!"
                })
            });
    }

    const handleImageChange = (e) => {
        console.log("length");
        // console.log(e);
        // for (let i = 0; i < e.target.file.length; i++) {
        setSelectedFile(e.target.file);
        // }

        setHidecrossicon(true);
        setHidelabel(true);
    };

    const clearpreviewimage = () => {
        setHidecrossicon(false);
        setHidelabel(false);
        setFiles([]);
        // selectedFile = []
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
                                Add Items
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Container>
                    <Container>
                        <form onSubmit={handleAdd}>

                            <Grid container spacing={0}>
                                <Grid xs={12} p={1}>
                                    <Box align='center' pt={2} pb={2}>

                                        {hidelabel ?
                                            Files &&
                                            <ImageList align="left" sx={{ width: '700px', height: "200px" }} cols={5} rowHeight={"200px"}>
                                                {/* { Files.length(item) => ( */}
                                                <>
                                                    {/* <img key={item} src={URL.createObjectURL(item[0])} alt="Preview" style={{ width: "300px", height: "200px" }} /> */}
                                                    {Files.length > 0 &&
                                                        <ImageListItem key={Files.name}>
                                                            <img
                                                                src={URL.createObjectURL(Files[0])}
                                                                srcSet={URL.createObjectURL(Files[0])}
                                                                alt={Files.name}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    }
                                                    {Files.length > 1 &&
                                                        <ImageListItem key={Files.name}>
                                                            <img
                                                                src={URL.createObjectURL(Files[1])}
                                                                srcSet={URL.createObjectURL(Files[1])}
                                                                alt={Files.name}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    }
                                                    {Files.length > 2 &&
                                                        <ImageListItem key={Files.name}>
                                                            <img
                                                                src={URL.createObjectURL(Files[2])}
                                                                srcSet={URL.createObjectURL(Files[2])}
                                                                alt={Files.name}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    }
                                                    {Files.length > 3 &&
                                                        <ImageListItem key={Files.name}>
                                                            <img
                                                                src={URL.createObjectURL(Files[3])}
                                                                srcSet={URL.createObjectURL(Files[3])}
                                                                alt={Files.name}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    }
                                                    {Files.length > 4 &&
                                                        <ImageListItem key={Files.name}>
                                                            <img
                                                                src={URL.createObjectURL(Files[4])}
                                                                srcSet={URL.createObjectURL(Files[4])}
                                                                alt={Files.name}
                                                                loading="lazy"
                                                            />
                                                        </ImageListItem>
                                                    }


                                                </>
                                                {/* ))
                                                                                                    } */}
                                            </ImageList>


                                            :
                                            <Box align='center' sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                <Grid container spacing={0} pt={5}>
                                                    <Grid xs={12} align="">
                                                        <Stack align="">
                                                            <Stack align="">
                                                                <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                                                                    <Stack direction="column" spacing={1} >
                                                                        <Upload sx={{ fontSize: "50px", color: "#808080", ml: 3, pb: 1 }} />
                                                                        <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Images</span>
                                                                        <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Max 5</span>

                                                                    </Stack>
                                                                </label>
                                                                <input
                                                                    multiple
                                                                    style={{ display: "none" }}
                                                                    id="fileInput"
                                                                    type="file"
                                                                    onChange={onChange}
                                                                    accept="image/*"
                                                                />
                                                            </Stack>

                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        }

                                        {
                                            hidecrossicon ?
                                                <Box sx={{ display: "flex", justifyContent: "left", alignContent: "left" }}>
                                                    <Close sx={{ padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px", color: "white", ml: '150px', mt: -26 }} onClick={() => clearpreviewimage()} />
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
                                                Name
                                            </Typography>
                                            <OutlinedInput
                                                onChange={(event) => {
                                                    setName(event.target.value);
                                                }}
                                                id="input-with-icon-adornment"
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#F8F8F8",
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
                                                    backgroundColor: "#F8F8F8",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                            />
                                            {/* <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Screen
                                        </Typography>
                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
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
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        /> */}

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
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#F8F8F8",
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





                                            {/* <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
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
                                                backgroundColor: "#F8F8F8",
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



                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Location
                                            </Typography>
                                            <OutlinedInput
                                                onChange={(event) => {
                                                    setLocation(event.target.value);
                                                }}
                                                id="input-with-icon-adornment"
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#F8F8F8",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                            />
                                            <br />
                                            <br />
                                            <br />
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Start Date
                                            </Typography>
                                            {PromotedStatus === true ?
                                                <DateTimePicker
                                                    onChange={onChange1} value={startTime} />
                                                :
                                                <DateTimePicker
                                                    disabled
                                                    onChange={onChange1} value={startTime} />
                                            }

                                        </Stack>

                                    </FormControl>

                                </Grid>

                                <br />
                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                    <FormControl sx={{ width: "90%" }} align="left">
                                        <Stack direction="column" spacing={0} pt={2}>
                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                Promoted
                                            </Typography>
                                            <Select
                                                sx={{
                                                    borderRadius: "50px",
                                                    backgroundColor: "#F8F8F8",
                                                    "& fieldset": { border: 'none' },
                                                }}
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                placeholder={promoted}
                                                label={promoted}
                                                onChange={handleChangePromoted}
                                            >
                                                <MenuItem value="Image Aspects " disabled>
                                                    <em>Promoted status</em>
                                                </MenuItem>
                                                <MenuItem key={true} value={true}>True</MenuItem>

                                                <MenuItem key={false} value={false}>False</MenuItem>
                                            </Select>

                                            <br />
                                            <br />
                                            <br />

                                            <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                                End Date
                                            </Typography>
                                            {PromotedStatus === true ?
                                                <DateTimePicker
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
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        /> */}
                                            {/* <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Screen
                                        </Typography>
                                        <Select
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
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
                                                backgroundColor: "#F8F8F8",
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



// import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
// import { Subscriptions, Notifications, Settings, Person, Close, Upload, Email } from '@mui/icons-material';
// import React, { useState } from 'react'
// import { useNavigate } from "react-router-dom";

// const btn = {
//     letterSpacing: "1px",
//     width: '50%',
//     marginTop: '40px',
//     marginBottom: '40px',
//     color: 'white',
//     backgroundColor: '#FF6700',
//     borderColor: '#FF6700',
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
//                                 Logo
//                             </Typography>

//                             <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
//                                 Add Logo
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
//                                         Screen
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         sx={{
//                                             backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Measures
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         sx={{
//                                             backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Protein
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         sx={{
//                                             backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Fat
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         sx={{
//                                             backgroundColor: "#F8F8F8", borderRadius: "50px",
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
//                                         sx={{
//                                             backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Units
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         sx={{
//                                             backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                             "& fieldset": { border: 'none' },
//                                         }}
//                                     />
//                                     <br />
//                                     <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                         Carbs
//                                     </Typography>
//                                     <OutlinedInput
//                                         id="input-with-icon-adornment"
//                                         sx={{
//                                             backgroundColor: "#F8F8F8", borderRadius: "50px",
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
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Sugar
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Sodium
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Iron
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Vitamin C
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
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
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Fiber
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Calcium
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Vitamin A
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         <br />
//                                         <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontWeight: "medium", fontSize: "13px" }} color="#1F1F1F">
//                                             Cholestrol
//                                         </Typography>
//                                         <OutlinedInput
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 backgroundColor: "#F8F8F8", borderRadius: "50px",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                     </Stack>

//                                 </FormControl>

//                             </Grid>

//                             <Grid xs={12} align="center">
//                                 <Button variant="contained" style={btn} onClick={() => navigate("/dietplan")} >Add</Button>
//                             </Grid>

//                         </Grid>
//                     </Box>
//                 </Box>

//             </Box>
//         </>
//     )
// }

// export default Team