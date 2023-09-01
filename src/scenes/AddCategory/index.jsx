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
    marginTop: '40pxs',
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

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
    const [searchQuery, setSearchQuery] = useState("");
    const getAllPlans = async () => {
        var InsertAPIURL = `${url}ads/get_all_ads`
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
                if (response.status == true) {
                    // setLogos(response.count);
                    console.log("response");
                    setSkills(response.result);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF8B94",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#FF8B94",
                    text: "Server Down!"
                })
            });
    }
    const handleImageClick = (imageId) => {
        // Assuming `Skill` is an array that stores the selected image IDs
        if (Skill.includes(imageId)) {
            // If the image is already selected, remove it from the selection
            setSkill(Skill.filter(id => id !== imageId));
        } else {
            // If the image is not selected, add it to the selection
            setSkill([...Skill, imageId]);
        }
    };
    const handleChangeSkill = (event) => {
        const {
            target: { value },
        } = event;
        setSkill(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };
    const [Skill, setSkill] = React.useState([]);
    const [Skills, setSkills] = useState([]);

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Screens, setScreens] = useState([]);
    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        getAllPlans();
        getAllScreens();
    }, [])


    const handleAdd = async () => {
        setIsloading(true)
        var InsertAPIURL = `${url}category/add_category`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        console.log(selectedFile)
        if (AddName === '' || Skill === "" || selectedFile === null || selectedFile === undefined) {
            setIsloading(false)
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'All Fields Required',
            })
        } else {
            var Data = {
                "name": AddName,
                "banners": Skill
            };
            await fetch(InsertAPIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(async response => {
                    if (response.status === true) {
                        if (selectedFile !== null && selectedFile !== undefined) {
                            var Data = {
                                "id": response.result[0].id,
                                "image": selectedFile,
                            };
                            await axios.put(url + "category/add_category_image", Data, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((response) => {
                                setIsloading(false)
                                console.log(response.data);
                                if (response.data.status === true) {
                                    navigate("/categories")
                                    setIsloading(false)
                                } else {
                                    setIsloading(false)
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
                            navigate("/categories")
                        }
                    } else if (response.message == 'Please Enter screen ID') {
                        setIsloading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonColor: "#B5030B",
                            text: 'Please Select Screen'
                        })
                    } else {
                        setIsloading(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonColor: "#B5030B",
                            text: 'Try Again'
                        })
                    }
                    setIsloading(false)
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        confirmButtonColor: "#B5030B",
                        text: 'Category Added Successfully!',
                    })

                }
                )
                .catch(error => {
                    setIsloading(false)
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
    const [AddName, setAddName] = React.useState('');

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
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/categories")} >
                                Category
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                Add Category
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
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 32, mt: -24
                                                }} onClick={() => clearpreviewimage()} />
                                            </Box>
                                            :
                                            null
                                    }
                                </Box>                            </Grid>

                            <Grid xs={12} md={12} lg={12} xl={12} p={1} align="center" >

                                <FormControl sx={{ width: "50%" }} align="center">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography
                                            variant="paragraph"
                                            pl={1}
                                            pb={1}
                                            sx={{
                                                fontFamily: "Roboto",
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                color: "#1F1F1F",
                                            }}
                                        >
                                            Link
                                        </Typography>
                                        <OutlinedInput
                                            id="input-with-icon-adornment"
                                            placeholder="Link..."
                                            onChange={(event) => {
                                                setAddName(event.target.value);
                                            }}

                                            sx={{

                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                                "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                            }}
                                        />


                                    </Stack>

                                </FormControl>

                            </Grid>

                            <Grid xs={24} md={12} lg={12} xl={12} p={1} align="center" >

                                <FormControl sx={{ width: "100%" }} align="center">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <Typography
                                            variant="paragraph"
                                            pl={1}
                                            pb={1}
                                            sx={{
                                                fontFamily: "Roboto",
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                color: "#1F1F1F",
                                            }}
                                        >
                                            Select Banners
                                        </Typography>

                                        <Grid
    sx={{
        display: 'flex',
        justifyContent: 'center',
    }}
>
    <Grid
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
            maxWidth: '1000px',
            '@media (max-width: 959px)': { // Small and medium screens (xs, sm, and md)
                gridTemplateColumns: '1fr', // Single column
            },
        }}
    >
        {Skills.map((data) => {
            const isSelected = Skill.includes(data.id);
            const backgroundColor = isSelected ? 'red' : '';

            return (
                <div
                    key={data.id}
                    onClick={() => handleImageClick(data.id)}
                    style={{
                        cursor: 'pointer',
                        backgroundColor,
                        padding: '5px',
                        borderRadius: '3px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        alt=""
                        src={`${url}${data.image}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            maxHeight: '300px',
                            maxWidth: '300px',
                        }}
                    />
                    <div>{data.plan_name}</div>
                </div>
            );
        })}
    </Grid>
</Grid>
                                    </Stack>

                                </FormControl>

                            </Grid>
                            {isloading ?
                                <Grid sx={{ mt: '3%' }} xs={12} align="center">
                                    <Button variant="contained" style={btn}>
                                        <ClipLoader loading={isloading}
                                            css={override}
                                            size={10}
                                        />
                                    </Button>
                                </Grid>

                                :

                                <Grid sx={{ mt: '3%' }} xs={12} align="center">
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