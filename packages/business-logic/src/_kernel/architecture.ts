import { UseCase } from './UseCase'

export abstract class Model {
  abstract toJSON(): Record<string, unknown>
}

export interface UseCaseConstructor<Input, Output extends Model> {
  create(dependencies?: Record<string, unknown>): UseCase<Input, Output>
}

export type UseCaseResult<T> = [Error | undefined, T | undefined]