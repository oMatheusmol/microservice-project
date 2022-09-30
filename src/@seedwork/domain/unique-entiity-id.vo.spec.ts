import InvalidUuidError from '../../@seedwork/errors/invalid-uuid.error';
import UniqueEntityId from './unique-entiity-id.vo';
import { validate as uuidValidate } from 'uuid';

function validateSpyMethod() {
  return jest.spyOn(UniqueEntityId.prototype, 'validate');
}

describe('UniqueEntityId Unity Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should throw error when uuid is invalid', () => {
    const validateSpy = validateSpyMethod();
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    const validateSpy = validateSpyMethod();
    const uuid = 'f95bb4ff-3c90-40d4-826e-c1eef8a3d08f';
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBeDefined();
    expect(uuidValidate(vo.id)).toBeTruthy();
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
    expect(validateSpy).toBeCalledTimes(1);
  });
});
