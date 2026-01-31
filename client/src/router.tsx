import {
  createBrowserRouter,
  Navigate,
  Outlet,
  NavLink,
} from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { cn } from './lib/utils';

const TodoPage = lazy(() => import('./pages/TodoPage'));

// 공통 스타일 정의 (모듈화)
const navItemBase = 'block px-4 py-2 rounded-sm font-medium transition-colors';
const navItemActive = 'bg-sdi-black/10 text-sdi-black';
const navItemInactive =
  'text-sdi-gray-text hover:bg-sdi-gray-bg hover:text-sdi-black';

// eslint-disable-next-line react-refresh/only-export-components
const RootLayout = () => {
  return (
    <div className="flex h-screen bg-sdi-gray-bg text-sdi-black">
      {/* Left Sidebar */}
      <aside
        className={cn(
          'w-64 bg-white border-r border-sdi-gray-border flex flex-col shrink-0'
        )}
      >
        <div className="h-16 flex items-center px-6 border-b border-sdi-gray-border font-bold text-xl text-sdi-black">
          ToDo App
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/todos"
            className={({ isActive }) =>
              cn(navItemBase, isActive ? navItemActive : navItemInactive)
            }
          >
            My Tasks
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Wrapper */}
      <div className={cn('flex-1 flex flex-col min-w-0 overflow-hidden')}>
        {/* Header */}
        <header
          className={cn(
            'h-16 bg-white border-b border-sdi-gray-border flex items-center justify-between px-6 shrink-0'
          )}
        >
          <h2 className="text-lg font-semibold text-sdi-black">Dashboard</h2>
          <div className="w-8 h-8 rounded-sm bg-sdi-black/10 flex items-center justify-center text-sdi-black font-bold text-xs">
            U
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className={cn('flex-1 overflow-auto p-6')}>
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-gray-500">
                Loading...
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/todos" replace /> },
      { path: 'todos', element: <TodoPage /> },
    ],
  },
]);
