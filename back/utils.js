const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("json-web-token");

const salt_round = Number(process.env.BCRYPT_SALT_ROUNDS);
const jwt_secret = process.env.JWT_SECRET;

const CreateUID = () => {
  return uuid.v7();
};

const hash_password = async (password) => {
  const hashed_password = await new Promise((res, rej) => {
    bcrypt.hash(password, salt_round, (err, hash) => {
      if (err) rej(err);
      res(hash);
    });
  });
  return hashed_password;
};

const check_password = async (input_password, hashed_password) => {
  const result = await new Promise((resolve, reject) => {
    return bcrypt.compare(input_password, hashed_password, (err, res) => {
      if (err) reject(err);
      return resolve(res);
    });
  });
  return result;
};

const assign_entry_token = async (user) => {
  const token = await jwt.encode(jwt_secret, user, (err, token) => {
    if (err) throw err;
    return token;
  });
  return token;
};

const check_token = async (token) => {
  return await jwt.decode(jwt_secret, token, (err, decodetoken) => {
    if (err) return false;

    if (decodetoken) return true;
  });
};

module.exports = {
  CreateUID,
  hash_password,
  check_password,
  assign_entry_token,
  check_token,
};
