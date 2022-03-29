'use strict';

import station from '../models/stationModel.js';
import {rectangleBounds} from '../utils/rectangleBounds.js';
import connections from '../models/connections.js';

const station_list_get = async (req, res) => {
  try {
    const resultLimit = req.query.limit || 10;
    res.json(
        await station.find().
            populate(stationPopulationOptions).
            limit(resultLimit));
  } catch (e) {
    res.status(400).send('Something went wrong');
  }
};

const station_get = async (req, res) => {
  try {
    res.json(await station.findById(req.params.id).
        populate(stationPopulationOptions));
  } catch (e) {
    res.status(400).send('Something went wrong');
  }
};

const station_list_get_by_area = async (req, res) => {
  try {
    if (req.query.topRight && req.query.bottomLeft) {
      const topRight = JSON.parse(req.query.topRight);
      const bottomLeft = JSON.parse(req.query.bottomLeft);
      const polygon = rectangleBounds(topRight, bottomLeft);

      const stations = await station.find().
          populate(stationPopulationOptions).
          where('Location').
          within(polygon);

      res.send(stations);
    } else {
      res.status(400).send('Specify coordinates');
    }
  } catch (e) {
    res.status(400).send('Something went wrong');
  }
};

const station_post = async (req, res) => {
  try {
    const parsedConnection = JSON.parse(req.body.connections);
    console.log(parsedConnection);
    const insertedConnection = await connections.create(parsedConnection);
    console.log(insertedConnection);

    res.json(insertedConnection);
  } catch (e) {
    console.log('station controller create failed', e);
    res.json({message: e.message});
  }
};

const station_patch = async (req, res) => {
};

const stationPopulationOptions = [

  {
    path: 'Connections',
    populate: {path: 'ConnectionTypeID'},
  }, {
    path: 'Connections',
    populate: {path: 'LevelID'},
  }, {
    path: 'Connections',
    populate: {path: 'CurrentTypeID'},
  }];

export {
  station_list_get,
  station_get,
  station_list_get_by_area,
  station_post,
  station_patch,
};
