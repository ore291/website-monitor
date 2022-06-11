"use strict";
const cron = require("node-cron");
const express = require("express");
const app = express();
const axios = require("axios");
var request = require('request');
const connect = require('./connect')



const URL_TO_CHECK = "https://solaceradfrontendstg.herokuapp.com/";

// mailing
// add your mailgun configuration here and uncomment reportError function in /test route error block for sending mails

const mailgun = require("mailgun-js");
const DOMAIN = "sandboxXXX.mailgun.org";
const mg = mailgun({ apiKey: "YOUR_API_KEY", domain: DOMAIN });


// add your email address here for the email sending
const reportError = (error) => {
  const data = {
    from: "",
    to: "",
    subject: `${URL_TO_CHECK} is down!`,
    text: `Please check what's wrong with your server \n${error}`,
  };
  mg.messages().send(data, function (error, body) {
    console.log(body);
  });
};

// cron job tasks : this is what keeps checking the route every 10 mins
cron.schedule('*/10 * * * *', () => {
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

      console.log(`site checked at ${visit.timestamp} and site status is ${visit.successful === true ? "live" : "offline"}`);
    })
    .catch((error) => {
      visit = {
        timestamp: new Date(),
        successful: false,
        responseDuration: response.duration,
      };
      console.log(error.message);
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
  
})



app.get("/", async (req, res, next) => {
  try {
    // const entities = await getVisits();
    
    const visits = await connect.getAll(); 
  
   
    const visitsLog = visits.map(
      (entity) => `Time: ${entity.timestamp}, Response Time: ${entity.responseDuration}ms, Successful: ${entity.successful === 1 ? true : false}`
    );
    res
      .status(200)
      .set("Content-Type", "text/plain")
      .send(`Last 100 checks:\n${visitsLog.join('\n')}`)
      .end();
  } catch (error) {
    next(error);
  }
});

app.get("/test", async (req, response, next) => {
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
      // console.log(response);
    })
    .catch((error) => {
      visit = {
        timestamp: new Date(),
        successful: false,
        responseDuration: response.duration,
      };
      // console.log(response);
      // uncomment the next line for the error message to your mail
      // reportError(error);  
    })
    .then(async function () {
      // always executed
      try {
        // const { data, error } = await supabase.from("visits").insert([visit]);
        const { timestamp, successful, responseDuration } = visit
        connect.insert(timestamp, successful, responseDuration)
      
      } catch (error) {
        next(error);
      }

      response.status(200).send(visit).end();
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
