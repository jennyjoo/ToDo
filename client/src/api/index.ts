import httpClient from '../lib/client';
import { type TodoClient, TodoClientImpl } from './todo';

export class ApiClient {
  public readonly todo: TodoClient;

  constructor(todo: TodoClient) {
    this.todo = todo;
  }
}

// 의존성 주입 (Dependency Injection)
export const api = new ApiClient(new TodoClientImpl(httpClient));

export type { TodoClient };
