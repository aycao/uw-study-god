import React from 'react';
import {connect} from 'react-redux';

const SideNav = (props) => {
  if (props.courses.length <= 0){
    return <div>loading data</div>
  }
  return(
    <div className="col-md-4">
      I have so many courses: {props.courses.length}
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    courses: state.courses.all,
  }
};

export default connect(mapStateToProps)(SideNav);