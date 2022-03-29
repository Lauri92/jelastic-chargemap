'use strict';

import mongoose from 'mongoose';
import connections from './connections.js';

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Title: {type: String},
  Town: {type: String},
  AddressLine1: {type: String},
  StateOrProvince: {type: String},
  Postcode: {type: String},
  Location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  Connections: [{type: Schema.Types.ObjectId, ref: connections}],
});

export default mongoose.model('Station', stationSchema);