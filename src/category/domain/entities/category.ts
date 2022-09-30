import Entity from '../../../@seedwork/domain/entity/entity';
import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entiity-id.vo';

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProps> {
  constructor(public readonly props: CategoryProps, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.created_at = this.props.created_at;
  }

  update(name: string, description?: string) {
    this.name = name;
    this.description = description;
  }

  activate(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get description(): string {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  private set created_at(value: Date) {
    this.props.created_at = value ?? new Date();
  }
}
