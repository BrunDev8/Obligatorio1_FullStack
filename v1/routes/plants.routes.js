import express from 'express';
import { searchPlants } from '../controllers/plants.controller.js';

const router = express.Router({ mergeParams: true });

// GET /v1/plants/search?name=
router.get('/search', searchPlants);

export default router;
