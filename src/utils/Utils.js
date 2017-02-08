import axios from 'axios';
import Constants from './Constants';

const Utils = {
  makeUWApiPromise: (route) => {
    return axios.get(`${Constants.API_BASE_URL}${route}${Constants.API_RESPONSE_FORMAT}?key=${Constants.API_KEY}`);
  },
  parseUWWeekDays: (weekdaysString) => {
    let weekdays = [];
    if(weekdaysString.includes('M')){
      weekdays.push('monday');
      weekdaysString = weekdaysString.replace(/M/g, '');
    }
    if(weekdaysString.includes('W')){
      weekdays.push('wednesday');
      weekdaysString = weekdaysString.replace(/W/g, '');
    }
    if(weekdaysString.includes('F')){
      weekdays.push('friday');
      weekdaysString = weekdaysString.replace(/F/g, '');
    }
    if(weekdaysString.includes('Th')){
      weekdays.push('thursday');
      weekdaysString = weekdaysString.replace(/Th/g, '');
    }
    if(weekdaysString.includes('T')){
      weekdays.push('tuesday');
    }
    return weekdays;
  },
  getEmptyWeek: () => {
    return {monday:[], tuesday: [], wednesday:[], thursday: [], friday: []};
  },
  getYearFromTermId: (termId) => {
    const term = termId.toString();
    if (term.length !== 4) return 0;
    return parseInt(`20${term.slice(1,3)}`, 10);
  },

};

export default Utils;

