class ErrorService {
  constructor(errorRepository) {
    this.errorRepository = errorRepository;
  }

  getError(code) {
    return this.errorRepository.findByCode(code);
  }
}

module.exports = ErrorService;
