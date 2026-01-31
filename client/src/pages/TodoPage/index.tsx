import { useEffect } from 'react';
import { TodoInputSection } from './sections/TodoInputSection';
import { TodoListSection } from './sections/TodoListSection';
import { useTodoContext } from './context/todo-context';
import { TodoProvider } from './context/todo-provider';

function TodoPageContent() {
  const { fetchTodos, error, selectedDate } = useTodoContext();

  useEffect(() => {
    fetchTodos({ date: selectedDate.toISOString() });
  }, [fetchTodos, selectedDate]);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <TodoInputSection />
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-sm border border-red-100">
          {error}
        </div>
      )}
      <TodoListSection />
    </div>
  );
}

export default function TodoPage() {
  return (
    <TodoProvider>
      <TodoPageContent />
    </TodoProvider>
  );
}
