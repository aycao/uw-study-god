import Constants from '../utils/Constants';
import _ from 'lodash';

const INITIAL_STATE = {all: [], currentTerm: null, activeTerm: null};

const TermReducer = (state_terms = INITIAL_STATE, action) => {
  switch (action.type){
    case Constants.FETCH_ALL_TERMS:
      const years = action.payload.data.data.listings;
      let allTerms = [];
      _.forOwn(years, (yearObj, yearNum) => {
        _.forEach(yearObj, (term) => {
          allTerms.push({...term, year: yearNum})
        });
      });
      return {...state_terms, all: allTerms, currentTerm: action.payload.data.data.current_term};
    case Constants.SET_ACTIVE_TERM:
      console.log('active term: ', action.payload);
      return {...state_terms, activeTerm: action.payload};
    default:
      return state_terms;
  }
};

export default TermReducer;