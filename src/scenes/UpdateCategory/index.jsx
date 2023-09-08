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
    const [BannerName, setBannerName] = React.useState('');
    const [showImageLoader, setShowImageLoader] = React.useState(false);
    const location = useLocation();
    const [Category, setCategory] = React.useState([]);
    const [addName, setAddName] = React.useState('');
    const [showAddedBanner, setshowAddedBanner] = React.useState(true);
    const [addedBanner, setAddedBanner] = React.useState({
        image:'',
        link:''
    });
    console.log(Category)
    const [showBanner, setShowBanner] = React.useState([
        {
            show:true
        },
        {
            show:true
        },
        {
            show:true
        },
        {
            show:true
        },
        {
            show:true
        }
    ]);
    const navigate = useNavigate();
    const getAllPlans = async () => {
        var InsertAPIURL = `${url}category/get_category`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        const Data={
            Category_ID:location.state.row.id
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
            if (item.link == '') {
                if (!urlPattern.test(item.link)) {
                    check = true;
                }
                check = true;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#B5030B",
                    text: "All Fields Required"
                })
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
                                if(response.status){
                                    arr.push(item.id)
                                } 
                                    
                               
                    })
                            .catch(error => {
                                setIsloading1(false);
                            });
                    }
                    else{
                        await fetch(``)
                    }
                })
            )
            return arr;
        }
        return arr;
    }

    const ImageUpload = async (index,event,id)=>{
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
                setTempBanner(prevState  =>{
                    let newState = [...prevState]
                    newState[index].image = response.data.result[0].image;
                    return newState
                }) 
                setShowBanner(prevState  =>{
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
    const addedImageUpload = async (event)=>{
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
                                    
                                    setTempBanner(prevState=>{
                                        let newState = [ ...prevState ];
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
                    "Category_ID":Category.id,
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
    const handleAddedImageUpload = async (event) => {

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
    const [tempImage , setTempImage] = useState(null);

    const [tempBanner, setTempBanner] = useState([]);

    const handleImageChangeIcon = async (e) => {
        setShowImageLoader(true)
        setTempImage(e.target.files[0])
        setHidecrossiconIcon(false);
        setHidelabelIcon(false);
        setShowImageLoader(false)
    };
    const handleBannerVariable  = (index)=>{
        setShowBanner(prevState  =>{
            let newState = [...prevState]
            newState[index].show = false;
            return newState
        })
    }
    const handleLinkChangeBanners = async (index,e) => {
        setTempBanner(prevState  =>{
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
    const handleImageChange = (e, num) => {
        if (num === 0) {
            setSelectedFile(e.target.files[0]);
            setHidecrossicon(true);
            setHidelabel(true);
            // uploadImage(e, num);
        } else if (num === 1) {
            setSelectedFile1(e.target.files[0]);
            setHidecrossicon1(true);
            setHidelabel1(true);
            // uploadImage(e, num);
        } else if (num === 2) {
            setSelectedFile2(e.target.files[0]);
            setHidecrossicon2(true);
            setHidelabel2(true);
            // uploadImage(e, num);
        } else if (num === 3) {
            setSelectedFile3(e.target.files[0]);
            setHidecrossicon3(true);
            setHidelabel3(true);
            // uploadImage(e, num);
        } else if (num === 4) {
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
                                            <img src={tempImage == null ? `${url}${Category.image}`:URL.createObjectURL(tempImage)} alt="Preview" style={{ width: "300px", height: "200px" }} /> 
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
                                </Box>:<Grid sx={{
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

                                <FormControl sx={{ width: "50%" }} align="center">
                                    <Stack direction="column" spacing={0} pt={2}>
                                        <CustomTextField
                                            label="Category Name"
                                            value={Category.name}
                                            onChange={(event) => {
                                                setCategory({...Category , "name": event.target.value});
                                            }}
                                        />
                                    </Stack>
                                </FormControl>
                            </Grid>
                            {!showImageLoader ? <Grid xs={24} md={12} lg={12} xl={12} p={1} align="center" >

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
                                                {showBanner.map((item, index)=>
                                                {
                                                    if(index < tempBanner.length){
                                                        return <Grid item xs={6} sm={6} md={4} lg={4} pt={2} pb={2}>
                                                            <Box pt={2} pb={2} sx={{position:'relative'}}>
                                                        
                                                    <Box sx={{ position:'relative', width:'100%', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                        {item.show ? <Grid>
                                                            <Close sx={{
                                                                    position: "absolute", top:'1%', right:'0',
                                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                    color: "white"
                                                                }} onClick={() => handleBannerVariable(index)} />
                                                            <img src={tempBanner[index].image != null && `${url}${tempBanner[index].image}`} alt="Preview" style={{ width: "100%" }} /> 
                                                        </Grid>              
                                                        :
                                                        <CustomImageUpload handleImageChange={(e)=>{ImageUpload(index,e, tempBanner[index].id)}} />}
                                                    </Box>
                                                    {item.show &&
                                                    <OutlinedInput
                                                    key={index}
                                                        onChange={(e) => {
                                                            handleLinkChangeBanners(index,e);
                                                            }}
                                                        value={tempBanner[index].link != null ?  tempBanner[index].link : Category.banners[index].link}
                                                        id="input-with-icon-adornment"
                                                        sx={{
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
                                            {tempBanner.length < 5 && <Grid item xs={6} sm={6} md={4} lg={4} pt={2} pb={2}>
                                                            <Box pt={2} pb={2}>
                                                    <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                                        {!showAddedBanner ?
                                                            addedBanner.image !== null && 
                                                        <Grid>
                                                            <img src={URL.createObjectURL(addedBanner.image)} alt="Preview" style={{ width: "300px", height: "200px" }} /> 
                                                        {console.log(addedBanner.link)}
                                                        </Grid>              
                                                        :
                                                        <CustomImageUpload handleImageChange={async (e)=>{
                                                            addedImageUpload(e)
                                                        
                                                           }} />}
                                                    </Box>
                                                    {!showAddedBanner &&
                                                    <OutlinedInput
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
                                                                }} onClick={() => {}} />
                                                            </Box>
                                                            :
                                                            null
                                                    }
                                                </Box>
                                                    </Grid>}


                                            {/* <Grid pt={2} pb={2}>
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
                                                    null
                                                }

                                                {
                                                    hidecrossicon1 ?
                                                        <>
                                                            <Box sx={{ mb: '5%', display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                                <Close sx={{
                                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                    color: "white", ml: 22, mt: -24
                                                                }} onClick={(e) => clearpreviewimage(e, 1)} />
                                                            </Box>
                                                            <OutlinedInput
                                                                PlaceHolder="2nd Link"
                                                                onChange={(event) => {
                                                                    setLink2(event.target.value);
                                                                }}
                                                                id="input-with-icon-adornment"
                                                                sx={{
                                                                    borderRadius: "50px",
                                                                    backgroundColor: "darkgray",
                                                                    "& fieldset": { border: 'none' },
                                                                }}
                                                            />
                                                        </>
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
                                                    null
                                                }

                                                {
                                                    hidecrossicon2 ?
                                                        <>
                                                            <Box sx={{ mb: '5%', display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                                <Close sx={{
                                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                    color: "white", ml: 22, mt: -24
                                                                }} onClick={(e) => clearpreviewimage(e, 2)} />
                                                            </Box>
                                                            <OutlinedInput
                                                                PlaceHolder="3rd Link"
                                                                onChange={(event) => {
                                                                    setLink3(event.target.value);
                                                                }}
                                                                id="input-with-icon-adornment"
                                                                sx={{
                                                                    borderRadius: "50px",
                                                                    backgroundColor: "darkgray",
                                                                    "& fieldset": { border: 'none' },
                                                                }}
                                                            />                                                        </>
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
                                                    null
                                                }

                                                {
                                                    hidecrossicon3 ?
                                                        <>
                                                            <Box sx={{ mb: '5%', display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                                <Close sx={{
                                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                    color: "white", ml: 22, mt: -24
                                                                }} onClick={(e) => clearpreviewimage(e, 3)} />
                                                            </Box>
                                                            <OutlinedInput
                                                                PlaceHolder="4th Link"
                                                                onChange={(event) => {
                                                                    setLink4(event.target.value);
                                                                }}
                                                                id="input-with-icon-adornment"
                                                                sx={{
                                                                    borderRadius: "50px",
                                                                    backgroundColor: "darkgray",
                                                                    "& fieldset": { border: 'none' },
                                                                }}
                                                            />
                                                        </>
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
                                                    null
                                                }

                                                {
                                                    hidecrossicon4 ?
                                                        <>
                                                            <Box sx={{ mb: '5%', display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                                <Close sx={{
                                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                                    color: "white", ml: 22, mt: -24
                                                                }} onClick={(e) => clearpreviewimage(e, 4)} />
                                                            </Box>
                                                            <OutlinedInput
                                                                PlaceHolder="5th Link"
                                                                onChange={(event) => {
                                                                    setLink5(event.target.value);
                                                                }}
                                                                id="input-with-icon-adornment"
                                                                sx={{
                                                                    borderRadius: "50px",
                                                                    backgroundColor: "darkgray",
                                                                    "& fieldset": { border: 'none' },
                                                                }}
                                                            />                                                        </>
                                                        : null
                                                }
                                            </Grid> */}




                                        </Grid>

                                    </Stack>

                                </FormControl>

                            </Grid>:<Grid sx={{
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
                                    value={BannerName}
                                    onChange={(event) => {
                                        setBannerName(event.target.value);
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


// import { Box, Typography,OutlinedInput, Modal, Grid, Stack, Divider
//     , Container, FormControl, Breadcrumbs } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { Close,Upload} from '@mui/icons-material';
// import url from "../url"
// import { useNavigate , useLocation} from "react-router-dom"
// import Swal from 'sweetalert2'
// import CustomTextField from '../../components/CustomTextField.js'
// import CustomImageUpload from '../../components/CustomImageUpload.js'
// import ConditionalButton from '../../components/ConditionalButton.js'
// import axios from 'axios';
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: '#FFFFFF',
//     outline: "none",
//     maxHeight: "80vh",
//     overflowY: "auto",
//     boxShadow: 0,
//     p: 4,
//     borderRadius: 5
// };

// const Team = () => {
//         const location = useLocation();
//         const [BannerLink, setBannerLink] = React.useState('');
//         const [Link1, setLink1] = useState('');
//         const [Link2, setLink2] = useState('');
//         const [Link3, setLink3] = useState('');
//         const [Link4, setLink4] = useState('');
//         const [Link5, setLink5] = useState('');
    
//     const [addName, setAddName] = React.useState('');
//     const navigate = useNavigate();
//         const getAllPlans = async () => {
//                 if (location.state.row.image !== undefined && location.state.row.image !== null && location.state.row.image !== '') {
//             setHidelabel(true)
//             selectedFileIcon(location.state.row.image)
//                 }
//     }

//     const [openaddmodal, setOpenaddmodal] = useState(false);
//     const handleOpenadd = () => setOpenaddmodal(true);



    
//     const [Images, setImages] = useState([]);
//     const [Skills, setSkills] = useState([]);
//     const [Banners, setBanners] = useState([]);
//     const [Location, setLocation] = useState('');
//     const [hidelabelBanner, setHidelabelBanner] = useState(false);
//     const [hidecrossiconBanner, setHidecrossiconBanner] = useState(false);
//     const [selectedFileBanner, setSelectedFileBanner] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [selectedFile1, setSelectedFile1] = useState(null);
//     const [selectedFile2, setSelectedFile2] = useState(null);
//     const [selectedFile3, setSelectedFile3] = useState(null);
//     const [selectedFile4, setSelectedFile4] = useState(null);

//     const [hidelabel, setHidelabel] = useState(false);
//     const [hidelabel1, setHidelabel1] = useState(false);
//     const [hidelabel2, setHidelabel2] = useState(false);
//     const [hidelabel3, setHidelabel3] = useState(false);
//     const [hidelabel4, setHidelabel4] = useState(false);
//     const [hidecrossicon, setHidecrossicon] = useState(false);
//     const [hidecrossicon1, setHidecrossicon1] = useState(false);
//     const [hidecrossicon2, setHidecrossicon2] = useState(false);
//     const [hidecrossicon3, setHidecrossicon3] = useState(false);
//     const [hidecrossicon4, setHidecrossicon4] = useState(false);
//     const [hidelabelIcon, setHidelabelIcon] = useState(false);
//     const [hidecrossiconIcon, setHidecrossiconIcon] = useState(false);
//     const [selectedFileIcon, setSelectedFileIcon] = useState(null);
//     const [Screens, setScreens] = useState([]);
//     const [isloading1, setIsloading1] = useState(false);
//     const [isloading2, setIsloading2] = useState(false);
//     const [isloading, setIsloading] = useState(false);
//     useEffect(() => {

//         let imagePaths = [];
//                 if(location.state.row.banners){
//          imagePaths = location.state.row.banners.map(banner => banner);
//         }  
//         setImages(imagePaths);  


//             if (location.state.row.banners !== undefined &&
//                 location.state.row.banners !== null
//                 && location.state.row.banners.length !== 0) {
//                 const bannerIds = location.state.row.banners.map(banner => banner.id);
//                 setBanners(bannerIds)
//             }
    
//         getAllPlans();
//         getAllScreens();
//     }, [])

//     const handleAddBanner = async () => {
//         console.log("1");
//         setIsloading1(true);
//         var InsertAPIURL = `${url}ads/add_ad`
//         var headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         };
//         if (BannerLink === '' || selectedFileBanner === null) {
//             setIsloading1(false);
//             setOpenaddmodal(false);
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Warning...',
//                 confirmButtonColor: "#B5030B",
//                 text: "All Fields Required"
//             })
//             console.log("2");
//         } else {
//             var Data = {
//                 "screen_id": "16",
//                 "link": BannerLink
//             };
//             await fetch(InsertAPIURL, {
//                 method: 'POST',
//                 headers: headers,
//                 body: JSON.stringify(Data),
//             })
//                 .then(response => response.json())
//                 .then(async response => {
//                     console.log(response);
//                     if (response.status === true) {
//                         if (selectedFileBanner !== null && selectedFileBanner !== undefined) {

//                             setBanners(prevSkills => [...prevSkills, response.result[0].id]);
//                             var Data = {
//                                 "id": response.result[0].id,
//                                 "image": selectedFileBanner,
//                             };
//                             await axios.put(url + "ads/add_ad_image", Data, {
//                                 headers: {
//                                     "Content-Type": "multipart/form-data"
//                                 }
//                             }).then((response) => {
//                                 if (response.data.status === true) {
//                                     console.log("4");
//                                     setImages(prevSkills => [...prevSkills, response.data.result[0]]);
//                                     setOpenaddmodal(false);
//                                     setIsloading1(false)
//                                 } else {
//                                     setOpenaddmodal(false);
//                                     setIsloading1(false)
//                                     console.log("5");
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
//                             console.log("6");
//                             setOpenaddmodal(false);
//                             setIsloading1(false)
//                         }
//                         setIsloading1(false)
//                         setSelectedFileBanner(null);
//                         setHidecrossiconBanner(false);
//                         setHidelabelBanner(false);
//                         Swal.fire({
//                             icon: 'success',
//                             title: 'Success!',
//                             confirmButtonColor: "#B5030B",
//                             text: 'Banner Added Successfully!',
//                         })
//                     } else {
//                         setIsloading1(false);
//                         setOpenaddmodal(false);
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Oops...',
//                             confirmButtonColor: "#B5030B",
//                             text: ''
//                         })
//                     }
//                 }
//                 )
//                 .catch(error => {
//                     setIsloading1(false);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Oops...',
//                         confirmButtonColor: "#B5030B",
//                         text: "Server Down!"
//                     })
//                 });
//         }
//     }

//     const handleAdd = async () => {
//         setIsloading2(true)
//         var InsertAPIURL = `${url}category/update_category`
//         var headers = {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         };
// if ( Skills === "" ) {
//             setIsloading2(false)
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'warning',
//                 confirmButtonColor: "#B5030B",
//                 text: 'All Fields Required',
//             })
//         } else {
//              var Data = {
//                 "Category_ID": location.state.row.id,
//                 "name": addName,
//                 "banners": Banners
//             };
// await fetch(InsertAPIURL, {
//                 method: 'PUT',
//                 headers: headers,
//                 body: JSON.stringify(Data),
//             })
//                 .then(response => response.json())
//                 .then(async response => {
//                     if (response.status === true) {
//                         if (selectedFileIcon !== null && selectedFileIcon !== undefined) {
//                             var Data = {
//                                 "id": response.result[0].id,
//                                 "image": selectedFileIcon,
//                             };
//                             await axios.put(url + "category/add_category_image", Data, {
//                                 headers: {
//                                     "Content-Type": "multipart/form-data"
//                                 }
//                             }).then((response) => {
//                                 setIsloading2(false)
//                                 console.log(response.data);
//                                 if (response.data.status === true) {
//                                     navigate("/categories")
//                                     setIsloading2(false)
//                                 } else {
//                                     setIsloading2(false)
//                                     Swal.fire({
//                                         icon: 'error',
//                                         title: 'Oops2...',
//                                         confirmButtonColor: "#B5030B",
//                                         text: ''
//                                     })
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
                    
//                     } else {
//                         setIsloading2(false)
//                         Swal.fire({
//                             icon: 'error',
//                             title: 'Oops...',
//                             confirmButtonColor: "#B5030B",
//                             text: 'Try Again'
//                         })
//                     }
//                     setIsloading2(false)
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Success!',
//                         confirmButtonColor: "#B5030B",
//                         text: 'Category Updated Successfully!',
//                     })

//                 }
//                 )
//                 .catch(error => {
//                     setIsloading2(false)
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Oops...',
//                         confirmButtonColor: "#B5030B",
//                         text: "Server Down!"
//                     })
//                 });
//         }
//     }
//     const uploadImage = async (e, num) => {
//         console.log(e);
//         e.preventDefault();
//         setIsloading(true);
//         const formData = new FormData();
//         formData.append("image", e.target.files[0]);
//         console.log(e.target.files[0])
//         if (e.target.files[0] !== null && e.target.files[0] !== undefined) {
//             formData.append("id", location.state.row.id)
//             formData.append("location", num)

//             await axios.put(url + "merchandise/edit_merchandise_image", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data"
//                 }
//             }).then((response) => {
//                 setIsloading(false);
//                 console.log(response.data);
//                 if (response.data.status === true) {
//                     setIsloading(false);
//                 } else {
//                     setIsloading(false);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error...',
//                         confirmButtonColor: "#B5030B",
//                         text: 'Server Error'
//                     })
//                 }
//             }
//             )
//                 .catch(error => {
//                     setIsloading(false);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Oops...',
//                         confirmButtonColor: "#B5030B",
//                         text: "Server Down!"
//                     })
//                 });
//         }
//     }
//     const handleImageChange = (e, num) => {
//         if (num === 0) {
//             setSelectedFile(e.target.files[0]);
//             setHidecrossicon(true);
//             setHidelabel(true);
//             uploadImage(e, num);
//         } else if (num === 1) {
//             setSelectedFile1(e.target.files[0]);
//             setHidecrossicon1(true);
//             setHidelabel1(true);
//             uploadImage(e, num);
//         } else if (num === 2) {
//             setSelectedFile2(e.target.files[0]);
//             setHidecrossicon2(true);
//             setHidelabel2(true);
//             uploadImage(e, num);
//         } else if (num === 3) {
//             setSelectedFile3(e.target.files[0]);
//             setHidecrossicon3(true);
//             setHidelabel3(true);
//             uploadImage(e, num);
//         } else if (num === 4) {
//             setSelectedFile4(e.target.files[0]);
//             setHidecrossicon4(true);
//             setHidelabel4(true);
//             uploadImage(e, num);
//         }

//     };


//     const clearpreviewimage = (e, num) => {
//         location.state.row.banners[num].image = null
//         if (num === 0) {
//             setSelectedFile(null);
//             setHidecrossicon(false);
//             setHidelabel(false);
//             // DeleteImage( num);

//         } else if (num === 1) {
//             setSelectedFile1(null);
//             setHidecrossicon1(false);
//             setHidelabel1(false);
//             // DeleteImage( num);

//         }
//         else if (num === 2) {
//             setSelectedFile2(null);
//             setHidecrossicon2(false);
//             setHidelabel2(false);
//             // DeleteImage(num);

//         }
//         else if (num === 3) {
//             setSelectedFile3(null);
//             setHidecrossicon3(false);
//             setHidelabel3(false);
//             // DeleteImage( num);

//         }
//         else if (num === 4) {
//             setSelectedFile4(null);
//             setHidecrossicon4(false);
//             setHidelabel4(false);
//             // DeleteImage( num);

//         }

//     }



//     const getAllScreens = async () => {
//         if (location.state.row.banners[0].image !== undefined && location.state.row.banners[0].image !== null && location.state.row.banners[0].image  !== '') {
//             setHidelabel(true)
//         }
//         if (location.state.row.banners[1].image  !== undefined && location.state.row.banners[1].image == null && location.state.row.banners[1].image  !== '') {
//             setHidelabel1(true)
//         }
//         if (location.state.row.banners[2].image  !== undefined && location.state.row.banners[2].image !== null && location.state.row.banners[2].image  !== '') {
//             setHidelabel2(true)
//         }
//         if (location.state.row.banners[3].image !== undefined && location.state.row.banners[3].image  !== null && location.state.row.banners[3].image  !== '') {
//             setHidelabel3(true)
//         }
//         if (location.state.row.banners[4].image  !== undefined && location.state.row.banners[4].image  !== null && location.state.row.banners[4].image !== '') {
//             setHidelabel4(true)
//         }
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
//                 if (response.status === true) {
//                     // setLogos(response.count);
//                     setScreens(response.result);
//                 }
//             }
//             )
//             .catch(error => {
//             });
//     }


//     const handleImageChangeBanner = (e) => {
//         setSelectedFileBanner(e.target.files[0]);
//         setHidecrossiconBanner(true);
//         setHidelabelBanner(true);
//     };

//     const clearpreviewimageBanner = () => {
//         setSelectedFileBanner(null);
//         setHidecrossiconBanner(false);
//         setHidelabelBanner(false);
//     }

//     const handleImageChangeIcon = (e) => {
//         setSelectedFileIcon(e.target.files[0]);
//         setHidecrossiconIcon(true);
//         setHidelabelIcon(true);
//     };
//     const ClearBanner = (data) => {
//         const newImages = Images.filter(myData => myData.image !== data.image);
//         setImages(newImages);
//         const NewBanners = Banners.filter(id => id !== data.id);
//         setBanners(NewBanners);

//     }

//     const clearpreviewimageIcon = () => {
//         location.state.row.image = null
//         setSelectedFileIcon(null);
//         setHidecrossiconIcon(false);
//         setHidelabelIcon(false);
//     }
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
//                                     {hidelabelIcon ?
//                                             null
//                                             :
//                                             <Box>
//                                             <Grid container spacing={0} pt={5}>
//                                             <Grid xs={12} align="">
//                                                 <Stack align="">
//                                                     <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
//                                                         <Stack direction="column" spacing={1} >
//                                                             <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
//                                                             <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
//                                                         </Stack>
//                                                     </label>
//                                                     <input
//                                                         style={{ display: "none" }}
//                                                         id="fileInput"
//                                                         type="file"
//                                                         onChange={handleImageChangeIcon}
//                                                         accept="image/*"
//                                                     />
//                                                 </Stack>
//                                             </Grid>
//                                         </Grid>
//                                     </Box>

//                                         }
//                                         {selectedFileIcon !== null && selectedFileIcon ? <img src={URL.createObjectURL(selectedFileIcon)} alt="Preview" style={{ width: "300px", height: "200px" }} />
//                                             :
//                                             location.state.row.image && <img src={`${url}${location.state.row.image}`} alt="Preview" style={{ width: "300px", height: "200px" }} />
//                                         }
//                                     </Box>

//                                     {
//                                         hidecrossiconIcon ?
//                                             <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", ml: 32, mt: -24
//                                                 }} onClick={() => clearpreviewimageIcon()} />
//                                             </Box>
//                                             :
//                                             location.state.row.image ?
//                                                 <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                     <Close sx={{
//                                                         padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                         color: "white", ml: 32, mt: -24
//                                                     }} onClick={() => clearpreviewimageIcon()} />
//                                                 </Box>
//                                                 : null

//                                     }
//                                 </Box>                       
//                                      </Grid>

//                             <Grid xs={12} md={12} lg={12} xl={12} p={1} align="center" >

//                                 <FormControl sx={{ width: "50%" }} align="center">
//                                     <Stack direction="column" spacing={0} pt={2}>
//                                     <CustomTextField
//                                             label="Name"
//                                             defaultValue={location.state.row.name}
//                                             onChange={(event) => {
//                                                 setAddName(event.target.value);
//                                             }}
//                                         />
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
//                                             Banners
//                                         </Typography>







//                                         {/* <Grid  sx={12} >
//                                             <div style={{ display: 'flex', justifyContent: 'center' }}>
//                                                 <div style={{ display: 'grid', 
//                                                 gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px', maxWidth: '1000px' }}>
//                                                     {Images.map((data) => {

//                                                         return (
//                                                             <div
//                                                                 key={data.id}
//                                                                 // onClick={() => handleImageClick(data.id)}
//                                                                 style={{
//                                                                     cursor: 'pointer', 
//                                                                     borderRadius: '3px', display: 'flex', flexDirection: 'column', alignItems: 'center'
//                                                                 }}
//                                                             >
//                                                 <Box sx={{ display: "flex", justifyContent: "right", alignContent: "right" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", 
//                                                 }} onClick={() => ClearBanner(data)} />
//                                             </Box>

//                                                                 <img
//                                                                     alt=""
//                                                                     src={`${url}${data.image}`}
//                                                                     style={{ width: '100%', height: '100%', maxHeight: '300px', maxWidth: '300px' }}
//                                                                 />
//                                                             </div>
//                                                         );
//                                                     })}
//                                                 </div>
//                                             </div>
//                                         </Grid> */}
//                                     </Stack>

//                                 </FormControl>




//                                 <Grid style={{
//                                 display: 'flex',
//                                 align: 'left',
//                                 justifyContent: 'left',

//                             }}
//                                 p={1}>



//                                 <Grid pt={2} pb={2}>

//                                     {hidelabel ?
//                                         null
//                                         :
//                                         hidelabel || hidelabel1 || hidelabel2 || hidelabel3 ?
//                                             <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                                 <Grid container spacing={0} pt={5}>
//                                                     <Grid xs={12} align="">
//                                                         <Stack align="">
//                                                             <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
//                                                                 <Stack direction="column" spacing={1} >
//                                                                     <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
//                                                                     <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
//                                                                 </Stack>
//                                                             </label>
//                                                             <input
//                                                                 style={{ display: "none" }}
//                                                                 id="fileInput"
//                                                                 type="file"
//                                                                 onChange={(e) => { handleImageChange(e, 0) }}
//                                                                 accept="image/*"
//                                                             />
//                                                         </Stack>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Box>
//                                             :
//                                             <Box sx={{ ml: '400px', pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                                 <Grid container spacing={0} pt={5}>
//                                                     <Grid xs={12} align="">
//                                                         <Stack align="">
//                                                             <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
//                                                                 <Stack direction="column" spacing={1} >
//                                                                     <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
//                                                                     <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
//                                                                 </Stack>
//                                                             </label>
//                                                             <input
//                                                                 style={{ display: "none" }}
//                                                                 id="fileInput"
//                                                                 type="file"
//                                                                 onChange={(e) => { handleImageChange(e, 0) }}
//                                                                 accept="image/*"
//                                                             />
//                                                         </Stack>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Box>

//                                     }

//                                     {selectedFile !== null && selectedFile !== undefined && selectedFile ?
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                             <img src={URL.createObjectURL(selectedFile)} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>
//                                         :

//                                         location.state.row.banners[0].image !==null && location.state.row.banners[0].image &&
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                             <img src={`${url}${location.state.row.banners[0].image}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>
//                                     }

//                                     {
//                                         hidecrossicon ?
//                                         <>
//                                             <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", ml: 22, mt: -24
//                                                 }} onClick={(e) => clearpreviewimage(e, 0)} />
//                                             </Box>
//                                             <OutlinedInput
//                                             PlaceHolder="1st Link"
//                                             onChange={(event) => {
//                                                 setLink1(event.target.value);
//                                             }}
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "darkgray",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         </>
//                                             :
//                                             location.state.row.banners[0].image !==null && location.state.row.banners[0].image ?
//                                             <>
//                                                 <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                     <Close sx={{
//                                                         padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                         color: "white", ml: 22, mt: -24
//                                                     }} onClick={(e) => clearpreviewimage(e, 0)} />
//                                                 </Box>
//                                                 <OutlinedInput
//                                                 defaultValue={location.state.row.banners[0].link}
//                                                 PlaceHolder="1st Link"
//                                                 onChange={(event) => {
//                                                     setLink1(event.target.value);
//                                                 }}
//                                                 id="input-with-icon-adornment"
//                                                 sx={{
//                                                     borderRadius: "50px",
//                                                     backgroundColor: "darkgray",
//                                                     "& fieldset": { border: 'none' },
//                                                 }}
//                                             />
//                                             </>
//                                                 :
//                                                 selectedFile !== null && selectedFile !== undefined && selectedFile ?
//                                                 <>
//                                                     <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                         <Close sx={{
//                                                             padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                             color: "white", ml: 22, mt: -24
//                                                         }} onClick={(e) => clearpreviewimage(e, 0)} />
//                                                     </Box>
//                                                       <OutlinedInput
//                                                       defaultValue={location.state.row.banners[0].link}
//                                                       PlaceHolder="1st Link"
//                                                       onChange={(event) => {
//                                                           setLink1(event.target.value);
//                                                       }}
//                                                       id="input-with-icon-adornment"
//                                                       sx={{
//                                                           borderRadius: "50px",
//                                                           backgroundColor: "darkgray",
//                                                           "& fieldset": { border: 'none' },
//                                                       }}
//                                                   />
//                                                   </>
//                                                     : null
//                                     }
//                                 </Grid>


//                                 <Grid pt={2} pb={2}>
//                                     {hidelabel ?
//                                         hidelabel1 ?
//                                             null
//                                             :
//                                             <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                                 <Grid container spacing={0} pt={5}>
//                                                     <Grid xs={12} align="">
//                                                         <Stack align="">
//                                                             <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
//                                                                 <Stack direction="column" spacing={1} >
//                                                                     <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
//                                                                     <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
//                                                                 </Stack>
//                                                             </label>
//                                                             <input
//                                                                 style={{ display: "none" }}
//                                                                 id="fileInput"
//                                                                 type="file"
//                                                                 onChange={(e) => { handleImageChange(e, 1) }}
//                                                                 accept="image/*"
//                                                             />
//                                                         </Stack>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Box>
//                                         :
//                                         null
//                                     }

//                                     {selectedFile1 !== null && selectedFile1 !== undefined && selectedFile1 ?
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

//                                             <img src={URL.createObjectURL(selectedFile1)} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>
//                                         :
//                                         location.state.row.banners[1].image !==null &&  location.state.row.banners[1].image&&
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

//                                             <img src={`${url}${location.state.row.banners[1].image}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>

//                                     }

//                                     {
//                                         hidecrossicon1 ?
//                                         <>
//                                             <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", ml: 22, mt: -24
//                                                 }} onClick={(e) => clearpreviewimage(e, 1)} />
//                                             </Box>
//                                             <OutlinedInput
//                                             defaultValue={location.state.row.banners[1].link}
//                                             PlaceHolder="2nd Link"
//                                             onChange={(event) => {
//                                                 setLink2(event.target.value);
//                                             }}
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "darkgray",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         </>
//                                             :
//                                             location.state.row.banners[1].image !==null && location.state.row.banners[1].image ?
//                                             <>
//                                                 <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                     <Close sx={{
//                                                         padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                         color: "white", ml: 22, mt: -24
//                                                     }} onClick={(e) => clearpreviewimage(e, 1)} />
//                                                 </Box>
//                                                   <OutlinedInput
//                                                   defaultValue={location.state.row.banners[1].link}
//                                                   PlaceHolder="2nd Link"
//                                                   onChange={(event) => {
//                                                       setLink2(event.target.value);
//                                                   }}
//                                                   id="input-with-icon-adornment"
//                                                   sx={{
//                                                       borderRadius: "50px",
//                                                       backgroundColor: "darkgray",
//                                                       "& fieldset": { border: 'none' },
//                                                   }}
//                                               />
//                                               </>
//                                                 : null
//                                     }
//                                 </Grid>


//                                 <Grid pt={2} pb={2}>
//                                     {hidelabel && hidelabel1 ?
//                                         hidelabel2 ?
//                                             null
//                                             :
//                                             <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                                 <Grid container spacing={0} pt={5}>
//                                                     <Grid xs={12} align="">
//                                                         <Stack align="">
//                                                             <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
//                                                                 <Stack direction="column" spacing={1} >
//                                                                     <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
//                                                                     <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
//                                                                 </Stack>
//                                                             </label>
//                                                             <input
//                                                                 style={{ display: "none" }}
//                                                                 id="fileInput"
//                                                                 type="file"
//                                                                 onChange={(e) => { handleImageChange(e, 2) }}
//                                                                 accept="image/*"
//                                                             />
//                                                         </Stack>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Box>
//                                         :
//                                         null
//                                     }

//                                     {selectedFile2 !== null && selectedFile2 !== undefined && selectedFile2 ?
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                             <img src={URL.createObjectURL(selectedFile2)} alt="Preview" style={{ width: "200px", height: "200px" }} />

//                                         </Box>
//                                         :
//                                         location.state.row.banners[2].image !==null && location.state.row.banners[2].image &&
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                             <img src={`${url}${location.state.row.banners[2].image}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>
//                                     }

//                                     {
//                                         hidecrossicon2 ?
//                                         <>
//                                             <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", ml: 22, mt: -24
//                                                 }} onClick={(e) => clearpreviewimage(e, 2)} />
//                                             </Box>
//                                             <OutlinedInput
//                                             defaultValue={location.state.row.banners[2].link}
//                                             PlaceHolder="3rd Link"
//                                             onChange={(event) => {
//                                                 setLink3(event.target.value);
//                                             }}
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "darkgray",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         </>
//                                             :
//                                             location.state.row.banners[2].image !==null && location.state.row.banners[2].image ?
//                                             <>
//                                                 <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                     <Close sx={{
//                                                         padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                         color: "white", ml: 22, mt: -24
//                                                     }} onClick={(e) => clearpreviewimage(e, 2)} />
//                                                 </Box>
//                                                   <OutlinedInput
//                                                   defaultValue={location.state.row.banners[2].link}
//                                                   PlaceHolder="3rd Link"
//                                                   onChange={(event) => {
//                                                       setLink3(event.target.value);
//                                                   }}
//                                                   id="input-with-icon-adornment"
//                                                   sx={{
//                                                       borderRadius: "50px",
//                                                       backgroundColor: "darkgray",
//                                                       "& fieldset": { border: 'none' },
//                                                   }}
//                                               />
//                                               </>
//                                                 : null
//                                     }
//                                 </Grid>

//                                 <Grid pt={2} pb={2}>
//                                     {hidelabel && hidelabel1 && hidelabel2 ?
//                                         hidelabel3 ?
//                                             null
//                                             :
//                                             <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                                 <Grid container spacing={0} pt={5}>
//                                                     <Grid xs={12} align="">
//                                                         <Stack align="">
//                                                             <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
//                                                                 <Stack direction="column" spacing={1} >
//                                                                     <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
//                                                                     <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
//                                                                 </Stack>
//                                                             </label>
//                                                             <input
//                                                                 style={{ display: "none" }}
//                                                                 id="fileInput"
//                                                                 type="file"
//                                                                 onChange={(e) => { handleImageChange(e, 3) }}
//                                                                 accept="image/*"
//                                                             />
//                                                         </Stack>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Box>

//                                         :
//                                         null
//                                     }

//                                     {selectedFile3 !== null && selectedFile3 !== undefined && selectedFile3 ?
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

//                                             <img src={URL.createObjectURL(selectedFile3)} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>

//                                         :
//                                         location.state.row.banners[3].image !==null && location.state.row.banners[3].image &&
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

//                                             <img src={`${url}${location.state.row.banners[3].image}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>

//                                     }

//                                     {
//                                         hidecrossicon3 ?
//                                         <>
//                                             <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", ml: 22, mt: -24
//                                                 }} onClick={(e) => clearpreviewimage(e, 3)} />
//                                             </Box>
//                                             <OutlinedInput
//                                             defaultValue={location.state.row.banners[3].link}
//                                             PlaceHolder="4th Link"
//                                             onChange={(event) => {
//                                                 setLink4(event.target.value);
//                                             }}
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "darkgray",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         </>
//                                             :
//                                             location.state.row.banners[3].image !==null && location.state.row.banners[3].image ?
//                                             <>
//                                                 <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                     <Close sx={{
//                                                         padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                         color: "white", ml: 22, mt: -24
//                                                     }} onClick={(e) => clearpreviewimage(e, 3)} />
//                                                 </Box>
//                                                   <OutlinedInput
//                                                   PlaceHolder="4th Link"
//                                                   defaultValue={location.state.row.banners[3].link}
//                                                   onChange={(event) => {
//                                                       setLink4(event.target.value);
//                                                   }}
//                                                   id="input-with-icon-adornment"
//                                                   sx={{
//                                                       borderRadius: "50px",
//                                                       backgroundColor: "darkgray",
//                                                       "& fieldset": { border: 'none' },
//                                                   }}
//                                               />
//                                               </>
//                                                 : null
//                                     }
//                                 </Grid>

//                                 <Grid pt={2} pb={2}>
//                                     {hidelabel && hidelabel1 && hidelabel2 && hidelabel3 ?
//                                         hidelabel4 ?
//                                             null
//                                             :
//                                             <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                                 <Grid container spacing={0} pt={5}>
//                                                     <Grid xs={12} align="">
//                                                         <Stack align="">
//                                                             <label htmlFor="fileInput" style={{ display: "flex", justifyContent: "center", alignContent: "center", color: "#808080" }}>
//                                                                 <Stack direction="column" spacing={1} >
//                                                                     <Upload sx={{ fontSize: "50px", color: "#808080", ml: 1.8, pb: 1 }} />
//                                                                     <span style={{ paddingBottom: "2vh", font: "normal normal normal 16px/26px Arial" }}>Upload Image</span>
//                                                                 </Stack>
//                                                             </label>
//                                                             <input
//                                                                 style={{ display: "none" }}
//                                                                 id="fileInput"
//                                                                 type="file"
//                                                                 onChange={(e) => { handleImageChange(e, 4) }}
//                                                                 accept="image/*"
//                                                             />
//                                                         </Stack>
//                                                     </Grid>
//                                                 </Grid>
//                                             </Box>

//                                         : null
//                                     }

//                                     {selectedFile4 !== null && selectedFile4 !== undefined && selectedFile4 ?
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">

//                                             <img src={URL.createObjectURL(selectedFile4)} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>

//                                         :
//                                         location.state.row.banners[4].image !==null && location.state.row.banners[4].image &&
//                                         <Box sx={{ pt: 2, width: "200px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                             <img src={`${url}${location.state.row.banners[4].image}`} alt="Preview" style={{ width: "200px", height: "200px" }} />
//                                         </Box>

//                                     }

//                                     {
//                                         hidecrossicon4 ?
//                                         <>
//                                             <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", ml: 22, mt: -24
//                                                 }} onClick={(e) => clearpreviewimage(e, 4)} />
//                                             </Box>
//                                             <OutlinedInput
//                                             PlaceHolder="5th Link"
//                                             defaultValue={location.state.row.banners[4].link}
//                                             onChange={(event) => {
//                                                 setLink5(event.target.value);
//                                             }}
//                                             id="input-with-icon-adornment"
//                                             sx={{
//                                                 borderRadius: "50px",
//                                                 backgroundColor: "darkgray",
//                                                 "& fieldset": { border: 'none' },
//                                             }}
//                                         />
//                                         </>
//                                             :
//                                             location.state.row.banners[4].image !==null && location.state.row.banners[4].image ?
//                                             <>
//                                                 <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                     <Close sx={{
//                                                         padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                         color: "white", ml: 22, mt: -24
//                                                     }} onClick={(e) => clearpreviewimage(e, 4)} />
//                                                 </Box>
//                                                   <OutlinedInput
//                                                   PlaceHolder="5th Link"
//                                                   defaultValue={location.state.row.banners[4].link}
//                                                   onChange={(event) => {
//                                                       setLink5(event.target.value);
//                                                   }}
//                                                   id="input-with-icon-adornment"
//                                                   sx={{
//                                                       borderRadius: "50px",
//                                                       backgroundColor: "darkgray",
//                                                       "& fieldset": { border: 'none' },
//                                                   }}
//                                               />
//                                               </>
//                                                 : null
//                                     }
//                                 </Grid>




//                             </Grid>


                                
//                                 <Grid sx={{mt:'5%'}} container justifyContent="center" spacing={0}>
//       {/* <Grid md={6} xs={12} item>
//       <ConditionalButton Title="Add More Banners" isloading={isloading} handleAdd={()=>{handleOpenadd()}} />
//       </Grid> */}

//       <Grid md={6} xs={12} item>
//       <ConditionalButton Title="Update category" isloading={isloading2} handleAdd={handleAdd} />
//       </Grid>
//     </Grid>
//                         </Grid>
//                             </Grid>


//                     </Container>
//                 </Container>

//             </Box>
//             {/* addmodal */}
//             <Modal
//                 open={openaddmodal}
//                 // onClose={handleClose}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
//                     <Grid container spacing={0}>
//                         <Grid xs={6} align="left" >
//                             <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Add Banner</Typography>
//                         </Grid>

//                         <Grid xs={6} align="right">
//                             <Close onClick={() => setOpenaddmodal(false)} />
//                         </Grid>

//                         <Grid xs={12} align="center" pt={7}>
//                             <FormControl fullWidth>


//                                 <Box pt={2} pb={2}>
//                                     <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
//                                         {hidelabelBanner ?
//                                             null
//                                             :
//                                             <CustomImageUpload handleImageChange={handleImageChangeBanner} />

//                                         }
//                                         {selectedFileBanner !== null && selectedFileBanner !== null && selectedFileBanner && <img src={URL.createObjectURL(selectedFileBanner)} alt="Preview" style={{ width: "300px", height: "200px" }} />}
//                                     </Box>
//                                     {
//                                         hidecrossiconBanner ?
//                                             <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
//                                                 <Close sx={{
//                                                     padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
//                                                     color: "white", ml: 32, mt: -24
//                                                 }} onClick={() => clearpreviewimageBanner()} />
//                                             </Box>
//                                             :
//                                             null
//                                     }
//                                 </Box>



//                                 <CustomTextField
//                                             label="Banner Link"
//                                             onChange={(event) => {
//                                                 setBannerLink(event.target.value);
//                                             }}
//                                         />
//                                 </FormControl>
//                         </Grid>
//                     </Grid>

//                     <Grid container spacing={0} pt={7}>
//                     <ConditionalButton Title="Add Banner" isloading={isloading1} handleAdd={handleAddBanner} />
//                     </Grid>

//                 </Box>
//             </Modal>

//         </>
//     )
// }

// export default Team
// // import { Subscriptions, Notifications, Settings, Person, Close, Upload, Add } from '@mui/icons-material';
// // import url from "../url"
// // import { useLocation, useNavigate } from "react-router-dom"
// // import Swal from 'sweetalert2'
// // import axios from 'axios';
// // import ClipLoader from "react-spinners/ClipLoader";
// // const override = {
// //     display: ' block',
// //     margin: '0 auto',
// //     borderColor: 'red',
// // }
// // const btn = {
// //     letterSpacing: "1px",
// //     width: '50%',
// //     marginTop: '40pxs',
// //     marginBottom: '40px',
// //     color: 'white',
// //     backgroundColor: '#B5030B',
// //     borderColor: '#B5030B',
// //     height: '50px',
// //     padding: '0px',
// //     font: 'normal normal normal 17px/26px Roboto',
// //     borderRadius: "50px",
// //     boxShadow: "none",
// //     fontWeight: "medium",
// //     boxShadow: "none",
// //     borderRadius: "50px",
// //     fontSize: "15px",
// //     textTransform: "capitalize"
// // }
// // const ITEM_HEIGHT = 48;
// // const ITEM_PADDING_TOP = 8;
// // const MenuProps = {
// //     PaperProps: {
// //         style: {
// //             maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
// //             width: 250,
// //         },
// //     },
// // };

// // const Team = () => {
// //     const location = useLocation();
// //     const navigate = useNavigate();
// //     const [anchorEl, setAnchorEl] = React.useState(null);
// //     const open = Boolean(anchorEl);
// //     const handleClick = (event) => {
// //         setAnchorEl(event.currentTarget);
// //     };
// //     const handleClose = () => {
// //         setAnchorEl(null);
// //     }
// //     const [searchQuery, setSearchQuery] = useState("");
// //     const getAllPlans = async () => {
// //         if (location.state.row.row.image !== undefined && location.state.row.row.image !== null && location.state.row.row.image !== '') {
// //             setHidelabel(true)
// //         }

// //         var InsertAPIURL = `${url}ads/get_all_ads`
// //         var headers = {
// //             'Accept': 'application/json',
// //             'Content-Type': 'application/json',
// //         };
// //         await fetch(InsertAPIURL, {
// //             method: 'POST',
// //             headers: headers,
// //         })
// //             .then(response => response.json())
// //             .then(response => {
// //                 if (response.status == true) {
// //                     // setLogos(response.count);
// //                     console.log("response");
// //                     setSkills(response.result);
// //                 } else {
// //                     Swal.fire({
// //                         icon: 'error',
// //                         title: 'Oops...',
// //                         confirmButtonColor: "#FF8B94",
// //                         text: ''
// //                     })
// //                 }
// //             }
// //             )
// //             .catch(error => {
// //                 Swal.fire({
// //                     icon: 'error',
// //                     title: 'Oops...',
// //                     confirmButtonColor: "#FF8B94",
// //                     text: "Server Down!"
// //                 })
// //             });
// //     }
// //     const handleImageClick = (imageId) => {
// //         // Assuming `Skill` is an array that stores the selected image IDs
// //         if (Skill.includes(imageId)) {
// //             // If the image is already selected, remove it from the selection
// //             setSkill(Skill.filter(id => id !== imageId));
// //         } else {
// //             // If the image is not selected, add it to the selection
// //             setSkill([...Skill, imageId]);
// //         }
// //     };
// //     const handleChangeSkill = (event) => {
// //         const {
// //             target: { value },
// //         } = event;
// //         setSkill(
// //             // On autofill we get a stringified value.
// //             typeof value === 'string' ? value.split(',') : value,
// //         );

// //     };
// //     const [Skill, setSkill] = React.useState([]);
// //     const [Skills, setSkills] = useState([]);

// //     const [hidelabel, setHidelabel] = useState(false);
// //     const [hidecrossicon, setHidecrossicon] = useState(false);
// //     const [selectedFile, setSelectedFile] = useState(null);
// //     const [Screens, setScreens] = useState([]);
// //     const [isloading, setIsloading] = useState(false);
// //     useEffect(() => {
// //         if (location.state.row.row.banners !== undefined && location.state.row.row.banners.length !== 0) {
// //             const bannerIds = location.state.row.row.banners.map(banner => banner.id);
// //             setSkill(bannerIds)
// //         }
// //         getAllPlans();
// //         getAllScreens();
// //     }, [])


// //     const handleAdd = async () => {
// //         setIsloading(true)
// //         var InsertAPIURL = `${url}category/update_category`
// //         var headers = {
// //             'Accept': 'application/json',
// //             'Content-Type': 'application/json',
// //         };
// //         console.log(AddName)
// //         console.log(selectedFile)
// //         console.log(Skill)
// //         if(AddName === ''){
// //             setAddName(location.state.row.row.name);
// //         }
// //         if(selectedFile === ''){
// //             setAddName(location.state.row.row.image);
// //         }
// //         if(Skill === ''){
// //             setSkill(location.state.row.row.banners);
// //         }

// //         if ( Skill === "" ) {
// //             setIsloading(false)
// //             Swal.fire({
// //                 icon: 'warning',
// //                 title: 'warning',
// //                 confirmButtonColor: "#B5030B",
// //                 text: 'All Fields Required',
// //             })
// //         } else {
// //             var Data = {
// //                 "Category_ID": location.state.row.row.id,
// //                 "name": AddName,
// //                 "banners": Skill
// //             };
// //             await fetch(InsertAPIURL, {
// //                 method: 'PUT',
// //                 headers: headers,
// //                 body: JSON.stringify(Data),
// //             })
// //                 .then(response => response.json())
// //                 .then(async response => {
// //                     if (response.status === true) {
// //                         if (selectedFile !== null && selectedFile !== undefined) {
// //                             var Data = {
// //                                 "id": response.result[0].id,
// //                                 "image": selectedFile,
// //                             };
// //                             await axios.put(url + "category/add_category_image", Data, {
// //                                 headers: {
// //                                     "Content-Type": "multipart/form-data"
// //                                 }
// //                             }).then((response) => {
// //                                 setIsloading(false)
// //                                 console.log(response.data);
// //                                 if (response.data.status === true) {
// //                                     setIsloading(false)
// //                                 } else {
// //                                     setIsloading(false)
// //                                 }
// //                             }
// //                             )
// //                                 .catch(error => {
// //                                     Swal.fire({
// //                                         icon: 'error',
// //                                         title: 'Oops...',
// //                                         confirmButtonColor: "#B5030B",
// //                                         text: response.message
// //                                     })
// //                                 });
// //                         } else {
// //                             setIsloading(false)
// //                             navigate("/categories")
// //                         }
// //                     } else if (response.message == 'Please Enter screen ID') {
// //                         setIsloading(false)
// //                         Swal.fire({
// //                             icon: 'error',
// //                             title: 'Oops...',
// //                             confirmButtonColor: "#B5030B",
// //                             text: 'Please Select Screen'
// //                         })
// //                     } else {
// //                         setIsloading(false)
// //                         Swal.fire({
// //                             icon: 'error',
// //                             title: 'Oops...',
// //                             confirmButtonColor: "#B5030B",
// //                             text: 'Try Again'
// //                         })
// //                     }
// //                     setIsloading(false)
// //                     Swal.fire({
// //                         icon: 'success',
// //                         title: 'Success!',
// //                         confirmButtonColor: "#B5030B",
// //                         text: 'Category Updated Successfully!',
// //                     })
// //                     navigate('/categories')

// //                 }
// //                 )
// //                 .catch(error => {
// //                     setIsloading(false)
// //                     Swal.fire({
// //                         icon: 'error',
// //                         title: 'Oops...',
// //                         confirmButtonColor: "#B5030B",
// //                         text: "Server Down!"
// //                     })
// //                 });
// //         }
// //     }


// //     const getAllScreens = async () => {
// //         var InsertAPIURL = `${url}screen/get_all_screen`
// //         var headers = {
// //             'Accept': 'application/json',
// //             'Content-Type': 'application/json',
// //         };
// //         await fetch(InsertAPIURL, {
// //             method: 'GET',
// //             headers: headers,
// //         })
// //             .then(response => response.json())
// //             .then(response => {
// //                 console.log(response);
// //                 if (response.message == `All screens Details`) {
// //                     // setLogos(response.count);
// //                     setScreens(response.result);
// //                 } else {
// //                     Swal.fire({
// //                         icon: 'error',
// //                         title: 'Oops...',
// //                         confirmButtonColor: "#B5030B",
// //                         text: ''
// //                     })
// //                 }
// //             }
// //             )
// //             .catch(error => {
// //                 Swal.fire({
// //                     icon: 'error',
// //                     title: 'Oops...',
// //                     confirmButtonColor: "#B5030B",
// //                     text: "Server Down!"
// //                 })
// //             });
// //     }

// //     const handleImageChange = (e) => {
// //         setSelectedFile(e.target.files[0]);
// //         setHidecrossicon(true);
// //         setHidelabel(true);
// //     };

// //     const clearpreviewimage = () => {
// //         location.state.row.row.image = null
// //         setSelectedFile(null);
// //         setHidecrossicon(false);
// //         setHidelabel(false);
// //     }

// //     const [Status, setStatus] = React.useState('');
// //     const [Screen, setScreen] = React.useState('');
// //     const [AddName, setAddName] = React.useState('');

// //     const handleChangeScreen = (event) => {
// //         setScreen(event.target.value);
// //     };

// //     const handleChange = (event) => {
// //         setStatus(event.target.value);
// //     };

// //     return (
// //         <>
// //             <Box sx={{ height: "85vh", width: "100%", overflowX: "scroll" }}>
// //                 <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
// //                     <Grid item xs={6} align="" pt={3} >
// //                         <Breadcrumbs separator=">" >
// //                             <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/categories")} >
// //                                 Category
// //                             </Typography>

// //                             <Typography variant="h5" fontWeight={600} fontSize="15px" sx={{ letterSpacing: "2px" }} color="#404040">
// //                                 Update Category
// //                             </Typography>
// //                         </Breadcrumbs>
// //                     </Grid>

// //                 </Grid>

// //                 <Divider sx={{ pb: 2 }} />

// //                 <Container>
// //                     <Container>
// //                         <Grid container spacing={0}>
// //                             <Grid xs={12} align="center" p={1}>
// //                                 <Box pt={2} pb={2}>
// //                                     <Box sx={{ width: '300px', height: '200px', pt: 2, p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                

// //                             <Grid xs={12} md={12} lg={12} xl={12} p={1} align="center" >

// //                                 <FormControl sx={{ width: "50%" }} align="center">
// //                                     <Stack direction="column" spacing={0} pt={2}>
// //                                         <Typography
// //                                             variant="paragraph"
// //                                             pl={1}
// //                                             pb={1}
// //                                             sx={{
// //                                                 fontFamily: "Roboto",
// //                                                 fontSize: "18px",
// //                                                 fontWeight: "bold",
// //                                                 color: "#1F1F1F",
// //                                             }}
// //                                         >
// //                                             Name
// //                                         </Typography>
                                       


// //                                     </Stack>

// //                                 </FormControl>

// //                             </Grid>

// //                             <Grid xs={24} md={12} lg={12} xl={12} p={1} align="center" >

// //                                 <FormControl sx={{ width: "100%" }} align="center">
// //                                     <Stack direction="column" spacing={0} pt={2}>
// //                                         <Typography
// //                                             variant="paragraph"
// //                                             pl={1}
// //                                             pb={1}
// //                                             sx={{
// //                                                 fontFamily: "Roboto",
// //                                                 fontSize: "18px",
// //                                                 fontWeight: "bold",
// //                                                 color: "#1F1F1F",
// //                                             }}
// //                                         >
// //                                             Select Banners
// //                                         </Typography>

// //                                         <Grid
// //                                             sx={{
// //                                                 display: 'flex',
// //                                                 justifyContent: 'center',
// //                                             }}
// //                                         >
// //                                             <Grid
// //                                                 style={{
// //                                                     display: 'grid',
// //                                                     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
// //                                                     gap: '16px',
// //                                                     maxWidth: '1000px',
// //                                                     '@media (max-width: 959px)': { // Small and medium screens (xs, sm, and md)
// //                                                         gridTemplateColumns: '1fr', // Single column
// //                                                     },
// //                                                 }}
// //                                             >
// //                                                 {Skills.map((data) => {
// //                                                     const isSelected = Skill.includes(data.id);
// //                                                     const backgroundColor = isSelected ? 'red' : '';

// //                                                     return (
// //                                                         <div
// //                                                             key={data.id}
// //                                                             onClick={() => handleImageClick(data.id)}
// //                                                             style={{
// //                                                                 cursor: 'pointer',
// //                                                                 backgroundColor,
// //                                                                 padding: '5px',
// //                                                                 borderRadius: '3px',
// //                                                                 display: 'flex',
// //                                                                 flexDirection: 'column',
// //                                                                 alignItems: 'center',
// //                                                             }}
// //                                                         >
// //                                                             <img
// //                                                                 alt=""
// //                                                                 src={`${url}${data.image}`}
// //                                                                 style={{
// //                                                                     width: '100%',
// //                                                                     height: '100%',
// //                                                                     maxHeight: '300px',
// //                                                                     maxWidth: '300px',
// //                                                                 }}
// //                                                             />
// //                                                             <div>{data.plan_name}</div>
// //                                                         </div>
// //                                                     );
// //                                                 })}
// //                                             </Grid>
// // //                                         </Grid>
// //                                     </Stack>

// //                                 </FormControl>

// //                             </Grid>
// //                             {isloading ?
// //                                 <Grid sx={{ mt: '3%' }} xs={12} align="center">
// //                                     <Button variant="contained" style={btn}>
// //                                         <ClipLoader loading={isloading}
// //                                             css={override}
// //                                             size={10}
// //                                         />
// //                                     </Button>
// //                                 </Grid>

// //                                 :

// //                                 <Grid sx={{ mt: '3%' }} xs={12} align="center">
// //                                     <Button variant="contained" style={btn} onClick={() => { handleAdd() }} >Update</Button>
// //                                 </Grid>
// //                             }
// //                         </Grid>
// //                     </Container>
// //                 </Container>

// //             </Box>
// //         </>
// //     )
// // }

// // export default Team