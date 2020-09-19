import React from 'react';
import './Menu.css'
import { useHistory } from 'react-router-dom'
function Menulist(props){
  const history = useHistory()
    const gotoOders = (data) => {
      switch(data){
        case 'Orders':
          history.push('/orders')
          break; 
        case 'Add menu':
          history.push('/addmenu')
          break; 
        default :
          history.push('/')
      }
    }
    return(
      <ul className="Menulist">
          { props.list.map(function(item,index) {
                return <li key={index} onClick = {() => gotoOders(item)}>{item}</li>
            })
           }
      </ul>
    )
}
export default Menulist