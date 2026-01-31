const ErrorDefinition = require('./model/error-definition');

// 에러 리포지토리 (TB_ERROR)
class ErrorRepository {
  constructor() {
    this.errors = [
      // 공통 에러
      new ErrorDefinition('COMMON_001', 400, 'ID는 필수 값입니다.'),
      new ErrorDefinition('COMMON_002', 400, 'ID는 숫자여야 합니다.'),

      // Todo 관련 에러
      new ErrorDefinition('TODO_001', 400, '내용은 문자열이어야 합니다.'),
      new ErrorDefinition(
        'TODO_002',
        400,
        '제목은 비어 있지 않은 문자열이어야 합니다.'
      ),
      new ErrorDefinition(
        'TODO_003',
        400,
        '완료 상태는 불리언 값이어야 합니다.'
      ),
      new ErrorDefinition('TODO_004', 400, '내용은 필수 값입니다.'),
      new ErrorDefinition('TODO_404', 404, '할 일을 찾을 수 없습니다.'),

      // Category 관련 에러
      new ErrorDefinition('CAT_001', 400, '카테고리 ID는 필수 값입니다.'),
      new ErrorDefinition('CAT_002', 400, '카테고리 ID는 숫자여야 합니다.'),
      new ErrorDefinition(
        'CAT_003',
        400,
        '카테고리 이름은 비어 있지 않은 문자열이어야 합니다.'
      ),
    ];
  }

  findByCode(code) {
    return this.errors.find((e) => e.code === code);
  }
}

module.exports = ErrorRepository;
