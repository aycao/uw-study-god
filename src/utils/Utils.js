import axios from 'axios';
import Constants from './Constants';

const Utils = {
  makeUWApiPromise: function(route){
    return axios.get(`${Constants.API_BASE_URL}${route}${Constants.API_RESPONSE_FORMAT}?key=${Constants.API_KEY}`);
  },
};

export default Utils;

