const { mongoose } = require('../../../common/services/mongoose.service');

const { Schema } = mongoose;

const patientSchema = new Schema({
  patientNumber: { type: String, required: true },
  user: { type: Schema.ObjectId, ref: 'User', required: true },
});

patientSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

patientSchema.set('toJSON', {
  virtuals: true,
});

patientSchema.findById = function (cb) {
  return this.model('Patients').find({
    id: this.id,
  }, cb);
};

patientSchema.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('Patient', patientSchema);
