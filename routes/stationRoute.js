'use strict';

import {Router} from 'express';
import {
  station_list_get,
  station_get,
  station_post,
  station_patch,
} from '../controllers/stationController.js';
import passport from '../utils/pass.js';

const router = Router();

router.route('/').
    get(station_list_get).
    post(station_post, passport.authenticate('jwt', {session: false}));

router.route('/:id').
    get(station_get).
    patch(station_patch)
;

export default router;
