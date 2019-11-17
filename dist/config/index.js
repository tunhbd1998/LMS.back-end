"use strict";

module.exports = {
  DATABASE: {
    HOST: 'remotemysql.com',
    USER: 'SvRVvOOHHg',
    PASS: '0yMRBf1BeN',
    DB_NAME: 'SvRVvOOHHg',
    TYPE: 'mysql'
  },
  PASSPORT: {
    JWT: {
      SECRET: 'VTP3-2019'
    }
  },
  BCRYPT: {
    SALT_ROUNDS: 10
  },
  USER_ROLES: ['MEMBER', 'LAB_ADMIN', 'LAB_MEMBER', 'ADMIN']
};