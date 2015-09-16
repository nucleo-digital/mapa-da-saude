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

config.getMapboxToken = function() {
  if (this.getEnv() == 'DEV') {  // CHANGE-ME
    return 'pk.eyJ1IjoiYW5kZXJzb25jYXJkb3NvIiwiYSI6ImZlM' +
           'zY1ZmUxMDBjZTZmMGI3ZDQ4MmRhOWFlZjdjMzQ5In0.Z' +
           'ABI2r0BxiN4sdntoU385Q';

  } else if (this.getEnv() == 'TEST') {
    return "";  // TODO change-me

  } else {  // PROD
    return "";  // TODO change-me
  }
}

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
