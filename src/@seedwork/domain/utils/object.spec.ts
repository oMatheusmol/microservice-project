import { deepFreeze } from './object';

describe('Object Unit Tests', () => {
  it('should freeze objects', () => {
    const freeze = deepFreeze({ number: 5 });
    expect(freeze).toStrictEqual({ number: 5 });
  });

  it('should throw error when try to mutate object', () => {
    const dfreeze = deepFreeze({
      main: 'value',
      deep: {
        prop1: 'value',
        prop2: 'value',
      },
    });
    expect(() => ((dfreeze as any).main = 'test')).toThrow(
      `Cannot assign to read only property 'main' of object '#<Object>'`
    );
  });
});
