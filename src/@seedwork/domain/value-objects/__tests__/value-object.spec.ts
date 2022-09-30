import ValueObject from '../value-object';

class StubValueObject extends ValueObject {}

describe('ValueObject Unit Tests', () => {
  it('should set value', () => {
    let vo = new StubValueObject('string value');
    expect(vo.value).toBe('string value');

    vo = new StubValueObject({ prop: 'value' });
    expect(vo.value).toStrictEqual({ prop: 'value' });
  });

  it('should convert to string', () => {
    const now = new Date();
    const values = [
      { received: '', expected: '' },
      { received: 'value', expected: 'value' },
      { received: 21, expected: '21' },
      { received: true, expected: 'true' },
      { received: false, expected: 'false' },
      { received: now, expected: now.toString() },
      {
        received: { prop: 'value' },
        expected: JSON.stringify({ prop: 'value' }),
      },
    ];
    values.forEach((value) => {
      const vo = new StubValueObject(value.received);
      expect(vo + '').toBe(value.expected);
    });
  });
});
