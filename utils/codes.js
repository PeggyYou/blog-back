const ReturnCode = {
  Ok: 200,
  Created: 201,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  ServerInternalError: 500
}

const ErrorCode = {
  Ok: 20000,
  BadRequest: 40000,
  MissingParameters: 40001,
  InvalidParameters: 40002,
  NotFound: 40400,
  WriteError: 50001,
  ReadError: 50002,
  UpdateError: 50003,
  DeleteError: 50004,
  getReturnCode(code) {
    return Math.floor(code / 100)
  }
}

module.exports = { ReturnCode, ErrorCode }
