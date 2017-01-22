import {combineReducers} from 'redux';

import CourseReducer from './reducer_courses';
import CourseCodeReducer from './reducer_course_codes';
import TermReducer from './reducer_termids';

const rootReducer = combineReducers({
  courses: CourseReducer,
  courseCodes: CourseCodeReducer,
  terms: TermReducer,
});

export default rootReducer;