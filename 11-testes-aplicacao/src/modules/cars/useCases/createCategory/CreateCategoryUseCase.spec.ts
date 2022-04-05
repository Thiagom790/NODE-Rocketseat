// Exemplo de teste
// describe("Criar Categoria", () => {
//     it("Espero que 2 + 2 seja 4", () => {
//         const soma = 2 + 2;
//         const resultado = 4;
//         expect(soma).toBe(resultado);
//     });
//     it("Espero que 2 + 2 não seja 5", () => {
//         const soma = 2 + 2;
//         const resultado = 5;
//         expect(soma).not.toBe(resultado);
//     });
// });

import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory
        );
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category description test",
        };

        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(
            category.name
        );

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        expect(async () => {
            const category = {
                name: "Category Test",
                description: "Category description test",
            };

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
