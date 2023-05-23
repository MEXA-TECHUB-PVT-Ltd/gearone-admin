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
    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    const [Name, setName] = useState('');
    const [Price, setPrice] = useState('');
    const [Category_id, setCategory_id] = useState('');
    const [Description, setDescription] = useState('');
    const [Location, setLocation] = useState('');

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    // const [selectedFile, setSelectedFile] = useState([]);
    let selectedFile = [];
    const [files, setFiles] = useState([]);
    const onChange = e => {
        console.log(e.target.files);
        setFiles(e.target.files)
    };

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
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false);
                alert(error);
            });
    }




    const handleAdd = async (e) => {
        e.preventDefault();
        setIsloading(true);
        const formData = new FormData();
        Object.values(files).forEach(file => {
            formData.append("images", file);
        });


        var InsertAPIURL = `${url}merchandise/update_merchandise`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "Merchandise_ID": location.state.id,
            "name": Name,
            "price": Price,
            "category_id": Category_id,
            "description": Description,
            "location": Location
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
                if (response.message == `Merchandise Updated Successfully!`) {
                    if (selectedFile !== null && selectedFile !== undefined) {
                        var Data = {
                            "id": response.result[0].id,
                            "images": selectedFile,
                        };
                        formData.append("id", response.result[0].id)
                        if (response.result[0].images.length >= 5) {
                            if (selectedFile !== null && selectedFile !== undefined) {
                                setIsloading(false);
                                navigate("/users")
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Oops...',
                                    confirmButtonColor: "#FF6700",
                                    text: 'No More Images'
                                })
                            }else{
                            navigate("/users")
                            setIsloading(false);
                            }
                        } else {
                            await axios.put(url + "merchandise/add_merchandise_images", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((response) => {
                                setIsloading(false);
                                console.log(response.data);
                                if (response.data.message == `Merchandise Images added Successfully!`) {
                                    navigate("/users")
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
                                    setIsloading(false);
                                    alert(error);
                                });
                        }
                    } else {
                        setIsloading(false);
                        navigate("/users")
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
                setIsloading(false);
                alert(error);
            });
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
                alert(error);
            });
    }

    const handleImageChange = (e) => {
        console.log("length");
        console.log(e.target.files.length);
        for (let i = 0; i < e.target.files.length; i++) {
            selectedFile[i].push(e.target.files[i]);
        }

        setHidecrossicon(true);
        setHidelabel(true);
    };

    const clearpreviewimage = () => {
        // setSelectedFile(null);
        selectedFile = []
        setHidecrossicon(false);
        setHidelabel(false);
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
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
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

                            <Grid container spacing={0}>
                                <Grid xs={12} align="center" p={1}>
                                    <Box pt={2} pb={2}>
                                        <Box sx={{ pt: 2, width: "50%", height: "25vh", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                            {/* {hidelabel ?
                                            null
                                            : */}

                                            <Grid container spacing={0} pt={5}>
                                                <Grid xs={12} align="">
                                                    <Stack align="">
                                                        <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                                                            <Stack direction="column" spacing={1} >
                                                                <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
                                                                <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
                                                            </Stack>
                                                        </label>
                                                        {/* <input multiple type="file" onChange={''} /> */}

                                                        <input
                                                            // style={{ display: "none" }}
                                                            id="fileInput"
                                                            type="file"
                                                            multiple
                                                            onChange={onChange}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                            {/* } */}

                                            {/* {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "350px", height: "230px" }} />} */}
                                        </Box>

                                        {/* {
                                        hidecrossicon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{ padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px", color: "white", ml: 38, mt: -22 }} onClick={() => clearpreviewimage()} />
                                            </Box>
                                            :
                                            null
                                    } */}
                                    </Box>
                                </Grid>

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
                                                    backgroundColor: "#F8F8F8",
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

                                <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right" >

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
                                                placeholder={location.state.category_name}
                                                defaultValue={location.state.category_name}
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
                                                Description
                                            </Typography>
                                            <OutlinedInput
                                                placeholder={location.state.description}
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
                                                location
                                            </Typography>
                                            <OutlinedInput
                                                placeholder={location.state.location}
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