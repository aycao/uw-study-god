import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Collapse, {Panel} from 'rc-collapse';
import 'rc-collapse/assets/index.css';

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
        <Collapse
            accordion={false}
            activeKey={this.state.activeKey}
            onChange={this.onCollapseChange}
            className="course-code-collapse">
          {this.makeCourseCodePanels(this.props.courseCodes.all, this.props.courseCodes.activeCourseCode)}
        </Collapse>
    );
  }

  onCollapseChange(newActiveKey){
    this.setState({activeKey: newActiveKey});
  }

  makeCourseCodePanels(courseCodes, activeCourseCode){
    const courseCodeGroupesByInitial = _.groupBy(courseCodes, 'igroup');
    return _.map(courseCodeGroupesByInitial, (value, key) => {
      return (
          <Panel header={key} key={key}>
            <CourseCodeGroup courseCodes={value} activeCourseCode={activeCourseCode}  />
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