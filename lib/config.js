var config = {};

config.getHost = function() {
  if (this.getEnv() == 'DEV') {
    return "http://localhost:8000";

  } else if (this.getEnv() == 'TEST') {
    return "http://localhost:8000";  // TODO change-me

  } else {  // PROD
    return "http://localhost:8000";  // TODO change-me
  }
};

config.getApiHost = function() {
  return this.getHost() + '/api'
};

config.getEnv = function() {
  if (location.hostname.indexOf("local") > -1) {
    return "DEV";

  } else if (location.hostname.indexOf("testes") > -1) {
    return "TEST";

  } else {
    return "PROD";
  }
};

module.exports = config;
