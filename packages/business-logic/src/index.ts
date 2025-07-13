/** Kernel exports */
export { Model } from './_kernel/architecture'
export type { UseCaseConstructor, UseCaseResult } from './_kernel/architecture'
export { DomainError } from './_kernel/DomainError'
export type { UseCase } from './_kernel/UseCase'
export { ID } from './_kernel/ID'

/** Domain exports */
export { DummyEntity } from './dummy/domain/DummyEntity'
export type { DummyRepository } from './dummy/domain/DummyRepository'

/** Application exports */
export type { CreateDummyInput } from './dummy/application/CreateDummyUseCase'
export { CreateDummyOutput } from './dummy/application/CreateDummyUseCase'
export type { GetDummyInput } from './dummy/application/GetDummyUseCase'
export { GetDummyOutput } from './dummy/application/GetDummyUseCase'

/** Infrastructure exports */
export { InMemoryDummyRepository } from './dummy/infrastructure/InMemoryDummyRepository'

/** Main domain class */
export { BusinessLogic } from './BusinessLogic'
export type { BusinessLogicConfig } from './BusinessLogic'