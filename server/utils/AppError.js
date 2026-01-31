class AppError extends Error {
  constructor(code) {
    super(code); // 기본 메시지로 코드를 설정 (나중에 미들웨어에서 덮어씌움)
    this.code = code;
    this.isOperational = true;
  }
}

module.exports = {
  AppError,
};
