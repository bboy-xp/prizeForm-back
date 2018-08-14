'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534061204838_6768';

  // add your config here
  config.middleware = [];

  exports.mongoose = {
    url: 'mongodb://127.0.0.1/prize-form-back',
    options: {}
  };

  config.security = {
    csrf: {
      enable: false,
    },
  }

  return config;
};
