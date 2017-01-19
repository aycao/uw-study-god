import axios from 'axios';

import Constants from '../utils/Constants';

export function fetchAllCoursesAC(){
  const request = axios.get();
  return {
    type: Constants.FETCH_ALL_COURSES,
    payload: request,
  }
}