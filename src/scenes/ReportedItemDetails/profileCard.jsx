
import React, { useEffect, useState } from 'react';
import { Close } from "@mui/icons-material";
import { Box, Tooltip, Typography, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";

import Chip from '@mui/material/Chip';
import moment from 'moment';  // Import moment
import Swal from 'sweetalert2'
import url from "../url"
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

const btn = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#B5030B',
    borderColor: '#B5030B',
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
const ProfileCard = ({ id, reported_items, name, role, createdat, imageUrl, email, address, gender, blockType, accountType, phoneNumber }) => {
    const formattedDate = moment(createdat).format('MMMM Do YYYY');  // Format the date using moment
    const [BlockStatus, setBlockStatus] = React.useState(blockType);
    const [AnchorElStatus, setAnchorElStatus] = React.useState(null);
    const [DeleteData, setDeleteData] = useState([]);

    useEffect(() => {
        setBlockStatus(blockType)
    }, [blockType])

    const [opendelmodalStatus, setOpendelmodalStatus] = useState(false);
    const handleOpendelmodalStatus = (row) => {
        setOpendelmodalStatus(true);
        setAnchorElStatus(null);
    };
    const handleClosedelmodalStatus = () => setOpendelmodalStatus(false);

    const handleChipClick = async () => {
        var InsertAPIURL = `${url}admin/block_unblock_user`
        var headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        var DataFinal = {
            "id": id,
        };
        await fetch(InsertAPIURL, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(DataFinal),
        })
            .then(response => response.json())
            .then(response => {
                if (response.status == true) {
                    console.log(response.result[0].status);
                    setBlockStatus(response.result[0].status);
                    handleClosedelmodalStatus();
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        confirmButtonColor: "#B5030B",
                        text: 'Status change successfully'
                    })

                    // setOpendelmodal(false);
                    //   console.log(response.result);
                    //   setCatagory(response.result);
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


    return (
        <>
            <Card sx={{
                padding: '1%',
                backgroundColor: 'white',
                color: 'black',

                width: '100%',
                maxHeight: '93%',
                boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'stretch',
                borderRadius: '8px',
            }}>
                            <p>Reported By</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px',
                }}>
                    <Avatar sx={{
                        backgroundColor: theme => theme.palette.secondary.main,
                        width: theme => theme.spacing(7),
                        height: theme => theme.spacing(7),
                    }} src={imageUrl} alt={`${name} Avatar`} />
                    <div style={{ flex: 1, marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle2" component="div" sx={{ fontSize: '14px' }}>
                            {name}
                        </Typography>
                        <Typography variant="caption" component="div" sx={{ fontSize: '14px', marginBottom: '4px' }}>
                            {email}
                        </Typography>
                    </div>
                </div>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'left',
                    flexGrow: 1,
                }}>

                    <div className="profile-card">
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span></span> {role}</p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Details:</span> {gender}</p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>All Reports:</span> {reported_items}</p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Status:</span> {BlockStatus === 'block' ?
                            <Chip
                                label={BlockStatus}
                                color="primary"
                                onClick={() => { setOpendelmodalStatus(true) }}
                            />
                            :
                            <Chip
                                label={BlockStatus}
                                variant='outlined'
                                color="secondary"
                                onClick={() => { setOpendelmodalStatus(true) }}
                            />
                        }</p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Account Type:</span> {accountType}</p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Creation Date:</span> {formattedDate}</p>
                        <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Phone Number:</span> {phoneNumber}</p>
                    </div>

                </CardContent>
            </Card>

            {/* Change */}
            <Modal
                open={opendelmodalStatus}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={{ xs: 400, md: 500, lg: 500, xl: 600 }} height="auto" sx={style}>
                    <Grid container spacing={0}>
                        <Grid xs={12} align="right">
                            <Close onClick={() => setOpendelmodalStatus(false)} />
                        </Grid>

                        <Grid xs={12} align="center" p={{ xs: 2, md: 5, lg: 1, xl: 1 }}>
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#B5030B">Confirmation</Typography>
                            {BlockStatus === 'block' ?
                                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7}
                                    pb={0} fontWeight={600} color="#1F1F1F">{`Do you want to unblock user?`}
                                </Typography>
                                :
                                <Typography variant="h5" sx={{ letterSpacing: "3px" }} pt={7}
                                    pb={0} fontWeight={600} color="#1F1F1F">{`Do you want to block user?`}
                                </Typography>

                            }
                        </Grid>
                    </Grid>

                    <Grid container spacing={0} pt={7}>
                        <Grid xs={6} align="">
                            <Button variant="contained" style={btncancel} onClick={() => { setOpendelmodalStatus(false) }}>Cancel</Button>
                        </Grid>

                        <Grid xs={6} align="right">
                            {BlockStatus === 'block' ?
                                <Button variant="contained" style={btn} onClick={() => { handleChipClick() }}>unblock</Button>
                                :
                                <Button variant="contained" style={btn} onClick={() => { handleChipClick() }}>block</Button>
                            }
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
        </>
    );
}

export default ProfileCard;
