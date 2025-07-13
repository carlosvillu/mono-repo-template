import { UseCase, ID, DomainError, Model } from '../../_kernel'
import { DummyRepository } from '../domain'
import { InMemoryDummyRepository } from '../infrastructure'

export interface GetDummyInput {
  id: string
}

export class GetDummyOutput extends Model {
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

export class GetDummyUseCase implements UseCase<GetDummyInput, GetDummyOutput> {
  constructor(private readonly repository: DummyRepository) {}

  async execute(input: GetDummyInput): Promise<GetDummyOutput> {
    const entityId = ID.fromString(input.id)
    const entity = await this.repository.findById(entityId)

    if (!entity) {
      throw new DomainError(
        `Dummy entity with id ${input.id} not found`,
        'DUMMY_NOT_FOUND',
        { id: input.id }
      )
    }

    return new GetDummyOutput(
      entity.id.value,
      entity.name,
      entity.description,
      entity.createdAt.toISOString()
    )
  }

  static create(_dependencies?: Record<string, unknown>): GetDummyUseCase {
    return new GetDummyUseCase(new InMemoryDummyRepository())
  }
}

export default GetDummyUseCase