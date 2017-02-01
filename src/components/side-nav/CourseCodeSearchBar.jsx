import React, {Component} from 'react';
import {connect} from 'react-redux';
import Fuse from 'fuse'

import {setCourseCodeFilterAC} from '../../actions';

class CourseCodeSearchBar extends Component{
  constructor(props){
    super(props);
    this.handleSearchBarInput = this.handleSearchBarInput.bind(this);
  }

  render(){
    return (
        <div className="course-code-search-bar-container">
          <input type="text"
                 value={this.props.courseCodeFilter.subject || ''}
                 onInput={this.handleSearchBarInput}/>
        </div>
    );
  }

  handleSearchBarInput(evt){
    this.props.setCourseFilter({subject: evt.target.value.toUpperCase()});
  }
}

const mapStateToProps = (state) => {
  return {
    courseCodeFilter: state.courseCodes.filter,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCourseFilter: (filter) => {
      dispatch(setCourseCodeFilterAC(filter))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCodeSearchBar);