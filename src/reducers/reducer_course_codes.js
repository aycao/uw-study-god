import Constants from '../utils/Constants';
import _ from 'lodash';

const INITIAL_STATE = {all: [], activeCourseCode: ''};

const CourseCodeReducer = (state_courseCodes = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_COURSE_CODES:
      const courseCodes = _.forEach(action.payload.data.data, (value) => {
        _.assign(value, {igroup: _.head(value.subject)});
      });
      return {...state_courseCodes, all: courseCodes};
    case Constants.SET_ACTIVE_COURSE_CODE:
      return {...state_courseCodes, activeCourseCode: action.payload};
    default:
      return state_courseCodes;
  }
};

export default CourseCodeReducer;