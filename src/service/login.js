import { postfetcher,getFetcher} from './api.service';
import {ENVIRONMENT as env} from './../config'


export  const signInService = (data) =>{
  return   postfetcher(env.GET_OTP_URL,data
    ).then(res=>{
      return {
        code:'1234',
        status:true
      }
    });
}

export  const getOTPService = (data) =>{
  return   postfetcher(env.GET_OTP_URL,data
    ).then(res=>res);
}

export  const verifyOTPService = (data) =>{
  return   postfetcher(env.VERIFY_OTP_URL,data
    ).then(res=>res);
}

export const getStateService = () =>{
  return getFetcher(env.STATE_URL).then(res=>res);
}

export const getCityByStateService = (sateId) =>{
  let url = env.BASE_URL + 'gen/actions?command=getcities&state_id='+sateId;
  return getFetcher(url).then(res=>res);
}