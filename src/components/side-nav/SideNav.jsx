import React from 'react';

import CourseCodeSearchBar from './CourseCodeSearchBar';
import CourseCodeList from './CourseCodeList';

const SideNav = (props) => {
  return(
    <div className="side-nav-container col-md-4">
      <CourseCodeSearchBar/>
      <CourseCodeList/>
    </div>
  );
};

export default SideNav;