import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Accordion, Panel} from 'react-bootstrap';

import CourseCodeGroup from './CourseCodeGroup';


class CourseCodeList extends Component{

  render(){
    if(this.props.courseCodes.all.length <= 0){
      return <div>loading courses</div>;
    }
    return(
        <Accordion className="course-code-accordion">
          {this.makeCourseCodePanels(this.props.courseCodes.all)}
        </Accordion>
    );
  }

  makeCourseCodePanels(courseCodes){
    const courseCodeGroupesByInitial = _.groupBy(courseCodes, (courseCode) => {
      return _.head(courseCode.subject);
    });
    return _.map(courseCodeGroupesByInitial, (value, key) => {
      return (
          <Panel eventKey={key} header={key} key={key}>
            <CourseCodeGroup courseCodes={value}  />
          </Panel>
      )
    });
  }

}



const mapStateToProps = (state) => {
  return {
    courseCodes: state.courseCodes,
  }
};

export default connect(mapStateToProps)(CourseCodeList);