import { ID } from '../../_kernel'
import { DummyEntity } from './DummyEntity'

export interface DummyRepository {
  findById(id: ID): Promise<DummyEntity | null>
  findAll(): Promise<DummyEntity[]>
  save(entity: DummyEntity): Promise<void>
  delete(id: ID): Promise<void>
}