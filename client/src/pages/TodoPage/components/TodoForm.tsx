import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useTodoContext } from '../context/todo-context';

export function TodoForm() {
  const { addTodo, isLoading, selectedDate } = useTodoContext();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    await addTodo({
      content: newTodo,
      title: newTodo,
      date: selectedDate.toISOString(),
    });

    setNewTodo('');
  };

  return (
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
  );
}
