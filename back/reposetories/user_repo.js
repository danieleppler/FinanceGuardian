const db_client = require("../db_client");
const utils = require("../utils");
const {
  INSERT_USER_QUERY,
  SELECT_USER_BY_USERNAME_QUERY,
  SELECT_ALL_USERS_QUERY,
  UPDATE_USER_QUERY,
  UPDATE_USER_QUERY_W_PASSWORD,
} = require("../Queries");

const create_user = async (user) => {
  const { first_name, last_name, age, username, password } = user;

  const uid = utils.CreateUID();
  const hashed_password = await utils.hash_password(password);

  await db_client.query(INSERT_USER_QUERY, [
    uid,
    first_name,
    last_name,
    age,
    username,
    hashed_password,
  ]);
  return;
};

const get_user_by_username = async (user_name) => {
  const user = await db_client.query(SELECT_USER_BY_USERNAME_QUERY, [
    user_name,
  ]);
  return user;
};

const get_all_users = async () => {
  const users = await db_client.query(SELECT_ALL_USERS_QUERY);
  return users;
};

const update_user = async (user) => {
  const { id, first_name, last_name, age } = user;
  if (user.password) {
    const password = utils.hash_password(user.password);
    await db_client.query(UPDATE_USER_QUERY_W_PASSWORD),
      [id, first_name, last_name, age, password];
  } else {
    await db_client.query(UPDATE_USER_QUERY, [id, first_name, last_name, age]);
  }

  return;
};

module.exports = {
  create_user,
  get_all_users,
  get_user_by_username,
  update_user,
};
