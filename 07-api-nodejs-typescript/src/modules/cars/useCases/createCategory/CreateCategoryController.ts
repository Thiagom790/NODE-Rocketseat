import { Request, Response } from "express";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CrateCategoryController {
    // eslint-disable-next-line prettier/prettier
    constructor(private createCategoryUseCase: CreateCategoryUseCase) { }

    handle(request: Request, reponse: Response): Response {
        const { name, description } = request.body;

        this.createCategoryUseCase.execute({ name, description });

        return reponse.status(201).send();
    }
}

export { CrateCategoryController };
