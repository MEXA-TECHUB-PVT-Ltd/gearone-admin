import React ,{ useState, useEffect} from 'react'
import axios from 'axios';
import { Grid } from '@mui/material'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import image from '../../components/Images/logo.png'
// import 'animate.css';
import Avatar from '@mui/material/Avatar';
import url from '../url'
import ClipLoader from "react-spinners/ClipLoader";
import TextField from '@mui/material/TextField';
const ContainerStyle = {
      padding: '30px',
      height: "110vh",
      paddingTop: '180px',
      backgroundColor:'#e8eff9',
      color: 'white',
  }
  const btn = {
      width: '99%',
      marginTop: '20px',
      marginBottom: '20px',
      color: 'white',
      backgroundColor: '#78be20',
      borderColor: '#ada6f2',
      height:'50px',
      padding: '0px',
      fontFamily: 'Tiro Gurmukhi, serif'
  }
  
  const InputStyle = {
      width: '100%',
  }
  
  const headingStyle = {
      fontSize: '16px',
     color:'black'
  
  }
  const gridCont = {
      padding: '30px',
      marginLeft: '20px',
      marginRight: '20px',
      marginTop: '-70px',
      backgroundColor:'white',
      height:'430px'
  }
  const override = {
      display: ' block',
      margin: '0 auto',
      //   borderColor: 'red',
  }
  const logoStyle = {
   width:'30%',
   height:'30%'
}
  const color = "black"
  
  const heading = "Update Password"
function Login() {
  const [items, setItems] = useState([]);

    const getAdminLogin = (items) => {
        axios.get(`${url}get-user`, {
            params: {
              _id: items
            }
          })
          .then((response) => {
            console.log("response.data.data[0]")
            console.log(response.data)
            setEmail(response.data.email)
            // setPassword(response.data.password)
          })
          .catch(error => console.error(`Error:${error}`));
      }
      useEffect(() => {
    
        const items = JSON.parse(localStorage.getItem('items'));
        console.log(items)
        setItems(items)
        getAdminLogin(items);
    
      }, []);
  const [loading, setLoading] = useState("");
     const [loading1, setLoading1] = useState(false);
  
     useEffect(() => {
         setLoading(true)
         setTimeout(() => {
             setLoading(false)
  
         }, 3000)
     }, [])
     //    Get 
     let navigate = useNavigate();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
    //  const [idData, setidData] = useState("");
  
     const headers = {
         'Content-Type': 'application/json'
     }
     const submitHandler = async(e) => {
         e.preventDefault()
         // Loader 
       if(email==='' ||password===''){
        Swal.fire('Fill All Fields')

       }else{
        await axios.put(`${url}update-password`, {
            email: email,
            password: password
        }, { headers }).then(response => {
            console.log(response)
            let timerInterval
            Swal.fire({
              title: 'Updated Successfully',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
                setPassword('')
           
              }
            })
 
        })
            .catch(err => {
                console.log(err)
                Swal.fire('Error Updating Password')
            })
       }
        
     }

   
  return (
    <div>  
        < Grid container spacing={2} style={ContainerStyle}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} style={gridCont}>
             <Grid align='center'>
            <Avatar src={image} variant="square" style={logoStyle} ></Avatar>
               <h6 style={headingStyle}>{heading}</h6>
    
    
             <TextField style={InputStyle} id="outlined-basic"
                value={email}
                onChange={
                  (e) => setEmail(e.target.value)
                }
                label="Email" variant="outlined" required />
              <br /><br />
              <TextField style={InputStyle} id="outlined-basic"
                value={password}
                onChange={
                  (e) => setPassword(e.target.value)
                }
                label="Password" variant="outlined" required />
    
              <br />
              <Button variant="contained" onClick={
                submitHandler
    
              } style={btn} >
                {loading1 ? <ClipLoader color={color} loading={loading1} css={override} size={10} /> : <h3>Update</h3>}
              </Button>
    
              <br />
    
            </Grid>
    
          </Grid>
        </Grid></div>
  )
}

export default Login
