const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const Album = require("../models/album.model");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const addAlbum = async (req, res, next) => {
  const addedAlbum = new Album({
    user: req.body.user,
    name: req.body.name,
    description: req.body.description,
  });
  try {
    await addedAlbum.save();
  } catch (err) {
    return next(new HttpError(err, 404));
  }
  res.status(StatusCodes.CREATED).json({
    message: ReasonPhrases.CREATED,
    data: addedAlbum,
  });
};

//Obtener albums de usuario de la BD
const getAlbumsByUser = async (req, res) => {
  let albums;
  try {
    albums = await Album.findOne({user:req.params.userId}).exec();
  } catch (err) {
    return next(new HttpError(err, 404));
  }
  res.status(StatusCodes.OK).json({
    message: ReasonPhrases.OK,
    data: albums,
  });
};

const updateAlbum = async (req, res, next) => {
  const AlbumId = req.params.id;
  const { name, description } = req.body;
  let album;
  try {
    album = await Album.findByIdAndUpdate(
      AlbumId,
      { name, description },
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
      data: album.toObject({ getters: true }),
    });
  } else {
    res.status(StatusCodes.NOT_FOUND).json({
      message: ReasonPhrases.NOT_FOUND,
    });
  }
};

const deleteAlbum = async (req, res, next) => {
  const albumId = req.params.id;
  let album;
  try {
    album = await Album.findById(albumId).exec();
  } catch (err) {
    return next(new HttpError("not found", 400));
  }
  if (album) {
    await album.remove();
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
exports.addAlbum = addAlbum;
exports.getAlbumsByUser = getAlbumsByUser;
exports.updateAlbum = updateAlbum;
exports.deleteAlbum = deleteAlbum;
