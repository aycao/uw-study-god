import {combineReducers} from 'redux';

import CourseReducer from './reducer_courses';
import CourseCodeReducer from './reducer_course_codes';

const rootReducer = combineReducers({
  courses: CourseReducer,
  courseCodes: CourseCodeReducer,
});

export default rootReducer;