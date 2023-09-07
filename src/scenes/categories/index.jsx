import Swal from 'sweetalert2'
import axios from 'axios';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import CustomTextField from '../../components/CustomTextField.js'
import CustomAutocomplete from '../../components/CustomAutocomplete.js'
import CustomImageUpload from '../../components/CustomImageUpload.js'
import ConditionalButton from '../../components/ConditionalButton.js'

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import url from "../url"
import { tokens } from "../../theme";
import { Add, List, Apps, MoreVert, } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
    Box, Tooltip, Select, Typography, useTheme, IconButton,
    FormControl, OutlinedInput, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Divider, Avatar
} from "@mui/material";
import { Checkbox } from '@mui/material';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";
import "./index.css";
const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
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

const btncancel = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: '#B5030B',
    backgroundColor: '#ffffff',
    border: '1px solid #B5030B',
    height: '50px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "large",
    textTransform: "capitalize"
}

const btndelete = {
    letterSpacing: "1px",
    width: '95%',
    marginBottom: '20px',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
    padding: '0px',
    font: 'normal normal normal 17px/26px Roboto',
    height: '50px',
    padding: '0px',
    fontWeight: 450,
    boxShadow: "none",
    fontSize: "large",
    textTransform: "capitalize"
}

const btn = {
    letterSpacing: "1px",
    width: '100%',
    marginTop: '20px',
    marginBottom: '20px',
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

const styleview = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    outline: "none",
    boxShadow: 0,
    borderRadius: 5
};

const btncreate = {
    width: '100%',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
    height: '50px',
    padding: '0px',
    fontFamily: 'bold',
    fontWeight: "bold"
}

function TabPanel(props) {


    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
const TabsStyle = {
    color: '#9a9cab',
    fontWeight: '700'

}
const Team = () => {

    const navigate = useNavigate();

    const [isloading, setIsloading] = useState(false);
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    const [ActionData, setActionData] = React.useState({});
    const [EditName, setEditName] = React.useState('');
    const [addName, setAddName] = React.useState('');
    const [DeleteID, setDeleteID] = React.useState('');
    const [hidecrossicon, setHidecrossicon] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [hidelabel, setHidelabel] = useState(false);

    const [hidecrossiconUpload, setHidecrossiconUpload] = useState(false);
    const [selectedFileUpload, setSelectedFileUpload] = useState(null);
    const [hidelabelUpload, setHidelabelUpload] = useState(false);
    const [Skill, setSkill] = React.useState([]);
    const [Skills, setSkills] = useState([]);

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const clearpreviewimage = () => {
        setSelectedFile(null);
        setHidecrossicon(false);
        setHidelabel(false);
    }
    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setHidecrossicon(true);
        setHidelabel(true);
    };


    const clearpreviewimageUpload = () => {
        setSelectedFileUpload(null);
        ActionData.image = null;
        setHidecrossiconUpload(false);
        setHidelabelUpload(false);
    }
    const handleImageChangeUpload = (e) => {
        setSelectedFileUpload(e.target.files[0]);
        setHidecrossiconUpload(true);
        setHidelabelUpload(true);
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

    const [openaddsuccess, setOpenaddsuccess] = useState(false);
    const handleOpenaddsuccess = () => setOpenaddsuccess(true);
    const handleCloseaddsuccess = () => setOpenaddsuccess(false);

    const [openaddmodal, setOpenaddmodal] = useState(false);
    const handleOpenadd = () => setOpenaddmodal(true);
    const handleCloseadd = () => {
        setOpenaddmodal(false);
        setOpenaddsuccess(true)
    };

    const [openeditmodal, setOpeneditmodal] = useState(false);
    const handleOpenedit = () => {
        setOpeneditmodal(true);
        setAnchorEl(null);
    };
    const handleCloseedit = () => setOpeneditmodal(false);



    const [openViewmodal, setOpenViewmodal] = useState(false);
    const handleOpenView = () => {
        setOpenViewmodal(true);
        setAnchorEl(null);
    };
    const handleCloseView = () => setOpenViewmodal(false);


    const [opendelmodal, setOpendelmodal] = useState(false);
    const handleOpendel = () => {
        setOpendelmodal(true);
        setAnchorEl(null);
    };
    const handleClosedel = () => setOpendelmodal(false);

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{ marginBottom: "5px" }} >
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
                {/* <GridToolbarExport /> */}

            </GridToolbarContainer>
        );
    }
    const [idData, setIdData] = useState([]);


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [showtable, setShowtable] = useState(true);

    const [Catagory, setCatagory] = useState([]);
    useEffect(() => {
        getAllPlans();
        getAllCatagory();
    }, [])

    const handleAdd = async () => {
        setIsloading(true);
        var InsertAPIURL = `${url}category/add_category`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        console.log(selectedFile)

        if (addName === '' || selectedFile === null) {
            setIsloading(false);
            setOpenaddmodal(false);
            Swal.fire({
                icon: 'warning',
                title: 'Warning...',
                confirmButtonColor: "#B5030B",
                text: "All Fields Required"
            })

        } else {
            var Data = {
                "name": addName,
                "banners": Skill
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
                                if (response.data.message == `categories Image added Successfully!`) {
                                    navigate("/categories")
                                    setOpenaddmodal(false);
                                    setIsloading(false)
                                } else {
                                    setOpenaddmodal(false);
                                    setIsloading(false)
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
                            setOpenaddmodal(false);
                            setIsloading(false)
                            getAllCatagory();
                            navigate("/categories")
                        }
                        getAllCatagory();
                        navigate("/categories")
                        setSelectedFile(null);
                        setHidecrossicon(false);
                        setHidelabel(false);

                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            confirmButtonColor: "#B5030B",
                            text: 'Category Added Successfully!',
                        })

                    } else if (response.message == `Please Enter Category name`) {
                        setOpenaddmodal(false);
                        setIsloading(false);
                        Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            confirmButtonColor: "#B5030B",
                            text: 'Please Enter Name'
                        })
                    } else {
                        setIsloading(false);
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
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#B5030B",
                        text: "Server Down!"
                    })
                });
        }
    }


    const HandleEdit = async () => {
        setIsloading(true);
        var InsertAPIURL = `${url}category/update_category`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "Category_ID": ActionData.id,
            "name": EditName,
            "banners": Skill
        };
        await fetch(InsertAPIURL, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(async response => {
                console.log(response);
                if (response.message == `Category Updated Successfully!`) {
                    if (selectedFileUpload !== null && selectedFileUpload !== undefined) {
                        var Data = {
                            "id": response.result[0].id,
                            "image": selectedFileUpload,
                        };
                        await axios.put(url + "category/add_category_image", Data, {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        }).then((response) => {
                            setIsloading(false)
                            console.log(response.data);
                            if (response.data.message == `categories Image added Successfully!`) {
                                navigate("/categories");
                                setSelectedFileUpload(null);
                                setHidecrossiconUpload(false);
                                setHidelabelUpload(false);
                                ActionData.image = null;
                                setOpeneditmodal(false);
                                setIsloading(false)
                            } else {
                                setSelectedFileUpload(null);
                                ActionData.image = null;
                                setOpeneditmodal(false);
                                setHidelabelUpload(false);
                                setHidecrossiconUpload(false);
                                setIsloading(false)
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
                        setHidecrossiconUpload(false);
                        setHidelabelUpload(false);
                        setSelectedFileUpload(null);
                        ActionData.image = null;
                        setOpeneditmodal(false);
                        setIsloading(false)
                        navigate("/categories")
                    }

                    // setLogos(response.count);
                    getAllCatagory();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        confirmButtonColor: "#B5030B",
                        text: 'Category Updated Successfully!',
                    })
                    // setIsloading(false);
                    // setOpeneditmodal(false);
                    //   console.log(response.result);
                    //   setCatagory(response.result);
                } else {
                    setIsloading(false);
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
                setIsloading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    confirmButtonColor: "#B5030B",
                    text: "Server Down!"
                })
            });
    }


    const handleDelete = async () => {
        var InsertAPIURL = `${url}category/delete_category/${DeleteID}`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        // var Data = {
        //     "delete_category": DeleteID,
        // };
        await fetch(InsertAPIURL, {
            method: 'DELETE',
            headers: headers,
            // body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == `Categories Deleted Successfully!`) {

                    // setLogos(response.count);
                    getAllCatagory();
                    setOpendelmodal(false);
                    //   console.log(response.result);
                    //   setCatagory(response.result);
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        confirmButtonColor: "#B5030B",
                        text: 'Category Deleted Successfully!',
                    })
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


    const getAllCatagory = async () => {
        setIsloading(true)
        var InsertAPIURL = `${url}category/GetAll_only_Categories`
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
                console.log(response);
                if (response.status === true) {
                    // setLogos(response.count);
                    setIsloading(false)
                    console.log(response.result);
                    setCatagory(response.result);
                } else {
                    setIsloading(false)
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        confirmButtonColor: "#B5030B",
                        text: response.message
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    confirmButtonColor: "#B5030B",
                    text: "Server Down!"
                })
            });
    }


    const columns = [
        { field: 'name', headerName: <span style={{ color: "black", fontWeight: 600 }}>Category Name</span>, minWidth: 300 },
        {
            field: 'image', headerName: <span style={{ color: "black", fontWeight: 600 }}>Profile</span>,
            minWidth: 250, flex: 1,
            renderCell: (row) => {
                return (
                    <>
                        {row.row.image !== null ?
                            // <img src={`https://staging-gearone-be.mtechub.com/${row.row.image}`} style={{ bgcolor: "#B5030B", width: '45px', height: '45px' }}>
                            <Avatar src={`https://staging-gearone-be.mtechub.com/${row.row.image}`} style={{ bgcolor: "#B5030B", width: '45px', height: '45px' }}>
                            </Avatar>
                            :
                            <Avatar sx={{ width: '45px', height: '45px' }}>
                            </Avatar>

                        }
                    </>

                );
            },

        },

        {
            field: 'id',
            headerName: <Stack sx={{ pl: { xs: 0, md: 15, lg: 17 }, color: "black", fontWeight: 600 }}>Actions</Stack>,
            minWidth: 250,
            renderCell: (row) => {
                return (
                    <>
                        <Stack pl={15} >
                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>


                                <IconButton onClick={() => {
                                    console.log(row.row);
                                    setActionData(row.row);
                                    navigate(`/ViewCategory`, {
                                        state: {
                                            row: row.row
                                        }
                                    });
                                }}>
                                    <Tooltip title="view" >
                                        <Visibility sx={{ color: "#40E0D0" }} onClick={() => {
                                            console.log(row.row);
                                            setActionData(row.row);
                                            navigate('/ViewCategory', {
                                                state: {
                                                    row: row.row
                                                }
                                            });
                                            const bannerIds = row.row.banners.map(banner => banner.id);
                                            setSkill(bannerIds)
                                            handleOpenView();
                                        }} />
                                    </Tooltip>
                                </IconButton>


                                <IconButton onClick={() => {
                                    navigate(`/UpdateCategory?id=${row.row.id}`, {
                                        state: {
                                            row: row.row
                                        }
                                    });
                                }}>
                                    <Tooltip title="edit" >
                                        <Edit sx={{ color: "#40E0D0" }} onClick={() => {
                                            navigate(`UpdateCategory?id=${row.row.id}`, {
                                                state: {
                                                    row: row.row
                                                }
                                            });
                                            const bannerIds = row.row.banners.map(banner => banner.id);
                                            setSkill(bannerIds)
                                        }} />
                                    </Tooltip>
                                </IconButton>

                                <IconButton onClick={() => {
                                    handleOpendel();
                                    setDeleteID(row.row.id);
                                }} >
                                    <Tooltip title="Delete">
                                        <Delete sx={{ color: "#E10006" }} onClick={() => {
                                            handleOpendel();
                                            setDeleteID(row.row.id);
                                        }} />
                                    </Tooltip>
                                </IconButton>
                            </div>
                        </Stack>
                    </>
                );
            },
        },
    ];


    return (
        <>
            <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
                <Grid container pt={{ lg: 2, xl: 1 }} >
                    <Grid item md={6} xs={12} align="left" pt={1}>
                        <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ ml: '2%', letterSpacing: "2px" }} color="#404040">
                            Categories
                        </Typography>
                    </Grid>

                    <Grid item md={6} xs={12} align="right">
                        <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'right', gap: '10px', width: '100%' }}>
                            <div style={{ width: '100px', borderRadius: "5px", border: "1px solid #D8D8D8", padding: "5px", paddingBottom: "0px", display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                                {
                                    showtable ?
                                        <>
                                            <Box onClick={() => { setShowtable(true) }}>
                                                <List fontSize="large" sx={{ cursor: 'pointer', color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} />
                                            </Box>
                                            <Box onClick={() => setShowtable(false)}>
                                                <Apps fontSize="large" sx={{ cursor: 'pointer', color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} />
                                            </Box>
                                        </>
                                        :
                                        <>
                                            <Box onClick={() => setShowtable(true)}>
                                                <List fontSize="large" sx={{ cursor: 'pointer', color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} />
                                            </Box>
                                            <Box onClick={() => setShowtable(false)}>
                                                <Apps fontSize="large" sx={{ cursor: 'pointer', color: "white", backgroundColor: "#B5030B", borderRadius: "5px" }} />
                                            </Box>
                                        </>
                                }
                            </div>

                            <button onClick={() => { navigate('/AddCategory') }} style={{ marginRight: '3%', padding: "10px", border: "none", borderRadius: "50px", backgroundColor: "#B5030B", color: "white" }}>
                                <Stack direction="row" sx={{ display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                                    <div>
                                        <Stack sx={{ paddingLeft: "20px" }}>
                                            <Add sx={{ cursor: 'pointer', fontWeight: 600, width: "24dpi" }} />
                                        </Stack>
                                    </div>

                                    <div>
                                        <Stack sx={{ cursor: 'pointer', marginLeft: "2vh", paddingTop: "0.5vh", paddingRight: "25px", fontWeight: "bold" }}>Add</Stack>
                                    </div>
                                </Stack>
                            </button>
                        </div>
                    </Grid>

                </Grid>

                <Divider sx={{ pb: 2 }} />
                {isloading ?
                    <Grid sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: "center",
                        alignItems: 'center',
                        height: "100%", width: "100%"
                        // backgroundColor:'red'

                    }} >
                        <div className="loader">
                        </div>
                    </Grid>

                    :
                    <Grid mb='6%' container spacing={0} pt={2}  >
                        {
                            showtable ?
                                <Grid xs={12} p={1} align="center">
                                    <div style={{ height: '76vh', width: '100%', overflowX: 'auto', maxWidth: '100%' }}>
                                        <DataGrid
                                            rows={Catagory}
                                            columns={columns}
                                            getRowClassName={(params) => {
                                                return 'unblock-row'
                                            }}

                                            initialState={{
                                                pagination: {
                                                    paginationModel: { page: 0, pageSize: 5 },
                                                },
                                            }}
                                            pageSizeOptions={[5, 10]}
                                            // checkboxSelection
                                            components={{
                                                Checkbox: ({ value }) => (
                                                    <Checkbox style={{ color: 'red' }} checked={value} />
                                                ),
                                            }}
                                        />
                                    </div>
                                </Grid>
                                :
                                <>
                                    {Catagory.map((item, index) => (
                                        <Grid key={index} xs={12} md={3} lg={3} align="center" p={1} >
                                            <Card width="95%" sx={{ padding: 0, boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                                                <CardContent >
                                                    <Grid key={index} container spacing={0} >

                                                        <Grid key={index} xs={12} align="right">
                                                            <div>
                                                                <MoreVert
                                                                    id="basic-button"
                                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={open ? 'true' : undefined}
                                                                    // onClick={handleClick} 
                                                                    onClick={(event) => {
                                                                        setIdData(item)
                                                                        setAnchorEl(event.currentTarget)
                                                                    }}
                                                                    sx={{ cursor: 'pointer', color: "#1F1F1F" }} />
                                                            </div>
                                                            <Menu
                                                                id="basic-menu"
                                                                anchorEl={anchorEl}
                                                                open={open}
                                                                onClose={handleClose}
                                                                MenuListProps={{
                                                                    'aria-labelledby': 'basic-button',
                                                                }}
                                                                PaperProps={{

                                                                    sx: {
                                                                        position: 'fixed',
                                                                        top: '-9999px',
                                                                        left: '-9999px',
                                                                        elevation: 0,
                                                                        // overflow: 'visible',
                                                                        // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.22))',
                                                                        mt: 1.5,
                                                                        '& .MuiAvatar-root': {
                                                                            width: 32,
                                                                            height: 32,
                                                                            ml: -0.5,
                                                                            mr: 1,
                                                                        },
                                                                        '&:before': {
                                                                            content: '""',
                                                                            display: 'block',
                                                                            position: 'absolute',
                                                                            top: 0,
                                                                            right: 5,
                                                                            width: 10,
                                                                            height: 10,
                                                                            bgcolor: 'background.paper',
                                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                                            zIndex: 0,
                                                                        },
                                                                    },
                                                                }}
                                                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                                            >
                                                                <MenuItem
                                                                    onClick={() => {
                                                                        navigate(`/UpdateCategory?id=${idData.id}`, {
                                                                            state: {
                                                                                row: idData
                                                                            }
                                                                        });
                                                                        const bannerIds = idData.banners.map(banner => banner.id);
                                                                        setSkill(bannerIds)
                                                                    }
                                                                    }
                                                                >
                                                                    <Edit sx={{ color: "#40E0D0" }} /><span style={{ marginLeft: 10 }}>Update</span>
                                                                </MenuItem>
                                                                <Grid container spacing={0}>
                                                                    <Grid xs={12} align="center">
                                                                        <Divider sx={{ width: "80%" }} />
                                                                    </Grid>
                                                                </Grid>
                                                                <MenuItem onClick={() => {
                                                                    setDeleteID(idData.id);
                                                                    handleOpendel();
                                                                }}>
                                                                    <Delete sx={{ color: "#E10006" }} /><span style={{ marginLeft: 10 }}>Delete</span>
                                                                </MenuItem>
                                                            </Menu>

                                                        </Grid>

                                                        <Grid sx={{ cursor: 'pointer' }} onClick={() => {
                                                            navigate('/ViewCategory', {
                                                                state: {
                                                                    row: idData
                                                                }
                                                            });
                                                        }} xs={12} align="center">
                                                            {ActionData.image !== null ?
                                                                <img src={`${url}${item.image}`}
                                                                    alt="" style={{ width: "200px", height: "200px" }} />
                                                                :
                                                                <Card sx={{ width: "200px", height: "200px" }} />
                                                            }
                                                            <PerfectScrollbar>

                                                                <Typography maxHeight='50px' variant="h5" pb={1} fontWeight={750} fontSize="16px"
                                                                    sx={{ letterSpacing: "2px" }} color="#B5030B">
                                                                    {item.name}
                                                                </Typography>
                                                            </PerfectScrollbar>

                                                        </Grid>

                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </>
                        }
                    </Grid>
                }
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
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Add Category</Typography>
                        </Grid>

                        <Grid xs={6} align="right">
                            <Close onClick={() => setOpenaddmodal(false)} />
                        </Grid>

                        <Grid xs={12} align="center" pt={7}>
                            <FormControl fullWidth>


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
                                </Box>




                                <OutlinedInput
                                    id="input-with-icon-adornment"
                                    placeholder="Category Name"
                                    onChange={(event) => {
                                        setAddName(event.target.value);
                                    }}

                                    sx={{

                                        backgroundColor: "darkgray",
                                        "& fieldset": { border: 'none' },
                                        "& ::placeholder": { ml: 1, fontWeight: 600, color: "white" }
                                    }}
                                />


                                <Typography variant="h4" sx={{ mt: '5%', letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Select Banner</Typography>

                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    sx={{
                                        backgroundColor: "darkgray",
                                        "& fieldset": { border: 'none' },
                                    }}
                                    value={Skill}
                                    onChange={(event) => { handleChangeSkill(event) }}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="" disabled>
                                        <em>select Banner</em>
                                    </MenuItem>
                                    {Skills.map((data) => {
                                        const isSelected = Skill.includes(data.id);
                                        const backgroundColor = isSelected ? 'blue' : 'red';

                                        return (
                                            <MenuItem
                                                key={data.id}
                                                value={data.id}
                                                sx={{ background: backgroundColor }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        alt=""
                                                        src={`${url}${data.image}`}
                                                        style={{ marginRight: '10px', width: '500px', height: 'auto' }}
                                                    />
                                                    {data.plan_name}
                                                </div>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>

                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={7}>
                        <ConditionalButton Title={"Add Banner"} isloading={isloading} handleAdd={handleAdd} />
                    </Grid>

                </Box>
            </Modal>

            {/* add success modal */}
            <Modal
                open={openaddsuccess}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={12} align="right">
                            <Close onClick={() => setOpenaddsuccess(false)} />
                        </Grid>

                        <Grid xs={12} align="center" >
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#B5030B">Success</Typography>
                        </Grid>

                        <Grid xs={12} align="center" pt={7}>
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Category Added Successfully</Typography>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={7}>

                        <Grid xs={12} align="center">
                            <Button variant="contained" style={btn} onClick={() => { setOpenaddsuccess(false) }}>Ok</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>


            {/* View modal */}
            <Modal
                open={openViewmodal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }}

                    height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={6} align="left" >
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">View Category</Typography>
                        </Grid>

                        <Grid xs={6} align="right">
                            <Close onClick={() => setOpenViewmodal(false)} />
                        </Grid>

                        <Grid xs={12} align="center" pt={7}>
                            <FormControl fullWidth>

                                <Box pt={0} pb={2}>
                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {selectedFileUpload || selectedFileUpload !== null ? <img src={URL.createObjectURL(selectedFileUpload)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                            :
                                            ActionData.image && <img src={`${url}${ActionData.image}`} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossiconUpload ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                            </Box>
                                            :
                                            ActionData.image ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                </Box>
                                                :
                                                ActionData.image === null && !hidecrossiconUpload &&
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 32, mt: -24
                                                    }} onClick={() => clearpreviewimageUpload()} />
                                                </Box>
                                    }
                                </Box>




                                <Typography variant="h4" sx={{ letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Category Name</Typography>
                                <OutlinedInput
                                    id={ActionData.id}
                                    value={ActionData.name}

                                    sx={{
                                        backgroundColor: "darkgray",
                                        "& fieldset": { border: 'none' },
                                        "& ::placeholder": { ml: 1, fontWeight: 600, color: "white" }
                                    }}
                                />

                                <Typography variant="h4" sx={{ mt: '5%', letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Selected Banners</Typography>


                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    sx={{
                                        backgroundColor: "darkgray",
                                        "& fieldset": { border: 'none' },
                                    }}
                                    value={Skill}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    MenuProps={MenuProps}
                                >
                                    {Skills.map((data) => {
                                        const isSelected = Skill.includes(data.id);
                                        const backgroundColor = isSelected ? 'blue' : 'red';

                                        return (
                                            <MenuItem
                                                disabled                    // The item is disabled, preventing interaction
                                                key={data.id}               // A unique key for React's internal use
                                                value={data.id}             // The value associated with the menu item
                                                sx={{ background: backgroundColor }} // Styling using the "sx" prop (assuming it's from a library like Material-UI)
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        alt=""
                                                        src={`${url}${data.image}`} // Image source based on the provided URL and data.image
                                                        style={{ marginRight: '10px', width: '500px', height: 'auto' }} // Image styling
                                                    />
                                                    {data.image}
                                                </div>
                                            </MenuItem>);
                                    })}
                                </Select>


                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>



            {/* edit modal */}
            <Modal
                open={openeditmodal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }}

                    height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={6} align="left" >
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Update Category</Typography>
                        </Grid>

                        <Grid xs={6} align="right">
                            <Close onClick={() => setOpeneditmodal(false)} />
                        </Grid>

                        <Grid xs={12} align="center" pt={7}>
                            <FormControl fullWidth>

                                <Box pt={0} pb={2}>
                                    <Box sx={{ pt: 2, width: "300px", height: "200px", p: "0.5px", border: "dotted 1px lightgray", float: "center", borderRadius: "5px" }} className="image_preview">
                                        {hidelabelUpload ?
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
                                                            onChange={handleImageChangeUpload}
                                                            accept="image/*"
                                                        />
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        }

                                        {selectedFileUpload || selectedFileUpload !== null ? <img src={URL.createObjectURL(selectedFileUpload)} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                            :
                                            ActionData.image && <img src={`${url}${ActionData.image}`} alt="Preview" style={{ width: "300px", height: "200px" }} />
                                        }
                                    </Box>

                                    {
                                        hidecrossiconUpload ?
                                            <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                <Close sx={{
                                                    padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                    color: "white", ml: 32, mt: -24
                                                }} onClick={() => clearpreviewimageUpload()} />
                                            </Box>
                                            :
                                            ActionData.image ?
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 32, mt: -24
                                                    }} onClick={() => clearpreviewimageUpload()} />
                                                </Box>
                                                :
                                                ActionData.image === null && !hidecrossiconUpload &&
                                                <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                                    <Close sx={{
                                                        padding: 0.2, backgroundColor: "#B5030B", borderRadius: "50px",
                                                        color: "white", ml: 32, mt: -24
                                                    }} onClick={() => clearpreviewimageUpload()} />
                                                </Box>
                                    }
                                </Box>




                                <Typography variant="h4" sx={{ letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Category Name</Typography>
                                <OutlinedInput
                                    id={ActionData.id}
                                    defaultValue={ActionData.name}
                                    onChange={(event) => {
                                        setEditName(event.target.value);
                                    }}

                                    sx={{
                                        backgroundColor: "darkgray",
                                        "& fieldset": { border: 'none' },
                                        "& ::placeholder": { ml: 1, fontWeight: 600, color: "white" }
                                    }}
                                />

                                <Typography variant="h4" sx={{ mt: '5%', letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Select Banner</Typography>


                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    sx={{
                                        backgroundColor: "darkgray",
                                        "& fieldset": { border: 'none' },
                                    }}
                                    value={Skill}
                                    onChange={(event) => { handleChangeSkill(event) }}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    MenuProps={MenuProps}
                                >
                                    <MenuItem value="" disabled>
                                        <em>select Banner</em>
                                    </MenuItem>
                                    {Skills.map((data) => {
                                        const isSelected = Skill.includes(data.id);
                                        const backgroundColor = isSelected ? 'blue' : 'red';

                                        return (
                                            <MenuItem
                                                key={data.id}
                                                value={data.id}
                                                sx={{ background: backgroundColor }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img
                                                        alt=""
                                                        src={`${url}${data.image}`}
                                                        style={{ marginRight: '10px', width: '500px', height: 'auto' }}
                                                    />
                                                    {data.plan_name}
                                                </div>
                                            </MenuItem>
                                        );
                                    })}
                                </Select>


                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={7}>
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
                                <Button variant="contained" style={btn} onClick={HandleEdit}>Update</Button>
                            </Grid>
                        }
                    </Grid>

                </Box>
            </Modal>

            {/* delete modal */}
            <Modal
                open={opendelmodal}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={12} align="right">
                            <Close onClick={() => setOpendelmodal(false)} />
                        </Grid>

                        <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#B5030B">Confirmation</Typography>

                            <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this Category ?</Typography>  </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={7}>
                        <Grid xs={6} align="">
                            <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodal(false) }}>Cancel</Button>
                        </Grid>

                        <Grid xs={6} align="right">
                            <Button variant="contained" style={btndelete} onClick={() => { handleDelete() }}>Delete</Button>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>

        </>
    );
};

export default Team;
