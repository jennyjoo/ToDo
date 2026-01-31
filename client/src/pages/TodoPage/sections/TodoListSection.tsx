import { TodoList } from '../components/TodoList';
import { WeekPicker } from '../components/WeekPicker';
import { useTodoContext } from '../context/todo-context';

export function TodoListSection() {
  const { selectedDate, setSelectedDate, page, setPage, totalPages } =
    useTodoContext();

  return (
    <section className="space-y-6">
      <WeekPicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <TodoList />

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 transition-colors"
          >
            이전
          </button>
          <span className="text-sm text-gray-600 font-medium">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 transition-colors"
          >
            다음
          </button>
        </div>
      )}
    </section>
  );
}
