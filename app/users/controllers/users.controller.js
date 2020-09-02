const crypto = require('crypto');
const User = require('../models/users.model');
const Util = require('../../../common/util/error.handler');

exports.insert = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
    req.body.password = `${salt}$${hash}`;
    req.body.permissionLevel = 1;
    const user = await new User(req.body).save();
    if (!user) {
      throw new Error('failed to save');
    }
    res.status(200).send({ user });
  } catch (error) {
    Util.errorHandler(res, error);
  }
};

exports.list = async (req, res) => {
  try {
    const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
      if (req.query.page) {
        req.query.page = parseInt(req.query.page);
        page = Number.isInteger(req.query.page) ? req.query.page : 0;
      }
    }

    const users = await User.paginate(req.query, { page, limit }).populate();
    res.status(200).send(users);
  } catch (error) {
    Util.errorHandler(res, error);
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new Error('user not found');
    }
  } catch (error) {
    Util.errorHandler(res, error);
  }
};

exports.patchById = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = crypto.randomBytes(16).toString('base64');
      const hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');
      req.body.password = `${salt}$${hash}`;
    }

    const user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true });
    if (!user) {
      throw new Error('No user matching user found');
    }
    res.status(200).send({ user });
  } catch (error) {
    Util.errorHandler(res, error);
  }
};

exports.removeById = async (req, res) => {
  try {
    const result = await User.remove({ _id: req.params.userId });
    res.status(200).send({ result });
  } catch (error) {
    Util.errorHandler(res, error);
  }
};
