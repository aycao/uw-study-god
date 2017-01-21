import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {Col, Tabs, Tab} from 'react-bootstrap';


class DetailPanel extends Component{

  constructor(props){
    super(props);
    this.state = {activeCourseLevel: 0,};
    this.handleSelectCourseLevel = this.handleSelectCourseLevel.bind(this);
  }

  render(){
    return(
      <Col md={8} className="detail-panel-container">
        <div className="level-tabs-container">
          <Tabs
              activeKey={this.state.activeCourseLevel}
              onSelect={this.handleSelectCourseLevel}
              id="course-level-tabs">
            {this.makeLevelTabs([100,200,400])}
          </Tabs>
        </div>
      </Col>
    );
  }

  handleSelectCourseLevel(key){
    this.setState({activeCourseLevel: key});
  }

  makeLevelTabs(offeringLevels) {
    const allLevels = [100, 200, 300, 400];
    let levelTabs = allLevels.map((level) => {
      let props = {
        key: level,
        eventKey: level,
        title: level,
      };
      if(!_.includes(offeringLevels, level)){
        props = {...props, disabled: true}
      }
      return (
          <Tab {...props}>
              My level is {level}
          </Tab>);
    });
    levelTabs = [<Tab key={0} eventKey={0} title="All">All</Tab>, ...levelTabs];
    return levelTabs;
  }

}


const mapStateToProps = (state) => {
  return {
    activeCourse: state.courses.activeCourse,
  }
};

export default connect(mapStateToProps)(DetailPanel);