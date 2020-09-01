const Patient = require('../models/patients.model');
const Util = require('../../../common/util/error.handler');

exports.insert = async (req, res) => {
  try {
    const patient = await new Patient(req.body).save();
    if (!patient) {
      throw new Error('failed to save');
    }
    res.status(200).send({ patient });
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

    const patients = await Patient.paginate(req.query, { page, limit }).populate();
    res.status(200).send(patients);
  } catch (error) {
    Util.errorHandler(res, error);
  }
};

exports.getById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId);
    if (!patient) {
      throw new Error('patient not found');
    }
  } catch (error) {
    Util.errorHandler(res, error);
  }
};

exports.patchById = async (req, res) => {
  try {
    const patient = await Patient.findOneAndUpdate({ _id: req.params.patientId },
      req.body, { new: true });
    if (!patient) {
      throw new Error('patient not found');
    }
    res.status(200).send({ patient });
  } catch (error) {
    Util.errorHandler(res, error);
  }
};

exports.removeById = async (req, res) => {
  try {
    const result = await Patient.remove({ _id: req.params.patientId });
    res.status(200).send({ result });
  } catch (error) {
    Util.errorHandler(res, error);
  }
};
