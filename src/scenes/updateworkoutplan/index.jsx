import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Breadcrumbs } from "@mui/material";
import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import workout1 from '../../components/Images/workout1.png'
import workout2 from '../../components/Images/workout2.png'
import workout3 from '../../components/Images/workout3.png'
import workout4 from '../../components/Images/workout4.png'
import workout5 from '../../components/Images/workout5.png'
import workout6 from '../../components/Images/workout6.png'
import workout7 from '../../components/Images/workout7.png'
import workout8 from '../../components/Images/workout8.png'

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

const btnchnge = {
    letterSpacing: "1px",
    width: 'content-fit',
    marginTop: '10px',
    // marginBottom: '40px',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',  
    paddingLeft: "40px",
    paddingRight: "40px",
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

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

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

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <>
            <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
                    <Grid item xs={6} align="" pt={3} >
                        <Breadcrumbs separator=">" >
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/workoutplans")} >
                                Workout Plans
                            </Typography>

                            <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
                                Update Workout Plan
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
                                    <Box sx={{
                                        pt: 2, width: "50%", height: "35vh", p: "0.5px",
                                        backgroundImage: `url(${workout6})`,
                                        borderTopRightRadius: "20px",
                                        borderBottomLeftRadius: "20px",
                                        borderBottomRightRadius: "20px",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat"
                                    }}>
                                        <Box height="35vh" sx={{ borderRadius: "10px", borderTopRightRadius: "20px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px", background: "rgba(0, 0, 0, 0.2)" }}>
                                            <Grid container spacing={0}>
                                                <Grid xs={11.5} align="right">
                                                    <Button variant="contained" style={btnchnge}>Change</Button>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid xs={12} md={6} lg={6} xl={6} p={1} align="" >

                                <FormControl sx={{ width: "90%" }} align="left">
                                    <Stack direction="column" spacing={0} pt={4}>
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Category
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            defaultValue="Category1"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        >
                                            <MenuItem value={10}>Category1</MenuItem>
                                            <MenuItem value={20}>Category2</MenuItem>
                                            <MenuItem value={30}>Category3</MenuItem>
                                        </Select>
                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Time of workout
                                        </Typography>
                                        <OutlinedInput
                                            id="input-with-icon-adornment"
                                            defaultValue="2 hrs 32 mins"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Workout Type
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            defaultValue="Paid"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        >
                                            <MenuItem value="paid">Paid</MenuItem>
                                            <MenuItem value="unpaid">Unpaid</MenuItem>
                                        </Select>
                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Description
                                        </Typography>
                                        <TextField
                                            id="outlined-multiline-static"
                                            multiline
                                            rows={4}
                                            defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,"
                                            sx={{
                                                borderRadius: "20px",
                                                backgroundColor: "#F8F8F8",
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
                                            Title
                                        </Typography>
                                        <OutlinedInput
                                            id="input-with-icon-adornment"
                                            defaultValue="Workout Title"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        />
                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Workout Level
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            defaultValue="Advance"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        >
                                            <MenuItem value="paid">Beginner</MenuItem>
                                            <MenuItem value="unpaid">Advance</MenuItem>
                                        </Select>
                                        <br />
                                        <Typography variant="paragraph" pl={1} pb={1} sx={{ font: "normal normal normal 17px/26px Roboto", fontSize: "12px", fontWeight: "medium" }} color="#1F1F1F">
                                            Focused Area
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={age}
                                            onChange={handleChange}
                                            defaultValue="Arms"
                                            sx={{
                                                borderRadius: "50px",
                                                backgroundColor: "#F8F8F8",
                                                "& fieldset": { border: 'none' },
                                            }}
                                        >
                                            <MenuItem value="Full body">Full Body</MenuItem>
                                            <MenuItem value="arms">Arms</MenuItem>
                                            <MenuItem value="abs">Abs</MenuItem>
                                        </Select>

                                    </Stack>

                                </FormControl>

                            </Grid>

                        </Grid>
                    </Container>
                </Container>

                <Container>
                    <Typography variant="h5" fontWeight={750} fontSize="17px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                        Add Daily Exercises
                    </Typography>
                    <Container>
                        <Grid container spacing={0} pt={1}>
                            <Grid xs={11} md={2.5} lg={2.5} xl={2.5} p={1} align="center" >
                                <Box sx={{ backgroundColor: "#EEEEEE", borderRadius: "10px" }}>
                                    <Stack sx={{
                                        backgroundImage: `url(${workout1})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain", width: "100%", height: "20vh"
                                    }}>

                                    </Stack>

                                    <Stack mt={-5} pb={2} pl={1} onClick={() => navigate("/workoutdetail")} >
                                        <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "14px", xl: "20px" }} sx={{ font: "normal normal bold 16px/26px Roboto", letterSpacing: "1px" }} color="#FF6700">
                                            Title Here
                                        </Typography>
                                    </Stack>
                                </Box>

                            </Grid>

                            <Grid xs={1} md={0.5} lg={0.5} xl={0.5} align="" >
                                <Box sx={{ display: "flex", justifyContent: "start", alignContent: "start" }}>
                                    <Close sx={{ padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px", color: "white", marginLeft: -3 }} onClick={() => clearpreviewimage()} />
                                </Box>
                            </Grid>

                            <Grid xs={11} md={2.5} lg={2.5} xl={2.5} p={1} align="center" >
                                <Box sx={{ backgroundColor: "#EEEEEE", borderRadius: "10px" }}>
                                    <Stack sx={{
                                        backgroundImage: `url(${workout2})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain", width: "100%", height: "20vh"
                                    }}>

                                    </Stack>

                                    <Stack mt={-5} pb={2} pl={1} onClick={() => navigate("/workoutdetail")} >
                                        <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "14px", xl: "20px" }} sx={{ font: "normal normal bold 16px/26px Roboto", letterSpacing: "1px" }} color="#FF6700">
                                            Title Here
                                        </Typography>
                                    </Stack>
                                </Box>

                            </Grid>

                            <Grid xs={1} md={0.5} lg={0.5} xl={0.5} align="" >
                                <Box sx={{ display: "flex", justifyContent: "start", alignContent: "start" }}>
                                    <Close sx={{ padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px", color: "white", marginLeft: -3 }} onClick={() => clearpreviewimage()} />
                                </Box>
                            </Grid>

                            <Grid xs={11} md={2.5} lg={2.5} xl={2.5} p={1} align="center" >
                                <Box sx={{ backgroundColor: "#EEEEEE", borderRadius: "10px" }}>
                                    <Stack sx={{
                                        backgroundImage: `url(${workout3})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain", width: "100%", height: "20vh"
                                    }}>

                                    </Stack>

                                    <Stack mt={-5} pb={2} pl={1} onClick={() => navigate("/workoutdetail")} >
                                        <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "14px", xl: "20px" }} sx={{ font: "normal normal bold 16px/26px Roboto", letterSpacing: "1px" }} color="#FF6700">
                                            Title Here
                                        </Typography>
                                    </Stack>
                                </Box>

                            </Grid>

                            <Grid xs={1} md={0.5} lg={0.5} xl={0.5} align="" >
                                <Box sx={{ display: "flex", justifyContent: "start", alignContent: "start" }}>
                                    <Close sx={{ padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px", color: "white", marginLeft: -3 }} onClick={() => clearpreviewimage()} />
                                </Box>
                            </Grid>

                            <Grid xs={11} md={2.5} lg={2.5} xl={2.5} p={1} align="center" >
                                <Box sx={{ backgroundColor: "#EEEEEE", borderRadius: "10px" }}>
                                    <Stack sx={{
                                        backgroundImage: `url(${workout4})`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain", width: "100%", height: "20vh"
                                    }}>

                                    </Stack>

                                    <Stack mt={-5} pb={2} pl={1} onClick={() => navigate("/workoutdetail")} >
                                        <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "14px", xl: "20px" }} sx={{ font: "normal normal bold 16px/26px Roboto", letterSpacing: "1px" }} color="#FF6700">
                                            Title Here
                                        </Typography>
                                    </Stack>
                                </Box>

                            </Grid>

                            <Grid xs={1} md={0.5} lg={0.5} xl={0.5} align="" >
                                <Box sx={{ display: "flex", justifyContent: "start", alignContent: "start" }}>
                                    <Close sx={{ padding: 0.2, backgroundColor: "#FF6700", borderRadius: "50px", color: "white", marginLeft: -3 }} onClick={() => clearpreviewimage()} />
                                </Box>
                            </Grid>

                            <Grid xs={12} align="center">
                                <Button variant="contained" style={btn} onClick={() => navigate("/workoutplans")} >Update</Button>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team