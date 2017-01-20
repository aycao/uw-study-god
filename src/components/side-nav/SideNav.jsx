import React from 'react';
import {connect} from 'react-redux';

const SideNav = (props) => {
  return(
    <div className="col-md-4">
      This is the sidenav
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    courses: state.courses.all,
  }
};

export default connect(mapStateToProps)(SideNav);