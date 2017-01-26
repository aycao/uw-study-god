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
      let offeringCatalogNumbers = [];
      if(state_courses.offeringCourses.length > 0){
        offeringCatalogNumbers = _.map(_.filter(state_courses.offeringCourses, {subject: action.courseCode}), 'catalog_number');
      }
      const courses = _.forEach(action.payload.data.data,(course) => {
        
        _.assign(course, {
          level: `${_.head(course.catalog_number)}00`,
          offering: _.includes(offeringCatalogNumbers, course.catalog_number)
        });
      });
      return {...state_courses, selectedCourses: courses};
    default:
      return state_courses;
  }
};

export default CourseReducer;
