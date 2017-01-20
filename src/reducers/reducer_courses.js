import Constants from '../utils/Constants';

const INITIAL_STATE = {all: [], activeCourse: null};

const reduceCourses = (state_courses = INITIAL_STATE, action) => {
  switch(action.type){
    case Constants.FETCH_ALL_COURSES:
      return {...state_courses, all: action.payload};
    default:
      return state_courses;
  }
};

export default reduceCourses;
