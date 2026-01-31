const { AppError } = require('../../utils/AppError');

// Todo 카테고리 모델 (TB_TODO_CATEGORY)
class TodoCategory {
  constructor({ id, name, parentId = null }) {
    if (id == null || id === undefined) {
      throw new AppError('CAT_001');
    }

    if (typeof id !== 'number') {
      throw new AppError('CAT_002');
    }

    if (typeof name !== 'string' || name.trim() === '') {
      throw new AppError('CAT_003');
    }

    this.id = id;
    this.name = name;
    this.createdAt = new Date();
    this.parentId = parentId;
    this.updatedAt = new Date();
    this.deletedAt = null;
  }

  updateName(newName) {
    if (typeof newName !== 'string' || newName.trim() === '') {
      throw new AppError('CAT_003');
    }
    this.name = newName;
    this.updatedAt = new Date();
  }

  updateParentId(newParentId) {
    this.parentId = newParentId;
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}

module.exports = TodoCategory;
