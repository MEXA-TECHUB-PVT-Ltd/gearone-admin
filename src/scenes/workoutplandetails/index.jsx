import { Box, Typography, Container, Grid, Button, Stack, Divider, Avatar, Breadcrumbs } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import url from "../url"
import img from '../../components/Images/hairstyleimage.jpg'
import { tokens } from "../../theme";
import workout1 from '../../components/Images/workout1.png'
import workout2 from '../../components/Images/workout2.png'
import workout3 from '../../components/Images/workout3.png'
import workout4 from '../../components/Images/workout4.png'
import workout5 from '../../components/Images/workout5.png'
import workout6 from '../../components/Images/workout6.png'
import workout7 from '../../components/Images/workout7.png'
import workout8 from '../../components/Images/workout8.png'
import { Subscriptions, Notifications, Settings, Person, Add, MoreVert, People, Lock, PlayArrow, PlayCircle } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";

const Team = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 300,
        // height: 220,
        bgcolor: 'background.paper',
        border: '2px solid gray',
        boxShadow: 254,
        p: 2,
        borderRadius: 3
    };

    const btn = {
        letterSpacing: "3px",
        width: '100%',
        marginTop: '80px',
        // marginBottom: '20px',
        color: 'white',
        backgroundColor: '#B5030B',
        borderColor: '#B5030B',
        height: '45px',
        padding: '0px',
        fontWeight: "bold",
        textTransform: "capitalize"
    }

    const navigate = useNavigate();
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
                                Add Workout Details
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

               
                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Box pl={2} pr={2} pt={2}>
                    <Grid container spacing={0}>
                        <Grid xs={12} md={6} lg={6} xl={6} p={1}>
                            <div style={{ display: "flex", justifyContent: "start", alignContent: "start", gap: "20px" }}>
                                <div>
                                    <Avatar variant="square" src={workout1} sx={{ borderRadius: "10px", width: 170, height: 170 }} />
                                </div>
                                <div>
                                    <Typography variant="h5" fontWeight={750} pt={10} fontSize="18px" sx={{ letterSpacing: "2px" }} color="#B5030B">
                                        Workout Title
                                    </Typography>
                                </div>
                            </div>

                            <Grid container spacing={0}>
                                <Grid xs={8} >
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Category :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Category # 2
                                    </Typography>
                                </Grid>

                                <Grid xs={8} >
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Time of Workout :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        2 hr 32 mins
                                    </Typography>
                                </Grid>

                                <Grid xs={8} >
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Total Exercise in Workout :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        23 exercises
                                    </Typography>
                                </Grid>

                                <Grid xs={8} >
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Workout Level :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Intermediate
                                    </Typography>
                                </Grid>

                                <Grid xs={8} >
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Workout Type :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Paid
                                    </Typography>
                                </Grid>

                                <Grid xs={8} >
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Focused Area :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Arms, Legs
                                    </Typography>
                                </Grid>

                                <Grid xs={8} >
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Total Likes :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        234.5 k
                                    </Typography>
                                </Grid>

                                <Grid xs={12} align="">
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Description :
                                    </Typography>

                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" lineHeight="25px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid xs={12} md={6} lg={6} xl={6} p={1} align="right">
                            <Box sx={{
                                backgroundColor: "#EEEEEE", width: "90%", borderRadius: "10px", height: "40vh",
                                backgroundImage: `url(${workout1})`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat"
                            }}>
                                <Box height="40vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.3)" }}>
                                    <Stack pt={15}>
                                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                            <PlayCircle sx={{ fontSize: "35px", color: "#B5030B" }} />
                                        </div>
                                    </Stack>
                                </Box>
                            </Box>

                            <Grid container spacing={0}>
                                <Grid xs={8} align="left">
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ pl: 7, letterSpacing: "2px" }} color="#1F1F1F">
                                        Exercise Title :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Title here
                                    </Typography>
                                </Grid>

                                <Grid xs={8} align="left">
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ pl: 7, letterSpacing: "2px" }} color="#1F1F1F">
                                        Exercise Time :
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        2 hrs 32 mins
                                    </Typography>
                                </Grid>

                                <Grid xs={8} align="left">
                                    <Typography variant="h5" fontWeight={850} pt={2} fontSize="15px" sx={{ pl: 7, letterSpacing: "2px" }} color="#1F1F1F">
                                        Video Link:
                                    </Typography>
                                </Grid>

                                <Grid xs={4} align="right">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#1F1F1F">
                                        Link here
                                    </Typography>
                                </Grid>

                                <Grid xs={12} align="left">
                                    <Typography variant="h5" fontWeight={600} pt={2} fontSize="15px" lineHeight="25px" sx={{ pl: 7, letterSpacing: "2px" }} color="#1F1F1F">
                                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                                    </Typography>
                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid xs={12} p={1} >
                            <Typography variant="h5" fontWeight={750} pt={2} pb={2} fontSize="18px" sx={{ letterSpacing: "2px" }} color="#B5030B">
                                Daily Exercises
                            </Typography>

                            <Grid container spacing={0}>
                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout1})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout2})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout3})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout4})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout5})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout6})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout7})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>

                                <Grid xs={12} md={4} lg={4} p={1} align="center">
                                    <Box sx={{ backgroundColor: "#EEEEEE", width: "100%", borderRadius: "10px" }} >
                                        <Stack sx={{
                                            backgroundImage: `url(${workout8})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "cover", height: "18vh"
                                        }}>
                                            <Box height="18vh" sx={{ borderRadius: "10px", background: "rgba(0, 0, 0, 0.1)" }}>
                                            </Box>
                                        </Stack>

                                        <Stack mt={1} pb={2} pl={1}  >
                                            <Typography variant="h5" fontWeight={750} align="left" fontSize={{ xs: "13px", lg: "15px", xl: "20px" }} sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                Title Here
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box >
            </Box>


        </>
    );
};

export default Team;
