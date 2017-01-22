import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from "lodash";
import {Col, Row, Tab, Nav, NavItem} from 'react-bootstrap';


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
          <Nav bsStyle="tabs"
               activeKey={this.state.activeCourseLevel}
               onSelect={this.handleSelectCourseLevel}
               id="course-level-tabs">
            {this.makeLevelNavItems()}
          </Nav>
        </div>
        <div className="level-tab-content-container">

        </div>
      </Col>
    );
  }

  handleSelectCourseLevel(key){
    this.setState({activeCourseLevel: key});
  }

  makeLevelNavItems() {
    const allLevels = [100, 200, 300, 400];
    let navTabItems = allLevels.map((level) => {
      return (
          <NavItem key={level} eventKey={level}>
            {level}
          </NavItem>);
    });
    navTabItems = [<NavItem key={0} eventKey={0} title="All">All</NavItem>, ...navTabItems];
    return navTabItems;
  }

  makeLevelTabContents(){
    const allLevels = [100, 200, 300, 400];
    let tabContents = allLevels.map((level) => {
      return (
          <Tab.Pane key={level} eventKey={level}>
            My level is {level}
          </Tab.Pane>);
    });
    tabContents = [<Tab.Pane key={0} eventKey={0} title="All">All</Tab.Pane>, ...tabContents];
    return tabContents;
  }
}


const mapStateToProps = (state) => {
  return {
    activeCourse: state.courses.activeCourse,
  }
};

export default connect(mapStateToProps)(DetailPanel);