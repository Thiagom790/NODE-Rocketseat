import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CrateCategoryController {
    async handle(request: Request, reponse: Response): Promise<Response> {
        const { name, description } = request.body;

        const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

        await createCategoryUseCase.execute({ name, description });

        return reponse.status(201).send();
    }
}

export { CrateCategoryController };
