import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Panel, Glyphicon} from 'react-bootstrap';

import CourseCodeGroup from './CourseCodeGroup';


class CourseCodeList extends Component{

  constructor(props){
    super(props);
    this.handleCourseCodePanelSelect = this.handleCourseCodePanelSelect.bind(this);
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
      const icon = <Glyphicon glyph={_.includes(this.state.expandedPanels, initial)? 'menu-down': 'menu-right'}/>;
      return (
          <Panel header={<div><div className="panel-heading-clickable">{icon} {initial}</div></div>}
                 key={initial}
                 eventKey={initial}
                 className="course-code-list-item"
                 collapsible
                 expanded={_.includes(this.state.expandedPanels, initial)}
                 onSelect={this.handleCourseCodePanelSelect}>
            <CourseCodeGroup courseCodes={groupedCourseCodes} activeCourseCode={activeCourseCode} />
          </Panel>
      )
    });
  }

  handleCourseCodePanelSelect(key){
    if(_.includes(this.state.expandedPanels, key)){
      const expandedPanels = this.state.expandedPanels;
      this.setState({expandedPanels: _.remove(expandedPanels, key)});
    }else {
      this.setState({expandedPanels: this.state.expandedPanels.concat(key)});
    }
  }

}



const mapStateToProps = (state) => {
  return {
    courseCodes: state.courseCodes,
  }
};

export default connect(mapStateToProps)(CourseCodeList);