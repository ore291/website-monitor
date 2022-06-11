const axios = require("axios");
const connect = require('./connect')


const URL_TO_CHECK = "https://solaceradfrontendstg.herokuapp.com/";



axios.interceptors.request.use(
    function (config) {
      config.metadata = { startTime: new Date() };
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    function (response) {
      response.config.metadata.endTime = new Date();
      response.duration =
        response.config.metadata.endTime - response.config.metadata.startTime;
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  let visit = {};

  
  axios
    .get(URL_TO_CHECK)
    .then((response) => {
      visit = {
        timestamp: new Date(),
        responseDuration: response.duration,
        successful: true,
      };
    })
    .catch((error) => {
      visit = {
        timestamp: new Date(),
        successful: false,
      };
      console.log(error);
      // uncomment the next line for the error message to your mail
      // reportError(error);  
    })
    .then(async function () {
      // always executed
      try {
        const { timestamp, successful, responseDuration } = visit
        connect.insert(timestamp, successful, responseDuration);
    
      } catch (error) {
        console.log(error);
      }

    });
  