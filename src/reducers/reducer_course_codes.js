import Constants from '../utils/Constants';

const INITIAL_STATE = {all: [], activeCourseCode: ''};

const CourseCodeReducer = (state_courseCodes = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_COURSE_CODES:
      return {...state_courseCodes, all: action.payload.data.data};
    case Constants.SET_ACTIVE_COURSE_CODE:
      return {...state_courseCodes, activeCourseCode: action.payload};
    default:
      return state_courseCodes;
  }
};

export default CourseCodeReducer;