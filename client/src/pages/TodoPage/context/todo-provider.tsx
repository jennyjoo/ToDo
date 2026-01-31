import { type ReactNode } from 'react';
import { useTodoCrud } from '../hooks/useTodoCrud';
import { TodoContext } from './todo-context';

export function TodoProvider({ children }: { children: ReactNode }) {
  const todoCrud = useTodoCrud();

  return (
    <TodoContext.Provider value={todoCrud}>{children}</TodoContext.Provider>
  );
}
