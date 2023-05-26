import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Divider, Container, Card, CardContent, Avatar } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Form, Input, } from 'antd';
import url from "../url"
import img from '../../components/Images/barber.jpg'
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { AddCircle } from "@mui/icons-material";

const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}

const btnimage = {
    width: '55%',
    marginTop: '0px',
    marginBottom: '0px',
    color: '#789040',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    height: '50px',
    padding: '0px',
    fontFamily: 'bold',
    fontWeight: "bold"
}


const btn = {
    width: '100%',
    marginTop: '0px',
    marginBottom: '0px',
    color: 'white',
    backgroundColor: '#789040',
    borderColor: '#789040',
    height: '50px',
    padding: '0px',
    fontFamily: 'bold',
    fontWeight: "bold"
}

const btnpassword = {
    width: '23vh',
    marginTop: '0px',
    marginBottom: '0px',
    color: 'white',
    backgroundColor: '#789040',
    borderColor: '#789040',
    height: '50px',
    padding: '0px',
    fontFamily: 'bold',
    fontWeight: "bold"
}

const style = {
    position: 'absolute',
    top: '55%',
    left: '53%',
    transform: 'translate(-50%, -50%)',
    // width: 300,
    // height: 300,
    bgcolor: '#FFFFFF',
    outline: "none",
    boxShadow: 0,
    p: 4,
    borderRadius: 5
};

function Profile() {
    const [shownewimage, setShownewimage] = useState(false);
    const [file, setFile] = useState();
    const [selectImage, setSelectedImage] = useState();
    const [adminID, setAdminID] = useState('');
    const [adminimage, setAdminimage] = useState('');
    const [adminname, setAdminname] = useState('');
    const [adminemail, setAdminemail] = useState('');
    const [isloading, setIsloading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("white");

    const [newadminname, setNewadminname] = useState('');
    const [newadminemail, setNewadminemail] = useState('');

    const [editprofile, setEditprofile] = useState(false);
    const handleOpeneditprofile = () => {

        setNewadminemail(adminemail);
        setNewadminname(adminname);

        setEditprofile(true);
    };
    const handleCloseeditprofile = () => setEditprofile(false);

    const [jwtoken, setJwtoken] = useState('');
    const [currentuserID, setCurrentuserID] = useState('');
    useEffect(() => {
        const jwttoken = JSON.parse(localStorage.getItem('jwtoken'));
        if (jwttoken) {
            setJwtoken(jwttoken);
        }

        const ID = JSON.parse(localStorage.getItem('adminID'));
        if (ID) {
            setCurrentuserID(ID);
        }

        Getadmin(ID);
    }, [])

    const Getadmin = async (ID) => {
        var InsertAPIURL = `${url}admin/view_profile?admin_id=${ID}`
        await fetch(InsertAPIURL, {
            method: 'GET',
            body: JSON.stringify(),
        })
            .then(response => response.json())
            .then(response => {
                setAdminID(response.result.id);
                setAdminimage(response.result.img);
                setAdminname(response.result.user_name);
                setAdminemail(response.result.email);
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

    function handleChange(e) {
        console.log(e.target.files[0]);
        setSelectedImage(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
        setShownewimage(true);
    }

    const editadminprofile = async () => {
        var InsertAPIURL = `${url}imageUpload/upload?current_user_id=${currentuserID}`

        var headers = {
            'Authorization': `Bearer ${jwtoken}`
        };

        const formdata = new FormData();
        formdata.append("image_type", "admin_profile_image");
        formdata.append("image", selectImage);

        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: formdata,
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == "please provide image") {
                    var InsertAPIURL = `${url}admin/updateProfile?current_user_id=${currentuserID}`
                    var headers = {
                        'Authorization': `Bearer ${jwtoken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    };
                    var Data = {
                        "admin_id": adminID,
                        "img": adminimage,
                        "user_name": newadminname
                    };
                    fetch(InsertAPIURL, {
                        method: 'PUT',
                        headers: headers,
                        body: JSON.stringify(Data),
                    })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            if (response.message == "Record Updated") {
                                setIsloading(true);
                                setTimeout(() => {
                                    Swal.fire({
                                        title: "Success",
                                        text: "Admin Updated Succesfully",
                                        confirmButtonColor: "#789040",
                                        icon: "success",
                                        confirmButtonText: "OK",
                                    });
                                    Getadmin(currentuserID);
                                    setEditprofile(false);
                                    setIsloading(false);
                                }, 3000)
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

                } else if (response.message == "Image uploaded in particular folder") {
                    const imageurl = response.image_url;

                    var InsertAPIURL = `${url}admin/updateProfile?current_user_id=${currentuserID}`
                    var headers = {
                        'Authorization': `Bearer ${jwtoken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    };
                    var Data = {
                        "admin_id": adminID,
                        "img": imageurl,
                        "user_name": newadminname
                    };
                    fetch(InsertAPIURL, {
                        method: 'PUT',
                        headers: headers,
                        body: JSON.stringify(Data),
                    })
                        .then(response => response.json())
                        .then(response => {
                            console.log(response);
                            if (response.message == "Record Updated") {
                                setIsloading(true);
                                setTimeout(() => {
                                    Swal.fire({
                                        title: "Success",
                                        text: "Admin Updated Succesfully",
                                        confirmButtonColor: "#789040",
                                        icon: "success",
                                        confirmButtonText: "OK",
                                    });
                                    Getadmin(currentuserID);
                                    setEditprofile(false);
                                    setIsloading(false);
                                }, 3000)
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

    return (
        <>
            <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="/">
                        <HomeIcon />
                    </Link>

                    <Typography color="text.primary">Admin Profile</Typography>
                </Breadcrumbs>

            </Box>
            <Box m="20px">
                <Grid container spacing={0}>
                    <Grid xs={6}>
                        <Header title="Admin Profile" />
                    </Grid>
                </Grid>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Box sx={{ width: '90%' }}>
                </Box>

                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <Box sx={{ width: "50%" }}>
                        <Card sx={{ boxShadow: "none" }}>
                            <CardContent>
                                <Box padding={3}>
                                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                        <Grid container spacing={2}>
                                            <Grid xs={12} lg={12}>
                                                <Stack align="center" direction="row" spacing={3} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Avatar src={`${url}` + adminimage} alt="..." sx={{ border: "2px solid #789040", width: 100, height: 100 }} />
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <Stack direction="column" pt={3} pb={3} spacing={0} sx={{ display: "flex" }}>
                                        <Typography variant="h6" fontWeight="bold" fontSize="15px" pl={0.5}>Admin Name</Typography>
                                        <Box sx={{ width: "100%", p: "12px", border: '1px solid lightgray', borderRadius: "5px" }}><Typography variant="paragraph" fontWeight="normal" pt={0.4} pl={0} fontSize="13px">{adminname}</Typography></Box>
                                    </Stack>

                                    <Stack direction="column" pb={3} spacing={0} sx={{ display: "flex" }}>
                                        <Typography variant="h6" fontWeight="bold" fontSize="15px" pl={0.5}>Admin Email</Typography>
                                        <Box sx={{ width: "100%", p: "12px", border: '1px solid lightgray', borderRadius: "5px" }}> <Typography variant="paragraph" fontWeight="normal" pt={0.4} pl={0} fontSize="13px">{adminemail}</Typography></Box>
                                    </Stack>

                                    <Stack pt={3} pb={0}>
                                        <Button variant="contained" style={btn} onClick={handleOpeneditprofile} >Edit Profile</Button>
                                    </Stack>
                                </Box>
                            </CardContent>
                        </Card>

                        {/* update profile */}
                        <Modal
                            open={editprofile}
                            onClose={handleCloseeditprofile}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box width={{ xs: 200, sm: 450, lg: 500 }} height="auto" sx={style}>
                                <Box mt={2} mb={2}>

                                    <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                        <Grid container spacing={2}>
                                            <Grid xs={12} lg={12} align="center">
                                                {shownewimage ?
                                                    <Stack align="center" direction="row" spacing={3} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                        <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                            <Avatar src={file} alt="..." sx={{ border: "2px solid #789040", width: 130, height: 130 }} />
                                                        </div>
                                                    </Stack>
                                                    :
                                                    <Stack align="center" direction="row" spacing={3} sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                        <Avatar src={`${url}` + adminimage} alt="..." sx={{ border: "2px solid #789040", width: 130, height: 130 }} />
                                                    </Stack>
                                                }
                                            </Grid>

                                            <Grid xs={1} lg={1}>
                                                <div className="App">
                                                    <input
                                                        accept="image/*"
                                                        type="file"
                                                        id="select-image"
                                                        style={{ display: "none" }}
                                                        onChange={handleChange}
                                                    />
                                                    <label htmlFor="select-image">
                                                        <Grid container spacing={0}>
                                                            <Grid sx={{ zIndex: 2, mt: -2.5, ml: { md: 29, lg: 29 } }} xs={1}>
                                                                <Box pt={0} mb={0} >
                                                                    <div >
                                                                        <AddCircle sx={{ position: "static", color: "#789040" }} />
                                                                    </div>
                                                                </Box>
                                                            </Grid>
                                                        </Grid>
                                                    </label>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>

                                    <Box pt={3} pb={3}>
                                        <TextField style={{ width: "100%" }} id="outlined-basic" label="Name" value={newadminname} variant="outlined" required onChange={(e) => { setNewadminname(e.target.value) }} />
                                    </Box>

                                    <Box pb={3}>
                                        <TextField style={{ width: "100%" }} id="outlined-basic" label="Email" value={newadminemail} variant="outlined" required onChange={(e) => { setNewadminemail(e.target.value) }} />
                                    </Box>

                                    {isloading ?
                                        <Stack pt={1} pb={0}>
                                            <Button variant="contained" style={btn}>
                                                <ClipLoader color={color} loading={isloading}
                                                    css={override}
                                                    size={10}
                                                />
                                            </Button>
                                        </Stack>
                                        :
                                        <Stack pt={1} pb={0}>
                                            <Button variant="contained" style={btn} onClick={() => editadminprofile()}>Update</Button>
                                        </Stack>
                                    }

                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                </div>
            </Box>
        </>
    )
}

export default Profile
