module.exports.add = (a, b) => a + b;
module.exports.asyncAdd = (a, b, callback) => {
    callback(a+b);
};

module.exports.square = (x) => x * x;
module.exports.asyncSquare = (x, callback) => {
    callback(x*x);
};
module.exports.set = (user, fullName) => {
  var names = fullName.split(' ');
  user.firstName = names[0];
  user.lastName = names[1];
  return user;
};