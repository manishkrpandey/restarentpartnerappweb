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
import {getRestaurentMenu} from './../../service/menu.service'
import { addRestraurentInitial,isMenuAlreadyAdded,addRestraurent } from './../../Store/action/Action'
import { saveUserDataToLocalStorage,getLocalStorageData,clearStorageData} from './../../service/localStorageService'


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
  const resMenuData = useSelector(state => state.reducer.resMenu);
  const [open, setOpen] = React.useState(false);
  const [sucessmsg,setSuccessMsg]= useState('');
  const [severity,setSuccessseverity]= useState(1);
  const dispatch = useDispatch();
  const [otpfromServer,setOtpfromServer]= useState();
  const [registeredMobileNumber,setMobileNumber]= useState('');
  const [otpReceived,setotpReceived]= useState('');
  const [isValidMobileNumber,setisValidMobileNumber]= useState(false); 
  const [isValidMobileOTP,setisValidMobileOTP]= useState(false); 
  const formRef = useRef();
  const formRefOtp = useRef();
  const classes = useStyles();
  let history = useHistory();
  const [isMobile,setIsMobile]=useState(true);
  
 const handleSignIn = (event) => {
  const getOtpServiceReqObject = {
    "mobile_number":registeredMobileNumber,
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
    const verifyOtpServiceReqObject ={
      "mobile_number":registeredMobileNumber,
       "otp": otpReceived
    }
    event.preventDefault();
      if(isValidMobileOTP){
        verifyOTPService(verifyOtpServiceReqObject).then(res=>{
          if(res && res.data && res.data.status==="success"){
            localStorage.setItem('token','1234');
            history.push('/home');
            clearStorageData('userData');
            saveUserDataToLocalStorage('userData',JSON.stringify(res.data.data[0]));
            dispatch(addRestraurent(res.data.data[0]));
            let restaurentData = JSON.parse(getLocalStorageData('userData'));
            
            getRestaurentMenu(
              {
                command:"getmenu",
                restaurant_id:restaurentData.id
          }).then(res=>{
              if(res.data && res.data.data){
                let restaurentId = res.data && res.data.data && res.data.data[0].restaurant_id ? res.data.data[0].restaurant_id : 0;
                let resMenu = JSON.parse(atob(res.data.data[0].menu_items));
                    dispatch(addRestraurentInitial(resMenu));
                    console.log('resMenu',resMenuData);
                    let menuitems = [];
                    let rows = resMenu.category.map((category)=>{
                      return category.menuitems.map((row) => {
                        menuitems.push(row);
                          return row;
                      } 
                      )
                    });
                    if(menuitems.length==0){
                      dispatch(isMenuAlreadyAdded(false,restaurentId));
                    }else{
                      dispatch(isMenuAlreadyAdded(true,restaurentId));
                    }
              }
            });

          }
        })
      }
   }

  const checkValidateData = (data) =>{
    let mRegex = /^[6789]\d{9}$/
    let otpRegex = /[0-9]\d\d\d/g
    
    if(isMobile){
      setMobileNumber(data.target.value); 
       let validMobileNumber = mRegex.test(data.target.value);
       setisValidMobileNumber(validMobileNumber);  
    }else{
        let validOtp = otpRegex.test(data.target.value);
        setotpReceived(data.target.value);
        setisValidMobileOTP(validOtp);
    }
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