import React from 'react'
import {Redirect,Route} from "react-router-dom"
const ProtectedRoute = ({component:Com,...rest}) => ( 
        <Route 
            {...rest}
            render = {(props) =>(
                localStorage.getItem('login')?(
                    <Com {...props} />
                ):
                <Redirect exact to='/' />
            )}
        />
)
export default ProtectedRoute;