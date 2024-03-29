import { getRepository, Repository } from "typeorm";

import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

import { Specification } from "../typeorm/entities/Specification";

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({
      name,
    });

    return specification;
  }
}

export { SpecificationsRepository };
