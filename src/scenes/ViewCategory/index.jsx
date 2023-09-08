import {
    Box, Typography, Grid, Stack, Divider
    , Container, FormControl, Breadcrumbs
} from "@mui/material";
import React, { useState, useEffect } from "react";
import url from "../url"
import { useLocation, useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import CustomTextField from '../../components/CustomTextField.js'

const Team = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const getAllPlans = async () => {
        setIsloading(true)
        if (location.state.row.image !== undefined && location.state.row.image !== null && location.state.row.image !== '') {
            setHidelabel(true)
        }

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
                if (response.status === true) {
                    setSkills(response.result);
                }
            }
            )
            .catch(error => {
            });
        setIsloading(false)

    }
    const [Skill, setSkill] = React.useState([]);
    const [Skills, setSkills] = useState([]);

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Screens, setScreens] = useState([]);
    const [isloading, setIsloading] = useState(false);
    useEffect(() => {
        if (location.state.row.banners !== undefined &&
            location.state.row.banners !== null
            && location.state.row.banners.length !== 0) {
            const bannerIds = location.state.row.banners.map(banner => banner.id);
            setSkill(bannerIds)
        }
        getAllPlans();
        getAllScreens();
    }, [])


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
                if (response.status === true) {
                    // setLogos(response.count);
                    setScreens(response.result);
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
        location.state.row.image = null
        setSelectedFile(null);
        setHidecrossicon(false);
        setHidelabel(false);
    }

    const [AddName, setAddName] = React.useState('');


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
                                View Category
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
                                        {selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "300px", height: "auto" }} />
                                            :
                                            location.state.row.image && <img src={`${url}${location.state.row.image}`} alt="Preview" style={{ width: "300px", height: "auto" }} />
                                        }
                                    </Box>

                                </Box>
                            </Grid>

                            <Grid xs={12} md={12} lg={12} xl={12} p={1} align="center" >

                                <FormControl sx={{ width: "30%" }} align="center">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <CustomTextField
                                            label="Category Name"
                                            value={location.state.row.name}
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
                                            Category Banners
                                        </Typography>

                                        <Grid
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignContent: "center",
                                                alignItems: 'center',
                                            }}
                                        >
                                                {isloading ?
                                                    <Grid sx={{

                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignContent: "center",
                                                        alignItems: 'center',
                                                        
                                                        height: "300px", width: "100%"
                                                        // backgroundColor:'red'

                                                    }} >
                                                        <center><div className="loader">
                                                        </div></center></Grid>
                                                    :

                                                    Skills.map((data) => {
                                                        const isSelected = Skill.includes(data.id);
                                                        const backgroundColor = isSelected ? '' : '';

                                                        return (
                                                            <>
                                                                {
                                                                    isSelected &&
                                                                    <div
                                                                        key={data.id}
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
                                                                                maxHeight: 'auto',
                                                                                maxWidth: '300px',
                                                                            }}
                                                                        />
                                                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                                                            <Grid item>
                                                                                <a href={data.link} target="_blank" rel="noopener noreferrer">
                                                                                    Banner Link!
                                                                                </a>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </div>
                                                                }
                                                            </>

                                                        );
                                                    })

                                                }
                                        </Grid>
                                    </Stack>

                                </FormControl>

                            </Grid>
                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team