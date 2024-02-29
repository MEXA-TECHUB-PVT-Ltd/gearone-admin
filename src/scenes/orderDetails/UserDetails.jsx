import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import { Box, Tooltip, Typography, Grid, Modal, Button, Stack, Card, CardContent, MenuItem, Menu, Paper, Divider, Avatar } from "@mui/material";
import Swal from 'sweetalert2'
import url from "../url"
import { Close } from "@mui/icons-material";
import { useEffect } from 'react';
import moment from 'moment';  // Import moment

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

const StyledListItem = styled(ListItem)(({ theme }) => ({
    backgroundColor: 'white',
    borderBottom: `1px solid ${theme.palette.divider}`,
}));




export default function UserDetails({
    id,
    block, merchandise_name, price, status, ordered_at, createdat,
    merchandise_description, instagram, total_orders, facebook, twitter, linked_in, followers, followings
}) {
    const [DeleteData, setDeleteData] = useState([]);
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [AnchorElStatus, setAnchorElStatus] = React.useState(null);
    const [BlockStatus, setBlockStatus] = React.useState(block);

    useEffect(() => {
        setBlockStatus(block)
    }, [block])

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

    const formattedDate = moment(createdat).format('MMMM Do YYYY');  // Format the date using moment


    return (
        <>
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                <Grid container spacing={2}>
                    <Grid item xs={24} md={12}>
                        <List dense={dense}>
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>Merchandise</span>

                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>{merchandise_name}</span>}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>Name</span>}

                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>{price}</span>}

                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>Price</span>}
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>   <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>{status}</span>}

                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>Status</span>}
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>{ordered_at}</span>}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>Ordered Location</span>}

                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={

                                    <ListItemText
                                        primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>{formattedDate}</span>}

                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>ordered On</span>}
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>{merchandise_description}</span>}

                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary={<span style={{ fontSize: '16px', fontWeight: '600' }}>Description</span>}

                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                        </List>

                    </Grid>
                </Grid>
            </Box >
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
                                BlockStatus === 'unblock' &&
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
                                BlockStatus === 'unblock' &&
                                <Button variant="contained" style={btn} onClick={() => { handleChipClick() }}>block</Button>
                            }
                        </Grid>
                    </Grid>

                </Box>
            </Modal>

        </>
    );
}
