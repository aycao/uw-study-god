import {combineReducers} from 'redux';

import CourseReducer from './reducer_courses';

const rootReducer = combineReducers({
  courses: CourseReducer,
});

export default rootReducer;