'use strict';

import {Router} from 'express';
import {
  station_list_get,
  station_get,
  station_post,
  station_patch,
  station_list_get_by_area,
  station_delete,
} from '../controllers/stationController.js';
import passport from '../utils/pass.js';

const router = Router();

router.route('/').
    get(station_list_get).
    post(passport.authenticate('jwt', {session: false}), station_post);

router.route('/area').get(station_list_get_by_area);

router.route('/:id').
    get(station_get).
    delete(passport.authenticate('jwt', {session: false}), station_delete).
    put(passport.authenticate('jwt', {session: false}), station_patch);

export default router;
