import { useState, useCallback } from 'react';
import { api } from '../../../api/index';
import type { Todo } from '../../../types/todo';

export function useTodoCrud() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTodos = useCallback(
    async (params?: { orderBy?: string; date?: string }) => {
      setIsLoading(true);
      try {
        const response = await api.todo.getByDate(
          params?.date || '',
          params?.orderBy,
          page,
          5 // limit
        );
        setTodos(response.data);
        setTotalPages(response.meta.totalPages);
        setError(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error fetching todos');
      } finally {
        setIsLoading(false);
      }
    },
    [page]
  );

  const handleSetSelectedDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setPage(1); // 날짜 변경 시 1페이지로 초기화
  }, []);

  const addTodo = useCallback(
    async (todo: { content?: string; title?: string; date?: string }) => {
      try {
        const newTodo = await api.todo.create(
          todo.content || '',
          todo.title,
          todo.date
        );
        setTodos((prev) => [newTodo, ...prev]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error adding todo');
      }
    },
    []
  );

  const toggleTodo = useCallback(async (id: number, completed: boolean) => {
    try {
      await api.todo.update(id, { completed });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed } : t))
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error updating todo');
    }
  }, []);

  const updateTodo = useCallback(
    async (
      id: number,
      data: { title?: string; content?: string; completed?: boolean }
    ) => {
      try {
        await api.todo.update(id, data);
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...data } : t))
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.response?.data?.message || 'Error updating todo');
      }
    },
    []
  );

  const deleteTodo = useCallback(async (id: number) => {
    try {
      await api.todo.delete(id);
      setTodos((prev) => prev.filter((t) => t.id !== id));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error deleting todo');
    }
  }, []);

  return {
    todos,
    isLoading,
    error,
    selectedDate,
    setSelectedDate: handleSetSelectedDate,
    page,
    setPage,
    totalPages,
    fetchTodos,
    addTodo,
    toggleTodo,
    updateTodo,
    deleteTodo,
  };
}
