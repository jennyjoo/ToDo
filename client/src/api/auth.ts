import type { AxiosInstance } from 'axios';

export interface AuthClient {
  login(): Promise<void>;
  logout(): Promise<void>;
}

export class AuthClientImpl implements AuthClient {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async login(): Promise<void> {
    // TODO: Implement login logic
  }

  async logout(): Promise<void> {
    // TODO: Implement logout logic
  }
}
