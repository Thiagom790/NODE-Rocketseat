import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it("should be able to list all availables cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car Description",
            daily_rate: 110.0,
            license_plate: "DEF-123d4",
            fine_amount: 100,
            brand: "Car_Brand",
            category_id: "Category_ID",
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all availables cars by branch", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car2",
            description: "Car Description",
            daily_rate: 110.0,
            license_plate: "DEF-123d4",
            fine_amount: 100,
            brand: "Car_Brand_test",
            category_id: "Category_ID",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car_Brand_test",
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all availables cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car Description",
            daily_rate: 110.0,
            license_plate: "DEF-12345",
            fine_amount: 100,
            brand: "Car_Brand_test",
            category_id: "Category_ID",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Car3",
        });

        console.log(cars);

        expect(cars).toEqual([car]);
    });

    it("should be able to list all availables cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car3",
            description: "Car Description",
            daily_rate: 110.0,
            license_plate: "DEF-12345",
            fine_amount: 100,
            brand: "Car_Brand_test",
            category_id: "12345",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345",
        });

        expect(cars).toEqual([car]);
    });
});
