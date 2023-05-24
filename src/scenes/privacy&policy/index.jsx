import { Box, Tooltip, Typography, useTheme, IconButton, TextField, Grid, Modal, Button, Stack, Divider, Container } from "@mui/material";
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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: ' block',
  margin: '0 auto',
  borderColor: 'red',
}

const { TextArea } = Input;

const btn = {
  width: '25vh',
  // marginTop: '20px',
  // marginBottom: '20px',
  color: 'white',
  backgroundColor: '#789040',
  borderColor: '#789040',
  height: '50px',
  padding: '0px',
  fontFamily: 'bold',
  fontWeight: "bold"
}

const btnupdate = {
  width: '50%',
  marginTop: '20px',
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
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 300,
  // height: 300,
  bgcolor: '#FFFFFF',
  outline: "none",
  boxShadow: 0,
  p: 4,
  borderRadius: 5
};


const Team = () => {
  const navigate = useNavigate();
  const [isloading, setIsloading] = useState(false);
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

    getPrivacypolicy(jwttoken, ID);
  }, [])

  const [privacypolicyID, setPrivacypolicyID] = useState("");
  const [privacypolicytext, setPrivacypolicytext] = useState("");

  const getPrivacypolicy = async (jwttoken, ID) => {
    var InsertAPIURL = `${url}privacy_policy/getAllPrivacyPlicies?current_user_id=${ID}`
    var headers = {
      'Authorization': `Bearer ${jwttoken}`
    };
    await fetch(InsertAPIURL, {
      method: 'GET',
      headers: headers,
      body: JSON.stringify(),
    })
      .then(response => response.json())
      .then(response => {
        console.log(response.result[1]);
        console.log(response.result[1].text);
        setPrivacypolicyID(response.result[1].privacy_policy_id);
        setPrivacypolicytext(response.result[1].text);
      }
      )
      .catch(error => {

                  Swal.fire({
            icon: 'error',
            title: 'Oops...',
            confirmButtonColor: "#FF6700",
            text: "Server Error"
          })
      });

  }
  const [newtext, setNewtext] = useState("");

  const openupdatemodal = () => {
    console.log(privacypolicyID);
    setOpen(true);
    setNewtext(privacypolicytext);
  }

  const updateprivacypolicy = async () => {
    console.log(privacypolicyID, newtext);

    if (newtext.length == 0) {
      Swal.fire({
        title: "Warning",
        text: "Privacy Policy Text Is Required",
        icon: "warning",
        confirmButtonText: "OK",
      });
      setOpen(false);
    } else {
      var InsertAPIURL = `${url}privacy_policy/updatePrivacyPolicy?current_user_id=${currentuserID}`
      var headers = {
        'Authorization': `Bearer ${jwtoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        "privacy_policy_id": privacypolicyID,
        "text": newtext
      };
      await fetch(InsertAPIURL, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          if (response.message == "Text updated") {
            setIsloading(true);
            setTimeout(() => {
              Swal.fire({
                title: "Success",
                text: "Privacy policy updated successfully",
                icon: "success",
                confirmButtonText: "OK",
              });
              setOpen(false);
              getPrivacypolicy(jwtoken, currentuserID);
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
            text: "Server Error"
          })
        });
    }

  }

  return (
    <>
      <Box display="flex" justifyContent="space-between" p={2} style={{ borderBottom: '1px solid #adadad' }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <HomeIcon />
          </Link>

          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>

      </Box>
      <Box m="20px">

        <Grid container spacing={0}>
          <Grid xs={9}>
            <Header title="Privacy Policy" />

          </Grid>

          <Grid xs={3} >
            <Button variant="contained" style={btn} onClick={() => openupdatemodal()} >Edit Privacy Policy</Button>

          </Grid>
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ width: '90%' }}>

          <Container>
            <Typography variant="paragraph" fontSize="15px" fontWeight="medium">
              <div dangerouslySetInnerHTML={{ __html: privacypolicytext }} ></div>
            </Typography>
          </Container>
        </Box>

        {/* update */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box width={{ xs: 200, sm: 850, lg: 850 }} height="auto" sx={style}>
            <Box mt={2} mb={2}>

              <ReactQuill style={{ height: "40vh" }} value={newtext} onChange={(e) => { setNewtext(e) }} />

              {isloading ?
                <Box pb={0} pt={7} align="center">
                  <Button variant="contained" style={btnupdate}>
                    <ClipLoader color={color} loading={isloading}
                      css={override}
                      size={10}
                    />
                  </Button>
                </Box>
                :
                <Box pb={0} pt={7} align="center">
                  <Button variant="contained" style={btnupdate} onClick={() => updateprivacypolicy()} >Update</Button>
                </Box>
              }

            </Box>
          </Box>
        </Modal>

      </Box>
    </>
  );
};

export default Team;
