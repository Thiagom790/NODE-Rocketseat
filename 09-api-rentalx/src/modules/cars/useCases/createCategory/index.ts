import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CrateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CrateCategoryController(
    createCategoryUseCase
);

export { createCategoryController };
