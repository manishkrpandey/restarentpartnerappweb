const initState = {
    userInfo: {
        name: 'demo',
        email: 'demo@gmail.com',
        contact: '9999999'
    },
    isMenuadded:false,
    restaurantId:0,
    resInfo: {
        collection:{test:1234},
        restaurantName: 'Maharaja Hotel',
        restaurantId: '1158',
        status: 'open',
        location: {
            name: 'Patna',
            outlet: 4,
            longitude: '100',
            latitude: '105'
        },
        todayRevenue: {
            totalRevenue: 10000,
            totalOrder: 100
        },
        monthRevenue: {
            totalRevenue: 10000,
            totalOrder: 100
        }
    },
    resMenu: {
        restarentName: 'Maharaja Hotel',
        restarentId:'AASAANEATS9711189363',
        category: [
            {
                name: 'Deserts',
                menuitems:[]
            },
            {
                name: 'Meal',
                menuitems:[]
            },
            {
                name: 'Breakfast',
                menuitems:[]
            },
        ]
    }
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    ...action.userInfo
                }
            }
        case 'Add_RESTRAURENT':
            console.log(action);
            return {
                ...state,
                resInfo: {
                    ...state.resInfo,
                   collection:action.resInfo
                
                }
            }
            case 'SET_IS_MENU_ADDED':
                return {
                    ...state,
                    isMenuadded: action.isMenuadded,
                    restaurantId:action.restaurantId
                }    
        case 'Add_RESTMENU':
            let menu = state.resMenu.category;
            menu[action.ctype].menuitems = [...state.resMenu.category[action.ctype].menuitems,action.resMenu];
            return {
                ...state,
                resMenu:{
                    ...state.resMenu,
                    category: [
                        ...menu
                    ]
                    
                }
            }
            case 'SET_RESTMENU_INITIAL':
                let menuitem = action.resMenu.category;
                console.log('In Reducer',action.resMenu);
                return {
                    ...state,
                    resMenu:{
                        ...state.resMenu,
                        ...action.resMenu,
                        category: [
                            ...menuitem
                        ]
                        
                    }
                }
        default:
            return state
    }
}
export default reducer