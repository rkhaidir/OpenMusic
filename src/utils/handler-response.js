const successResponseWithMessage = (h, message, code) => h.response({
  status: 'success',
  message,
}).code(code);

const failedResponseWithMessage = (h, message, code) => h.response({
  status: 'fail',
  message,
}).code(code);

const successResponseWithMessageAndData = (h, message, data, code) => h.response({
  status: 'success',
  message,
  data,
}).code(code);

const errorResponseWithMessage = (h, message, code) => h.response({
  status: 'error',
  message,
}).code(code);

module.exports = {
  successResponseWithMessage,
  failedResponseWithMessage,
  successResponseWithMessageAndData,
  errorResponseWithMessage,
};
