import InvalidUuidError from '../errors/invalid-uuid.error';
import { v4 as uuidV4, validate as uuidValidate } from 'uuid';
import ValueObject from './value-object';

export default class UniqueEntityId extends ValueObject<string> {
  constructor(private readonly id?: string) {
    super(id || uuidV4());
    this.validate();
  }

  private validate(): void {
    const isValid: boolean = uuidValidate(this.value);
    if (!isValid) throw new InvalidUuidError();
  }
}
