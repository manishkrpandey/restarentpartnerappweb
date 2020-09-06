import React from 'react';
import Menulist from './Menulist';
import {menuList} from '../../config';
class Menu extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      menu:false
    }
  }
  activeMenu(){
    this.setState((state , props) => {
      return {
        menu : !state.menu
      }
    })
  }
  render(){
    const {menu} = this.state;
    return(
      <div className="Menu">
          <svg onClick={() => this.activeMenu()} className="ToggleIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 33.68"><g data-name="Layer 2"><g><g><path d="M2.32,4.73H37.68A2.35,2.35,0,0,0,40,2.36,2.34,2.34,0,0,0,37.68,0H2.32A2.34,2.34,0,0,0,0,2.36,2.35,2.35,0,0,0,2.32,4.73Zm35.36,9.75H2.32a2.37,2.37,0,0,0,0,4.73H37.68a2.37,2.37,0,0,0,0-4.73Zm0,14.48H2.32a2.36,2.36,0,0,0,0,4.72H37.68a2.36,2.36,0,0,0,0-4.72Z"/></g></g></g></svg>
          {menu === true ?
          <Menulist list = {menuList}/>
          :''
          }
      </div>
    )

  }

}

export default Menu;