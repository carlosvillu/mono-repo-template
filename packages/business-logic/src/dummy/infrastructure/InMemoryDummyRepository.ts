import { ID } from '../../_kernel'
import { DummyEntity, DummyRepository } from '../domain'

export class InMemoryDummyRepository implements DummyRepository {
  private entities: Map<string, DummyEntity> = new Map()

  async findById(id: ID): Promise<DummyEntity | null> {
    const entity = this.entities.get(id.value)
    return entity ?? null
  }

  async findAll(): Promise<DummyEntity[]> {
    return Array.from(this.entities.values())
  }

  async save(entity: DummyEntity): Promise<void> {
    this.entities.set(entity.id.value, entity)
  }

  async delete(id: ID): Promise<void> {
    this.entities.delete(id.value)
  }
}