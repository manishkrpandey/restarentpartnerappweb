import { postfetcher,getFetcher} from './api.service';
import {ENVIRONMENT as env} from './../config'


export  const getRestaurentMenu = (data) =>{
  return   postfetcher(env.GET_RESTAURENT_MENU,data
    ).then(res=>res);
}

export  const addRestaurentMenu = (data) =>{
  return   postfetcher(env.SET_RESTAURENT_MENU,data
    ).then(res=>res);
}

export  const updateRestaurentMenu = (data) =>{
  return   postfetcher(env.SET_RESTAURENT_MENU,data
    ).then(res=>res);
}
