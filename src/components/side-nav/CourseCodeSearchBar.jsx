import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Glyphicon} from 'react-bootstrap';
import Fuse from 'fuse.js'

import {setCourseCodeFilterAC, setFilteredCourseCodesAC} from '../../actions';

class CourseCodeSearchBar extends Component{
  constructor(props){
    super(props);
    this.handleSearchBarInput = this.handleSearchBarInput.bind(this);
  }

  render(){
    return (
        <div className="course-code-search-bar-container">
            <Glyphicon glyph="search"/>
            <input type="text"
                   className="course-code-search-input"
                   placeholder="Search"
                   value={this.props.courseCodes.filter.subject || ''}
                   onInput={this.handleSearchBarInput}/>
        </div>
    );
  }

  handleSearchBarInput(evt){
    if(!this.fuse){
      if(!this.props.courseCodes.all){
        return;
      }
      const options = {
        keys: ['subject', 'description'],
        shouldSort: false,
        threshold: 0.4
      };
      this.fuse = new Fuse(this.props.courseCodes.all,options);
    }
    const fuseResult = this.fuse.search(evt.target.value);
    if(_.isEmpty(fuseResult)){
      this.props.setFilteredCourseCodes(this.props.courseCodes.all);
    }else{
      this.props.setFilteredCourseCodes(fuseResult);
    }
    this.props.setCourseFilter({subject: evt.target.value});
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
      dispatch(setFilteredCourseCodesAC(courseCodes))
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseCodeSearchBar);