export const addUserInfo = (userInfo) =>{
    return{
        type:'ADD',
        userInfo
    }
}
export const addRestraurent = (resInfo) =>{
    return{
        type:'Add_RESTRAURENT',
        resInfo
    }
}
export const addRestraurentMenu = (resMenu , ctype) =>{
    return{
        type:'Add_RESTMENU',
        resMenu,
        ctype
    }
}