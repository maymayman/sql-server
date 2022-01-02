export enum StatusCode {
  NOT_FOUND = 404,

  INTERNAL_SERVER_ERROR = 500,
};

export enum ErrorCode {
  API_NOT_FOUND = 4000,
  CLASS_NOT_FOUND = 4001,
  INTERNAL_SERVER_ERROR = 5000,
};

export const ErrorMessage = {
  [ErrorCode.API_NOT_FOUND]: 'API Not Found',
  [ErrorCode.CLASS_NOT_FOUND]: 'Class Not Found',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
};

export const ErrorMessages = {
  [ErrorCode.API_NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: ErrorMessage[ErrorCode.API_NOT_FOUND],
    errorCode: ErrorCode.API_NOT_FOUND
  },
  [ErrorCode.CLASS_NOT_FOUND]: {
    statusCode: StatusCode.NOT_FOUND,
    message: ErrorMessage[ErrorCode.CLASS_NOT_FOUND],
    errorCode: ErrorCode.CLASS_NOT_FOUND
  },
  [ErrorCode.INTERNAL_SERVER_ERROR]: {
    statusCode: StatusCode.INTERNAL_SERVER_ERROR,
    message: ErrorMessage[ErrorCode.INTERNAL_SERVER_ERROR],
    errorCode: ErrorCode.INTERNAL_SERVER_ERROR
  },
};

export class BaseError extends Error {
  public status: StatusCode;
  public code: ErrorCode;
  public message: string;
  constructor(
    code: ErrorCode = ErrorCode.INTERNAL_SERVER_ERROR,
    message?: string
  ) {
    const errorMessages= ErrorMessages[code];
    const messageErr = message || errorMessages.message;
    super(messageErr);

    this.status = errorMessages.statusCode;
    this.code = errorMessages.errorCode;

    Error.captureStackTrace(this);
  }
}
