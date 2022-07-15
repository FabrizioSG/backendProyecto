const User = require("../models/user.model");
const HttpError = require("../models/http-error");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const signUp = async (req, res, next) => {
  const { name, email, password, cats } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  if (existingUser) {
    return next(new HttpError("User Exists Already", 422));
  }

  const createdUser = new User({
    name,
    email,
    password,
    cats,
  });
  try {
    createdUser.save();
  } catch (error) {
    return next(new HttpError("Signing up failed, please try again", 500));
  }
  res.status(StatusCodes.CREATED).json({
    message: ReasonPhrases.CREATED,
    data: createdUser.toObject({ getters: true }),
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login Failed", 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError("Invalid credentials", 401));
  }

  res.json({ message: "Logged in!!" });
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  const { name, first_last_name, second_last_name, email, birthday, gender, password } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(
      userId,
      { name, first_last_name, second_last_name, email, birthday, gender, password },
      {
        new: true,
      }
    ).exec();
  } catch (err) {
    return next(new HttpError(err, 400));
  }
  if (album) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: user.toObject({ getters: true }),
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};
const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await User.findById(userId).exec();
  } catch (err) {
    return next(new HttpError("not found", 400));
  }
  if (user) {
    await user.remove();
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: "Deleted!!",
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

exports.signUp = signUp;
exports.login = login;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;

