const initState = {
    userInfo: {
        name: 'demo',
        email: 'demo@gmail.com',
        contact: '9999999'
    },
    resInfo: {
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
        restarentId:'AASAANEATS9810021673',
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
            return {
                ...state,
                resInfo: {
                    ...state.resInfo,
                    ...action.resInfo
                }
            }
        case 'Add_RESTMENU':
            return {
                ...state,
                resMenu:{
                    ...state.resMenu.category[action.ctype].menuitems,
                    ...action.resMenu
                }
            }
        default:
            return state
    }
}
export default reducer