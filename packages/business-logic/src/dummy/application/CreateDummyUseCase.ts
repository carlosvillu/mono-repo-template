import { UseCase, Model } from '../../_kernel'
import { DummyEntity, DummyRepository } from '../domain'
import { InMemoryDummyRepository } from '../infrastructure'

export interface CreateDummyInput {
  name: string
  description?: string
}

export class CreateDummyOutput extends Model {
  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _description: string | undefined,
    private readonly _createdAt: string
  ) {
    super()
  }

  get id(): string { return this._id }
  get name(): string { return this._name }
  get description(): string | undefined { return this._description }
  get createdAt(): string { return this._createdAt }

  toJSON(): Record<string, unknown> {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
      createdAt: this._createdAt
    }
  }
}

export class CreateDummyUseCase implements UseCase<CreateDummyInput, CreateDummyOutput> {
  constructor(private readonly repository: DummyRepository) {}

  async execute(input: CreateDummyInput): Promise<CreateDummyOutput> {
    const entity = new DummyEntity({
      name: input.name,
      description: input.description
    })

    await this.repository.save(entity)

    return new CreateDummyOutput(
      entity.id.value,
      entity.name,
      entity.description,
      entity.createdAt.toISOString()
    )
  }

  static create(_dependencies?: Record<string, unknown>): CreateDummyUseCase {
    return new CreateDummyUseCase(new InMemoryDummyRepository())
  }
}

export default CreateDummyUseCase