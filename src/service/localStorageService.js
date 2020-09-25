export const saveUserDataToLocalStorage = (token,data) =>{
    localStorage.setItem(token,data);
}

export const getLocalStorageData = (token) =>{
   return localStorage.getItem(token);
}

export const clearStorageData = (token) =>{
    localStorage.removeItem(token);
}