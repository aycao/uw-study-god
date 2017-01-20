import Utils from '../utils/Utils';
import Constants from '../utils/Constants';


export function fetchAllCoursesAC(){
  const request = Utils.makeCourseApiPromise(Constants.API_COURSE_BASE_ROUTE);
  return {
    type: Constants.FETCH_ALL_COURSES,
    payload: request,
  }
}