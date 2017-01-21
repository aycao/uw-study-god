import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../header/Header';
import SideNav from '../side-nav/SideNav';
import DetailPanel from '../detail-panel/DetailPanel';
import {fetchAllCoursesAC, fetchAllCourseCodesAC} from '../../actions';

class Home extends Component{
  constructor(props){
    super(props);
    props.fetchAllCourses();
    props.fetchAllCourseCodes();
  }

  render(){
    return (
        <div className="app">
          <Header/>
          <div className="content container-fluid">
            <SideNav/>
            <DetailPanel/>
          </div>
        </div>
    );
  }


}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCourses: () => {
      dispatch(fetchAllCoursesAC())
    },
    fetchAllCourseCodes: () => {
      dispatch(fetchAllCourseCodesAC())
    }
  }
};

export default connect(null, mapDispatchToProps)(Home);
