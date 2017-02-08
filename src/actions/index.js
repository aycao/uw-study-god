import Utils from '../utils/Utils';
import Constants from '../utils/Constants';
import axios from 'axios';


// Courses

export function fetchAllCoursesAC(){
  const request = Utils.makeUWApiPromise(Constants.API_COURSE_BASE_ROUTE);
  return (dispatch) => {
    dispatch({
      type: Constants.SET_COURSE_STATUS,
      payload: Constants.FETCHING,
    });
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_ALL_COURSES,
        payload: data,
      });
      dispatch({
        type: Constants.SET_COURSE_STATUS,
        payload: Constants.FETCHED,
      });
    }).catch((err) => {
      dispatch({
        type: Constants.SET_COURSE_STATUS,
        payload: Constants.NOTFETCHED,
      })
    })
  }
}

export function fetchSelectedCoursesAC(courseCodeSubject){
  const request = Utils.makeUWApiPromise(`${Constants.API_COURSE_BASE_ROUTE}/${courseCodeSubject}`);
  return (dispatch) => {
    dispatch({
      type: Constants.SET_COURSE_STATUS,
      payload: Constants.FETCHING,
    });
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_SELECTED_COURSES,
        payload: data,
        courseCode: courseCodeSubject,
      });
      dispatch({
        type: Constants.SET_COURSE_STATUS,
        payload: Constants.FETCHED,
      });
    }).catch((err) => {
      dispatch({
        type: Constants.SET_COURSE_STATUS,
        payload: Constants.NOTFETCHED,
      })
    });
  }
}

export function fetchCourseDetailAC(subject, cataNum, term){
  const requestBasicInfo = Utils.makeUWApiPromise(`${Constants.API_COURSE_BASE_ROUTE}/${subject}/${cataNum}`);
  const requestSchedule = Utils.makeUWApiPromise(`${Constants.API_TERM_BASE_ROUTE}/${term}/${subject}/${cataNum}/${Constants.API_CONSTANT_SCHEDULE}`)
  return (dispatch) => {
    dispatch({
      type: Constants.SET_COURSE_STATUS,
      payload: Constants.FETCHING,
    })
    axios.all([requestBasicInfo, requestSchedule]).then(
      axios.spread((basicInfo, scheduleInfo) => {
        dispatch({
          type: Constants.FETCH_COURSE_BASIC_INFO,
          payload: basicInfo,
        });
        dispatch({
          type: Constants.FETCH_COURSE_SCHEDULE,
          payload: scheduleInfo,
          subject: subject,
          cataNum: cataNum,
        });
        dispatch({
          type: Constants.SET_COURSE_STATUS,
          payload: Constants.FETCHED,
        });
      });
    ).catch((err) => {
      dispatch({
        type: Constants.SET_COURSE_STATUS,
        payload: Constants.NOTFETCHED,
      })
    });
  }
}

export function fetchAllCourseCodesAC(){
  const request = Utils.makeUWApiPromise(Constants.API_COURSE_CODE_BASE_ROUTE);
  return (dispatch) => {
    dispatch({
      type: Constants.SET_COURSE_CODE_STATUS,
      payload: Constants.FETCHING,
    });
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_ALL_COURSE_CODES,
        payload: data,
      });
      dispatch({
        type: Constants.SET_COURSE_CODE_STATUS,
        payload: Constants.FETCHED,
      });
    }).catch((err) => {
      dispatch({
        type: Constants.SET_COURSE_CODE_STATUS,
        payload: Constants.NOTFETCHED,
      })
    })
  }
}

export function fetchOfferingCoursesAC(termId){
  const request = Utils.makeUWApiPromise(`${Constants.API_TERM_BASE_ROUTE}/${termId}${Constants.API_COURSE_BASE_ROUTE}`);
  return (dispatch) => {
    dispatch({
      type: Constants.SET_COURSE_STATUS,
      payload: Constants.FETCHING,
    });
    request.then((data) =>{
      dispatch({
        type: Constants.FETCH_OFFERING_COURSES,
        payload: data,
      });
      dispatch({
        type: Constants.SET_COURSE_STATUS,
        payload: Constants.FETCHED,
      })
    }).catch((err) => {
      dispatch({
        type: Constants.SET_COURSE_STATUS,
        payload: Constants.NOTFETCHED,
      })
    })
  }
}

export function setActiveCourseCodeAC(courseCode){
  return {
    type: Constants.SET_ACTIVE_COURSE_CODE,
    payload: courseCode,
  }
}

export function setCourseCodeFilterAC(filter){
  return {
    type: Constants.SET_COURSE_CODE_FILTER,
    payload: filter,
  }
}

export function setFilteredCourseCodesAC(courseCodes){
  return {
    type: Constants.SET_FILTERED_COURSE_CODES,
    payload: courseCodes,
  }
}

export function clearCourseDetailsAC(){
  return {
    type: Constants.CLEAR_COURSE_DETAILS,
    payload: null,
  }
}


// Terms

export function fetchAllTermsAC(){
  const request = Utils.makeUWApiPromise(Constants.API_TERM_LIST_BASE_ROUTE);
  return (dispatch) => {
    dispatch({
      type: Constants.SET_TERM_STATUS,
      payload: Constants.FETCHING,
    })
    request.then((data) => {
      dispatch({
        type: Constants.FETCH_ALL_TERMS,
        payload: data,
      });
      dispatch(setActiveTermAC(data.data.data.current_term));
      dispatch({
        type: Constants.SET_TERM_STATUS,
        payload: Constants.FETCHED,
      })
    }).catch((err) => {
      dispatch({
        type: Constants.SET_TERM_STATUS,
        payload: Constants.NOTFETCHED,
      })
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
