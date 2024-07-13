/* eslint-disable @typescript-eslint/ban-types */
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource } from 'typeorm';

@Injectable()
@ValidatorConstraint({ async: true })
export class UniqueConstraintValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const config: IUniqueConstraintConfig<any> =
      validationArguments.constraints[0];
    const object = validationArguments.object;
    const repository = this.dataSource.getRepository(config.entity);
    const promises = await Promise.all(
      config.constraints.map(async (constraint) => {
        const query = constraint.fields.reduce((acc, field) => {
          acc[field] = object[field];
          return acc;
        }, {});
        const someValueInQueryIsNullOrUndefined = Object.values(query).some(
          (value) => [null, undefined].includes(value),
        );
        return someValueInQueryIsNullOrUndefined
          ? [false, constraint.message]
          : [await repository.exists({ where: query }), constraint.message];
      }),
    );
    if (promises.some((result) => result[0])) {
      const messages = promises
        .filter((result) => result[0])
        .map((result) => result[1] as string);
      throw new ConflictException(messages);
    }
    return true;
  }
}
export interface IUniqueConstraintDetail<T> {
  message: string;
  fields: (keyof T)[];
}
export interface IUniqueConstraintConfig<T> {
  entity: any;
  constraints: IUniqueConstraintDetail<T>[];
}
export function UniqueConstraints<T>(options: IUniqueConstraintConfig<T>) {
  return function (target: Function) {
    registerDecorator({
      target,
      propertyName: '',
      constraints: [options],
      validator: UniqueConstraintValidator,
    });
  };
}
