'use strict';

import station from '../models/stationModel.js';

const station_list_get = async (req, res) => {
  res.json(
      await station.find().populate([
        {
          path: 'Connections',
          populate: {path: 'ConnectionTypeID'},
        }, {
          path: 'Connections',
          populate: {path: 'LevelID'},
        }, {
          path: 'Connections',
          populate: {path: 'CurrentTypeID'},
        }],
      ));
};

const station_get = async (req, res) => {
  res.json(await station.findById(req.params.id).populate({
        path: 'Connections',
        populate: {path: 'ConnectionTypeID'},
      },
  ));
};

const station_post = async (req, res) => {
  console.log(req.body);
  try {
    const newStation = req.body;
    await station.create(newStation);
    res.json(newStation);
  } catch (e) {
    console.log('station controller create failed', e);
    res.json({message: e.message});
  }
};

const station_patch = async (req, res) => {
};

export {
  station_list_get,
  station_get,
  station_post,
  station_patch,
};
