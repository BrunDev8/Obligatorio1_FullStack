import express from 'express';
import { searchPlants } from '../controllers/plants.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/search', searchPlants);

export default router;
