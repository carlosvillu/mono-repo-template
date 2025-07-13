export interface UseCase<Input, Output> {
  execute(input: Input): Promise<Output>
}

export type UseCaseResult<T> = [Error | undefined, T | undefined]