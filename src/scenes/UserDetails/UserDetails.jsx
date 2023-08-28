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

const btn = {
    width: '90%',
    letterSpacing: "2px",
    marginBottom: '40px',
    color: 'white',
    backgroundColor: '#FF6700',
    borderColor: '#FF6700',
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
    block, all_items, reported_items, saved_items, liked_items, shared_items,
    report_ads, instagram, total_orders, facebook, twitter, linked_in, followers, followings
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
                        confirmButtonColor: "#FF6700",
                        text: 'Status change successfully'
                    })

                    // setOpendelmodal(false);
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
            <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
                <Grid container spacing={2}>
                    <Grid item xs={24} md={12}>
                        <List dense={dense}>
                            <StyledListItem
                                secondaryAction={
                                    BlockStatus === 'block' ?
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
                                            onClick={ () => { setOpendelmodalStatus(true) }}
                                        />
                                }

                            >
                                <ListItemText
                                    primary="Block Status"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>

                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={all_items}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="ALL Items"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={reported_items}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="All Reports"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>   <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={saved_items}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="Saved Items"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={liked_items}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="Liked Items"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={shared_items}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="Share Items"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={report_ads}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="Report ads"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={total_orders}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="Total orders"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={followers}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="Total Followers"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>

                            <StyledListItem
                                secondaryAction={
                                    <ListItemText
                                        primary={followings}
                                        secondary={secondary ? 'Secondary text' : null}
                                    />
                                }
                            >
                                <ListItemText
                                    primary="Total Followings"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>

                            <StyledListItem
                                secondaryAction={
                                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                                        <ListItemText
                                            primary={facebook}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </a>
                                }
                            >
                                <ListItemText
                                    primary="Facebook"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <a href={twitter} target="_blank" rel="noopener noreferrer">
                                        <ListItemText
                                            primary={twitter}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </a>

                                }
                            >
                                <ListItemText
                                    primary="Twitter"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <a href={linked_in} target="_blank" rel="noopener noreferrer">
                                        <ListItemText
                                            primary={linked_in}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </a>
                                }
                            >
                                <ListItemText
                                    primary="LinkedIn"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                            </StyledListItem>
                            <StyledListItem
                                secondaryAction={
                                    <a href={instagram} target="_blank" rel="noopener noreferrer">
                                        <ListItemText
                                            primary={linked_in}
                                            secondary={secondary ? 'Secondary text' : null}
                                        />
                                    </a>
                                }
                            >
                                <ListItemText
                                    primary="Instagram"
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
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Confirmation</Typography>
                            {DeleteData.status === 'block' ?
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
                            {DeleteData.status === 'block' ?
                                <Button variant="contained" style={btn} onClick={() => { handleChipClick() }}>unblock</Button>
                                :
                                <Button variant="contained" style={btn} onClick={() => { handleChipClick() }}>block</Button>
                            }
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
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
                            <Typography variant="h4" sx={{ letterSpacing: "3px" }} fontWeight={600} fontSize="x-large" color="#FF6700">Confirmation</Typography>
                            {DeleteData.status === 'block' ?
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
                            {DeleteData.status === 'block' ?
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
