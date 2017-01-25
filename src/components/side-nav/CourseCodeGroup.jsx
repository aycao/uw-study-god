import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

import {ListGroup, ListGroupItem, Label} from 'react-bootstrap';

import {setActiveCourseCodeAC, fetchSelectedCoursesAC} from '../../actions';

class CourseCodeGroup extends Component{

  constructor(props){
    super(props);
    this.handleCourseCodeClick = this.handleCourseCodeClick.bind(this);
  }


  render(){
    const {courseCodes, activeCourseCode} = this.props;
    return(
        <ListGroup>
          {this.makeCourseCodeListGroupItems(courseCodes, activeCourseCode)}
        </ListGroup>
    );
  }

  makeCourseCodeListGroupItems(courseCodes, activeCourseCode){
    return (
        _.map(courseCodes, (courseCode) => {
          const className = `course-code-list-item ${courseCode === activeCourseCode? 'active': ''}`;
          return (
              <ListGroupItem
                  className={className}
                  header={courseCode.subject}
                  key={courseCode.subject}
                  onClick={() => {this.handleCourseCodeClick(courseCode)}}>
                <span>{courseCode.description} <Label>{courseCode.group}</Label></span>
              </ListGroupItem>)
        })
    );
  };

  handleCourseCodeClick(courseCode){
    this.props.setActiveCourseCode(courseCode);
    this.props.fetchSelectedCourses(courseCode.subject);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCourseCode: (courseCode) => {
      dispatch(setActiveCourseCodeAC(courseCode));
    },
    fetchSelectedCourses: (courseCode) => {
      dispatch(fetchSelectedCoursesAC(courseCode));
    }
  }
};

export default connect(null, mapDispatchToProps)(CourseCodeGroup);