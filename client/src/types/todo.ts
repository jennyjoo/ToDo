export interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TodoCategory {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
