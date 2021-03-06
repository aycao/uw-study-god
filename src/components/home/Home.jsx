import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../header/Header';
import SideNav from '../side-nav/SideNav';
import DetailPanel from '../detail-panel/DetailPanel';
import {fetchAllCourseCodesAC, fetchAllTermsAC, fetchOfferingCoursesAC} from '../../actions';

class Home extends Component{
  constructor(props){
    super(props);
    props.fetchAllCourseCodes();
    props.fetchAllTerms();
  }

  render(){
    if(this.props.state.terms.all.length <= 0){
      return <div>loading data</div>
    }else{
      return (
          <div className="app">
            <Header/>
            <div className="content container">
              <SideNav/>
              <DetailPanel/>
            </div>
            {/*
              <a href="#" onClick={() => {console.log('terms: ', this.props.terms); console.log('courses: ', this.props.courses); console.log('courseCodes: ', this.props.courseCodes)}}>check state</a>
              */}
          </div>
      );
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCourseCodes: () => {
      dispatch(fetchAllCourseCodesAC())
    },
    fetchAllTerms: () => {
      dispatch(fetchAllTermsAC())
    },
    fetchOfferingCourses: (termId) => {
      dispatch(fetchOfferingCoursesAC(termId))
    }
  }
};

const mapStateToProps = (state) => {
  return {
    state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
