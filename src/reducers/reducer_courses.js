import _ from 'lodash';

import Constants from '../utils/Constants';


const INITIAL_STATE = {
  all: [],
  selectedCourses: [],
  offeringCourses: [],
  coursesWithDetails: {},
};

const CourseReducer = (state_courses = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_COURSES: {
      return {...state_courses, all: action.payload.data.data};
    }
    case Constants.FETCH_OFFERING_COURSES: {
      return {...state_courses, offeringCourses: action.payload.data.data};
    }
    case Constants.FETCH_SELECTED_COURSES: {
      let offeringCatalogNumbers = [];
      if (state_courses.offeringCourses.length > 0) {
        offeringCatalogNumbers = _.map(_.filter(state_courses.offeringCourses, {subject: action.courseCode}), 'catalog_number');
      }
      const courses = _.forEach(action.payload.data.data, (course) => {

        _.assign(course, {
          level: `${_.head(course.catalog_number)}00`,
          offering: _.includes(offeringCatalogNumbers, course.catalog_number),
          courseName: `${course.subject}-${course.catalog_number}`,
        });
      });
      return {...state_courses, selectedCourses: courses};
    }
    case Constants.FETCH_COURSE_BASIC_INFO: {
      const course = action.payload.data.data;
      const courseName = `${course.subject}-${course.catalog_number}`;
      let activeCourses = state_courses.coursesWithDetails;
      activeCourses[courseName] = course;
      return {...state_courses, coursesWithDetails: activeCourses};
    }
    case Constants.FETCH_COURSE_SCHEDULE: {
      const schedule = action.payload.data.data;
      const courseName = `${action.subject}-${action.cataNum}`;
      let activeCourses = state_courses.coursesWithDetails;
      if (state_courses.coursesWithDetails[courseName]) {
        activeCourses[courseName].schedule = schedule;
      } else {
        activeCourses[courseName] = {};
        activeCourses[courseName].schedule = schedule;
      }
      return {...state_courses, coursesWithDetails: activeCourses};
    }
    case Constants.CLEAR_COURSE_DETAILS: {
      return {...state_courses, coursesWithDetails: {}}
    }
    default:
      return state_courses;
  }
};

export default CourseReducer;
