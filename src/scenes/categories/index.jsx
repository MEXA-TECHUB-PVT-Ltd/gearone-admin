import { Box, Tooltip, Typography, useTheme, IconButton, FormControl, OutlinedInput, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Swal from 'sweetalert2'

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import url from "../url"
import { tokens } from "../../theme";
import { Add, List, Apps, MoreVert, } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Checkbox } from '@mui/material';
import {
    DataGrid,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { Close, Delete, Edit, Upload, Visibility } from "@mui/icons-material";
// import "./index.css";
const override = {
    display: ' block',
    margin: '0 auto',
    borderColor: 'red',
}

const btncancel = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: '#FF6700',
    backgroundColor: '#ffffff',
    border: '1px solid #FF6700',
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
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    outline: "none",
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
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
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

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
        getAllCatagory();
    }, [])

    const handleAdd = async () => {
        setIsloading(true);
        var InsertAPIURL = `${url}category/add_category`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var Data = {
            "name": addName,
        };
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == `Category Added Successfully!`) {
                    // setLogos(response.count);
                    getAllCatagory();
                    setIsloading(false);
                    setOpenaddmodal(false);
                    //   console.log(response.result);
                    //   setCatagory(response.result);
                } else if (response.message == `Please Enter Category name`) {
                    setOpenaddmodal(false);
                    setIsloading(false);
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: 'Please Enter Name'
                    })
                } else {
                    setIsloading(false);
                    setOpenaddmodal(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false);
                alert(error);
            });
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
        };
        await fetch(InsertAPIURL, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(Data),
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.message == `Category Updated Successfully!`) {
                    // setLogos(response.count);
                    getAllCatagory();
                    setIsloading(false);
                    setOpeneditmodal(false);
                    //   console.log(response.result);
                    //   setCatagory(response.result);
                } else {
                    setIsloading(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                setIsloading(false);
                alert(error);
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
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                alert(error);
            });
    }


    const getAllCatagory = async () => {
        var InsertAPIURL = `${url}category/get_all_category`
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
                if (response.message == `All categories Details`) {
                    // setLogos(response.count);
                    console.log(response.result);
                    setCatagory(response.result);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        confirmButtonColor: "#FF6700",
                        text: ''
                    })
                }
            }
            )
            .catch(error => {
                alert(error);
            });
    }


    const columns = [
        { field: 'name', headerName: <span style={{ color: "black", fontWeight: 600 }}>Category Name</span>, flex: 1 },
        {
            field: 'id',
            headerName: <Stack sx={{ pl: { xs: 0, md: 15, lg: 17 }, color: "black", fontWeight: 600 }}>Actions</Stack>,
            flex: 1,
            renderCell: (row) => {
                return (
                    <>
                        <Stack pl={15} >
                            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                                <IconButton  >
                                    <Tooltip title="edit" >
                                        <Edit sx={{ color: "#40E0D0" }} onClick={() => {
                                            console.log(row.row);
                                            setActionData(row.row);
                                            handleOpenedit();
                                        }} />
                                    </Tooltip>
                                </IconButton>

                                <IconButton >
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
                <Grid container spacing={0} pl={3} pr={3} pt={{ lg: 2, xl: 1 }} >
                    <Grid item xs={6} align="" pt={1} >
                        <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#404040">
                            Categories
                        </Typography>
                    </Grid>

                    <Grid item xs={3} align="center">
                        {/* <Stack direction="row" spacing={0}>
              <div>
                <Box sx={{ width: "100%", border: "1px solid lightgray", borderRadius: "50px" }}>
                  <Stack p={0.5}>
                    <Grid container spacing={0} >
                      <Grid xs={2} md={2} lg={2} sx={{ pl: 1 }}>
                        <Search sx={{ color: "lightgray" }} />
                      </Grid>

                      <Grid xs={10} md={10} lg={10} sx={{ pr: 1 }}>
                        <Typography variant="paragraph" fontWeight={500} fontSize="13px" color="lightgray">
                          Search Here
                        </Typography>
                      </Grid>
                    </Grid>
                  </Stack>
                </Box>
              </div>

            </Stack> */}
                    </Grid>

                    <Grid item xs={1.5} align="center">
                        <div>
                            <Box sx={{ width: { lg: "11vh", xl: "7vh" }, borderRadius: "5px", border: "1px solid #D8D8D8" }}>
                                <Box >
                                    <div style={{ padding: "5px", paddingBottom: "0px", display: "flex", justifyContent: "center", alignContent: "center", gap: "3px" }}>
                                        {
                                            showtable ?
                                                <>
                                                    <Box sx={{ pl: 1 }}>
                                                        <List fontSize="large" sx={{ color: "white", backgroundColor: "#FF6700", borderRadius: "5px" }} onClick={() => { setShowtable(true) }} />
                                                    </Box>
                                                    <Box sx={{ pr: 1 }}>
                                                        <Apps fontSize="large" sx={{ color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
                                                    </Box>
                                                </>
                                                :
                                                <>
                                                    <Box sx={{ pl: 1 }}>
                                                        <List fontSize="large" sx={{ color: "#9B9B9B", backgroundColor: "transparent", borderRadius: "5px" }} onClick={() => setShowtable(true)} />
                                                    </Box>
                                                    <Box sx={{ pr: 1 }}>
                                                        <Apps fontSize="large" sx={{ color: "white", backgroundColor: "#FF6700", borderRadius: "5px" }} onClick={() => setShowtable(false)} />
                                                    </Box>
                                                </>
                                        }
                                    </div>
                                </Box>
                            </Box>
                        </div>
                    </Grid>

                    <Grid item xs={1.5} align="center">
                        <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "30px" }}>
                            <div>
                                <button onClick={handleOpenadd} style={{ marginTop: "2%", padding: "10px", display: "flex", justifyContent: "center", alignContent: "center", alignSelf: "center", border: "none", borderRadius: "50px", backgroundColor: "#FF6700", color: "white" }}>
                                    <Stack direction="row" sx={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "3px" }}>
                                        <div>
                                            <Stack sx={{ paddingLeft: "20px" }}>
                                                <Add sx={{ fontWeight: 600, width: "24dpi" }} />
                                            </Stack>
                                        </div>

                                        <div>
                                            <Stack sx={{ marginLeft: "2vh", paddingTop: "0.5vh", paddingRight: "25px", fontWeight: "bold" }}>Add</Stack>
                                        </div>
                                    </Stack>

                                </button>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Grid container spacing={0} pt={2} pl={2} pr={2} >
                    {
                        showtable ?
                            <Grid xs={12} p={1} align="center">
                                <div style={{ height: 400, width: '100%' }}>
                                    <DataGrid
                                        rows={Catagory}
                                        columns={columns}
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
                                            <CardContent>
                                                <Grid key={index} container spacing={0} >

                                                    <Grid key={index} xs={12} align="right">
                                                        <div>
                                                            {/* <MoreVert
                                                                id="basic-button"
                                                                aria-controls={open ? 'basic-menu' : undefined}
                                                                aria-haspopup="true"
                                                                aria-expanded={open ? 'true' : undefined}
                                                                onClick={handleClick}
                                                                sx={{ fontSize: "30px", pb: 1, color: "#1F1F1F" }} /> */}
                                                        </div>

                                                        {/* <Menu
                                                            id="basic-menu"
                                                            anchorEl={anchorEl}
                                                            open={open}
                                                            onClose={handleClose}
                                                            MenuListProps={{
                                                                'aria-labelledby': 'basic-button',
                                                            }}
                                                            PaperProps={{

                                                                sx: {
                                                                    overflow: 'visible',
                                                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.22))',
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
                                                                        right: 23,
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
                                                            <MenuItem onClick={() => {
                                                                console.log(item);
                                                                console.log(Catagory)
                                                                setActionData(item);
                                                                handleOpenedit();
                                                            }} >
                                                                <Edit sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Edit Category</span>
                                                            </MenuItem>
                                                            <MenuItem onClick={() => {
                                                                setDeleteID(item.id)
                                                                handleOpendel()
                                                            }} >
                                                                <Delete sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Delete Category</span>
                                                            </MenuItem>
                                                        </Menu> */}
                                                    </Grid>

                                                    <Grid xs={12} align="left">
                                                        <Typography variant="h5" pb={1} fontWeight={750} fontSize="16px" sx={{ letterSpacing: "2px" }} color="#FF6700">
                                                            {item.name}
                                                        </Typography>
                                                    </Grid>

                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </>
                    }
                </Grid>
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
                                    <OutlinedInput
                                        id="input-with-icon-adornment"
                                        placeholder="Category Name"
                                        onChange={(event) => {
                                            setAddName(event.target.value);
                                        }}

                                        sx={{
                                            backgroundColor: "#EEEEEE",
                                            "& fieldset": { border: 'none' },
                                            "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                        }}
                                    />
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
                                    <Button variant="contained" style={btn} onClick={handleAdd}>Add</Button>
                                </Grid>
                            }
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
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#FF6700">Success</Typography>
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

                {/* edit modal */}
                <Modal
                    open={openeditmodal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                        <Grid container spacing={0}>
                            <Grid xs={6} align="left" >
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Update Category</Typography>
                            </Grid>

                            <Grid xs={6} align="right">
                                <Close onClick={() => setOpeneditmodal(false)} />
                            </Grid>

                            <Grid xs={12} align="center" pt={7}>
                                <FormControl fullWidth>
                                    <Typography variant="h4" sx={{ letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Category Name</Typography>
                                    <OutlinedInput
                                        id={ActionData.id}
                                        defaultValue={ActionData.name}
                                        onChange={(event) => {
                                            setEditName(event.target.value);
                                        }}

                                        sx={{
                                            backgroundColor: "#EEEEEE",
                                            "& fieldset": { border: 'none' },
                                            "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                        }}
                                    />
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
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Confirmation</Typography>

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

            </Box>
        </>
    );
};

export default Team;
