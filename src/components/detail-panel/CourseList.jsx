import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';

import {fetchCourseDetailAC} from '../../actions';


class CourseList extends Component{

  constructor(props){
    super(props);
    this.makeCourseItems = this.makeCourseItems.bind(this);
    this.handleCourseSelect = this.handleCourseSelect.bind(this);
  }

  render(){
    if(_.isEmpty(this.props.courses)){
      return <div>No courses found in selected term, or at this level</div>
    }
    return(
        <div className="course-list-container">
          {this.makeCourseItems(this.getActiveCourseList(this.props.courseLevel))}
        </div>
    );
  }

  getActiveCourseList(level){
    const selectedCourses = this.props.courses.selectedCourses;
    return level === 'all'? selectedCourses: _.filter(selectedCourses, {level: level});
  }

  makeCourseItems(courses){
    return courses.map((course) => {
      const className = `course-list-item ${course.offering? 'offering': 'not-offering'}`;
      const header = (
          <span><h4 className="panel-heading-clickable">{course.subject} {course.catalog_number} {course.title}</h4></span>
      );
      const body = (
        <div>
          {this.props.courses.activeCourses[course.courseName]?
              this.makeCourseBody(this.props.courses.activeCourses[course.courseName]):
              'loading course'
          }
        </div>
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
    if(this.props.courses.activeCourses[`${subject}-${cataNum}`]){
      console.log(this.props.courses.activeCourses[`${subject}-${cataNum}`]);
      return;
    }
    if(this.props.terms.activeTerm){
      console.log(subject, cataNum);
      this.props.fetchCourseDetail(subject, cataNum, this.props.terms.activeTerm);
    }
  }

  makeCourseBody(course){
    if(!course || !course.schedule){
      return <div></div>;
    }
    return(
      <div>
        <div>{course.subject}</div>
        <div>{course.schedule.length}</div>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    terms: state.terms,
    courses: state.courses,
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
