import { Box, Typography, Grid, Button, Stack, Divider, Link, OutlinedInput, FormControl, Card, CardContent, Modal, Breadcrumbs } from "@mui/material";
import { Close } from '@mui/icons-material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import "./index.css"

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
    height: '40px',
    padding: '0px',
    fontFamily: '',
    fontWeight: 510,
    boxShadow: "none",
    fontSize: "16px",
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

    const [colorNav, setcolorNav] = React.useState('#808080');

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.location.href === "http://localhost:3000/settings") {
                setcolorNav('#006FFF')
            } else {
                setcolorNav('#808080')
            }
        }, 1000);
        return () => clearInterval(interval);
    })

    // privacy policy
    const [openeditsuccess, setOpeneditsuccess] = useState(false);
    const handleopeneditsuccess = () => {
        setOpeneditsuccess(true)
        setTimeout(() => {
            setOpeneditsuccess(false)
        }, 2000);
    };
    const handleCloseaddsuccess = () => setOpeneditsuccess(false);

    const [openeditmodal, setOpeneditmodal] = useState(false);
    const handleOpenadd = () => setOpeneditmodal(true);
    const handleCloseadd = () => {
        setOpeneditmodal(false);
        handleopeneditsuccess();
    };

    // term and condition
    const [opentermNconditionsuccess, setOpentermNconditionsuccess] = useState(false);
    const handleopentermNconditionsuccess = () => {
        setOpentermNconditionsuccess(true)
        setTimeout(() => {
            setOpentermNconditionsuccess(false)
        }, 2000);
    };
    const handleClostermNconditionsuccess = () => setOpentermNconditionsuccess(false);

    const [openedittermNcondition, setOpenedittermNcondition] = useState(false);
    const handleOpenedittermNcondition = () => setOpenedittermNcondition(true);
    const handleCloseedittermNcondition = () => {
        setOpenedittermNcondition(false);
        handleopentermNconditionsuccess();
    };

    return (
        <>
            <Box sx={{ height: "100%", width: "100%", overflowX: "scroll" }}  >
                <Grid container spacing={0} pt={{ lg: 2, xl: 1 }} p={1} >
                    <Grid item xs={6} align="" pt={2} >
                        <Breadcrumbs separator=">" >
                            <Typography variant="h5" fontWeight={550} pl={3} fontSize="15px" sx={{ letterSpacing: "2px", cursor: "pointer" }} color="#808080" onClick={() => navigate("/dashboard")} >
                                Privacy Policy
                            </Typography>

                        </Breadcrumbs>
                    </Grid>
                </Grid>

                <Divider sx={{ pb: 2 }} />

                <Box pl={2} pr={2} pt={2}>
                    <Grid xs={12} md={6} p={1} align="center">
                        <Card sx={{ borderRadius: "13px", boxShadow: "0px 3px 6px #00000029", opacity: 1, width: "98%" }}>
                            <CardContent>
                                <Typography variant="h5" fontWeight={700} fontSize="22px" pb={1} sx={{ letterSpacing: "1px" }} align="left" color="#1F1F1F">
                                    Privacy Policy
                                </Typography>

                                <Stack sx={{ height: "360px", display: "flex", justifyContent: "start", alignContent: "start" }} className="scrollbar">
                                    <Typography variant="paragraph" fontSize="12px" pb={1} sx={{ letterSpacing: "1px", fontWeight: "" }} align="left" lineHeight="25px" color="#1F1F1F">
                                        <span style={{ fontWeight: "medium" }}>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
                                        </span>
                                    </Typography>
                                </Stack>

                                {/* <Grid container spacing={0} pt={3} pb={1}>
                                        <Grid xs={12}>
                                            <Button style={btn} onClick={handleOpenadd}>Update Privacy Policy</Button>
                                        </Grid>
                                    </Grid> */}
                            </CardContent>
                        </Card>
                    </Grid>
                </Box>

                {/* edit modal */}
                <Modal
                    open={openeditmodal}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                        <Grid container spacing={0}>
                            <Grid xs={6} align="left" >
                                <Typography variant="h4" sx={{ letterSpacing: "1px" }} fontWeight={800} fontSize="20px" color="#1F1F1F">Update Privacy Policy</Typography>
                            </Grid>

                            <Grid xs={6} align="right">
                                <Close onClick={() => setOpeneditmodal(false)} />
                            </Grid>

                            <Grid xs={12} align="center" pt={3}>
                                <FormControl fullWidth>
                                    <OutlinedInput
                                        id="input-with-icon-adornment"
                                        multiline={true}
                                        rows={12}
                                        defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam "
                                        sx={{
                                            ml: 1, fontWeight: "medium", color: "#000000", lineHeight: "25px",
                                            backgroundColor: "#EEEEEE",
                                            "& fieldset": { border: 'none' },
                                            "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                        }}
                                    />

                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} pt={3}>

                            <Grid xs={12} align="center">
                                <Button variant="contained" style={btn} onClick={handleCloseadd}>Update Privacy Policy</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>

                {/* edit success modal */}
                <Modal
                    open={openeditsuccess}
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

                                    <Typography variant="h5" sx={{ letterSpacing: "1px" }} fontWeight={600} color="#1F1F1F">Privacy Policy Updated Successfully</Typography></Box>
                            </Grid>

                            <Grid xs={1.7} align="right" pt={2} pr={2}>
                                <Close onClick={() => setOpeneditsuccess(false)} />
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>

                {/* edit term and conditions modal */}
                <Modal
                    open={openedittermNcondition}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                        <Grid container spacing={0}>
                            <Grid xs={8} align="left" >
                                <Typography variant="h4" sx={{ letterSpacing: "1px" }} fontWeight={800} fontSize="20px" color="#1F1F1F">Update Terms & Conditions</Typography>
                            </Grid>

                            <Grid xs={4} align="right">
                                <Close onClick={() => setOpenedittermNcondition(false)} />
                            </Grid>

                            <Grid xs={12} align="center" pt={3}>
                                <FormControl fullWidth>
                                    <OutlinedInput
                                        id="input-with-icon-adornment"
                                        multiline={true}
                                        rows={12}
                                        defaultValue="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam "
                                        sx={{
                                            ml: 1, fontWeight: "medium", color: "#000000", lineHeight: "25px",
                                            backgroundColor: "#EEEEEE",
                                            "& fieldset": { border: 'none' },
                                            "& ::placeholder": { ml: 1, fontWeight: 600, color: "#000000" }
                                        }}
                                    />

                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0} pt={3}>

                            <Grid xs={12} align="center">
                                <Button variant="contained" style={btn} onClick={handleCloseedittermNcondition}>Update Terms & Conditions</Button>
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>

                {/* edit termandcondition success modal */}
                <Modal
                    open={opentermNconditionsuccess}
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

                                    <Typography variant="h5" sx={{ letterSpacing: "1px" }} fontWeight={600} color="#1F1F1F">Terms & Conditions Updated Successfully</Typography></Box>
                            </Grid>

                            <Grid xs={1.7} align="right" pt={2} pr={2}>
                                <Close onClick={() => setOpentermNconditionsuccess(false)} />
                            </Grid>
                        </Grid>

                    </Box>
                </Modal>
            </Box >
        </>
    )
}

export default Team