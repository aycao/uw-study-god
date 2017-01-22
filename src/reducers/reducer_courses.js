import Constants from '../utils/Constants';

const INITIAL_STATE = {all: [], activeCourse: null};

const CourseReducer = (state_courses = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_COURSES:
      return {...state_courses, all: action.payload.data.data};
    default:
      return state_courses;
  }
};

export default CourseReducer;
