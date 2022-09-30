import UniqueEntityId from '../value-objects/unique-entiity-id.vo';
import Entity from './entity';
import { validate as uuidValidate } from 'uuid';

class StubEntity extends Entity<{ prop1: number; prop2: string }> {}

describe('Entity Unit Tests', () => {
  it('should set props and id', () => {
    const object = { prop1: 21, prop2: 'value' };
    const entity = new StubEntity(object);
    expect(entity.props).toStrictEqual(object);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const object = { prop1: 21, prop2: 'value' };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(object, uniqueEntityId);
    expect(entity.id).toBe(uniqueEntityId.value);
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should convert entity to a Javascript Object', () => {
    const object = { prop1: 21, prop2: 'value' };
    const uniqueEntityId = new UniqueEntityId();
    const entity = new StubEntity(object, uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual({
      id: uniqueEntityId.value,
      ...object,
    });
  });
});
