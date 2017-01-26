import React, {Component} from 'react';
import _ from 'lodash';
import {Panel} from 'react-bootstrap';


class CourseList extends Component{

  constructor(props){
    super(props);
    this.state = {activeCourses: []};
  }

  render(){
    if(_.isEmpty(this.props.courses)){
      return <div>No courses found in selected term, or at this level</div>
    }
    return(
        <div className="course-list-container">
          {this.makeCourseItems(this.props.courses)}
        </div>
    );
  }

  makeCourseItems(courses){
    return courses.map((course) => {
      const className = `course-list-item ${course.offering? 'offering': 'not-offering'}`
      return(
        <Panel collapsible
               key={course.course_id}
               className={className}
               onSelect={() => this.handleCourseSelect(course.course_id)}
               header={<span><h4>{course.subject} {course.catalog_number} {course.title}</h4></span>}>
          jjj
        </Panel>
      );
    });
  }

  handleCourseSelect(courseId){
    console.log(courseId);
  }

}

export default CourseList;
