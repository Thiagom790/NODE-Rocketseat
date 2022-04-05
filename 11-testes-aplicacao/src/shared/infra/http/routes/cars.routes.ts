import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListaAvailableCarsControler";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarssController = new ListAvailableCarsController();

carsRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.get("/available", listAvailableCarssController.handle);

export { carsRoutes };
