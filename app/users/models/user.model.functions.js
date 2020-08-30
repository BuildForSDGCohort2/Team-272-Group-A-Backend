const User = require('./users.model');

exports.findByEmail = (email) => User.find({
  email,
});

exports.findById = (id) => User.findById(id)
  .then((result) => {
    const resultJSON = result.toJSON();
    delete resultJSON._id;
    delete resultJSON.__v;
    return resultJSON;
  });

exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

exports.list = (perPage, page) => new Promise((resolve, reject) => {
  User.find()
    .limit(perPage)
    .skip(perPage * page)
    .exec((err, users) => {
      if (err) {
        reject(err);
      } else {
        resolve(users);
      }
    });
});

exports.patchUser = (id, userData) => new Promise((resolve, reject) => {
  User.findById(id, (err, user) => {
    if (err) reject(err);

    for (const i in userData) {
      user[i] = userData[i];
    }

    user.save((error, updatedUser) => {
      if (error) return reject(error);
      resolve(updatedUser);
    });
  });
});

exports.removeById = (userId) => new Promise((resolve, reject) => {
  User.remove({
    _id: userId,
  }, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(err);
    }
  });
});
