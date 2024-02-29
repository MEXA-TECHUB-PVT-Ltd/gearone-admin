import { Box, Typography, Modal, OutlinedInput, Grid, Stack, Divider, Container, FormControl, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Close, Upload } from '@mui/icons-material';
import url from "../url"
import CustomTextField from '../../components/CustomTextField.js'
import CustomImageUpload from '../../components/CustomImageUpload.js'
import ConditionalButton from '../../components/ConditionalButton.js'
import { useLocation, useNavigate } from "react-router-dom"
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
    const [showImageLoader, setShowImageLoader] = React.useState(false);
    const location = useLocation();
    const [Category, setCategory] = React.useState([]);
    const [showAddedBanner, setshowAddedBanner] = React.useState(true);
    const [addedBanner, setAddedBanner] = React.useState({
        image: '',
        link: ''
    });
    const [showBanner, setShowBanner] = React.useState([
        {
            show: true
        },
        {
            show: true
        },
        {
            show: true
        },
        {
            show: true
        },
        {
            show: true
        }
    ]);
    const navigate = useNavigate();
    const getAllPlans = async () => {
        var InsertAPIURL = `${url}category/get_category`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const Data = {
            Category_ID: location.state.row.id
        }
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
            .then(response => response.json())
            .then(response => {
                if (response.status === true) {
                    // setLogos(response.count);
                    console.log("response");

                    setCategory(response.result[0]);
                    setTempBanner(response.result[0].banners)
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
    const [openaddmodal, setOpenaddmodal] = useState(false);
    const handleOpenadd = () => setOpenaddmodal(true);


    const [hidelabelIcon, setHidelabelIcon] = useState(false);
    const [hidecrossiconIcon, setHidecrossiconIcon] = useState(false);
    const [selectedFileIcon, setSelectedFileIcon] = useState(null);
    const [Screens, setScreens] = useState([]);
    const [isloading1, setIsloading1] = useState(false);
    const [isloading2, setIsloading2] = useState(false);





    useEffect(() => {
        console.log(location);
        getAllPlans();
        getAllScreens();
    }, [])

    const handleAddBanner = async (banners) => {
        var InsertAPIURL = `${url}ads/update_ad`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        let check = false;
        tempBanner.map(async (item) => {
            console.log(item);
            if (item.link !== '') {
                if (!urlPattern.test(item.link)) {
                    check = true;
                }
            } else {
                check = true;
            }
        })
        let arr = []
        if (!check) {
            arr = []
            await Promise.all(
                tempBanner.map(async (item) => {
                    if (item.id) {
                        var Data = {
                            "adID": item.id,
                            "link": item.link
                        };
                        await fetch(InsertAPIURL, {
                            method: 'PUT',
                            headers: headers,
                            body: JSON.stringify(Data),
                        })
                            .then(response => response.json())
                            .then((response) => {
                                console.log(response)
                                if (response.status) {
                                    arr.push(item.id)
                                }


                            })
                            .catch(error => {
                                setIsloading1(false);
                            });
                    }
                    else {
                        await fetch(``)
                    }
                })
            )
            return arr;
        }
        return arr;
    }

    const ImageUpload = async (index, event, id) => {
        setShowImageLoader(true)
        var Data = {
            "id": id,
            "image": event.target.files[0],
        };
        await axios.put(url + "ads/add_ad_image", Data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            setIsloading2(false)
            console.log(response.data);
            if (response.status) {
                setTempBanner(prevState => {
                    let newState = [...prevState]
                    newState[index].image = response.data.result[0].image;
                    return newState
                })
                setShowBanner(prevState => {
                    let newStates = [...prevState]
                    newStates[index].show = true;
                    return newStates
                })


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
                    text: "Server Error"
                })
            });
        setShowImageLoader(false)
    }
    const addedImageUpload = async (event) => {
        setShowImageLoader(true)
        var InsertAPIURL = `${url}ads/add_ad`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        var Data = {
            "screen_id": "16",
            "link": ''
        };
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(async response => {
                if (response.status === true) {

                    var Data = {
                        "id": response.result[0].id,
                        "image": event.target.files[0]
                    };
                    await axios.put(url + "ads/add_ad_image", Data, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }).then((response) => {
                        console.log(response.result)
                        if (response.data.status === true) {

                            setTempBanner(prevState => {
                                let newState = [...prevState];
                                console.log(response.data.result[0].image);
                                newState.push(response.data.result[0])
                                return newState
                            })
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
            )
            .catch(error => {
                setIsloading1(false);
            });
        setShowImageLoader(false)
    }
    const handleAdd = async () => {
        setIsloading2(true)
        console.log(tempBanner)
        const bann = await handleAddBanner();
        console.log("ban:", bann)
        if (bann.length > 0) {
            var InsertAPIURL = `${url}category/update_category`
            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };
            if (!Category.name) {
                setIsloading2(false)
                Swal.fire({
                    icon: 'warning',
                    title: 'warning',
                    confirmButtonColor: "#B5030B",
                    text: 'All Fields Required',
                })
            } else {
                var Data = {
                    "Category_ID": Category.id,
                    "name": Category.name,
                    "banners": bann
                };
                console.log(Data);
                await fetch(InsertAPIURL, {
                    method: 'PUT',
                    headers: headers,
                    body: JSON.stringify(Data),
                })
                    .then(response => response.json())
                    .then(async response => {
                        if (response.status === true) {
                            console.log("in updaate:  ", response)

                            if (tempImage != null) {
                                var Data = {
                                    "id": Category.id,
                                    "image": tempImage,
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
                            text: 'Category Updated Successfully!',
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

    const [tempImage, setTempImage] = useState(null);

    const [tempBanner, setTempBanner] = useState([]);

    const handleImageChangeIcon = async (e) => {
        setShowImageLoader(true)
        setTempImage(e.target.files[0])
        setHidecrossiconIcon(false);
        setHidelabelIcon(false);
        setShowImageLoader(false)
    };

    const handleBannerVariable = (index) => {
        setTempBanner(prevState => {
            let newState = [...prevState]
            newState.splice(index, 1)
            return newState
        })
    }
    const handleLinkChangeBanners = async (index, e) => {
        setTempBanner(prevState => {
            let newState = [...prevState]
            newState[index].link = e.target.value;
            return newState
        })
    };

    const clearpreviewimageIcon = () => {
        setSelectedFileIcon(null);
        setHidecrossiconIcon(true);
        setHidelabelIcon(true);
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
                                Update Category
                            </Typography>
                        </Breadcrumbs>
                    </Grid>

                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Container>
                    <Container>
                        <Grid container spacing={0}>
                            <Grid xs={12} align="center" p={1}>
                                {!showImageLoader ? <Box pt={2} pb={2}>
                                    <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {!hidelabelIcon ?
                                            <img src={tempImage == null ? `${url}${Category.image}` : URL.createObjectURL(tempImage)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                            :
                                            <CustomImageUpload handleImageChange={handleImageChangeIcon} />

                                        }
                                    </Box>

                                    {
                                        !hidelabelIcon ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 32, mt: -24
                                                }} onClick={() => clearpreviewimageIcon()} />
                                            </Box>
                                            :
                                            null
                                    }
                                </Box> :
                                    <Grid sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignContent: "center",
                                        alignItems: 'center',
                                        height: "300px", width: "100%"
                                        // backgroundColor:'red'

                                    }} >
                                        <center><div className="loader">
                                        </div></center></Grid>}
                            </Grid> :


                            <Grid xs={12} md={12} lg={12} xl={12} p={1} align="center" >

                                <FormControl sx={{ width: "30%" }} align="center">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <CustomTextField
                                            label="Category Name"
                                            value={Category.name}
                                            onChange={(event) => {
                                                setCategory({ ...Category, "name": event.target.value });
                                            }}
                                        />
                                    </Stack>
                                </FormControl>
                            </Grid>
                            {!showImageLoader ?
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
                                                Banners
                                            </Typography>


                                            <Grid container spacing={2} style={{
                                                display: 'flex',
                                                align: 'left',
                                                justifyContent: 'left',

                                            }}
                                                p={1}>
                                                {showBanner.map((item, index) => {
                                                    if (index < tempBanner.length) {
                                                        return <Grid item xs={6} sm={6} md={4} lg={4} pt={2} pb={2}>
                                                            <Box pt={2} pb={2} sx={{ position: 'relative' }}>

                                                                <Box sx={{ position: 'relative', width: '100%', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                                    {item.show ? <Grid>
                                                                        <Close sx={{
                                                                            position: "absolute", top: '1%', right: '0',
                                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                            color: "white"
                                                                        }} onClick={() => handleBannerVariable(index)} />
                                                                        <img src={tempBanner[index].image != null && `${url}${tempBanner[index].image}`} alt="Preview" style={{ width: "100%" }} />
                                                                    </Grid>
                                                                        :
                                                                        <CustomImageUpload handleImageChange={(e) => { ImageUpload(index, e, tempBanner[index].id) }} />}
                                                                </Box>
                                                                {item.show &&

                                                                    <OutlinedInput
                                                                        placeholder='Enter Link'
                                                                        width='200px'
                                                                        key={index}
                                                                        onChange={(e) => {
                                                                            handleLinkChangeBanners(index, e);
                                                                        }}
                                                                        value={tempBanner[index].link != null ? tempBanner[index].link : Category.banners[index].link}
                                                                        id="input-with-icon-adornment"
                                                                        sx={{
                                                                            position: 'relative', width: '100%', pt: 2, p: "0.5px",
                                                                            float: "center",
                                                                            mt: '5%',
                                                                            borderRadius: "50px",
                                                                            backgroundColor: "darkgray",
                                                                            "& fieldset": { border: 'none' },
                                                                        }}
                                                                    />
                                                                }
                                                            </Box>
                                                        </Grid>
                                                    }

                                                }
                                                )}
                                                {tempBanner.length < 5 &&
                                                    <Grid item xs={6} sm={6} md={4} lg={4} pt={2} pb={2}>
                                                        <Box pt={2} pb={2}>
                                                            <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                                {!showAddedBanner ?
                                                                    addedBanner.image !== null &&
                                                                    <Grid>
                                                                        <img src={URL.createObjectURL(addedBanner.image)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                                                        {console.log(addedBanner.link)}
                                                                    </Grid>
                                                                    :
                                                                    <CustomImageUpload handleImageChange={async (e) => {
                                                                        addedImageUpload(e)

                                                                    }} />}
                                                            </Box>
                                                            {!showAddedBanner &&
                                                                <OutlinedInput
                                                                    placeholder='Enter Link'
                                                                    onChange={(e) => {
                                                                        console.log(addedBanner)
                                                                        setAddedBanner(prevState => {
                                                                            let newState = { ...prevState };
                                                                            newState.link = e.target.value
                                                                            return newState;
                                                                        })

                                                                    }}
                                                                    value={addedBanner.link}
                                                                    id="input-with-icon-adornment"
                                                                    sx={{
                                                                        mt: '5%',
                                                                        borderRadius: "50px",
                                                                        backgroundColor: "darkgray",
                                                                        "& fieldset": { border: 'none' },
                                                                    }}
                                                                />
                                                            }


                                                            {
                                                                !showAddedBanner ?
                                                                    <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                                        <Close sx={{
                                                                            padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                            color: "white", ml: 32, mt: -30
                                                                        }} onClick={() => { }} />
                                                                    </Box>
                                                                    :
                                                                    null
                                                            }
                                                        </Box>
                                                    </Grid>}
                                            </Grid>

                                        </Stack>

                                    </FormControl>

                                </Grid>
                                :
                                <Grid sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: "center",
                                    alignItems: 'center',
                                    height: "400px", width: "100%"
                                    // backgroundColor:'red'

                                }} >
                                    <center><div className="loader">
                                    </div></center>
                                </Grid>}
                            <ConditionalButton Title="Update Category" isloading={isloading2} handleAdd={handleAdd} />

                        </Grid>
                    </Container>
                </Container>

            </Box>
        </>
    )
}

export default Team