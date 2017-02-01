import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Fuse from 'fuse.js'

import {setCourseCodeFilterAC} from '../../actions';

class CourseCodeSearchBar extends Component{
  constructor(props){
    super(props);
    this.handleSearchBarInput = this.handleSearchBarInput.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(!this.fuse && !_.isEmpty(nextProps.courseCodes.all)){
      const options = {
        keys: ["subject", "title"],
      };
      this.fuse = new Fuse(nextProps.courseCodes.all, options);
    }
  }

  render(){
    return (
        <div className="course-code-search-bar-container">
          <input type="text"
                 value={this.props.courseCodes.filter.subject || ''}
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
    courseCodes: state.courseCodes,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCourseFilter: (filter) => {
      dispatch(setCourseCodeFilterAC(filter))
    },
    setFilteredCourseCodes: (courseCodes) => {
      dispatch(setCourseCodeFilterAC(courseCodes))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCodeSearchBar);