import React, {Component} from 'react';
import {connect} from 'react-redux';

class DetailPanel extends Component{
  render(){
    return(
      <div className="col-md-8">
        This is detail panel
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCourse: state.courses.activeCourse,
  }
};

export default connect(mapStateToProps)(DetailPanel);