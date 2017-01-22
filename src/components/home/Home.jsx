import React, {Component} from 'react';
import {connect} from 'react-redux';

import Header from '../header/Header';
import SideNav from '../side-nav/SideNav';
import DetailPanel from '../detail-panel/DetailPanel';
import {fetchAllCoursesAC, fetchAllCourseCodesAC, fetchAllTermsAC} from '../../actions';

class Home extends Component{
  constructor(props){
    super(props);
    props.fetchAllCourses();
    props.fetchAllCourseCodes();
    props.fetchAllTerms();
  }

  render(){
    if(this.props.terms.all.length <= 0){
      return <div>loading data</div>
    }else{
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCourses: () => {
      dispatch(fetchAllCoursesAC())
    },
    fetchAllCourseCodes: () => {
      dispatch(fetchAllCourseCodesAC())
    },
    fetchAllTerms: () => {
      dispatch(fetchAllTermsAC())
    },
  }
};

const mapStateToProps = (state) => {
  return {terms: state.terms};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
