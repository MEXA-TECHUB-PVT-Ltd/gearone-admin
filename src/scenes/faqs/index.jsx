import { Box, Typography, Grid, Button, Stack, Divider, Avatar, Container, InputAdornment, OutlinedInput, FormControl, Select, MenuItem, InputLabel, Input, TextField, Card, CardContent, Modal, Menu, AccordionSummary, Accordion, AccordionDetails } from "@mui/material";
import { Subscriptions, Notifications, Settings, Person, Add, Upload, Email, MoreVert, Close, Edit, Delete } from '@mui/icons-material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const btncancel = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: '#006FFF',
    backgroundColor: '#ffffff',
    border: '1px solid #006FFF',
    height: '50px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "large",
    textTransform: "capitalize"
}

const btn = {
    width: '90%',
    letterSpacing: "2px",
    color: 'white',
    backgroundColor: '#006FFF',
    borderColor: '#006FFF',
    height: '50px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "large",
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

const styleaddsuccess = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#FFFFFF',
    outline: "none",
    boxShadow: 0,
    // p: 4,
    borderRadius: 3
};

const Team = () => {
    const navigate = useNavigate();

    const [openaddsuccess, setOpenaddsuccess] = useState(false);
    const handleOpenaddsuccess = () => {
        setOpenaddsuccess(true)
        setTimeout(() => {
            setOpenaddsuccess(false)
        }, 2000);
    };
    const handleCloseaddsuccess = () => setOpenaddsuccess(false);

    const [openaddmodal, setOpenaddmodal] = useState(false);
    const handleOpenadd = () => setOpenaddmodal(true);
    const handleCloseadd = () => {
        setOpenaddmodal(false);
        handleOpenaddsuccess();
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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}>
                <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={2} >
                    <Grid item xs={6} align="" pt={3} >
                        <Typography variant="h5" fontWeight={750} fontSize="20px" sx={{ letterSpacing: "2px" }} color="#006FFF">
                            FAQS
                        </Typography>
                    </Grid>

                    <Grid item xs={6} align="right">
                        <div style={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "30px" }}>
                            <div>
                                <button onClick={handleOpenadd} style={{ marginTop: "7%", padding: "10px", display: "flex", justifyContent: "center", alignContent: "center", alignSelf: "center", border: "none", borderRadius: "5px", backgroundColor: "#006FFF", color: "white" }}>
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

                            <Stack pt={2} direction="row" sx={{ display: "flex", justifyContent: "right", alignContent: "right", gap: "30px" }}>
                                <Subscriptions sx={{ color: "#808080" }} />
                                <Notifications sx={{ color: "#808080" }} />
                                <Settings sx={{ color: "#808080" }} />
                            </Stack>

                            <div>
                                <Button
                                //   id="basic-button"
                                //   aria-controls={open ? 'basic-menu' : undefined}
                                //   aria-haspopup="true"
                                //   aria-expanded={open ? 'true' : undefined}
                                //   onClick={handleClick}
                                >
                                    <Stack direction="column">
                                        <Avatar sx={{ bgcolor: "#006FFF", width: 40, height: 40 }} variant="round">
                                            <Person fontSize="large" sx={{ color: "white" }} />
                                        </Avatar>
                                    </Stack>
                                </Button>
                            </div>
                        </div>

                    </Grid>
                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Box pl={2} pr={2} pt={2}>
                    <Grid container spacing={0}>

                        <Grid xs={12} align="" p={1} >
                            <Card width="95%" sx={{ padding: "0px", boxShadow: "none", borderRadius: "10px", border: "1px solid #D8D8D8" }}>
                                <CardContent>
                                    <Grid container spacing={0} >

                                        <Accordion sx={{ padding: "0px", width: "100%", boxShadow: "none" }}>
                                            <Grid container spacing={0}>
                                                <Grid xs={11.5}>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon fontSize="large" />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography variant="h4" fontWeight={800} fontSize="14px" color="#1F1F1F" >
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                            malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                        </Typography>
                                                    </AccordionSummary>
                                                </Grid>

                                                <Grid xs={0.5} pt={1} align="left">
                                                    <div>
                                                        <MoreVert
                                                            id="basic-button"
                                                            aria-controls={open ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open ? 'true' : undefined}
                                                            onClick={handleClick}
                                                            fontSize="large"
                                                            sx={{ pt: 0.8, color: "#1F1F1F" }} />
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
                                                        <MenuItem onClick={() => handleOpenedit()}>
                                                            <Edit sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Edit Category</span>
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleOpendel()} >
                                                            <Delete sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Delete Category</span>
                                                        </MenuItem>
                                                    </Menu>
                                                </Grid>
                                            </Grid>
                                            <AccordionDetails>
                                                <Typography align="left" fontWeight={450} fontSize="13px" color="#808080" >
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                    malesuada lacus ex, sit amet blandit leo lobortis eget.  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                        {/* <Grid xs={12} align="right">
                                            <div>
                                                <MoreVert
                                                    id="basic-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}
                                                    sx={{ fontSize: "30px", pb: 1, color: "#1F1F1F" }} />
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
                                                <MenuItem onClick={() => handleOpenedit()}>
                                                    <Edit sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Edit Category</span>
                                                </MenuItem>
                                                <MenuItem onClick={() => handleOpendel()} >
                                                    <Delete sx={{ color: "gray" }} /><span style={{ marginLeft: 10 }}>Delete Category</span>
                                                </MenuItem>
                                            </Menu>
                                        </Grid> */}

                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
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
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Add FAQ</Typography>
                            </Grid>

                            <Grid xs={6} align="right">
                                <Close onClick={() => setOpenaddmodal(false)} />
                            </Grid>

                            <Grid xs={12} align="center" pt={7}>
                                <FormControl fullWidth>
                                    <Typography variant="h4" sx={{ letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Question</Typography>
                                    <OutlinedInput
                                        id="input-with-icon-adornment"
                                        sx={{
                                            backgroundColor: "#EEEEEE",
                                            "& fieldset": { border: 'none' },
                                            "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                        }}
                                    />

                                    <Typography variant="h4" sx={{ letterSpacing: "2px" }} pt={4} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Answer</Typography>
                                    <OutlinedInput
                                        id="input-with-icon-adornment"
                                        multiline={true}
                                        rows={5}
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

                            <Grid xs={12} align="center">
                                <Button variant="contained" style={btn} onClick={handleCloseadd}>Add</Button>
                            </Grid>
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
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height={80} sx={styleaddsuccess}>
                        <Grid container spacing={0}>
                            <Grid xs={0.3}>
                                <Box sx={{ borderTopLeftRadius: 14, borderBottomLeftRadius: 14, backgroundColor: "#006FFF", width: "100%", height: 80 }}>
                                    <span style={{ color: "transparent" }}>kjhgfdxc</span>
                                </Box>
                            </Grid>

                            <Grid xs={10} pt={2}>
                                <Box pl={2}>
                                    <Typography variant="h4" sx={{ letterSpacing: "1px" }} fontWeight={600} fontSize="large" color="#006FFF">Success</Typography>

                                    <Typography variant="h5" sx={{ letterSpacing: "1px" }} fontWeight={600} color="#1F1F1F">FAQ Added Successfully</Typography></Box>
                            </Grid>

                            <Grid xs={1.7} align="right" pt={2} pr={2}>
                                <Close onClick={() => setOpenaddsuccess(false)} />
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>

                {/* edit modal */}
                <Modal
                    open={openeditmodal}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                        <Grid container spacing={0}>
                            <Grid container spacing={0}>
                                <Grid xs={6} align="left" >
                                    <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={800} fontSize="large" color="#1F1F1F">Update FAQ</Typography>
                                </Grid>

                                <Grid xs={6} align="right">
                                    <Close onClick={() => setOpeneditmodal(false)} />
                                </Grid>

                                <Grid xs={12} align="center" pt={5}>
                                    <FormControl fullWidth>
                                        <Typography variant="h4" sx={{ letterSpacing: "2px" }} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Question</Typography>
                                        <OutlinedInput
                                            id="input-with-icon-adornment"
                                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,"
                                            sx={{
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                                "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                            }}
                                        />

                                        <Typography variant="h4" sx={{ letterSpacing: "2px" }} pt={4} pb={0.7} fontWeight={700} align="left" fontSize="14px" color="#1F1F1F">Answer</Typography>
                                        <OutlinedInput
                                            id="input-with-icon-adornment"
                                            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
                                            multiline={true}
                                            rows={5}
                                            sx={{
                                                backgroundColor: "#EEEEEE",
                                                "& fieldset": { border: 'none' },
                                                "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                            }}
                                        />

                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} pt={7}>

                            <Grid xs={12} align="center">
                                <Button variant="contained" style={btn} onClick={handleCloseedit}>Update</Button>
                            </Grid>
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
                                <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#006FFF">Confirmation</Typography>

                                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7} pb={0} fontWeight={600} color="#1F1F1F">Do you want to delete this FAQ ?</Typography>  </Grid>
                        </Grid>

                        <Grid container spacing={0} pt={7}>
                            <Grid xs={6} align="">
                                <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodal(false) }}>Cancel</Button>
                            </Grid>

                            <Grid xs={6} align="right">
                                <Button variant="contained" style={btn} onClick={() => { setOpendelmodal(false) }}>Delete</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>

            </Box >
        </>
    )
}

export default Team