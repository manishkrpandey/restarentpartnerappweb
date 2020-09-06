import React from 'react';
import { useSelector } from "react-redux";
import './Revenue.css'
import Revenuecard from './Revenuecard'
function Revenue(){
    const resData = useSelector(state => state.reducer.resInfo)
    return(
        <>
        <ul className="revenueList row mt-2">
            <li className="col">
                <span className="revenueTitle">Today's Revenue</span>
                <div className="totalRevenue">{resData.todayRevenue.totalRevenue}</div>
                <p>{resData.todayRevenue.totalOrder}</p>
            </li>
            <li className="col">
                <span className="revenueTitle">Monthely Revenue</span>
                <div className="totalRevenue">{resData.monthRevenue.totalRevenue}</div>
                <p>{resData.monthRevenue.totalOrder}</p>
            </li>
        </ul>
        <Revenuecard />
        </>
    )
}

export default Revenue;