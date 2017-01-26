import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {Col, Tab, Nav, NavItem} from 'react-bootstrap';

import CourseList from './CourseList';


class DetailPanel extends Component{

  constructor(props){
    super(props);
    this.state = {activeCourseLevel: 'all'};
    this.handleSelectCourseLevel = this.handleSelectCourseLevel.bind(this);
    this.getActiveCourseList = this.getActiveCourseList.bind(this);
  }

  render(){
    return(
      <Col md={8} sm={12} className="detail-panel-container">
        <div className="level-tabs-container">
          <Nav bsStyle="tabs"
               activeKey={this.state.activeCourseLevel}
               onSelect={this.handleSelectCourseLevel}
               id="course-level-tabs">
            {this.makeLevelNavItems()}
          </Nav>
        </div>
        <div className="level-tab-content-container">
          <CourseList courses={this.getActiveCourseList(this.state.activeCourseLevel)}/>
        </div>
      </Col>
    );
  }

  handleSelectCourseLevel(key){
    this.setState({
      activeCourseLevel: key,
    });
  }

  getActiveCourseList(level){
    const selectedCourses = this.props.courses.selectedCourses;
    return level === 'all'? selectedCourses: _.filter(selectedCourses, {level: level});
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
  }
};

export default connect(mapStateToProps)(DetailPanel);