import Constants from '../utils/Constants';
import _ from 'lodash';

const INITIAL_STATE = {all: [], activeTerm: null};

const TermReducer = (state_terms = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_TERMS:
      let all = [];
      let activeTerm = null;
      _.forOwn(action.payload.data.data.listings, (value, key) => {
        const terms = value.map((term) => {
          term = {...term, year: key};
          if(action.payload.data.data.current_term === term.id){
            activeTerm = term;
          }
          return term});
        all = [...all, terms];
      });
      return {...state_terms, all: all, activeTerm: activeTerm};
    case Constants.SET_ACTIVE_TERM:
      return {...state_terms, activeTerm: action.payload};
    default:
      return state_terms;
  }
};

export default TermReducer;