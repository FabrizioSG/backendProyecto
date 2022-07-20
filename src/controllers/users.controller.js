const User = require("../models/user.model");
const HttpError = require("../models/http-error");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailSender = require("../controllers/emailSender");
const generator = require('generate-password');


const signUp = async (req, res, next) => {
  let { name, first_last_name, second_last_name, email, password, gender, birthday } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  if (existingUser) {
    return next(new HttpError("User Exists Already", 422));
  }
  password = await bcrypt.hash(password, 10);

  const createdUser = new User({
    name, first_last_name, second_last_name, email, password, gender, birthday
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
  try {
    // Get user input
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: ReasonPhrases.BAD_REQUEST,
        data: "Missing username or password"
      });
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user },
        "my_secret_key",
        {
          expiresIn: "2h",
        }
      );

      res.cookie('token', token, { httpOnly: true });

      // user
      return res.status(StatusCodes.OK).json({
        message: ReasonPhrases.OK,
        data: { token: token, expiresIn: "2 hours" }
      });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res, next) => {

  const userId = req.user.user._id;

  let { name, first_last_name, second_last_name, email, birthday, gender, password } = req.body;
  let user;
  let token;
  password = await bcrypt.hash(password, 10);
  try {
    user = await User.findByIdAndUpdate(
      userId,
      { name, first_last_name, second_last_name, email, birthday, gender, password },
      {
        new: true,
      }
    ).exec();
    token = jwt.sign(
      { user },
      "my_secret_key",
      {
        expiresIn: "2h",
      }
    );
    res.cookie('token', token, { httpOnly: true });

  } catch (err) {
    return next(new HttpError(err, 400));
  }
  if (user) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: { user: user.toObject({ getters: true }), token: token }
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.user.user._id;
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

const resetPassword = async (req, res, next) => {
  let user;

  let password = generator.generate({
    length: 10,
    numbers: true
  });

  try {
    user = await User.findOne({ email: req.body.email });
  } catch (err) {
    return next(new HttpError("not found", 400));
  }

  if (user) {
    await emailSender.sendEmail(user.email, password);
    password = await bcrypt.hash(password, 10);
    user.password = password;
    user.save();
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: "Email sent to: " + user.email,
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
exports.resetPassword = resetPassword;

