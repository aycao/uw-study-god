import Constants from '../utils/Constants';
import _ from 'lodash';

const INITIAL_STATE = {all: [], activeCourseCode: '', filter: {}};

const CourseCodeReducer = (state_courseCodes = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_COURSE_CODES: {
      const courseCodes = _.forEach(action.payload.data.data, (value) => {
        _.assign(value, {igroup: _.head(value.subject)});
      });
      return {...state_courseCodes, all: courseCodes};
    }
    case Constants.SET_ACTIVE_COURSE_CODE: {
      return {...state_courseCodes, activeCourseCode: action.payload};
    }
    case Constants.SET_COURSE_CODE_FILTER: {
      let filter = action.payload;
      filter = _.omitBy(filter, _.isNil);
      filter = _.omitBy(filter, _.isEmpty);
      return {...state_courseCodes, filter: filter}
    }
    default: {
      return state_courseCodes;
    }
  }
};

export default CourseCodeReducer;