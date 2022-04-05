import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepositoy";

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private repository: ICarsRepository
    ) {}

    async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
        const cars = await this.repository.findAvailable(
            brand,
            category_id,
            name
        );
        return cars;
    }
}

export { ListAvailableCarsUseCase };
