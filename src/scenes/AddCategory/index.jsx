import { Box, Typography, Modal, OutlinedInput, Grid, Stack, Divider, Container, FormControl, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Close, Upload } from '@mui/icons-material';
import url from "../url"
import CustomTextField from '../../components/CustomTextField.js'
import CustomImageUpload from '../../components/CustomImageUpload.js'
import ConditionalButton from '../../components/ConditionalButton.js'
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import axios from 'axios';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    outline: "none",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: 0,
    p: 4,
    borderRadius: 5
};

const Team = () => {
    const [BannerName, setBannerName] = React.useState('');

    const [addName, setAddName] = React.useState('');
    const navigate = useNavigate();
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
                if (response.status === true) {
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
    const [Link1, setLink1] = useState('');
    const [Link2, setLink2] = useState('');
    const [Link3, setLink3] = useState('');
    const [Link4, setLink4] = useState('');
    const [Link5, setLink5] = useState('');

    const [openaddmodal, setOpenaddmodal] = useState(false);
    const handleOpenadd = () => setOpenaddmodal(true);

    const [Skill, setSkill] = React.useState([]);
    const [Images, setImages] = useState([]);
    const [Skills, setSkills] = useState([]);
    const [Banners, setBanners] = useState([]);
    const [hidelabelBanner, setHidelabelBanner] = useState(false);
    const [hidecrossiconBanner, setHidecrossiconBanner] = useState(false);
    const [selectedFileBanner, setSelectedFileBanner] = useState(null);

    const [hidelabelIcon, setHidelabelIcon] = useState(false);
    const [hidecrossiconIcon, setHidecrossiconIcon] = useState(false);
    const [selectedFileIcon, setSelectedFileIcon] = useState(null);
    const [Screens, setScreens] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [isloading1, setIsloading1] = useState(false);
    const [isloading2, setIsloading2] = useState(false);





    useEffect(() => {
        getAllPlans();
        getAllScreens();
    }, [])

    const handleAddBanner = async () => {
        var InsertAPIURL = `${url}ads/add_ad`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        let NewData = [
            {
                link: Link1,
                image: selectedFile,
                show:hidelabel
            },
            {
                link: Link2,
                image: selectedFile1,
                show:hidelabel1
            },
            {
                link: Link3,
                image: selectedFile2,
                show:hidelabel2
            },
            {
                link: Link4,
                image: selectedFile3,
                show:hidelabel3
            },
            {
                link: Link5,
                image: selectedFile4,
                show:hidelabel4
            },
        ];
        let check = false;
        NewData.map(async (item) => {
            if(item.show === true) {
            if (item.link !== '' && item.image !== null && item.image !== undefined) {
                if (!urlPattern.test(item.link)) {
                    check = true;
                }
            } else if (item.link === '' || item.image === null || item.image === undefined) {
                check = true;
            }
        }
        })
        let arr = []
        if (!check) {
            arr = []
            await Promise.all(
                NewData.map(async (item) => {
                    if (item.link !== '') {
                        var Data = {
                            "screen_id": "16",
                            "link": item.link
                        };
                        await fetch(InsertAPIURL, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(Data),
                        })
                            .then(response => response.json())
                            .then(async response => {
                                if (response.status === true) {
                                    if (item.image !== null && item.image !== undefined) {
                                        setBanners(prevSkills => [...prevSkills, response.result[0].id]);
                                        arr.push(response.result[0].id);
                                        var Data = {
                                            "id": response.result[0].id,
                                            "image": item.image
                                        };
                                        await axios.put(url + "ads/add_ad_image", Data, {
                                            headers: {
                                                "Content-Type": "multipart/form-data"
                                            }
                                        }).then((response) => {
                                            if (response.data.status === true) {
                                                setIsloading1(false)
                                            }
                                        }
                                        )
                                            .catch(error => {
                                                setIsloading1(false)
                                            });
                                    } else {
                                        setIsloading1(false)
                                    }
                                }
                            }
                            )
                            .catch(error => {
                                setIsloading1(false);
                            });
                    }
                })
            )
            return arr;
        }
        return arr;
    }

    const handleAdd = async () => {
        setIsloading2(true)
        const bann = await handleAddBanner();
        if (bann.length > 0) {
            var InsertAPIURL = `${url}category/add_category`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            console.log(selectedFileIcon)
            if (addName === '' || bann.length === 0 || selectedFileIcon === null || selectedFileIcon === undefined) {
                setIsloading2(false)
                Swal.fire({
                    icon: 'warning',
                    title: 'warning',
                    confirmButtonColor: "#B5030B",
                    text: 'All Fields Required',
                })
            } else {
                var Data = {
                    "name": addName,
                    "banners": bann
                };
                console.log(Data);
                await fetch(InsertAPIURL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(Data),
                })
                    .then(response => response.json())
                    .then(async response => {
                        if (response.status === true) {
                            if (selectedFileIcon !== null && selectedFileIcon !== undefined) {
                                var Data = {
                                    "id": response.result[0].id,
                                    "image": selectedFileIcon,
                                };
                                await axios.put(url + "category/add_category_image", Data, {
                                    headers: {
                                        "Content-Type": "multipart/form-data"
                                    }
                                }).then((response) => {
                                    setIsloading2(false)
                                    console.log(response.data);
                                    if (response.data.status === true) {
                                        navigate("/categories")
                                        setIsloading2(false)
                                    } else {
                                        setIsloading2(false)
                                        Swal.fire({
                                            icon: 'error',
                                            title: 'Error...',
                                            confirmButtonColor: "#B5030B",
                                            text: 'Server Error, Try Again'
                                        })
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
                                setIsloading2(false)
                                navigate("/categories")
                            }

                        } else {
                            setIsloading2(false)
                            Swal.fire({
                                icon: 'error',
                                title: 'Error...',
                                confirmButtonColor: "#B5030B",
                                text: 'Server Error! Try Again'
                            })
                        }
                        setIsloading2(false)
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            confirmButtonColor: "#B5030B",
                            text: 'Category Added Successfully!',
                        })

                    }
                    )
                    .catch(error => {
                        setIsloading2(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonColor: "#B5030B",
                            text: "Server Down!"
                        })
                    });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                confirmButtonColor: "#B5030B",
                text: "All Fields Required/Valid Links"
            })
        }
        setIsloading2(false)
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


    const handleImageChangeBanner = (e) => {
        setSelectedFileBanner(e.target.files[0]);
        setHidecrossiconBanner(true);
        setHidelabelBanner(true);
    };

    const clearpreviewimageBanner = () => {
        setSelectedFileBanner(null);
        setHidecrossiconBanner(false);
        setHidelabelBanner(false);
    }

    const handleImageChangeIcon = (e) => {
        setSelectedFileIcon(e.target.files[0]);
        setHidecrossiconIcon(true);
        setHidelabelIcon(true);
    };

    const clearpreviewimageIcon = () => {
        setSelectedFileIcon(null);
        setHidecrossiconIcon(false);
        setHidelabelIcon(false);
    }
    const handleImageChange = (e, num) => {
        if (num == 0) {
            setSelectedFile(e.target.files[0]);
            setHidecrossicon(true);
            setHidelabel(true);
            // uploadImage(e, num);
        } else if (num == 1) {
            setSelectedFile1(e.target.files[0]);
            setHidecrossicon1(true);
            setHidelabel1(true);
            // uploadImage(e, num);
        } else if (num == 2) {
            setSelectedFile2(e.target.files[0]);
            setHidecrossicon2(true);
            setHidelabel2(true);
            // uploadImage(e, num);
        } else if (num == 3) {
            setSelectedFile3(e.target.files[0]);
            setHidecrossicon3(true);
            setHidelabel3(true);
            // uploadImage(e, num);
        } else if (num == 4) {
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
                            <Grid sx={{ mr: '2%' }} xs={12} align="center" p={1}>
                                <Box pt={2} pb={2}>
                                    <Box sx={{ mr: '10%', width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabelIcon ?
                                            null
                                            :
                                            <CustomImageUpload handleImageChange={handleImageChangeIcon} />

                                        }

                                        {selectedFileIcon && <img src={URL.createObjectURL(selectedFileIcon)} alt="Preview" style={{ width: "300px", height: "200px" }} />}
                                    </Box>

                                    {
                                        hidecrossiconIcon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 18, mt: -24
                                                }} onClick={() => clearpreviewimageIcon()} />
                                            </Box>
                                            :
                                            null
                                    }
                                </Box>
                            </Grid>

                            <Grid sx={{ mr: '2%' }} xs={12} md={12} lg={12} xl={12} p={1} align="center" >

                                <FormControl sx={{ mr: '10%', width: "30%" }} align="center">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <CustomTextField
                                            label="Category Name"
                                            value={addName}
                                            onChange={(event) => {

                                                setAddName(event.target.value);
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
                                                mr: '10%',
                                                fontFamily: "Roboto",
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                color: "#1F1F1F",
                                            }}
                                        >
                                            Banners
                                        </Typography>
                                        <FormControl sx={{ width: "100%" }} align="left">
                                            <Stack direction="column" spacing={0} pt={2}>

                                                <Grid sx={{ mr: '2%' }} container spacing={2} style={{
                                                    display: 'flex',
                                                    align: 'center',
                                                    justifyContent: 'center',
                                                }}
                                                    p={1}>
                                                    <Box pt={2} pb={2} sx={{ mr: '2%', position: 'relative' }}>
                                                        <Grid item xs={6} sm={6} md={4} lg={4} >

                                                            {hidelabel ?
                                                                null
                                                                :
                                                                hidelabel || hidelabel1 || hidelabel2 || hidelabel3 ?
                                                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                                        <Grid container spacing={0} pt={5}>
                                                                            <Grid xs={12} align="">
                                                                                <Stack align="">
                                                                                    <label htmlFor="fileInputs" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
                                                                                        <Stack direction="column" spacing={1} >
                                                                                            <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
                                                                                            <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
                                                                                        </Stack>
                                                                                    </label>
                                                                                    <input
                                                                                        style={{ display: "none" }}
                                                                                        id="fileInputs"
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
                                                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                                                <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                                    <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "300px", height: "200px" }} />

                                                                </Box>
                                                                :
                                                                null
                                                            }

                                                            {
                                                                hidecrossicon ?
                                                                    <>
                                                                        <Close sx={{
                                                                            position: "absolute", top: '12%', right: '2%',
                                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                            color: "white"
                                                                        }} onClick={(e) => clearpreviewimage(e, 0)} />
                                                                        <OutlinedInput
                                                                            placeholder="Enter Link"
                                                                            onChange={(event) => {
                                                                                setLink1(event.target.value);
                                                                            }}
                                                                            id="input-with-icon-adornment"
                                                                            sx={{
                                                                                mt: '10%',
                                                                                width: '300px',
                                                                                borderRadius: "50px",
                                                                                backgroundColor: "darkgray",
                                                                                "& fieldset": { border: 'none' },
                                                                            }}
                                                                        />
                                                                    </>
                                                                    :
                                                                    selectedFile ?
                                                                        <>
                                                                            <Close sx={{
                                                                                position: "absolute", top: '12%', right: '2%',
                                                                                padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                                color: "white"
                                                                            }} onClick={(e) => clearpreviewimage(e, 0)} />
                                                                            <OutlinedInput
                                                                                placeholder="Enter Link"
                                                                                onChange={(event) => {
                                                                                    setLink1(event.target.value);
                                                                                }}
                                                                                id="input-with-icon-adornment"
                                                                                sx={{
                                                                                    mt: '10%',
                                                                                    width: '300px',
                                                                                    borderRadius: "50px",
                                                                                    backgroundColor: "darkgray",
                                                                                    "& fieldset": { border: 'none' },
                                                                                }}
                                                                            />
                                                                        </>
                                                                        : null
                                                            }

                                                        </Grid>
                                                    </Box>
                                                    <Box pt={2} pb={2} sx={{ mr: '2%', position: 'relative' }}>


                                                        <Grid item xs={6} sm={6} md={4} lg={4} >
                                                            {hidelabel ?
                                                                hidelabel1 ?
                                                                    null
                                                                    :
                                                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                                                <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                                                    <img src={URL.createObjectURL(selectedFile1)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                                                </Box>
                                                                :
                                                                null
                                                            }

                                                            {
                                                                hidecrossicon1 ?
                                                                    <>
                                                                        <Close sx={{
                                                                            position: "absolute", top: '12%', right: '2%',
                                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                            color: "white"
                                                                        }} onClick={(e) => clearpreviewimage(e, 1)} />
                                                                        <OutlinedInput
                                                                            placeholder="Enter Link"
                                                                            onChange={(event) => {
                                                                                setLink2(event.target.value);
                                                                            }}
                                                                            id="input-with-icon-adornment"
                                                                            sx={{
                                                                                mt: '10%',
                                                                                width: '300px',
                                                                                borderRadius: "50px",
                                                                                backgroundColor: "darkgray",
                                                                                "& fieldset": { border: 'none' },
                                                                            }}
                                                                        />
                                                                    </>
                                                                    : null
                                                            }
                                                        </Grid>
                                                    </Box>
                                                    <Box pt={2} pb={2} sx={{ mr: '2%', position: 'relative' }}>

                                                        <Grid item xs={6} sm={6} md={4} lg={4} >
                                                            {hidelabel && hidelabel1 ?
                                                                hidelabel2 ?
                                                                    null
                                                                    :
                                                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                                                <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                                    <img src={URL.createObjectURL(selectedFile2)} alt="Preview" style={{ width: "200px", height: "200px" }} />

                                                                </Box>
                                                                :
                                                                null
                                                            }

                                                            {
                                                                hidecrossicon2 ?
                                                                    <>
                                                                        <Close sx={{
                                                                            position: "absolute", top: '12%', right: '2%',
                                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                            color: "white"
                                                                        }} onClick={(e) => clearpreviewimage(e, 2)} />
                                                                        <OutlinedInput
                                                                            placeholder="Enter Link"
                                                                            onChange={(event) => {
                                                                                setLink3(event.target.value);
                                                                            }}
                                                                            id="input-with-icon-adornment"
                                                                            sx={{
                                                                                mt: '10%',
                                                                                width: '300px',
                                                                                borderRadius: "50px",
                                                                                backgroundColor: "darkgray",
                                                                                "& fieldset": { border: 'none' },
                                                                            }}
                                                                        />
                                                                    </>
                                                                    : null
                                                            }
                                                        </Grid>
                                                    </Box>
                                                    <Box pt={2} pb={2} sx={{ mr: '2%', position: 'relative' }}>
                                                        <Grid item xs={6} sm={6} md={4} lg={4} >

                                                            {hidelabel && hidelabel1 && hidelabel2 ?
                                                                hidelabel3 ?
                                                                    null
                                                                    :
                                                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                                                <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                                                    <img src={URL.createObjectURL(selectedFile3)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                                                </Box>

                                                                :
                                                                null
                                                            }

                                                            {
                                                                hidecrossicon3 ?
                                                                    <>
                                                                        <Close sx={{
                                                                            position: "absolute", top: '12%', right: '2%',
                                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                            color: "white"
                                                                        }} onClick={(e) => clearpreviewimage(e, 3)} />
                                                                        <OutlinedInput
                                                                            placeholder="Enter Link"
                                                                            onChange={(event) => {
                                                                                setLink4(event.target.value);
                                                                            }}
                                                                            id="input-with-icon-adornment"
                                                                            sx={{
                                                                                mt: '10%',
                                                                                width: '300px',
                                                                                borderRadius: "50px",
                                                                                backgroundColor: "darkgray",
                                                                                "& fieldset": { border: 'none' },
                                                                            }}
                                                                        />
                                                                    </>
                                                                    : null
                                                            }

                                                        </Grid>
                                                    </Box>
                                                    <Box pt={2} pb={2} sx={{ mr: '2%', position: 'relative' }}>
                                                        <Grid item xs={6} sm={6} md={4} lg={4} >
                                                            {hidelabel && hidelabel1 && hidelabel2 && hidelabel3 ?
                                                                hidelabel4 ?
                                                                    null
                                                                    :
                                                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
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
                                                                <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

                                                                    <img src={URL.createObjectURL(selectedFile4)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                                                </Box>
                                                                :
                                                                null
                                                            }

                                                            {
                                                                hidecrossicon4 ?
                                                                    <>
                                                                        <Close sx={{
                                                                            position: "absolute", top: '12%', right: '2%',
                                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                            color: "white"
                                                                        }} onClick={(e) => clearpreviewimage(e, 4)} />
                                                                        <OutlinedInput
                                                                            placeholder="Enter Link"
                                                                            onChange={(event) => {
                                                                                setLink5(event.target.value);
                                                                            }}
                                                                            id="input-with-icon-adornment"
                                                                            sx={{
                                                                                mt: '10%',
                                                                                width: '300px',
                                                                                borderRadius: "50px",
                                                                                backgroundColor: "darkgray",
                                                                                "& fieldset": { border: 'none' },
                                                                            }}
                                                                        />
                                                                    </>
                                                                    : null
                                                            }

                                                        </Grid>
                                                    </Box>


                                                </Grid>
                                            </Stack>

                                        </FormControl>

                                    </Stack>

                                </FormControl>
                            </Grid>
                            <Grid sx={{ width: '100%', mr: '10%' }}>
                                <ConditionalButton Title="Add Category" isloading={isloading2} handleAdd={handleAdd} />
                            </Grid>

                        </Grid>
                    </Container>
                </Container>

            </Box>

        </>
    )
}

export default Team