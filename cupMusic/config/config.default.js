'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1533888665025_3593';

  // add your config here
  config.middleware = [];

  config.mysql = {
    client:{
      host:'127.0.0.1',
      port:'3306',
      user:'root',
      password:'123456',
      database:'learning'
    },
    app:true,
    agent:false
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
         mapping: {
             '.tpl': 'nunjucks',
         },
  }

  return config;
};
