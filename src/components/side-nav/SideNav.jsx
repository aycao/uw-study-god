import React from 'react';
import {Col} from 'react-bootstrap';

import CourseCodeSearchBar from './CourseCodeSearchBar';
import CourseCodeList from './CourseCodeList';

const SideNav = (props) => {
  return(
    <Col md={4} sm={12} className="side-nav-container">
      <CourseCodeSearchBar/>
      <CourseCodeList/>
    </Col>
  );
};

export default SideNav;