import { Box, Typography, Modal, Grid, Stack, Divider
    , Container, FormControl, Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Close} from '@mui/icons-material';
import url from "../url"
import { useNavigate , useLocation} from "react-router-dom"
import Swal from 'sweetalert2'
import CustomTextField from '../../components/CustomTextField.js'
import CustomImageUpload from '../../components/CustomImageUpload.js'
import ConditionalButton from '../../components/ConditionalButton.js'
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
        const location = useLocation();
        const [BannerLink, setBannerLink] = React.useState('');

    const [addName, setAddName] = React.useState('');
    const navigate = useNavigate();
        const getAllPlans = async () => {
                if (location.state.row.image !== undefined && location.state.row.image !== null && location.state.row.image !== '') {
            setHidelabel(true)
            selectedFile(location.state.row.image)
                }
    }

    const [openaddmodal, setOpenaddmodal] = useState(false);
    const handleOpenadd = () => setOpenaddmodal(true);



    
    const [Images, setImages] = useState([]);
    const [Skills, setSkills] = useState([]);
    const [Banners, setBanners] = useState([]);
    const [hidelabelBanner, setHidelabelBanner] = useState(false);
    const [hidecrossiconBanner, setHidecrossiconBanner] = useState(false);
    const [selectedFileBanner, setSelectedFileBanner] = useState(null);

    const [hidelabel, setHidelabel] = useState(false);
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [Screens, setScreens] = useState([]);
    const [isloading1, setIsloading1] = useState(false);
    const [isloading2, setIsloading2] = useState(false);
    const [isloading, setIsloading] = useState(false);
    useEffect(() => {

        let imagePaths = [];
                if(location.state.row.banners){
         imagePaths = location.state.row.banners.map(banner => banner);
        }  
        setImages(imagePaths);  


            if (location.state.row.banners !== undefined &&
                location.state.row.banners !== null
                && location.state.row.banners.length !== 0) {
                const bannerIds = location.state.row.banners.map(banner => banner.id);
                setBanners(bannerIds)
            }
    
        getAllPlans();
        getAllScreens();
    }, [])

    const handleAddBanner = async () => {
        console.log("1");
        setIsloading1(true);
        var InsertAPIURL = `${url}ads/add_ad`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        if (BannerLink === '' || selectedFileBanner === null) {
            setIsloading1(false);
            setOpenaddmodal(false);
            Swal.fire({
                icon: 'warning',
                title: 'Warning...',
                confirmButtonColor: "#B5030B",
                text: "All Fields Required"
            })
            console.log("2");
        } else {
            var Data = {
                "screen_id": "16",
                "link": BannerLink
            };
            await fetch(InsertAPIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data),
            })
                .then(response => response.json())
                .then(async response => {
                    console.log(response);
                    if (response.status === true) {
                        if (selectedFileBanner !== null && selectedFileBanner !== undefined) {

                            setBanners(prevSkills => [...prevSkills, response.result[0].id]);
                            var Data = {
                                "id": response.result[0].id,
                                "image": selectedFileBanner,
                            };
                            await axios.put(url + "ads/add_ad_image", Data, {
                                headers: {
                                    "Content-Type": "multipart/form-data"
                                }
                            }).then((response) => {
                                if (response.data.status === true) {
                                    console.log("4");
                                    setImages(prevSkills => [...prevSkills, response.data.result[0]]);
                                    setOpenaddmodal(false);
                                    setIsloading1(false)
                                } else {
                                    setOpenaddmodal(false);
                                    setIsloading1(false)
                                    console.log("5");
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
                            console.log("6");
                            setOpenaddmodal(false);
                            setIsloading1(false)
                        }
                        setIsloading1(false)
                        setSelectedFileBanner(null);
                        setHidecrossiconBanner(false);
                        setHidelabelBanner(false);
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            confirmButtonColor: "#B5030B",
                            text: 'Banner Added Successfully!',
                        })
                    } else {
                        setIsloading1(false);
                        setOpenaddmodal(false);
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
                    setIsloading1(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#B5030B",
                        text: "Server Down!"
                    })
                });
        }
    }

    const handleAdd = async () => {
        setIsloading2(true)
        var InsertAPIURL = `${url}category/update_category`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
if ( Skills === "" ) {
            setIsloading2(false)
            Swal.fire({
                icon: 'warning',
                title: 'warning',
                confirmButtonColor: "#B5030B",
                text: 'All Fields Required',
            })
        } else {
             var Data = {
                "Category_ID": location.state.row.id,
                "name": addName,
                "banners": Banners
            };
await fetch(InsertAPIURL, {
                method: 'PUT',
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
                                setIsloading2(false)
                                console.log(response.data);
                                if (response.data.status === true) {
                                    navigate("/categories")
                                    setIsloading2(false)
                                } else {
                                    setIsloading2(false)
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
                    
                    } else {
                        setIsloading2(false)
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            confirmButtonColor: "#B5030B",
                            text: 'Try Again'
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

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setHidecrossicon(true);
        setHidelabel(true);
    };
    const ClearBanner = (data) => {
        const newImages = Images.filter(myData => myData.image !== data.image);
        setImages(newImages);
        const NewBanners = Banners.filter(id => id !== data.id);
        setBanners(NewBanners);

    }

    const clearpreviewimage = () => {
        location.state.row.image = null
        setSelectedFile(null);
        setHidecrossicon(false);
        setHidelabel(false);
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
                                <Box pt={2} pb={2}>
                                    <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                    {hidelabel ?
                                            null
                                            :
                                            <CustomImageUpload handleImageChange={handleImageChange} />

                                        }
                                        {selectedFile ? <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                            :
                                            location.state.row.image && <img src={`${url}${location.state.row.image}`} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                        }
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
                                            location.state.row.image ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 32, mt: -24
                                                    }} onClick={() => clearpreviewimage()} />
                                                </Box>
                                                : null

                                    }
                                </Box>                            </Grid>

                            <Grid xs={12} md={12} lg={12} xl={12} p={1} align="center" >

                                <FormControl sx={{ width: "50%" }} align="center">
                                    <Stack direction="column" spacing={0} pt={2}>
                                    <CustomTextField
                                            label="Name"
                                            defaultValue={location.state.row.name}
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
                                                fontFamily: "Roboto",
                                                fontSize: "18px",
                                                fontWeight: "bold",
                                                color: "#1F1F1F",
                                            }}
                                        >
                                            Banners
                                        </Typography>
                                        <Grid  sx={12} >
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div style={{ display: 'grid', 
                                                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', maxWidth: '1000px' }}>
                                                    {Images.map((data) => {

                                                        return (
                                                            <div
                                                                key={data.id}
                                                                // onClick={() => handleImageClick(data.id)}
                                                                style={{
                                                                    cursor: 'pointer', 
                                                                    borderRadius: '3px', display: 'flex', flexDirection: 'column', alignItems: 'center'
                                                                }}
                                                            >
                                                <Box sx={{ display: "flex", justifyContent: "right", alignContent: "right" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", 
                                                }} onClick={() => ClearBanner(data)} />
                                            </Box>

                                                                <img
                                                                    alt=""
                                                                    src={`${url}${data.image}`}
                                                                    style={{ width: '100%', height: '100%', maxHeight: '300px', maxWidth: '300px' }}
                                                                />
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </Grid>
                                    </Stack>

                                </FormControl>


                                
                                <Grid sx={{mt:'5%'}} container justifyContent="center" spacing={0}>
      <Grid md={6} xs={12} item>
      <ConditionalButton Title="Add More Banners" isloading={isloading} handleAdd={()=>{handleOpenadd()}} />
      </Grid>

      <Grid md={6} xs={12} item>
      <ConditionalButton Title="Update category" isloading={isloading2} handleAdd={handleAdd} />
      </Grid>
    </Grid>
                        </Grid>
                            </Grid>


                    </Container>
                </Container>

            </Box>
            {/* addmodal */}
            <Modal
                open={openaddmodal}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={6} align="left" >
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Add Banner</Typography>
                        </Grid>

                        <Grid xs={6} align="right">
                            <Close onClick={() => setOpenaddmodal(false)} />
                        </Grid>

                        <Grid xs={12} align="center" pt={7}>
                            <FormControl fullWidth>


                                <Box pt={2} pb={2}>
                                    <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabelBanner ?
                                            null
                                            :
                                            <CustomImageUpload handleImageChange={handleImageChangeBanner} />

                                        }
                                        {selectedFileBanner && <img src={URL.createObjectURL(selectedFileBanner)} alt="Preview" style={{ width: "300px", height: "200px" }} />}
                                    </Box>
                                    {
                                        hidecrossiconBanner ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 32, mt: -24
                                                }} onClick={() => clearpreviewimageBanner()} />
                                            </Box>
                                            :
                                            null
                                    }
                                </Box>



                                <CustomTextField
                                            label="Banner Link"
                                            onChange={(event) => {
                                                setBannerLink(event.target.value);
                                            }}
                                        />
                                </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={7}>
                    <ConditionalButton Title="Add Banner" isloading={isloading1} handleAdd={handleAddBanner} />
                    </Grid>

                </Box>
            </Modal>

        </>
    )
}

export default Team
// import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
// import url from "../url"
// import { useLocation, useNavigate } from "react-router-dom"
// import Swal from 'sweetalert2'
// import axios from 'axios';
// import ClipLoader from "react-spinners/ClipLoader";
// const override = {
//     display: ' block',
//     margin: '0 auto',
//     borderColor: 'red',
// }
// const btn = {
//     letterSpacing: "1px",
//     width: '50%',
//     marginTop: '40pxs',
//     marginBottom: '40px',
//     color: 'white',
//     backgroundColor: '#B5030B',
//     borderColor: '#B5030B',
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
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//     PaperProps: {
//         style: {
//             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//             width: 250,
//         },
//     },
// };

// const Team = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const open = Boolean(anchorEl);
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };
//     const handleClose = () => {
//         setAnchorEl(null);
//     }
//     const [searchQuery, setSearchQuery] = useState("");
//     const getAllPlans = async () => {
//         if (location.state.row.image !== undefined && location.state.row.image !== null && location.state.row.image !== '') {
//             setHidelabel(true)
//         }

//         var InsertAPIURL = `${url}ads/get_all_ads`
//         var headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         };
//         await fetch(InsertAPIURL, {
//             method: 'POST',
//             headers: headers,
//         })
//             .then(response => response.json())
//             .then(response => {
//                 if (response.status == true) {
//                     // setLogos(response.count);
//                     console.log("response");
//                     setSkills(response.result);
//                 } else {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Oops...',
//                         confirmButtonColor: "#FF8B94",
//                         text: ''
//                     })
//                 }
//             }
//             )
//             .catch(error => {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     confirmButtonColor: "#FF8B94",
//                     text: "Server Down!"
//                 })
//             });
//     }
//     const handleImageClick = (imageId) => {
//         // Assuming `Skill` is an array that stores the selected image IDs
//         if (Skill.includes(imageId)) {
//             // If the image is already selected, remove it from the selection
//             setSkill(Skill.filter(id => id !== imageId));
//         } else {
//             // If the image is not selected, add it to the selection
//             setSkill([...Skill, imageId]);
//         }
//     };
//     const handleChangeSkill = (event) => {
//         const {
//             target: { value },
//         } = event;
//         setSkill(
//             // On autofill we get a stringified value.
//             typeof value === 'string' ? value.split(',') : value,
//         );

//     };
//     const [Skill, setSkill] = React.useState([]);
//     const [Skills, setSkills] = useState([]);

//     const [hidelabel, setHidelabel] = useState(false);
//     const [hidecrossicon, setHidecrossicon] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [Screens, setScreens] = useState([]);
//     const [isloading, setIsloading] = useState(false);
//     useEffect(() => {
//         if (location.state.row.banners !== undefined && location.state.row.banners.length !== 0) {
//             const bannerIds = location.state.row.banners.map(banner => banner.id);
//             setSkill(bannerIds)
//         }
//         getAllPlans();
//         getAllScreens();
//     }, [])


//     const handleAdd = async () => {
//         setIsloading(true)
//         var InsertAPIURL = `${url}category/update_category`
//         var headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         };
//         console.log(AddName)
//         console.log(selectedFile)
//         console.log(Skill)
//         if(AddName === ''){
//             setAddName(location.state.row.name);
//         }
//         if(selectedFile === ''){
//             setAddName(location.state.row.image);
//         }
//         if(Skill === ''){
//             setSkill(location.state.row.banners);
//         }

//         if ( Skill === "" ) {
//             setIsloading(false)
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'warning',
//                 confirmButtonColor: "#B5030B",
//                 text: 'All Fields Required',
//             })
//         } else {
//             var Data = {
//                 "Category_ID": location.state.row.id,
//                 "name": AddName,
//                 "banners": Skill
//             };
//             await fetch(InsertAPIURL, {
//                 method: 'PUT',
//                 headers: headers,
//                 body: JSON.stringify(Data),
//             })
//                 .then(response => response.json())
//                 .then(async response => {
//                     if (response.status === true) {
//                         if (selectedFile !== null && selectedFile !== undefined) {
//                             var Data = {
//                                 "id": response.result[0].id,
//                                 "image": selectedFile,
//                             };
//                             await axios.put(url + "category/add_category_image", Data, {
//                                 headers: {
//                                     "Content-Type": "multipart/form-data"
//                                 }
//                             }).then((response) => {
//                                 setIsloading(false)
//                                 console.log(response.data);
//                                 if (response.data.status === true) {
//                                     setIsloading(false)
//                                 } else {
//                                     setIsloading(false)
//                                 }
//                             }
//                             )
//                                 .catch(error => {
//                                     Swal.fire({
//                                         icon: 'error',
//                                         title: 'Oops...',
//                                         confirmButtonColor: "#B5030B",
//                                         text: response.message
//                                     })
//                                 });
//                         } else {
//                             setIsloading(false)
//                             navigate("/categories")
//                         }
//                     } else if (response.message == 'Please Enter screen ID') {
//                         setIsloading(false)
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Oops...',
//                             confirmButtonColor: "#B5030B",
//                             text: 'Please Select Screen'
//                         })
//                     } else {
//                         setIsloading(false)
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Oops...',
//                             confirmButtonColor: "#B5030B",
//                             text: 'Try Again'
//                         })
//                     }
//                     setIsloading(false)
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Success!',
//                         confirmButtonColor: "#B5030B",
//                         text: 'Category Updated Successfully!',
//                     })
//                     navigate('/categories')

//                 }
//                 )
//                 .catch(error => {
//                     setIsloading(false)
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Oops...',
//                         confirmButtonColor: "#B5030B",
//                         text: "Server Down!"
//                     })
//                 });
//         }
//     }


//     const getAllScreens = async () => {
//         var InsertAPIURL = `${url}screen/get_all_screen`
//         var headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         };
//         await fetch(InsertAPIURL, {
//             method: 'GET',
//             headers: headers,
//         })
//             .then(response => response.json())
//             .then(response => {
//                 console.log(response);
//                 if (response.message == `All screens Details`) {
//                     // setLogos(response.count);
//                     setScreens(response.result);
//                 } else {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Oops...',
//                         confirmButtonColor: "#B5030B",
//                         text: ''
//                     })
//                 }
//             }
//             )
//             .catch(error => {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...',
//                     confirmButtonColor: "#B5030B",
//                     text: "Server Down!"
//                 })
//             });
//     }

//     const handleImageChange = (e) => {
//         setSelectedFile(e.target.files[0]);
//         setHidecrossicon(true);
//         setHidelabel(true);
//     };

//     const clearpreviewimage = () => {
//         location.state.row.image = null
//         setSelectedFile(null);
//         setHidecrossicon(false);
//         setHidelabel(false);
//     }

//     const [Status, setStatus] = React.useState('');
//     const [Screen, setScreen] = React.useState('');
//     const [AddName, setAddName] = React.useState('');

//     const handleChangeScreen = (event) => {
//         setScreen(event.target.value);
//     };

//     const handleChange = (event) => {
//         setStatus(event.target.value);
//     };

//     return (
//         <>
//             <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
//                 <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
//                     <Grid item xs={6} align="" pt={3} >
//                         <Breadcrumbs separator=">" >
//                             <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/categories")} >
//                                 Category
//                             </Typography>

//                             <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
//                                 Update Category
//                             </Typography>
//                         </Breadcrumbs>
//                     </Grid>

//                 </Grid>

//                 <Divider sx={{ pb: 2 }} />

//                 <Container>
//                     <Container>
//                         <Grid container spacing={0}>
//                             <Grid xs={12} align="center" p={1}>
//                                 <Box pt={2} pb={2}>
//                                     <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                

//                             <Grid xs={12} md={12} lg={12} xl={12} p={1} align="center" >

//                                 <FormControl sx={{ width: "50%" }} align="center">
//                                     <Stack direction="column" spacing={0} pt={2}>
//                                         <Typography
//                                             variant="paragraph"
//                                             pl={1}
//                                             pb={1}
//                                             sx={{
//                                                 fontFamily: "Roboto",
//                                                 fontSize: "18px",
//                                                 fontWeight: "bold",
//                                                 color: "#1F1F1F",
//                                             }}
//                                         >
//                                             Name
//                                         </Typography>
                                       


//                                     </Stack>

//                                 </FormControl>

//                             </Grid>

//                             <Grid xs={24} md={12} lg={12} xl={12} p={1} align="center" >

//                                 <FormControl sx={{ width: "100%" }} align="center">
//                                     <Stack direction="column" spacing={0} pt={2}>
//                                         <Typography
//                                             variant="paragraph"
//                                             pl={1}
//                                             pb={1}
//                                             sx={{
//                                                 fontFamily: "Roboto",
//                                                 fontSize: "18px",
//                                                 fontWeight: "bold",
//                                                 color: "#1F1F1F",
//                                             }}
//                                         >
//                                             Select Banners
//                                         </Typography>

//                                         <Grid
//                                             sx={{
//                                                 display: 'flex',
//                                                 justifyContent: 'center',
//                                             }}
//                                         >
//                                             <Grid
//                                                 style={{
//                                                     display: 'grid',
//                                                     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//                                                     gap: '16px',
//                                                     maxWidth: '1000px',
//                                                     '@media (max-width: 959px)': { // Small and medium screens (xs, sm, and md)
//                                                         gridTemplateColumns: '1fr', // Single column
//                                                     },
//                                                 }}
//                                             >
//                                                 {Skills.map((data) => {
//                                                     const isSelected = Skill.includes(data.id);
//                                                     const backgroundColor = isSelected ? 'red' : '';

//                                                     return (
//                                                         <div
//                                                             key={data.id}
//                                                             onClick={() => handleImageClick(data.id)}
//                                                             style={{
//                                                                 cursor: 'pointer',
//                                                                 backgroundColor,
//                                                                 padding: '5px',
//                                                                 borderRadius: '3px',
//                                                                 display: 'flex',
//                                                                 flexDirection: 'column',
//                                                                 alignItems: 'center',
//                                                             }}
//                                                         >
//                                                             <img
//                                                                 alt=""
//                                                                 src={`${url}${data.image}`}
//                                                                 style={{
//                                                                     width: '100%',
//                                                                     height: '100%',
//                                                                     maxHeight: '300px',
//                                                                     maxWidth: '300px',
//                                                                 }}
//                                                             />
//                                                             <div>{data.plan_name}</div>
//                                                         </div>
//                                                     );
//                                                 })}
//                                             </Grid>
// //                                         </Grid>
//                                     </Stack>

//                                 </FormControl>

//                             </Grid>
//                             {isloading ?
//                                 <Grid sx={{ mt: '3%' }} xs={12} align="center">
//                                     <Button variant="contained" style={btn}>
//                                         <ClipLoader loading={isloading}
//                                             css={override}
//                                             size={10}
//                                         />
//                                     </Button>
//                                 </Grid>

//                                 :

//                                 <Grid sx={{ mt: '3%' }} xs={12} align="center">
//                                     <Button variant="contained" style={btn} onClick={() => { handleAdd() }} >Update</Button>
//                                 </Grid>
//                             }
//                         </Grid>
//                     </Container>
//                 </Container>

//             </Box>
//         </>
//     )
// }

// export default Team