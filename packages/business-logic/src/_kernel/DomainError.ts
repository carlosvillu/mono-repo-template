export class DomainError extends Error {
  public readonly code: string
  public readonly context?: Record<string, unknown>

  constructor(
    message: string,
    code: string,
    context?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'DomainError'
    this.code = code
    this.context = context
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
    }
  }
}