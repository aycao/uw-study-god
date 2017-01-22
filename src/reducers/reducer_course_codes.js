import Constants from '../utils/Constants';

const INITIAL_STATE = {all: [], activeCourseCode: 'ECE'};

const CourseCodeReducer = (state_courseCodes = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_COURSE_CODES:
      return {...state_courseCodes, all: action.payload.data.data};
    default:
      return state_courseCodes;
  }
};

export default CourseCodeReducer;