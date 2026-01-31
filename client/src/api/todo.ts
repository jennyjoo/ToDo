import type { AxiosInstance } from 'axios';
import type { Todo } from '../types/todo';

export interface TodoResponse {
  data: Todo[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface TodoClient {
  getAll(params?: { orderBy?: string; date?: string }): Promise<Todo[]>;
  getByDate(
    date: string,
    orderBy?: string,
    page?: number,
    limit?: number
  ): Promise<TodoResponse>;
  create(content: string, title?: string, date?: string): Promise<Todo>;
  update(id: number, data: Partial<Todo>): Promise<void>;
  delete(id: number): Promise<void>;
}

export class TodoClientImpl implements TodoClient {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async getAll(params?: { orderBy?: string; date?: string }): Promise<Todo[]> {
    const response = await this.client.get<Todo[]>('/todos', {
      params,
    });
    return response.data;
  }

  async getByDate(
    date: string,
    orderBy?: string,
    page: number = 1,
    limit: number = 5
  ): Promise<TodoResponse> {
    const response = await this.client.get<TodoResponse>('/todos', {
      params: { date, orderBy, page, limit },
    });
    return response.data;
  }

  async create(content: string, title?: string, date?: string): Promise<Todo> {
    const response = await this.client.post<Todo>('/todos', {
      content,
      title,
      date,
    });
    return response.data;
  }

  async update(id: number, data: Partial<Todo>): Promise<void> {
    await this.client.put(`/todos/${id}`, data);
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/todos/${id}`);
  }
}
