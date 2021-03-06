import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {Nav, NavItem} from 'react-bootstrap';

import CourseList from './CourseList';


class DetailPanel extends Component{

  constructor(props){
    super(props);
    this.state = {activeCourseLevel: 'all'};
    this.handleSelectCourseLevel = this.handleSelectCourseLevel.bind(this);
  }

  render(){

    return(
      <div className="detail-panel-container col-xs-12 col-sm-12 col-md-8 col-lg-9">
        <div className="level-tabs-container">
          <Nav bsStyle="tabs"
               activeKey={this.state.activeCourseLevel}
               onSelect={this.handleSelectCourseLevel}
               id="course-level-tabs">
            {this.makeLevelNavItems()}
          </Nav>
        </div>
        <div className="level-tabs-content-container">
          <CourseList courseLevel={this.state.activeCourseLevel}/>
        </div>
      </div>
    );
  }

  handleSelectCourseLevel(key){
    this.setState({
      activeCourseLevel: key,
    });
  }

  makeLevelNavItems() {
    const allLevels = ['100', '200', '300', '400'];
    let navTabItems = allLevels.map((level) => {
      return (
          <NavItem key={level} eventKey={level}>
            {level}
          </NavItem>);
    });
    navTabItems = [<NavItem key={'all'} eventKey={'all'} title="All">All</NavItem>, ...navTabItems];
    return navTabItems;
  }

}

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    courseCodes: state.courseCodes,
  }
};

export default connect(mapStateToProps)(DetailPanel);