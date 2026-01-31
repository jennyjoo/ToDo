const TodoCategory = require('./model/todo-category');

const CATEGORIES = [
  new TodoCategory({
    id: 1,
    name: 'General',
  }),
  new TodoCategory({
    id: 2,
    name: 'Work',
  }),
  new TodoCategory({
    id: 3,
    name: 'Personal',
  }),
];

class TodoCategoryRepository {
  constructor() {
    this.categories = [...CATEGORIES];
  }

  findAll(orderBy) {
    if (orderBy) {
      return [...this.categories].sort((a, b) => {
        if (a[orderBy] < b[orderBy]) return -1;
        if (a[orderBy] > b[orderBy]) return 1;
        return 0;
      });
    }

    return [...this.categories].sort((a, b) => {
      const dateA = a.updatedAt || a.createdAt;
      const dateB = b.updatedAt || b.createdAt;
      return dateB - dateA;
    });
  }

  // ID로 카테고리 조회
  findById(id) {
    return this.categories.find((c) => c.id === id && !c.deletedAt) || null;
  }

  // 카테고리 추가
  create({ name, parentId = null }) {
    const id = this.getNextId();
    const category = new TodoCategory({ id, name, parentId });
    this.categories.push(category);
    return category;
  }

  // 카테고리 수정
  update(id, { name, parentId }) {
    const category = this.findById(id);
    if (!category) return null;

    if (name !== undefined) category.updateName(name);
    if (parentId !== undefined) category.updateParentId(parentId);

    return category;
  }

  // 카테고리 삭제 (Soft Delete)
  delete(id) {
    const category = this.findById(id);
    if (!category) return false;

    category.delete();
    return true;
  }

  // ID 자동 생성
  getNextId() {
    return this.categories.length > 0
      ? Math.max(...this.categories.map((c) => c.id)) + 1
      : 1;
  }
}

module.exports = TodoCategoryRepository;
