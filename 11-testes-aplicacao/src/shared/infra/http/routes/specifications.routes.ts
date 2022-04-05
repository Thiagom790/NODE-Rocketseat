import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationControler";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const specificationsRouter = Router();

const createSpecificationControler = new CreateSpecificationController();

specificationsRouter.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createSpecificationControler.handle
);

export { specificationsRouter };
