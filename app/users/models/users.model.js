const { mongoose } = require('../../../common/services/mongoose.service');

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  permissionLevel: Number,
});

userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.findById = function (cb) {
  return this.model('Users').find({
    id: this.id,
  }, cb);
};

userSchema.plugin(require('mongoose-paginate'));

module.exports = mongoose.model('User', userSchema);
