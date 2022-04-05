import { Router } from "express";
import multer from "multer";

import { CrateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticate } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
    dest: "./temp",
});

const createCategoryController = new CrateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
    "/",
    ensureAuthenticate,
    ensureAdmin,
    createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
    "/import",
    ensureAuthenticate,
    ensureAdmin,
    upload.single("file"),
    importCategoryController.handle
);

export { categoriesRoutes };
