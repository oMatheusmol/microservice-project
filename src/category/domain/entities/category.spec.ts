import { Category } from './category';
import { omit } from 'lodash';
import { validate as uuidValidate } from 'uuid';

describe('Category Unit Tests', () => {
  test('constructor of category', () => {
    let category = new Category({ name: 'Movie' });
    let props = omit(category.props, 'created_at');
    // expect(Category.validate).toHaveBeenCalled();
    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    let created_at = new Date();
    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });

    category = new Category({
      name: 'Movie',
      description: 'other description',
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      description: 'other description',
    });

    category = new Category({
      name: 'Movie',
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at,
    });
    expect(category.props).toMatchObject({
      name: 'Movie',
      created_at,
    });
  });

  test('getter of name field', () => {
    const category = new Category({ name: 'Movie' });
    expect(category.name).toBe('Movie');
  });

  test('getter and setter of description field', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.description).toBeNull();
    category = new Category({ name: 'Movie', description: 'some description' });
    expect(category.description).toBe('some description');
    category['description'] = 'other description';
    expect(category.description).toBe('other description');
    category['description'] = null;
    expect(category.description).toBeNull();
  });

  test('getter and setter of is_active field', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: 'Movie', is_active: true });
    expect(category.is_active).toBeTruthy();

    category = new Category({ name: 'Movie', is_active: false });
    expect(category.is_active).not.toBeTruthy();
  });

  test('getter and setter of created_at field', () => {
    let category = new Category({ name: 'Movie' });
    expect(category.created_at).toBeInstanceOf(Date);

    const now = new Date();
    category = new Category({ name: 'Movie', created_at: now });
    expect(category.created_at).toEqual(now);
  });

  test('id field', () => {
    const data = [
      { props: { name: 'Movie' }, id: undefined },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: '8d78728d-0d4a-4803-ba4d-8e130633cc4e' },
    ];
    data.forEach((i) => {
      let category = new Category(i.props, i.id);
      expect(category.id).toBeDefined();
      expect(category.id).not.toBeNull();
      expect(uuidValidate(category.id)).toBeTruthy();
    });
  });
});
