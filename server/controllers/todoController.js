const { AppError } = require('../utils/AppError');

class TodoController {
  constructor(todoService) {
    this.todoService = todoService;
  }

  // GET /api/todos - 모든 할 일 목록 조회
  getAllTodos = async (req, res) => {
    const { orderBy } = req.query;
    const todos = this.todoService.findAll(orderBy);
    res.status(200).json(todos);
  };

  // POST /api/todos - 새로운 할 일 추가
  createTodo = async (req, res) => {
    const { content, title } = req.body;
    if (!content) {
      throw new AppError('TODO_004');
    }

    const newTodo = this.todoService.create(content, title);
    res.status(201).json(newTodo);
  };

  // PUT /api/todos/:id - 할 일 수정 (내용 또는 완료 상태)
  updateTodo = async (req, res) => {
    const id = parseInt(req.params.id);
    const { content, completed } = req.body;

    const updatedTodo = this.todoService.update(id, content, completed);

    if (!updatedTodo) {
      throw new AppError('TODO_404');
    }

    res.status(200).json(updatedTodo);
  };

  // DELETE /api/todos/:id - 할 일 삭제
  deleteTodo = async (req, res) => {
    const id = parseInt(req.params.id);
    const isDeleted = this.todoService.delete(id);

    if (!isDeleted) {
      throw new AppError('TODO_404');
    }

    res.status(200).json({ message: 'Todo deleted successfully' });
  };
}

module.exports = TodoController;
