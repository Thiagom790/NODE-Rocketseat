import { Router } from "express";

import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationControler";

const specificationsRouter = Router();

const createSpecificationControler = new CreateSpecificationController();

specificationsRouter.use(ensureAuthenticate);
specificationsRouter.post("/", createSpecificationControler.handle);

export { specificationsRouter };
