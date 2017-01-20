import React from 'react';

const CourseCodeListItem = (props) => {
  const courseCode = props.courseCode;
  return(
    <div className="panel panel-default">
      <div className="panel-body">
        <span><p><strong>{courseCode.description}</strong></p></span>
        {courseCode.subject} - <span className="label label-default">{courseCode.group}</span>
      </div>
    </div>
  );
};

export default CourseCodeListItem;