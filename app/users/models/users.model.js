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

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
  virtuals: true,
});

userSchema.findById = function (cb) {
  return this.model('Users').find({
    id: this.id,
  }, cb);
};

module.exports = mongoose.model('User', userSchema);
