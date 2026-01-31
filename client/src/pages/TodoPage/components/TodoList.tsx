import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { useTodoContext } from '../context/todo-context';
import {
  DropdownMenu,
  DropdownItem,
} from '../../../components/ui/dropdown-menu';

export function TodoList() {
  const { todos, isLoading, toggleTodo, deleteTodo, updateTodo } =
    useTodoContext();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const startEditing = (id: number, currentTitle: string) => {
    setEditingId(id);
    setEditContent(currentTitle);
  };

  const saveEditing = async () => {
    if (editingId === null) return;
    if (editContent.trim()) {
      // 제목과 내용을 동일하게 업데이트 (TodoForm 로직과 일관성 유지)
      await updateTodo(editingId, { title: editContent, content: editContent });
    }
    setEditingId(null);
    setEditContent('');
  };

  if (isLoading && todos.length === 0) {
    return <div className="text-center py-10 text-gray-400">로딩 중...</div>;
  }

  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <div className="text-center py-10 text-gray-400 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          할 일이 없습니다.
        </div>
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
            {editingId === todo.id ? (
              <input
                type="text"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                onBlur={saveEditing}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') saveEditing();
                  if (e.key === 'Escape') setEditingId(null);
                }}
                autoFocus
                className="flex-1 px-2 py-1 text-sm border border-sdi-gray-border rounded-sm focus:outline-none focus:ring-1 focus:ring-sdi-black"
              />
            ) : (
              <div className="flex-1">
                {/* 제목 */}
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
                {/* 내용  */}
                {todo.content && (
                  <p className="text-sm text-sdi-gray-text mt-0.5">
                    {todo.content}
                  </p>
                )}
              </div>
            )}
            <DropdownMenu
              trigger={
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label="더보기"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="19" cy="12" r="1" />
                    <circle cx="5" cy="12" r="1" />
                  </svg>
                </button>
              }
            >
              <DropdownItem onClick={() => startEditing(todo.id, todo.title)}>
                수정하기
              </DropdownItem>
              <DropdownItem
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:bg-red-50"
              >
                삭제
              </DropdownItem>
            </DropdownMenu>
          </div>
        ))
      )}
    </div>
  );
}
