// import React ,{useState} from 'react'
// import { useHistory } from 'react-router-dom'
// import './Login.css'
// import {FakeAuth} from '../../Service'
// import { useSelector , useDispatch } from "react-redux";
// import {addUserInfo} from '../../Store/action/Action'
// function Login(props){
//     const userData = useSelector(state => state.reducer.userInfo)
//     const [input, setInput] = useState('')
//     const [error , setError] = useState(false)
//     const history = useHistory()
//     async function fetchLogin(){
//         let login = await fetch('https://jsonplaceholder.typicode.com/todos/1')
//         login.json().then((data) =>{
//             localStorage.setItem("login" , input)
//             const checkAuth = FakeAuth.authenticate()
//             if(checkAuth){
//                 history.push('/home')
//             }else{
//                 history.push('/')
//             }
//         },(error)=>{
//             console.log(error , 'data login')
//         })
//     }
//     const chackAuth = (data) => {
//         let mRegex = /^[6789]\d{9}$/
//         let validMobileNumber = mRegex.test(data);
//         setInput(data)
//         if(validMobileNumber){
//             setError(false)
//             fetchLogin()
//         }else{
//             setError(true)
//         }
//     }
//     return(
//         <div className="card loginBox">
//             <div className="card-body loginCard">
//                 <h2>Login</h2>
//                 <div className="form-group mt-3">
//                     <input value={input} type={'number'} onChange={e => chackAuth(e.target.value)} className="form-control" placeholder="contact number..." type="number" />
//                     {error?(<span className="showError">Add Vali Number</span>):('')}
//                 </div>
//                 <div className="form-group">
//                     <button onClick={chackAuth} className="btn btn-primary btn-block">Enater Mobile Number</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Login

import React, { useEffect, useState,useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { verifyOTPService,getOTPService } from "./../../service/login";
import { shallowEqual, useSelector,useDispatch } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const [open, setOpen] = React.useState(false);
  const [sucessmsg,setSuccessMsg]= useState('');
  const [severity,setSuccessseverity]= useState(1);
  const dispatch = useDispatch();
  const [otpfromServer,setOtpfromServer]= useState();
  const [registeredMobileNumber,setMobileNumber]= useState('');
  const [otpReceived,setotpReceived]= useState('');
  const [password,setpassword]= useState('');
  const [restaurentId,setrestaurentId]= useState('');
  const [isValidMobileNumber,setisValidMobileNumber]= useState(false); 
  //const [isValidRestaurentId,setisValidRestaurentId]= useState(false); 
  //const [isValidpassword,setisValidpassword]= useState(false); 
  const [isValidMobileOTP,setisValidMobileOTP]= useState(false); 
  const formRef = useRef();
  const formRefOtp = useRef();
  const classes = useStyles();
  let history = useHistory();
  const [isMobile,setIsMobile]=useState(true);
  
 const handleSignIn = (event) => {
   console.log(registeredMobileNumber)
  const getOtpServiceReqObject = {
    "mobile_number":registeredMobileNumber,
    "employee_type_id": "1"
  }
    event.preventDefault();
     if(isValidMobileNumber){
      getOTPService(getOtpServiceReqObject).then((res) => {
       if(res && res.data && res.data.data){
        setOtpfromServer(res.data.data.otp);
        formRef.current.reset();
        setIsMobile(false);
        // alert(res.data.data.otp);
        setSuccessseverity(1);
        setSuccessMsg(res.data.data.otp);
        handleClickSnackBar();
       }else{
        setSuccessseverity(0);
        setSuccessMsg("Please enter your registered number or contact aasaan admin");
        handleClickSnackBar();
       }
       
      }
        );
     }
    }
    const handleClickSnackBar = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

  const handleVerifyOtp = (event) => {
    console.log('data.target.value',otpReceived);
    const verifyOtpServiceReqObject ={
      "mobile_number":registeredMobileNumber,
      "employee_type_id": "1",
       "otp": otpReceived
    }
    event.preventDefault();
    // let data = {
    //   fname:'manish',
    //   lName:'Kumar',
    //   addOne:'Nasarganj',
    //   addTwo:'Jharkhand',
    //   pincode:'110075',
    //   city:'Patna',
    //   state:'Bihar',
    //   country:'India'
    // }
      if(isValidMobileOTP){
        verifyOTPService(verifyOtpServiceReqObject).then(res=>{
          console.log(res,'res',res.data);
          if(res && res.data && res.data.status==="success"){
            localStorage.setItem('token','1234');
            // dispatch(addProfileDtails(data));
            history.push('/home')
          }
        })
      }
   }

  const checkValidateData = (data) =>{
    let mRegex = /^[6789]\d{9}$/
    let otpRegex = /[0-9]\d\d\d/g
    console.log('data.target.value',data.target.value);
    
    if(isMobile){
      setMobileNumber(data.target.value); 
       let validMobileNumber = mRegex.test(data.target.value);
       setisValidMobileNumber(validMobileNumber);  
       console.log(registeredMobileNumber);
    }else{
        let validOtp = otpRegex.test(data.target.value);
        setotpReceived(data.target.value);
        setisValidMobileOTP(validOtp);
    }
  }

  const checkValidateDataPassword = (data) =>{
    let passwordRegex = /[0-9a-zA-Z]/g
    console.log('data.target.value',data.target.value);
    setpassword(data.target.value);
    let validPassword = passwordRegex.test(data.target.value);
    //setisValidpassword(validPassword);
  }

  const checkValidateDataRestaurent = (data) =>{
    let passwordRegex = /[0-9a-zA-Z]/g
    setrestaurentId(data.target.value);
    let validRestaurentId = passwordRegex.test(data.target.value);
    //setisValidRestaurentId(validRestaurentId);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Aasaan Partner Sign in
        </Typography>
        <form className={classes.form} ref={formRef} noValidate>
          {
            isMobile ? (<> <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Registered Mobile Number"
              name="email"
              autoComplete="email"
              value={registeredMobileNumber}
              autoFocus
              onChange={checkValidateData}
              error={!isValidMobileNumber}
            helperText={!isValidMobileNumber ? "Number is not valid. Please enter your registered Number":''}
            />
            {/* <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Restaurent Id"
              name="email"
              autoComplete="email"
              value={restaurentId}
              autoFocus
              onChange={checkValidateDataRestaurent}
              error={!isValidRestaurentId}
            helperText={!isValidRestaurentId ? "RestaurentId Id  is not valid. Please enter your registered Restaurent Id":''}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Password"
              name="email"
              autoComplete="email"
              value={password}
              autoFocus
              onChange={checkValidateDataPassword}
              error={!isValidpassword}
            helperText={!isValidpassword ? "Password is not valid. Please enter your password":''}
            /> */}
            </>) : (<TextField
              ref={formRefOtp}
              variant="outlined"
              margin="normal"
              label="Enter OTP"
              required
              fullWidth
              name="OTP"
              type="OTP"
              id="OTP"
              value={otpReceived}
              autoComplete="current-OTP"
              error={!isValidMobileOTP}
              onChange={checkValidateData}
              helperText={!isValidMobileOTP ? "Please enter 4 digit OTP received":''}
            />)
          }
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(event) => isMobile ? handleSignIn(event) : handleVerifyOtp(event)}
          >
           {isMobile ? 'Enter 10 digit Number': 'Validate OTP'}
          </Button>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={20000} onClose={handleClose}>
  <Alert onClose={handleClose} severity={severity ? "success":"error"}>
  {sucessmsg}
  </Alert>
</Snackbar>
    </Container>
  );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}