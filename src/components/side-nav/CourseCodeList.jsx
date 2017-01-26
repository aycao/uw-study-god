import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Panel} from 'react-bootstrap';

import CourseCodeGroup from './CourseCodeGroup';


class CourseCodeList extends Component{

  constructor(props){
    super(props);
    this.onCollapseChange = this.onCollapseChange.bind(this);
    this.state = {activeKey: ''}
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

  onCollapseChange(newActiveKey){
    this.setState({activeKey: newActiveKey});
  }

  makeCourseCodePanels(courseCodes, activeCourseCode){
    const courseCodeGroupesByInitial = _.groupBy(courseCodes, 'igroup');
    return _.map(courseCodeGroupesByInitial, (groupedCourseCodes, initial) => {
      return (
          <Panel header={<span><h4 className="panel-heading-clickable">{initial}</h4></span>}
                 key={initial}
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