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

export const addRestraurentInitial = (resMenu) =>{
    console.log('In Action',resMenu);
    return{
        type:'SET_RESTMENU_INITIAL',
        resMenu
    }
}

export const isMenuAlreadyAdded = (isMenuadded,restaurantId) =>{
    console.log('In Action',isMenuadded,restaurantId);
    return{
        type:'SET_IS_MENU_ADDED',
        restaurantId,
        isMenuadded
    }
}

