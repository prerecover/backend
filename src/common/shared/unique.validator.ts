import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'IsUniqueConstraint', async: true })
@Injectable()
export class IsUnique implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {}
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const [tableName, column] = args?.constraints as string[];

        const dataExist = await this.entityManager
            .getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({ [column]: value })
            .getExists();

        return !dataExist;
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        const field = validationArguments.property;
        throw new BadRequestException(`${field.charAt(0).toUpperCase() + field.slice(1)} is already exist.`);
    }
}
