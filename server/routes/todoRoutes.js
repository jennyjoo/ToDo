const express = require('express');
const router = express.Router();

module.exports = (todoController) => {
  // GET /api/todos - 모든 할 일 목록 조회
  router.get('/', todoController.getAllTodos);

  // POST /api/todos - 새로운 할 일 추가
  router.post('/', todoController.createTodo);

  // PUT /api/todos/:id - 할 일 수정 (내용 또는 완료 상태)
  router.put('/:id', todoController.updateTodo);

  // DELETE /api/todos/:id - 할 일 삭제
  router.delete('/:id', todoController.deleteTodo);

  return router;
};
