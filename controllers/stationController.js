'use strict';

import {cats} from '../models/catModel.js';
import station from '../models/stationModel.js';

const station_list_get = async (req, res) => {
  res.json(await station.find());
};

const station_get = async (req, res) => {
  res.json(await station.findById(req.params.id));
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
