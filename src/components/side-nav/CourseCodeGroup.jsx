import React from 'react';
import _ from 'lodash';
import {Panel, ListGroup, ListGroupItem, Label} from 'react-bootstrap';

const makeCourseCodeListGroupItems = (courseCodes) => {
  return (
      _.map(courseCodes, (courseCode) => {
        return (
            <ListGroupItem header={courseCode.subject} >
              <span>{courseCode.description} <Label>{courseCode.group}</Label></span>
            </ListGroupItem>)
      })
  );
};

const CourseCodeGroup = (props) => {
  const courseCodes = props.courseCodes;
  return(
      <ListGroup>
        {makeCourseCodeListGroupItems(courseCodes)}
      </ListGroup>
  );
};



export default CourseCodeGroup;