console.log('1. Script loading...'); // 이 로그가 보여야 파일이 읽힌 것입니다.

const express = require('express');
require('express-async-errors'); // 비동기 에러 자동 처리 패치
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// DI를 위한 클래스 및 팩토리 임포트
const TodoRepository = require('./data/todoRepository');
const TodoCategoryRepository = require('./data/todoCategoryRepository');
const ErrorRepository = require('./data/errorRepository');
const TodoService = require('./services/todoService');
const ErrorService = require('./services/errorService');
const TodoController = require('./controllers/todoController');
const createTodoRoutes = require('./routes/todoRoutes');

const { AppError } = require('./utils/AppError');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// 서버 시작 확인 로그 (실행 여부 체크용)
console.log('2. Initializing server...');

// 미들웨어 설정
app.use(cors()); // React와의 통신을 위해 필수
app.use(express.json()); // JSON 요청 본문 파싱
app.use(express.urlencoded({ extended: true }));

// 기본 라우트 (Health Check용)
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// --- 의존성 주입 (Dependency Injection) 시작 ---
const todoRepository = new TodoRepository();
const todoCategoryRepository = new TodoCategoryRepository();
const errorRepository = new ErrorRepository();
const errorService = new ErrorService(errorRepository);
const todoService = new TodoService(todoRepository, todoCategoryRepository);
const todoController = new TodoController(todoService);
// ---------------------------------------------

// API 라우트 연결
app.use('/api/todos', createTodoRoutes(todoController));

const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// SPA 라우팅 지원: API 요청이 아닌 경우 index.html 반환
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// 404 에러 핸들러
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

// 글로벌 에러 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);

  // 우리가 만든 커스텀 에러라면 설정한 상태 코드와 메시지 반환
  if (err instanceof AppError) {
    // 에러 코드로 DB(Repository)에서 에러 상세 정보 조회
    const errorDef = errorService.getError(err.code);

    if (errorDef) {
      return res
        .status(errorDef.status)
        .json({ message: errorDef.message, code: err.code });
    }

    // 정의되지 않은 에러 코드인 경우
    return res.status(500).json({ message: 'Unknown Error', code: err.code });
  }

  res
    .status(500)
    .json({ message: 'Internal Server Error', error: err.message });
});

const server = app.listen(PORT, () => {
  console.log(`3. Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
});
