module.exports = {
  DATABASE: {
    HOST: 'remotemysql.com',
    USER: 'SvRVvOOHHg',
    PASS: '0yMRBf1BeN',
    DB_NAME: 'SvRVvOOHHg',
    TYPE: 'mysql'
  },
  TEST_DATABASE: {
    HOST: 'localhost',
    USER: 'tunh',
    PASS: 'NHT13101997',
    DB_NAME: 'lms',
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
  USER_ROLES: ['MEMBER', 'LAB_ADMIN', 'LAB_MEMBER', 'ADMIN'],
  USER_ROLE_ID: {
    MEMBER: 0,
    LAB_ADMIN: 1,
    LAB_MEMBER: 2,
    ADMIN: 3
  },
  FETCH_DATA: {
    PAGE_SIZE: {
      RECRUITMENT: 10,
      LAB: 10,
      PROJECT: 10,
      ACTIVITY: 10
    }
  }
};
