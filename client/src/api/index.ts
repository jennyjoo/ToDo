import httpClient from '../lib/client';
import { type AuthClient, AuthClientImpl } from './auth';
import { type TodoClient, TodoClientImpl } from './todo';

export class ApiClient {
  public readonly todo: TodoClient;
  public readonly auth: AuthClient;

  constructor(todo: TodoClient, auth: AuthClient) {
    this.todo = todo;
    this.auth = auth;
  }
}

// 의존성 주입 (Dependency Injection)
export const api = new ApiClient(
  new TodoClientImpl(httpClient),
  new AuthClientImpl(httpClient)
);

export type { TodoClient, AuthClient };
