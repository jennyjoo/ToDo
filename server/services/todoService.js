class TodoService {
  constructor(todoRepository, todoCategoryRepository) {
    if (!todoRepository || !todoCategoryRepository) {
      throw new Error('TodoRepository와 TodoCategoryRepository가 필요합니다.');
    }
    this.todoRepository = todoRepository;
    this.todoCategoryRepository = todoCategoryRepository;
  }

  // 모든 할 일 목록 조회
  findAll(orderBy) {
    return this.todoRepository.findAll(orderBy);
  }

  // 새로운 할 일 추가
  create({ title, content, categoryId = null }) {
    const finalTitle =
      title ?? content?.slice(0, 20)?.concat(content.length > 20 ? '...' : '');

    const categories = this.todoCategoryRepository.findAll();
    const _categoryId =
      categoryId ?? (categories.length > 0 ? categories[0].id : null);

    return this.todoRepository.create({
      title: finalTitle,
      content,
      categoryId: _categoryId,
      completed: false,
    });
  }

  // 할 일 수정
  update(id, content, completed) {
    const todo = this.todoRepository.findById(id);
    if (!todo) return null;

    if (content !== undefined) todo.updateContent(content);
    if (completed !== undefined) todo.setCompleted(completed);

    return this.todoRepository.save(todo);
  }

  // 할 일 삭제
  delete(id) {
    return this.todoRepository.delete(id);
  }
}

module.exports = TodoService;
