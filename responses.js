const express = require('express');
const tourController = require('./../controllers/control');

const router = express.Router();

router.param('id', tourController.checkID);

router.get('/:id', tourController.getAllTours);

router
  .route('/')
  .get(tourController.getTours)
  .post(tourController.checkReq, tourController.addTour);

module.exports = router;
