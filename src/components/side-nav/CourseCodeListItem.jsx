import React from 'react';
import {Panel} from 'react-bootstrap';

const CourseCodeListItem = (props) => {
  const courseCode = props.courseCode;
  return(
      <div className="course-code-list-item-container">
        <Panel>
          <div>
            <span><p><strong>{courseCode.description}</strong></p></span>
            {courseCode.subject} - <span className="label label-default">{courseCode.group}</span>
          </div>
        </Panel>
      </div>
  );
};

export default CourseCodeListItem;