const ToDo = require('./model/todo');

const TODOS = [
  new ToDo({
    id: 1,
    title: 'Learn Node.js',
    content: 'Node.js 기본 익히기',
    categoryId: 1,
  }),

  new ToDo({
    id: 2,
    title: 'Build a ToDo App',
    content: 'Express로 API 서버 만들기',
    categoryId: 1,
  }),
];

class TodoRepository {
  constructor() {
    this.todos = [...TODOS];
  }

  // 모든 데이터 조회 (find)
  findAll(orderBy) {
    if (orderBy) {
      return [...this.todos].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return -1;
        if (a[orderBy] > b[orderBy]) return 1;
        return 0;
      });
    }

    return [...this.todos].sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      return dateB - dateA;
    });
  }

  // ID로 데이터 조회 (find)
  findById(id) {
    return this.todos.find((t) => t.id === id) || null;
  }

  // 데이터 추가 (add)
  create({ title, content, categoryId, completed = false }) {
    const id = this.getNextId();
    const todo = new ToDo({ id, title, content, categoryId, completed });
    this.todos.push(todo);
    return todo;
  }

  // 데이터 저장 (Insert or Update)
  save(todo) {
    const index = this.todos.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      this.todos[index] = todo; // 기존 데이터 덮어쓰기 (DB의 UPDATE 역할)
    } else {
      this.todos.push(todo); // 새 데이터 추가 (DB의 INSERT 역할)
    }
    return todo;
  }

  // 데이터 삭제 (delete)
  delete(id) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return false;

    this.todos.splice(index, 1);
    return true;
  }

  // ID 자동 생성
  getNextId() {
    return this.todos.length > 0
      ? Math.max(...this.todos.map((t) => t.id)) + 1
      : 1;
  }
}

module.exports = TodoRepository;
