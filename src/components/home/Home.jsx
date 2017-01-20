import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../header/Header';
import SideNav from '../side-nav/SideNav';
import DetailPanel from '../detail-panel/DetailPanel';
import {fetchAllCoursesAC} from '../../actions';

class Home extends Component{
  constructor(props){
    super(props);
    props.fetchAllCourses();
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCourses: () =>{
      dispatch(fetchAllCoursesAC())
    }
  }
};

export default connect(null, mapDispatchToProps)(Home);
