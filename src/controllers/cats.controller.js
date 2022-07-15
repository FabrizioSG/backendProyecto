const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Cat = require("../models/cat.model");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const addCat = async (req, res, next) => {
  const addedCat = new Cat({
    name: req.body.name,
    color: req.body.color,
  });
  try {
    await addedCat.save();
  } catch (err) {
    return next(new HttpError(err, 404));
  }
  res.status(StatusCodes.CREATED).json({
    message: ReasonPhrases.CREATED,
    data: addedCat,
  });
};

//Obtener gatos de la BD
const getCats = async (req, res) => {
  let cats;
  try {
    cats = await Cat.find().exec();
  } catch (err) {
    return next(new HttpError(err, 404));
  }
  res.status(StatusCodes.OK).json({
    message: ReasonPhrases.OK,
    data: cats,
  });
};

const getCatById = async (req, res) => {
  const catId = req.params.id;
  let cat;
  try {
    cat = await Cat.findById(catId).exec();
  } catch (err) {
    return next(new HttpError("not found", 400));
  }
  if (cat) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: cat.toObject({ getters: true }),
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

const updateCat = async (req, res, next) => {
  const catId = req.params.id;
  const { name, color } = req.body;
  let cat;
  try {
    cat = await Cat.findByIdAndUpdate(
      catId,
      { name, color },
      {
        new: true,
      }
    ).exec();
  } catch (err) {
    return next(new HttpError(err, 400));
  }
  if (cat) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: cat.toObject({ getters: true }),
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

const deleteCat = async (req, res, next) => {
  const catId = req.params.id;
  let cat;
  try {
    cat = await Cat.findById(catId).exec();
  } catch (err) {
    return next(new HttpError("not found", 400));
  }
  if (cat) {
    await cat.remove();
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

//Exporta funciones para ser usadas en routes
exports.addCat = addCat;
exports.getCats = getCats;
exports.getCatById = getCatById;
exports.updateCat = updateCat;
exports.deleteCat = deleteCat;
