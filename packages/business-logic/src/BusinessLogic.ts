import { Model, UseCaseConstructor, UseCaseResult } from "./_kernel"

/** Dummy */
import {
  CreateDummyInput,
  CreateDummyOutput,
} from "./dummy/application/CreateDummyUseCase"
import {
  GetDummyInput,
  GetDummyOutput,
} from "./dummy/application/GetDummyUseCase"

export interface BusinessLogicConfig {
  environment?: "development" | "production" | "test"
}

export class BusinessLogic {
  private __config: BusinessLogicConfig
  private moduleCache = new Map<string, UseCaseConstructor<any, any>>()

  static create(config: BusinessLogicConfig = {}) {
    return new BusinessLogic(config)
  }

  static empty() {
    return new BusinessLogic({
      environment: "development",
    })
  }

  config<K extends keyof BusinessLogicConfig>(
    key?: K
  ): K extends undefined ? BusinessLogicConfig : BusinessLogicConfig[K] {
    return (key ? this.__config[key] : this.__config) as any
  }

  constructor(config: BusinessLogicConfig) {
    this.__config = {
      environment: "development",
      ...config,
    }
  }

  /* Dummy */
  get CreateDummyUseCase() {
    return this.createUseCaseExecutor<CreateDummyInput, CreateDummyOutput>(
      "CreateDummyUseCase",
      () => import("./dummy/application/CreateDummyUseCase")
    )
  }

  get GetDummyUseCase() {
    return this.createUseCaseExecutor<GetDummyInput, GetDummyOutput>(
      "GetDummyUseCase",
      () => import("./dummy/application/GetDummyUseCase")
    )
  }

  private async loadModule<I, O extends Model>(
    moduleKey: string,
    loader: () => Promise<{ default: UseCaseConstructor<I, O> }>
  ): Promise<UseCaseConstructor<I, O>> {
    if (!this.moduleCache.has(moduleKey)) {
      const module = await loader()
      this.moduleCache.set(moduleKey, module.default)
    }
    return this.moduleCache.get(moduleKey) as UseCaseConstructor<I, O>
  }

  private createUseCaseExecutor<I, O extends Model>(
    moduleKey: string,
    loader: () => Promise<{ default: UseCaseConstructor<I, O> }>
  ) {
    return {
      execute: async (input: I): Promise<UseCaseResult<O>> => {
        try {
          const UseCaseClass = await this.loadModule(moduleKey, loader)
          const useCase = UseCaseClass.create({ config: this.__config })
          const response = await useCase.execute(input)
          return [undefined, response]
        } catch (error) {
          return [error as Error, undefined]
        }
      },
    }
  }
}

