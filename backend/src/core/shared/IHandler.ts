// src/handlers/IHandler.ts

export interface IHandler<T, Y> {
  handle(event: T): Promise<Y>;
}
