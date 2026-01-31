// 에러 정의 모델 (TB_ERROR)

class ErrorDefinition {
  constructor(code, status, message) {
    this.code = code;
    this.status = status;
    this.message = message;
  }
}

module.exports = ErrorDefinition;
