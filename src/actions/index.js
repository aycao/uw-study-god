import Utils from '../utils/Utils';
import Constants from '../utils/Constants';


// Courses

export function fetchAllCoursesAC(){
  const request = Utils.makeCourseApiPromise(Constants.API_COURSE_BASE_ROUTE);
  return {
    type: Constants.FETCH_ALL_COURSES,
    payload: request,
  }
}

export function fetchAllCourseCodesAC(){
  const request = Utils.makeCourseApiPromise(Constants.API_COURSE_CODE_BASE_ROUTE);
  return {
    type: Constants.FETCH_ALL_COURSE_CODES,
    payload: request,
  }
}

export function setActiveCourseCodeAC(courseCode){
  return {
    type: Constants.SET_ACTIVE_COURSE_CODE,
    payload: courseCode,
  }
}


// Terms

export function fetchAllTermsAC(){
  const request = Utils.makeCourseApiPromise(Constants.API_TERM_LIST_BASE_ROUTE);
  return {
    type: Constants.FETCH_ALL_TERMS,
    payload: request,
  }
}

export function setActiveTermAC(term){
  return {
    type: Constants.SET_ACTIVE_TERM,
    payload: term,
  }
}
