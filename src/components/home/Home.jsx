import React, {Component} from 'react'

import Header from '../header/Header';
import SideNav from '../side-nav/SideNav';
import DetailPanel from '../detail-panel/DetailPanel';

class Home extends Component{
  render(){
    return (
        <div className="container-fluid">
          <Header/>
          <div className="container">
            <SideNav/>
            <DetailPanel/>
          </div>
        </div>
    );
  }


}

export default Home;
