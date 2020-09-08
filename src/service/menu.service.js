import { postfetcher,getFetcher} from './api.service';
import {ENVIRONMENT as env} from './../config'


export  const getRestaurentMenu = (data) =>{
  return   postfetcher(env.GET_OTP_URL,data
    ).then(res=>{
      return {
        code:'1234',
        status:true
      }
    });
}

export  const addRestaurentMenu = (data) =>{
  return   postfetcher(env.GET_OTP_URL,data
    ).then(res=>res);
}
