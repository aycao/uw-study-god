import React from 'react';
import {Col} from 'react-bootstrap';

import CourseCodeSearchBar from './CourseCodeSearchBar';
import CourseCodeList from './CourseCodeList';

const SideNav = (props) => {
  return(
    <Col className="side-nav-container col-xs-12 col-sm-12 col-md-4 col-lg-3">
      <CourseCodeSearchBar/>
      <CourseCodeList/>
    </Col>
  );
};

export default SideNav;