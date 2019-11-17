"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserModel = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getUserModel = conn => {
  return conn.define('user', {
    username: {
      type: _sequelize.default.STRING,
      primaryKey: true
    },
    password: {
      type: _sequelize.default.STRING
    },
    avatarImage: {
      type: _sequelize.default.STRING,
      defaultValue: null
    },
    fullname: {
      type: _sequelize.default.TEXT,
      defaultValue: null
    },
    phone: {
      type: _sequelize.default.STRING,
      defaultValue: null
    },
    email: {
      type: _sequelize.default.STRING,
      defaultValue: null
    },
    IDCardNumber: {
      type: _sequelize.default.STRING,
      defaultValue: null
    },
    university: {
      type: _sequelize.default.TEXT,
      defaultValue: null
    },
    IDNumber: {
      type: _sequelize.default.STRING,
      defaultValue: null
    },
    role: {
      type: _sequelize.default.TINYINT,
      defaultValue: 0
    },
    isTeacher: {
      type: _sequelize.default.BOOLEAN,
      defaultValue: false
    },
    // labId: {
    //   type: Sequelize.UUID,
    //   defaultValue: null,
    //   references: {
    //     model: getLabModel(conn),
    //     key: 'id'
    //   }
    // },
    isAccepted: {
      type: _sequelize.default.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'user',
    timestamps: false
  });
};

exports.getUserModel = getUserModel;