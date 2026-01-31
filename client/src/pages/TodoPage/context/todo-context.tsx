import { createContext, useContext } from 'react';
import type { Todo } from '../../../types/todo';

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  fetchTodos: (params?: { orderBy?: string; date?: string }) => Promise<void>;
  addTodo: (todo: {
    content?: string;
    title?: string;
    date?: string;
  }) => Promise<void>;
  toggleTodo: (id: number, completed: boolean) => Promise<void>;
  updateTodo: (
    id: number,
    data: { title?: string; content?: string; completed?: boolean }
  ) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}
