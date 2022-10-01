import ValidationError from '../../@seedwork/errors/validation.error';
import ValidatorRules from './validator-rules';

type ExpectedValidationRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  errorMessage?: any;
  params: any[];
};

function assertIsInvalid({
  value,
  property,
  rule,
  errorMessage,
  params = [],
}: ExpectedValidationRule): void {
  expect((): void => {
    const validator: ValidatorRules = ValidatorRules.values(value, property);
    const method: any = validator[rule];
    method.apply(validator, params);
  }).toThrow(errorMessage);
}

function assertIsValid({
  value,
  property,
  rule,
  params = [],
}: ExpectedValidationRule): void {
  expect((): void => {
    const validator: ValidatorRules = ValidatorRules.values(value, property);
    const method: any = validator[rule];
    method.apply(validator, params);
  }).not.toThrow();
}
describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test('required validation rule', () => {
    // fail cases
    const failArrange = [
      {
        value: null,
        property: 'field',
        errorMessage: new ValidationError('The field is required'),
        rule: 'required',
      },
      {
        value: undefined,
        property: 'field',
        errorMessage: new ValidationError('The field is required'),
        rule: 'required',
      },
      {
        value: '',
        property: 'field',
        errorMessage: new ValidationError('The field is required'),
        rule: 'required',
      },
    ];
    failArrange.forEach((data) => {
      assertIsInvalid(data as ExpectedValidationRule);
    });

    // valid cases
    const validArrange = [
      { value: 'test', property: 'field', rule: 'required' },
      {
        value: 5,
        property: 'field',
        rule: 'required',
      },
      { value: 0, property: 'field', rule: 'required' },
      { value: false, property: 'field', rule: 'required' },
      { value: true, property: 'field', rule: 'required' },
    ];
    validArrange.forEach((data) => {
      assertIsValid(data as ExpectedValidationRule);
    });
  });

  test('maxLength validation rule', () => {
    // invalid cases
    const invalidData = [
      {
        value: 'qweqweqwe',
        property: 'field',
        errorMessage: new ValidationError(
          'The field must be less or equal to 3 characters'
        ),
        rule: 'maxLenght',
        params: [3],
      },
    ];
    invalidData.forEach((data) => {
      assertIsInvalid(data as ExpectedValidationRule);
    });
    // valid cases
    const validData = [
      {
        value: '12345',
        property: 'field',
        rule: 'maxLenght',
        params: [6],
      },
      {
        value: null,
        property: 'field',
        rule: 'maxLenght',
        params: [50],
      },
      {
        value: undefined,
        property: 'field',
        rule: 'maxLenght',
        params: [50],
      },
    ];
    validData.forEach((data) => {
      assertIsValid(data as Omit<ExpectedValidationRule, 'errorMessage'>);
    });
  });

  test('string validation rule', () => {
    // invalid cases
    const invalidData = [
      {
        value: 5,
        property: 'field',
        errorMessage: new ValidationError('The field must be a string'),
        rule: 'string',
      },
    ];
    invalidData.forEach((data) => {
      assertIsInvalid(data as ExpectedValidationRule);
    });
    // valid cases
    const validData = [
      {
        value: '12345',
        property: 'field',
        rule: 'string',
      },
      {
        value: undefined,
        property: 'field',
        rule: 'string',
      },
      {
        value: null,
        property: 'field',
        rule: 'string',
      },
    ];
    validData.forEach((data) => {
      assertIsValid(data as Omit<ExpectedValidationRule, 'errorMessage'>);
    });
  });

  test('boolean validation rule', () => {
    const invalidData = [
      {
        value: 5,
        property: 'field',
        errorMessage: new ValidationError('The field must be a boolean'),
        rule: 'boolean',
      },

      {
        value: '',
        property: 'field',
        errorMessage: new ValidationError('The field must be a boolean'),
        rule: 'boolean',
      },
      {
        value: 'teste',
        property: 'field',
        errorMessage: new ValidationError('The field must be a boolean'),
        rule: 'boolean',
      },
    ];
    invalidData.forEach((data) => {
      assertIsInvalid(data as ExpectedValidationRule);
    });

    // valid cases
    const validData = [
      {
        value: true,
        property: 'field',
        rule: 'boolean',
      },
      {
        value: false,
        property: 'field',
        rule: 'boolean',
      },
      {
        value: null,
        property: 'field',
        rule: 'boolean',
      },
      {
        value: undefined,
        property: 'field',
        rule: 'boolean',
      },
    ];
    validData.forEach((data) => {
      assertIsValid(data as Omit<ExpectedValidationRule, 'errorMessage'>);
    });
  });

  it('should valid when combine two or more validation rules', () => {
    expect.assertions(0);
    ValidatorRules.values('test', 'field').required().string();
    ValidatorRules.values('12345', 'field').required().string().maxLenght(5);

    ValidatorRules.values(true, 'field').required().boolean().maxLenght(5);
    ValidatorRules.values(false, 'field').required().boolean().maxLenght(5);
  });
});
