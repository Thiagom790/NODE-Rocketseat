import { ISpecificationRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}

    execute({ name, description }: IRequest) {
        const specificationAlreadExists =
            this.specificationRepository.findByName(name);

        if (specificationAlreadExists) {
            throw new Error("Specification Already Exists");
        }

        this.specificationRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
