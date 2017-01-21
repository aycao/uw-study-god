import UwaterlooApi from 'uwaterloo-api';
import Constants from './Constants';

const uwaterlooApi = new UwaterlooApi({
  API_KEY: Constants.API_KEY,
});

export default uwaterlooApi;
