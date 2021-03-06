const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  }
});

userSchema.statics.signUp = async function(email, password) {
  const user = new this();
  user.email = email;
  user.hashPassword(password);

  await user.save();

  return user;
};
userSchema.methods.hashPassword = function(plainText) {
  this.password = bcrypt.hashSync(plainText, 4);
};
userSchema.methods.sanitize = function() {
  return {
    ...this._doc,
    password: undefined,
  }
}
userSchema.methods.comparePassword = function(plainText) {
  return bcrypt.compareSync(plainText, this.password);
}
const User = mongoose.model("User", userSchema);

module.exports = User;