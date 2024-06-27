const sendSuccessResponse = (res, data) => {
  res.status(200).send({
    statusCode: 200,
    data
  });
};

const sendErrorResponse = (res, message) => {
  res.status(400).send({
    statusCode: 400,
    message: message || 'Try again later!'
  });
};

module.exports = {
  sendSuccessResponse,
  sendErrorResponse
}