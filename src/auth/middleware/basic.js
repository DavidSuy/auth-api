'use strict';

const base64 = require('base-64');
const { users } = require('../../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return _authError();
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [user, pass] = base64.decode(basic).split(':');

  console.log(user, pass);
  console.log(users);
  try {
    // req.user = await users.authenticateBasic(user, pass);
    req.user = await users.authenticateBasic(user, pass);
    next();
  } catch (e) {
    console.log(e);
    _authError();
  }

  function _authError() {
    res.status(403).send('Invalid Login');
  }
};
