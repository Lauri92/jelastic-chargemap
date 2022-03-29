'use strict';

import mongoose from 'mongoose';
import connectionTypes from './connectionType.js';
import level from './level.js';
import currentType from './currentType.js';

const Schema = mongoose.Schema;

const connectionsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  ConnectionTypeID: {type: Schema.Types.ObjectId, ref: connectionTypes},
  LevelID: {type: Schema.Types.ObjectId, ref: level},
  CurrentTypeID: {type: Schema.Types.ObjectId, ref: currentType},
});

export default mongoose.model('Connections', connectionsSchema);