const express = require("express");
const tourRouter = express.Router();
const tourControllers = require(`${__dirname}/../controllers/tourController`);

// Adding MiddleWare To Check For ID:
tourRouter.param("id", tourControllers.checkID);

// Handling Tour Routes:

tourRouter
  .route("/")
  .get(tourControllers.getAllTours)
  .post(
    tourControllers.checkBody,
    tourControllers.createTour
  );

tourRouter
  .route("/:id")
  .get(tourControllers.getTour)
  .patch(tourControllers.updateTour)
  .delete(tourControllers.deleteTour);

module.exports = tourRouter;
