import { create } from 'zustand';
import client from './client';
import type { Todo } from './types/todo';

interface TodoState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  fetchTodos: (orderBy?: string) => Promise<void>;
  addTodo: (content: string, title?: string) => Promise<void>;
  toggleTodo: (id: number, completed: boolean) => Promise<void>;
}

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async (orderBy) => {
    set({ isLoading: true });
    try {
      const response = await client.get('/todos', { params: { orderBy } });
      set({ todos: response.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Error fetching todos',
        isLoading: false,
      });
    }
  },

  addTodo: async (content, title) => {
    const response = await client.post('/todos', { content, title });
    set((state) => ({ todos: [response.data, ...state.todos] }));
  },

  toggleTodo: async (id, completed) => {
    await client.put(`/todos/${id}`, { completed });
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, completed } : t)),
    }));
  },
}));
