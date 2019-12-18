export class LMSError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

export class BadRequest extends LMSError {
  constructor() {
    super(400, 'Bad Request');
  }
}

export class InternalError extends LMSError {
  constructor(message) {
    super(500, message);
  }
}

export class UnauthorizatedRequest extends LMSError {
  constructor() {
    super(401, 'Unauthorizated Request');
  }
}
