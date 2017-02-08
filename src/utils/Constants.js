const Constants = {

  // CONSTANTS

  FETCHING: 'FETCHING',
  FETCHED: 'FETCHED',
  NOTFETCHED: 'NOTFETCHED',


  // API

  API_KEY: '5e007b8dee8dad9d815b1c73030b3bb0', // Please do NOT abuse my api key.
  API_RESPONSE_FORMAT: '.json',
  API_BASE_URL: 'https://api.uwaterloo.ca/v2',
  API_COURSE_BASE_ROUTE: '/courses',
  API_COURSE_CODE_BASE_ROUTE: '/codes/subjects',
  API_TERM_LIST_BASE_ROUTE: '/terms/list',
  API_TERM_BASE_ROUTE: '/terms',
  API_CONSTANT_SCHEDULE: 'schedule',

  // ACTION TYPES

  SET_COURSE_STATUS: 'SET_COURSE_STATUS',
  FETCH_ALL_COURSES: 'FETCH_ALL_COURSES',
  FETCH_SELECTED_COURSES: 'FETCH_SELECTED_COURSES',
  FETCH_OFFERING_COURSES: 'FETCH_OFFERING_COURSES',
  CLEAR_COURSE_DETAILS: 'CLEAR_COURSE_DETAILS',
  FETCH_COURSE_BASIC_INFO: 'FETCH_COURSE_BASIC_INFO',
  FETCH_COURSE_SCHEDULE: 'FETCH_COURSE_SCHEDULE',

  SET_COURSE_CODE_STATUS: 'FETCH_COURSE_CODE_STATUS',
  FETCH_ALL_COURSE_CODES: 'FETCH_ALL_COURSE_CODES',
  SET_ACTIVE_COURSE_CODE: 'SET_ACTIVE_COURSE_CODE',
  SET_COURSE_CODE_FILTER: 'SET_COURSE_CODE_FILTER',
  SET_FILTERED_COURSE_CODES: 'SET_FILTERED_COURSE_CODES',

  SET_TERM_STATUS: 'SET_TERM_STATUS',
  FETCH_ALL_TERMS: 'FETCH_ALL_TERMS',
  SET_ACTIVE_TERM: 'SET_ACTIVE_TERM',
};

export default Constants;
