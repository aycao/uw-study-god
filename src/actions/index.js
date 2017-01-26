import Utils from '../utils/Utils';
import Constants from '../utils/Constants';


// Courses

export function fetchAllCoursesAC(){
  const request = Utils.makeCourseApiPromise(Constants.API_COURSE_BASE_ROUTE);
  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_ALL_COURSES,
        payload: data,
      })
    })
  }
}

export function fetchSelectedCoursesAC(courseCodeSubject){
  const request = Utils.makeCourseApiPromise(`${Constants.API_COURSE_BASE_ROUTE}/${courseCodeSubject}`);
  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_SELECTED_COURSES,
        payload: data,
        courseCode: courseCodeSubject,
      })
    })
  }
}

export function fetchAllCourseCodesAC(){
  const request = Utils.makeCourseApiPromise(Constants.API_COURSE_CODE_BASE_ROUTE);
  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_ALL_COURSE_CODES,
        payload: data,
      });
    });
  }
}

export function fetchOfferingCoursesAC(termId){
  const request = Utils.makeCourseApiPromise(`${Constants.API_TERM_BASE_ROUTE}/${termId}${Constants.API_COURSE_BASE_ROUTE}`);
  return (dispatch) => {
    request.then((data) =>{
      dispatch({
        type: Constants.FETCH_OFFERING_COURSES,
        payload: data,
      });
    });
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
  return (dispatch) => {
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_ALL_TERMS,
        payload: data,
      });
      dispatch(setActiveTermAC(data.data.data.current_term));
    });
  }
}

export function setActiveTermAC(term){
  return (dispatch) => {
    dispatch({
      type: Constants.SET_ACTIVE_TERM,
      payload: term,
    });
    dispatch(fetchOfferingCoursesAC(term));
  }
}
