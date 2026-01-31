import { useEffect, useState } from 'react';
import { useTodoStore } from './useTodoStore';
import { cn } from './lib/utils';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';

export default function TodoPage() {
  const { todos, fetchTodos, addTodo, toggleTodo, isLoading, error } =
    useTodoStore();
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    await addTodo(newTodo);
    setNewTodo('');
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-sdi-black tracking-tight">
          My Tasks
        </h1>
        <p className="mt-2 text-sdi-gray-text">오늘 할 일을 관리해보세요.</p>
      </header>

      <form onSubmit={handleSubmit} className="mb-8 flex gap-2">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="무엇을 해야 하나요?"
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          추가
        </Button>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="space-y-3">
        {isLoading && todos.length === 0 ? (
          <div className="text-center py-10 text-gray-400">로딩 중...</div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                'group flex items-center gap-4 p-4 bg-white rounded-sm border border-sdi-gray-border shadow-sm transition-all',
                'hover:shadow-md'
              )}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                className={cn(
                  'w-6 h-6 rounded-sm border-sdi-gray-border text-sdi-black cursor-pointer',
                  'focus:ring-sdi-black'
                )}
              />
              <div className="flex-1">
                <h3
                  className={cn(
                    'font-medium transition-all',
                    todo.completed
                      ? 'text-sdi-gray-text line-through opacity-70'
                      : 'text-sdi-black'
                  )}
                >
                  {todo.title}
                </h3>
                {todo.content && (
                  <p className="text-sm text-sdi-gray-text mt-0.5">
                    {todo.content}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
