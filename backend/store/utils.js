const sha256 = require("sha256");
const check = require("express-validator");
export const generatehashedPassword = (password) => sha256(password);
export function generateServerErrorCode(
  res,
  code,
  fullError,
  msg,
  location = "server"
) {
  const errors = {};
  errors[location] = {
    fullError,
    msg,
  };

  return res.status(code).json({
    code,
    fullError,
    errors,
  });
}
