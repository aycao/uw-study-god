import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';

import Constants from '../../utils/Constants';
import CourseDetail from './CourseDetail';
import {fetchCourseDetailAC} from '../../actions';


class CourseList extends Component{

  constructor(props){
    super(props);
    this.makeCourseItems = this.makeCourseItems.bind(this);
    this.handleCourseSelect = this.handleCourseSelect.bind(this);
  }

  render(){
    const displayingCourses = this.getCoursesAtSelectedLevel(this.props.courses.selectedCourses, this.props.courseLevel);
    if(_.isEmpty(displayingCourses) &&
        _.isEmpty(this.props.courses.selectedCourses) &&
        _.isEmpty(this.props.courseCodes.activeCourseCode)){
      const message = this.props.courses.status === Constants.FETCHING? 'Fetching': 'Select A Subject On Left';
      return (
          <div className="course-list-container-message">
            {message}
          </div>
      )
    }else if(_.isEmpty(displayingCourses) &&
        _.isEmpty(this.props.courses.selectedCourses)){
      const message = this.props.courses.status === Constants.FETCHING? 'Fetching': 'No Courses Found for Selected Term';
      return (
          <div className="course-list-container-message">
            {message}
          </div>
      )
    }else if(_.isEmpty(displayingCourses)){
      const message = this.props.courses.status === Constants.FETCHING? 'Fetching': 'No Courses Found for This Level';
      return (
          <div className="course-list-container-message">
            {message}
          </div>
      )
    }
    return(
        <div className="course-list-container">
          {this.makeCourseItems(displayingCourses, this.props.courses.courseDetails)}
        </div>
    );
  }

  getCoursesAtSelectedLevel(courses, level){
    return level === 'all'? courses: _.filter(courses, {level: level});
  }

  makeCourseItems(courses, courseDetails){
    return courses.map((course) => {
      const className = `course-list-item ${course.offering? 'offering': 'not-offering'}`;
      const header = (
          <span><h4 className="panel-heading-clickable">{course.subject} {course.catalog_number} {course.title}</h4></span>
      );
      const body = (
          courseDetails[course.courseName]?
              this.makeCourseBody(courseDetails[course.courseName], course.offering):'loading course'
      );
      return(
        <Panel collapsible
               key={course.courseName}
               className={className}
               onSelect={() => this.handleCourseSelect(course.subject, course.catalog_number)}
               header={header}>
          {body}
        </Panel>
      );
    });
  }

  handleCourseSelect(subject, cataNum){
    if(this.props.courses.courseDetails[`${subject}-${cataNum}`]){
      return;
    }
    if(this.props.terms.activeTerm){
      this.props.fetchCourseDetail(subject, cataNum, this.props.terms.activeTerm);
    }
  }

  makeCourseBody(course, offering){
    if(!course || !course.schedule){
      return<div>loading course</div>
    }
    return(
      <CourseDetail course={course} offering={offering}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    terms: state.terms,
    courses: state.courses,
    courseCodes: state.courseCodes,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCourseDetail: (subject, cataNum, term) => {
      dispatch(fetchCourseDetailAC(subject, cataNum, term));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseList);
