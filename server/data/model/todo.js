const { AppError } = require('../../utils/AppError');

class ToDo {
  constructor({ id, title, content, completed = false, categoryId }) {
    if (id == null || id === undefined) {
      throw new AppError('COMMON_001');
    }

    if (typeof id !== 'number') {
      throw new AppError('COMMON_002');
    }

    if (typeof content !== 'string' || content.trim() === '') {
      throw new AppError('TODO_001');
    }

    this.id = id;
    this.title = title;
    this.content = content;
    this.completed = completed;
    this.categoryId = categoryId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = null;
  }

  // 제목 변경
  updateTitle(newTitle) {
    if (typeof newTitle !== 'string' || newTitle.trim() === '') {
      throw new AppError('TODO_002');
    }
    this.title = newTitle;
    this.updatedAt = new Date();
  }

  // 내용 변경
  updateContent(newContent) {
    if (typeof newContent !== 'string' || newContent.trim() === '') {
      throw new AppError('TODO_001');
    }
    this.content = newContent;
    this.updatedAt = new Date();
  }

  // 완료 상태 토글
  setCompleted(completed) {
    if (typeof completed !== 'boolean') {
      throw new AppError('TODO_003');
    }
    this.completed = completed;
    this.updatedAt = new Date(); // 수정 시간 자동 갱신
  }

  delete() {
    this.deletedAt = new Date();
  }
}

module.exports = ToDo;
