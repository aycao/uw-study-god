import _ from 'lodash';

import Constants from '../utils/Constants';


const INITIAL_STATE = {
  all: [],
  selectedCourses: [],
  offeringCourses: [],
  activeCourse: null,
};

const CourseReducer = (state_courses = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_COURSES:
      return {...state_courses, all: action.payload.data.data};
    case Constants.FETCH_OFFERING_COURSES:
      return {...state_courses, offeringCourses: action.payload.data.data};
    case Constants.FETCH_SELECTED_COURSES:
      const courses = _.forEach(action.payload.data.data,(value) => {
        _.assign(value, {level: `${_.head(value.catalog_number)}00`})
      });
      console.log(courses);
      return {...state_courses, selectedCourses: courses};
    default:
      return state_courses;
  }
};

export default CourseReducer;
