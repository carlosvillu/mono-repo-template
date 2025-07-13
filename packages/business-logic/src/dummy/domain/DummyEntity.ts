import { z } from 'zod'
import { Model, ID } from '../../_kernel'

const DummyEntitySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  createdAt: z.date()
})

export interface DummyEntityProps {
  id?: ID
  name: string
  description?: string
  createdAt?: Date
}

export class DummyEntity extends Model {
  private readonly _id: ID
  private readonly _name: string
  private readonly _description?: string
  private readonly _createdAt: Date

  constructor(props: DummyEntityProps) {
    super()
    
    this._id = props.id ?? ID.generate()
    this._name = props.name
    this._description = props.description
    this._createdAt = props.createdAt ?? new Date()

    this.validate()
  }

  private validate(): void {
    const result = DummyEntitySchema.safeParse({
      id: this._id.value,
      name: this._name,
      description: this._description,
      createdAt: this._createdAt
    })

    if (!result.success) {
      throw new Error(`Invalid DummyEntity: ${result.error.message}`)
    }
  }

  get id(): ID {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get description(): string | undefined {
    return this._description
  }

  get createdAt(): Date {
    return this._createdAt
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this._id.value,
      name: this._name,
      description: this._description,
      createdAt: this._createdAt.toISOString()
    }
  }

  static fromJSON(json: Record<string, unknown>): DummyEntity {
    return new DummyEntity({
      id: ID.fromString(json.id as string),
      name: json.name as string,
      description: json.description as string | undefined,
      createdAt: new Date(json.createdAt as string)
    })
  }
}