import React from 'react'
import { useSelector } from "react-redux";
function Sectiontitle() {
  const resData = useSelector(state => state.reducer.resInfo)
  console.log(resData.location)
    return (
      <>
          <h2>{resData.restaurantName}</h2>
          <span>{resData.location.name} | {resData.location.outlet}  Outlets</span>
      </>
    );
  }
  
  export default Sectiontitle;