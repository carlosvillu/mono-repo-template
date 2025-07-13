import { z } from 'zod'
import { ulid } from 'ulid'
import { Model } from './Model'

const IDSchema = z.string().min(1)

export class ID extends Model {
  private readonly _value: string

  constructor(value?: string) {
    super()
    this._value = value ?? ulid()
    
    const result = IDSchema.safeParse(this._value)
    if (!result.success) {
      throw new Error(`Invalid ID: ${this._value}`)
    }
  }

  get value(): string {
    return this._value
  }

  equals(other: ID): boolean {
    return this._value === other._value
  }

  toString(): string {
    return this._value
  }

  toJSON(): Record<string, unknown> {
    return { value: this._value }
  }

  static generate(): ID {
    return new ID()
  }

  static fromString(value: string): ID {
    return new ID(value)
  }
}