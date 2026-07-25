/**
 * Domain-level errors.
 *
 * These are thrown by value objects and entities when an invariant is violated.
 * Because the whole site is built statically, a violated invariant fails the
 * **build** rather than reaching a visitor — invalid content can never ship.
 */

export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class InvalidValueObjectError extends DomainError {
  constructor(valueObject: string, received: unknown, reason: string) {
    super(`[${valueObject}] ${reason}. Recebido: ${JSON.stringify(received)}`);
    this.name = 'InvalidValueObjectError';
  }
}

export class EntityNotFoundError extends DomainError {
  constructor(entity: string, identifier: string) {
    super(`[${entity}] Nenhum registro encontrado para "${identifier}".`);
    this.name = 'EntityNotFoundError';
  }
}
