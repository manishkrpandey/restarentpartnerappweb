import React from 'react';
import './Header.css';
import Menu from './Menu';
import Title from './Headertitle';
function Header(){
    return(
      <div className="header">
          <Menu/>
          <Title/>
      </div>
    )
}

export default Header