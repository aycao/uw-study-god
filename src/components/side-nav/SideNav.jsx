import React from 'react';
import {Col} from 'react-bootstrap';

import CourseCodeSearchBar from './CourseCodeSearchBar';
import CourseCodeList from './CourseCodeList';
import TermSelector from './TermSelector';

const SideNav = (props) => {
  return(
    <Col className="side-nav-container col-xs-12 col-sm-12 col-md-4 col-lg-3">
      <TermSelector/>
      <CourseCodeSearchBar/>
      <CourseCodeList/>
    </Col>
  );
};

export default SideNav;