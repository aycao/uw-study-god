import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactList from 'react-list';

import CourseCodeListItem from './CourseCodeListItem';


class CourseCodeList extends Component{
  constructor(props){
    super(props);
    this.renderCourseCodeItem = this.renderCourseCodeItem.bind(this);
  }
  render(){
    if(this.props.courseCodes.length <= 0){
      return <div>loading courses</div>;
    }
    return(
        <div className="course-code-list-container">
          <ReactList
              length={this.props.courseCodes.length}
              itemRenderer={this.renderCourseCodeItem}
              type="uniform">
          </ReactList>
        </div>
    );
  }

  renderCourseCodeItem(index, key){
    return( <CourseCodeListItem
        key={key}
        courseCode={this.props.courseCodes[index]}
    />)
  };

}



const mapStateToProps = (state) => {
  return {
    courseCodes: state.courseCodes.all,
  }
};

export default connect(mapStateToProps)(CourseCodeList);