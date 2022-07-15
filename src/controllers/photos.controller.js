const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Photo = require("../models/photo.model");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const addPhoto = async (req, res, next) => {
  const addedPhoto = new Photo({
    album: req.body.album,
    name: req.body.name,
    description: req.body.description,
    URL: req.body.URL,
  });
  try {
    await addedPhoto.save();
  } catch (err) {
    return next(new HttpError(err, 404));
  }
  res.status(StatusCodes.CREATED).json({
    message: ReasonPhrases.CREATED,
    data: addedPhoto,
  });
};

//Obtener fotos de album de la BD
const getPhotosByAlbum = async (req, res) => {
  let photos;
  try {
    photos = await Photo.findOne({ album: req.params.albumId }).exec();
  } catch (err) {
    return next(new HttpError(err, 404));
  }
  res.status(StatusCodes.OK).json({
    message: ReasonPhrases.OK,
    data: photos,
  });
};

const updatePhoto = async (req, res, next) => {
  const PhotoId = req.params.id;
  const { name, description, URL } = req.body;
  let photo;
  try {
    photo = await Photo.findByIdAndUpdate(
      PhotoId,
      { name, description, URL },
      {
        new: true,
      }
    ).exec();
  } catch (err) {
    return next(new HttpError(err, 400));
  }
  if (photo) {
    res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      data: photo.toObject({ getters: true }),
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

const deletePhoto = async (req, res, next) => {
  const PhotoId = req.params.id;
  let photo;
  try {
    photo = await Photo.findById(PhotoId).exec();
  } catch (err) {
    return next(new HttpError("not found", 400));
  }
  if (photo) {
    await photo.remove();
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
exports.addPhoto = addPhoto;
exports.getPhotosByAlbum = getPhotosByAlbum;
exports.updatePhoto = updatePhoto;
exports.deletePhoto = deletePhoto;
