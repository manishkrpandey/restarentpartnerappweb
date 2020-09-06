import React from 'react';
import Sectiontitle from './Sectiontitle';
import Revenue from './Revenue/Revenue';
class Section extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <div>
        <Sectiontitle />
        <Revenue />
      </div>
    )
  }
}

export default Section;