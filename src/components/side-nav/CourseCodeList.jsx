import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Panel} from 'react-bootstrap';

import CourseCodeGroup from './CourseCodeGroup';


class CourseCodeList extends Component{

  constructor(props){
    super(props);
    this.state = {expandedPanels: []};
  }

  render(){
    if(this.props.courseCodes.all.length <= 0){
      return <div>loading courses</div>;
    }
    return(
        <div className="course-code-list-container">
          {this.makeCourseCodePanels(this.props.courseCodes.all, this.props.courseCodes.activeCourseCode)}
        </div>
    );
  }

  makeCourseCodePanels(courseCodes, activeCourseCode){
    const courseCodeGroupesByInitial = _.groupBy(courseCodes, 'igroup');
    return _.map(courseCodeGroupesByInitial, (groupedCourseCodes, initial) => {
      return (
          <Panel header={<div><div className="panel-heading-clickable">{initial}</div></div>}
                 key={initial}
                 eventKey={initial}
                 className="course-code-list-item"
                 collapsible>
            <CourseCodeGroup courseCodes={groupedCourseCodes} activeCourseCode={activeCourseCode}  />
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